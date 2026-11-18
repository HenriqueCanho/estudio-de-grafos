"""Gera as videoaulas MP4, as legendas WebVTT e o catálogo estático do site."""

import argparse
from concurrent.futures import ThreadPoolExecutor
from functools import lru_cache
import json
import math
from pathlib import Path
import re
import subprocess
import tempfile
import textwrap
import wave

from PIL import Image, ImageDraw, ImageFont, ImageOps

RAIZ = Path(__file__).resolve().parents[1]
SAIDA = RAIZ / 'media' / 'videoaulas'
LARGURA, ALTURA = 1280, 720
FPS = 12
TAXA = 22050
TRANSICAO = 6
TINTA = '#f4f6ff'
SECUNDARIA = '#b8c8e7'
LINHA = '#607497'
FUNDO = '#101a31'
PAINEL = '#182641'
BORDA = '#314564'
CORES = ['#57e4d0', '#79aaff', '#ffca75', '#e7a5f8', '#f5a2af', '#b5dc82']


@lru_cache
def fonte(tamanho, peso=False):
    pasta = Path('/System/Library/Fonts/Supplemental')
    arquivo = pasta / ('Arial Bold.ttf' if peso else 'Arial Unicode.ttf')
    if arquivo.exists():
        return ImageFont.truetype(str(arquivo), tamanho)
    return ImageFont.truetype('DejaVuSans-Bold.ttf' if peso else 'DejaVuSans.ttf', tamanho)


def quebrar(texto, font, largura):
    linhas = []
    linha = ''
    for palavra in texto.split():
        candidata = (linha + ' ' + palavra).strip()
        if linha and font.getlength(candidata) > largura:
            linhas.append(linha)
            linha = palavra
        else:
            linha = candidata
    if linha:
        linhas.append(linha)
    return linhas


def texto_matematico(texto):
    return texto.replace('ₙ', '_n')


def possui_simbolo_sem_negrito(texto):
    return any(simbolo in texto for simbolo in '₄₅₆⇒␣')


def texto_quebrado(draw, xy, texto, tamanho, largura, cor=TINTA, peso=False, max_linhas=None):
    texto = texto_matematico(texto)
    peso = peso and not possui_simbolo_sem_negrito(texto)
    font = fonte(tamanho, peso)
    linhas = quebrar(texto, font, largura)
    while (max_linhas and len(linhas) > max_linhas) or any(font.getlength(linha) > largura for linha in linhas):
        tamanho -= 1
        if tamanho < 15:
            raise ValueError(f'Texto comprido demais para o quadro: {texto}')
        font = fonte(tamanho, peso)
        linhas = quebrar(texto, font, largura)
    x, y = xy
    for linha in linhas:
        draw.text((x, y), linha, font=font, fill=cor, anchor='lt')
        y += tamanho + 8
    return y


def reta(draw, inicio, fim, cor, largura, seta):
    draw.line((inicio, fim), fill=cor, width=largura)
    if seta:
        dx, dy = fim[0] - inicio[0], fim[1] - inicio[1]
        d = math.hypot(dx, dy)
        frente = (dx / d, dy / d)
        lado = (-frente[1], frente[0])
        a = (fim[0] - 17 * frente[0], fim[1] - 17 * frente[1])
        draw.polygon([fim, (a[0] + 7 * lado[0], a[1] + 7 * lado[1]),
                      (a[0] - 7 * lado[0], a[1] - 7 * lado[1])], fill=cor)


def grafo(draw, quadro, visual, fase):
    x1, y1, x2, y2 = quadro
    pontos = {k: (x1 + a * (x2 - x1), y1 + b * (y2 - y1)) for k, (a, b) in visual['vertices'].items()}
    arestas = visual.get('arestas', [])
    orientado = visual.get('orientado', False)
    destaque = [tuple(par) for par in visual.get('destaque', [])]
    pares = {(u, v) for u, v, *_ in arestas}
    rotulos = []
    for u, v, *rotulo in arestas:
        a, b = pontos[u], pontos[v]
        dx, dy = b[0] - a[0], b[1] - a[1]
        comprimento = math.hypot(dx, dy)
        if comprimento < 54:
            raise ValueError(f'Vertices sobrepostos {u} e {v}')
        eixo = (dx / comprimento, dy / comprimento)
        normal = (-eixo[1], eixo[0])
        desvio = 8 if orientado and (v, u) in pares else 0
        marcado = fase and ((u, v) in destaque or (not orientado and (v, u) in destaque))
        tinta = CORES[0] if marcado else LINHA
        inicio = (a[0] + 25 * eixo[0] + desvio * normal[0], a[1] + 25 * eixo[1] + desvio * normal[1])
        fim = (b[0] - 25 * eixo[0] + desvio * normal[0], b[1] - 25 * eixo[1] + desvio * normal[1])
        reta(draw, inicio, fim, tinta, 5 if marcado else 3, orientado)
        if rotulo and rotulo[0] is not None and str(rotulo[0]).strip():
            chave = (u + '-' + v)
            posicao = visual.get('rotulos', {}).get(chave) if fase else None
            if posicao:
                px, py = x1 + posicao[0] * (x2 - x1), y1 + posicao[1] * (y2 - y1)
            else:
                px = (a[0] + b[0]) / 2 + (desvio + 14) * normal[0]
                py = (a[1] + b[1]) / 2 + (desvio + 14) * normal[1]
            rotulos.append((px, py, texto_matematico(str(rotulo[0])), tinta if marcado else TINTA))
    for x, y, valor, cor in rotulos:
        font = fonte(20)
        w = font.getlength(valor) / 2 + 7
        draw.rounded_rectangle((x - w, y - 13, x + w, y + 13), radius=7, fill=FUNDO)
        draw.text((x, y), valor, fill=cor, font=font, anchor='mm')
    for nome, (x, y) in pontos.items():
        selecao = visual.get('cores', {}).get(nome) if fase else None
        preenchimento = CORES[(int(selecao) - 1) % len(CORES)] if selecao else PAINEL
        draw.ellipse((x - 25, y - 25, x + 25, y + 25), fill=preenchimento,
                     outline=SECUNDARIA if not selecao else preenchimento, width=2)
        tamanho = 23 if len(nome) <= 3 else 16
        draw.text((x, y), texto_matematico(nome), font=fonte(tamanho, not possui_simbolo_sem_negrito(nome)),
                  fill=FUNDO if selecao else TINTA, anchor='mm')


def tabela(draw, quadro, visual, fase):
    x1, y1, x2, y2 = quadro
    colunas = visual['colunas']
    linhas = visual['linhas']
    if not colunas or not linhas or any(len(linha) != len(colunas) for linha in linhas):
        raise ValueError('Tabela sem colunas ou com número de células inconsistente')
    destaque = {tuple(celula) for celula in visual.get('destaque', [])} if fase else set()
    h = min(54, (y2 - y1) / (1 + len(linhas)))
    y = (y1 + y2 - h * (1 + len(linhas))) / 2
    medidas = [max(2, max(len(str(linha[i])) for linha in [colunas, *linhas])) for i in range(len(colunas))]
    pesos = [min(31, max(4, medida)) for medida in medidas]
    for idx, linha in enumerate([colunas, *linhas]):
        x = x1
        for j, celula in enumerate(linha):
            w = (x2 - x1) * pesos[j] / sum(pesos)
            ativo = (idx - 1, j) in destaque
            preenchimento = '#285d67' if ativo else '#263953' if idx == 0 else '#1d3150' if idx % 2 else '#1a2a45'
            draw.rectangle((x, y, x + w, y + h), fill=preenchimento, outline=BORDA)
            tamanho = min(25, round(h * 0.62))
            valor = texto_matematico(str(celula))
            font = fonte(tamanho)
            while font.getlength(valor) > w - 12 and tamanho > 12:
                tamanho -= 1
                font = fonte(tamanho)
            draw.text((x + w / 2, y + h / 2), valor, font=font, fill=TINTA, anchor='mm')
            x += w
        y += h


def passos(draw, quadro, visual, fase):
    x1, y1, x2, y2 = quadro
    itens = visual['itens']
    h = min(92, (y2 - y1) / len(itens))
    y = (y1 + y2 - h * len(itens)) / 2
    for i, item in enumerate(itens):
        ativo = fase and i == visual.get('ativa', 0)
        draw.rounded_rectangle((x1, y, x2, y + h - 9), radius=13, fill='#21575f' if ativo else '#233651')
        texto_quebrado(draw, (x1 + 19, y + 13), str(item), min(29, int(h * 0.35)), x2 - x1 - 38,
                        TINTA, max_linhas=2)
        y += h


def renderizar_quadro(aula, cena, indice, fase=True):
    imagem = Image.new('RGB', (LARGURA, ALTURA), FUNDO)
    draw = ImageDraw.Draw(imagem)
    cor = CORES[(int(aula['aula']) - 5) % len(CORES)]
    draw.text((62, 44), 'ESTÚDIO DE GRAFOS  /  AULA ' + aula['aula'], font=fonte(20, True), fill=cor, anchor='lt')
    texto_quebrado(draw, (62, 78), cena['titulo'], 44, 1150, peso=True, max_linhas=1)
    draw.rounded_rectangle((61, 145, 805, 572), radius=22, fill=PAINEL, outline=BORDA, width=2)
    draw.rounded_rectangle((829, 145, 1219, 572), radius=22, fill=PAINEL, outline=BORDA, width=2)
    visual = cena.get('visual') or {'tipo': 'passos', 'itens': cena['notas']}
    tipo = visual['tipo']
    if tipo == 'imagem':
        with Image.open(RAIZ / visual['arquivo']) as origem:
            figura = ImageOps.contain(origem.convert('RGB'), (703, 397), Image.Resampling.LANCZOS)
        imagem.paste(figura, (61 + (744 - figura.width) // 2, 145 + (427 - figura.height) // 2))
    else:
        desenhar = {'grafo': grafo, 'tabela': tabela, 'passos': passos}[tipo]
        quadro = (102, 190, 764, 525) if tipo == 'grafo' else (85, 168, 782, 549)
        desenhar(draw, quadro, visual, fase)
    y = 183
    for nota in cena['notas']:
        draw.ellipse((853, y + 6, 863, y + 16), fill=cor)
        y = texto_quebrado(draw, (877, y), nota, 28, 314, TINTA, max_linhas=4) + 20
    if y > 576:
        raise ValueError(f'Notas excedem o espaço no quadro {aula["id"]}/{indice + 1}')
    if cena.get('pausa'):
        draw.text((63, 598), 'Responda antes da próxima etapa', font=fonte(21, True), fill=cor, anchor='lt')
    draw.line((62, 636, 1218, 636), fill=BORDA, width=3)
    draw.line((62, 636, 62 + 1156 * ((indice + 1) / len(aula['cenas'])), 636), fill=cor, width=3)
    return imagem


def ler_roteiros(filtro=None):
    aulas = []
    for arquivo in sorted((RAIZ / 'roteiros').glob('aula-*.json')):
        aulas.extend(json.loads(arquivo.read_text(encoding='utf-8')))
    ids = set()
    for aula in aulas:
        id_aula = aula['id']
        if id_aula in ids or not re.fullmatch(r'[a-z0-9-]+', id_aula):
            raise ValueError(f'Identificador de videoaula inválido: {id_aula}')
        ids.add(id_aula)
        if not aula['cenas'] or not aula['paginas']:
            raise ValueError(f'Aula sem cenas ou páginas: {id_aula}')
    filtradas = [aula for aula in aulas if not filtro or filtro == aula['id']]
    if not filtradas:
        raise ValueError('Nenhum roteiro encontrado')
    return filtradas


def sintetizar(fala, arquivo, voz):
    subprocess.run(['say', '-v', voz, '-r', '168', '--file-format=WAVE',
                    '--data-format=LEI16@22050', '-o', str(arquivo), '--', fala], check=True,
                   stdout=subprocess.DEVNULL)
    with wave.open(str(arquivo), 'rb') as audio:
        if (audio.getframerate(), audio.getsampwidth(), audio.getnchannels()) != (TAXA, 2, 1):
            raise ValueError(f'Formato de áudio inesperado em {arquivo.name}')
        return audio.readframes(audio.getnframes())


def vtt_tempo(segundos):
    t = round(segundos * 1000)
    horas, t = divmod(t, 3600000)
    minutos, t = divmod(t, 60000)
    segundos, milis = divmod(t, 1000)
    return f'{horas:02d}:{minutos:02d}:{segundos:02d}.{milis:03d}'


def gerar_aula(aula, voz):
    pasta = SAIDA / aula['id']
    pasta.mkdir(parents=True, exist_ok=True)
    tempo = 0
    capitulos = []
    legendas = ['WEBVTT', '']
    ffconcat = ['ffconcat version 1.0']
    with tempfile.TemporaryDirectory(prefix='grafos-video-') as temporario:
        tmp = Path(temporario)
        with wave.open(str(tmp / 'narracao.wav'), 'wb') as faixa:
            faixa.setparams((1, 2, TAXA, 0, 'NONE', 'not compressed'))
            for i, cena in enumerate(aula['cenas']):
                inicio = tempo
                capitulos.append({'tempo': round(tempo, 3), 'titulo': cena['titulo'], 'fala': cena['fala']})
                for j, fala in enumerate(cena['fala']):
                    dados = sintetizar(fala, tmp / f'fala-{i}-{j}.wav', voz)
                    fim = tempo + len(dados) / 2 / TAXA
                    legenda = '\n'.join(textwrap.wrap(fala, width=48, break_long_words=False))
                    legendas.extend([f'{vtt_tempo(tempo)} --> {vtt_tempo(fim)}', legenda, ''])
                    faixa.writeframesraw(dados)
                    faixa.writeframesraw(b'\0' * (round(0.13 * TAXA) * 2))
                    tempo = fim + round(0.13 * TAXA) / TAXA
                pausa = float(cena.get('pausa') or 0.48)
                silencio = round(TAXA * pausa)
                faixa.writeframesraw(b'\0' * (silencio * 2))
                tempo += silencio / TAXA
                final = renderizar_quadro(aula, cena, i)
                inicial = renderizar_quadro(aula, cena, i, fase=False)
                if i == 0:
                    final.save(pasta / 'capa.webp', quality=85)
                for j in range(TRANSICAO):
                    nome = f'{i:02d}-{j:02d}.png'
                    Image.blend(inicial, final, (j + 1) / TRANSICAO).save(tmp / nome)
                    ffconcat.extend([f"file '{nome}'", f'option framerate {FPS}', f'duration {1 / FPS:.9f}'])
                nome = f'{i:02d}-final.png'
                final.save(tmp / nome)
                ffconcat.extend([f"file '{nome}'", f'option framerate {FPS}',
                                 f'duration {tempo - inicio - TRANSICAO / FPS:.9f}'])
        ffconcat.extend([f"file '{nome}'", f'option framerate {FPS}'])
        (tmp / 'quadros.ffconcat').write_text('\n'.join(ffconcat) + '\n')
        destino = pasta / 'aula.mp4'
        subprocess.run(['ffmpeg', '-hide_banner', '-loglevel', 'error', '-y',
                        '-safe', '0', '-f', 'concat', '-i', str(tmp / 'quadros.ffconcat'),
                        '-i', str(tmp / 'narracao.wav'), '-map', '0:v:0', '-map', '1:a:0',
                        '-vf', f'fps={FPS},format=yuv420p', '-c:v', 'libx264', '-threads', '2',
                        '-preset', 'veryfast', '-crf', '24', '-c:a', 'aac', '-b:a', '48k',
                        '-movflags', '+faststart', '-t', f'{tempo:.6f}', str(destino)], check=True)
    (pasta / 'legendas.vtt').write_text('\n'.join(legendas), encoding='utf-8')
    print(f'{aula["id"]} · {tempo:.1f} s · {destino.stat().st_size / 1_048_576:.2f} MB', flush=True)
    resultado = {k: v for k, v in aula.items() if k != 'cenas'}
    return {**resultado, 'duracao': round(tempo, 2), 'capitulos': capitulos}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--voz', default='Luciana')
    parser.add_argument('--jobs', type=int, default=3)
    parser.add_argument('--quadro', help='Gera apenas o primeiro quadro da videoaula indicada')
    args = parser.parse_args()
    aulas = ler_roteiros(args.quadro)
    if args.quadro:
        aula = aulas[0]
        caminho = Path(tempfile.gettempdir()) / f'{aula["id"]}-videoaula.png'
        renderizar_quadro(aula, aula['cenas'][0], 0).save(caminho)
        print(caminho)
        return
    with ThreadPoolExecutor(max_workers=args.jobs) as executor:
        catalogo = list(executor.map(lambda aula: gerar_aula(aula, args.voz), aulas))
    (RAIZ / 'catalogo-videoaulas.js').write_text(
        '// Gerado por scripts/gerar_videoaulas.py.\nconst videoaulas = '
        + json.dumps(catalogo, ensure_ascii=False, indent=2) + ';\n', encoding='utf-8')


if __name__ == '__main__':
    main()
