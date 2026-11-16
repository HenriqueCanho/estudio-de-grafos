"""Redesenha exemplos dos PDFs. Rode com Python 3 e Pillow instalado."""

from functools import lru_cache
from itertools import combinations
from math import cos, hypot, pi, sin
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


SAIDA = Path(__file__).resolve().parents[1] / "figuras" / "diagramas"
FUNDO = "#f7f9ff"
BRANCO = "#ffffff"
TEXTO = "#172146"
SUAVE = "#667496"
LINHA = "#9aa8c5"
INDIGO = "#3544ce"
VERDE = "#127566"
AMBAR = "#a65e16"
ROXO = "#7844ac"
ROSA = "#b43361"
PALETA = {1: AMBAR, 2: VERDE, 3: ROXO, 4: ROSA}


@lru_cache
def fonte(tamanho, forte):
    nomes = (
        ("DejaVuSans-Bold.ttf", "/System/Library/Fonts/Supplemental/Arial Bold.ttf")
        if forte
        else ("DejaVuSans.ttf", "/System/Library/Fonts/Supplemental/Arial.ttf")
    )
    for nome in nomes:
        try:
            return ImageFont.truetype(nome, tamanho)
        except OSError:
            continue
    return ImageFont.load_default(size=tamanho)


def pares(texto):
    return [tuple(item.split("-")) for item in texto.split()]


def ciclo(ordem):
    return list(zip(ordem, ordem[1:] + ordem[:1]))


def poligono(rotulos, centro, raio_x, raio_y):
    vertices = {}
    for i, rotulo in enumerate(rotulos):
        angulo = -pi / 2 + 2 * pi * i / len(rotulos)
        vertices[rotulo] = (
            centro[0] + raio_x * cos(angulo),
            centro[1] + raio_y * sin(angulo),
        )
    return vertices


class Diagrama:
    def __init__(self, altura=330):
        self.imagem = Image.new("RGB", (760, altura), FUNDO)
        self.lapis = ImageDraw.Draw(self.imagem)
        for x in range(16, 760, 24):
            for y in range(16, altura, 24):
                self.lapis.circle((x, y), 1, fill="#dce3f4")

    def texto(self, ponto, texto, tamanho=25, cor=TEXTO, forte=True):
        self.lapis.text(ponto, texto, fill=cor, font=fonte(tamanho, forte), anchor="mm")

    def folha(self, ponto, texto, cor=INDIGO, fundo=BRANCO):
        x, y = ponto
        largura = self.lapis.textlength(texto, font=fonte(21, True)) / 2 + 10
        self.lapis.rounded_rectangle(
            (x - largura, y - 15, x + largura, y + 15), 8, fill=fundo
        )
        self.texto(ponto, texto, 21, cor)

    def no(self, ponto, rotulo, cor=None, raio=24):
        self.lapis.circle(ponto, raio, fill=cor or BRANCO, outline=cor or LINHA, width=3)
        self.texto(ponto, rotulo, 19 if len(rotulo) > 3 else 24, BRANCO if cor else TEXTO)

    def aresta(self, origem, destino, cor=LINHA, largura=3, seta=False, tracejada=False, raio=24):
        x, y = origem
        u, v = destino
        comprimento = hypot(u - x, v - y)
        dx, dy = (u - x) / comprimento, (v - y) / comprimento
        if tracejada:
            for i in range(raio, int(comprimento) - raio, 17):
                j = min(i + 8, comprimento - raio)
                self.lapis.line([(x + dx * i, y + dy * i), (x + dx * j, y + dy * j)],
                                fill=cor, width=largura)
            return
        ponta = (u - raio * dx, v - raio * dy) if seta else destino
        self.lapis.line([origem, ponta], fill=cor, width=largura)
        if seta:
            base_x, base_y = ponta[0] - 12 * dx, ponta[1] - 12 * dy
            self.lapis.polygon(
                [ponta, (base_x - 6 * dy, base_y + 6 * dx), (base_x + 6 * dy, base_y - 6 * dx)],
                fill=cor,
            )

    def grafo(self, vertices, arestas, destaque=(), nos=None, raio=24):
        marcadas = {frozenset(aresta) for aresta in destaque}
        for u, v in arestas:
            if frozenset((u, v)) not in marcadas:
                self.aresta(vertices[u], vertices[v])
        for u, v in destaque:
            self.aresta(vertices[u], vertices[v], cor=INDIGO, largura=5)
        for nome, ponto in vertices.items():
            self.no(ponto, nome, (nos or {}).get(nome), raio)

    def salvar(self, nome):
        self.imagem.save(SAIDA / f"{nome}.webp", lossless=True)


def hamiltonianos():
    k4 = {"1": (242, 73), "2": (518, 73), "3": (518, 257), "4": (242, 257)}
    arestas_k4 = list(combinations(k4, 2))
    contorno = ciclo(list(k4))
    figura = Diagrama()
    figura.grafo(k4, arestas_k4, contorno, {"1": INDIGO})
    for seta, ponto in [
        ("→", (380, 73)), ("↓", (518, 165)),
        ("←", (380, 257)), ("↑", (242, 165)),
    ]:
        figura.folha(ponto, seta)
    figura.salvar("hamilton")

    rotulos = list("123456")
    vertices = poligono(rotulos, (380, 165), 168, 112)
    figura = Diagrama()
    figura.grafo(vertices, ciclo(rotulos), pares("1-2 1-6"), {"1": INDIGO})
    figura.salvar("graus")

    vertices = {"a": (131, 94), "b": (131, 237), "c": (259, 165),
                "d": (501, 165), "e": (629, 94), "f": (629, 237)}
    figura = Diagrama()
    for ponta in vertices.values():
        figura.aresta((380, 165), ponta, tracejada=True)
    for grupo, cor, fundo in [
        ("abc", INDIGO, "#e9edff"), ("def", VERDE, "#e0f5f0"),
    ]:
        pontos = [vertices[nome] for nome in grupo]
        figura.lapis.polygon(pontos, fill=fundo)
        for u, v in combinations(pontos, 2):
            figura.aresta(u, v, cor=cor, largura=5)
        for ponto in pontos:
            figura.no(ponto, "", cor, 12)
    figura.no((380, 165), "p")
    figura.aresta((365, 180), (395, 150), AMBAR, 4)
    figura.texto((195, 286), "Componente 1", 23, INDIGO)
    figura.texto((565, 286), "Componente 2", 23, VERDE)
    figura.salvar("cortes")

    vertices = {"s": (380, 54), "u": (129, 124), "z": (631, 124),
                "v": (268, 260), "w": (492, 260)}
    rota = ciclo(list("svwuz"))
    figura = Diagrama()
    figura.grafo(vertices, list(combinations(vertices, 2)), rota, {"s": VERDE})
    for peso, ponto in [
        ("5", (324, 155)), ("6", (380, 260)), ("7", (219, 157)),
        ("7", (518, 124)), ("9", (507, 89)),
    ]:
        figura.folha(ponto, peso)
    figura.salvar("caixeiro")


def coloracoes():
    figura = Diagrama()
    vertices = {"1": (242, 73), "2": (518, 73), "3": (518, 257), "4": (242, 257)}
    figura.grafo(vertices, list(combinations(vertices, 2)), nos={str(k): c for k, c in PALETA.items()})
    figura.salvar("cores")

    figura = Diagrama(365)
    vertices = {
        "1": (157, 75), "2": (381, 57), "3": (620, 130), "4": (95, 180),
        "5": (270, 180), "6": (420, 172), "7": (540, 228), "8": (186, 292),
        "9": (346, 292), "0": (620, 292),
    }
    arestas = pares("1-2 1-3 1-5 1-6 1-8 2-3 2-7 2-9 3-6 3-9 3-0 4-0 4-8 4-9 5-7 5-8 5-9 6-9 7-0")
    grupos = [("179", PALETA[1]), ("345", PALETA[2]), ("0268", PALETA[3])]
    figura.grafo(vertices, arestas, pares("2-1 2-3 2-9"),
                 {nome: cor for grupo, cor in grupos for nome in grupo}, raio=21)
    for i, (_, cor) in enumerate(grupos, 1):
        figura.folha((205 + (i - 1) * 175, 337), f"Cor {i}", cor)
    figura.salvar("heuristicas-cores")

    figura = Diagrama(365)
    vertices = {"1": (380, 59), "2": (179, 299), "3": (581, 299), "4": (380, 219)}
    faces = [("124", "#e8edff"), ("134", "#e1f4ee"), ("234", "#fff0dc")]
    for grupo, cor in faces:
        figura.lapis.polygon([vertices[v] for v in grupo], fill=cor)
    figura.grafo(vertices, list(combinations(vertices, 2)))
    for ponto, texto in [
        ((318, 202), "Face 1"), ((447, 202), "Face 2"),
        ((380, 275), "Face 3"), ((614, 81), "Face externa"),
    ]:
        figura.texto(ponto, texto, 21)
    figura.salvar("planaridade")


def desenha_arvore(nome, vertices, ramos, rotulos, folhas):
    figura = Diagrama(394)
    for origem, esquerda, direita in ramos:
        for bit, destino in enumerate((esquerda, direita)):
            a, b = vertices[origem], vertices[destino]
            figura.aresta(a, b, cor=INDIGO, largura=4)
            figura.folha(((a[0] + b[0]) / 2, (a[1] + b[1]) / 2), str(bit))
    for vertice, ponto in vertices.items():
        figura.no(ponto, rotulos.get(vertice, vertice), VERDE if vertice in folhas else INDIGO)
    for vertice, texto in folhas.items():
        x, y = vertices[vertice]
        figura.folha((x, y + 41), texto, VERDE)
    figura.salvar(nome)


def arvores():
    desenha_arvore(
        "huffman",
        {"15": (299, 43), "6": (163, 127), "9": (488, 127),
         "o": (100, 218), "m": (224, 218), "4": (380, 218), "5": (612, 218),
         "e": (324, 310), "s": (436, 310), "espaço": (556, 310), "b": (668, 310)},
        [("15", "6", "9"), ("6", "o", "m"), ("9", "4", "5"),
         ("4", "e", "s"), ("5", "espaço", "b")],
        {"espaço": "esp."}, {"o": "3", "m": "3", "e": "2", "s": "2", "espaço": "2", "b": "3"},
    )
    desenha_arvore(
        "prefixos",
        {"11": (297, 43), "A": (152, 127), "6": (483, 127), "2": (366, 219), "4": (596, 219),
         "C": (310, 312), "D": (422, 312), "B": (540, 312), "R": (652, 312)},
        [("11", "A", "6"), ("6", "2", "4"), ("2", "C", "D"), ("4", "B", "R")],
        {}, {"A": "0", "C": "100", "D": "101", "B": "110", "R": "111"},
    )


def fluxos():
    caminho = ["s", "v1", "v3", "v2", "v4", "t"]
    vertices = {nome: (67 + i * 125, 112) for i, nome in enumerate(caminho)}
    figura = Diagrama(224)
    for (u, v), peso in zip(zip(caminho, caminho[1:]), [16, 12, 9, 14, 4], strict=True):
        a, b = vertices[u], vertices[v]
        cor = AMBAR if peso == 4 else INDIGO
        figura.aresta(a, b, cor=cor, largura=4, seta=True)
        figura.folha(((a[0] + b[0]) / 2, 81), str(peso), cor)
    for nome, ponto in vertices.items():
        figura.no(ponto, nome, VERDE if nome in {"s", "t"} else None)
    figura.texto((629, 176), "Gargalo", 22, AMBAR)
    figura.salvar("residual")

    figura = Diagrama()
    figura.lapis.rounded_rectangle((48, 27, 291, 304), 23, fill="#e9edff")
    figura.lapis.rounded_rectangle((487, 27, 711, 304), 23, fill="#e0f5f0")
    figura.aresta((382, 22), (382, 308), tracejada=True, raio=0)
    vertices = {"s": (109, 130), "v2": (109, 239), "v1": (234, 103),
                "v4": (234, 236), "v3": (626, 103), "t": (626, 236)}
    for u, v, peso, label in [
        ("v1", "v3", "12", (424, 103)), ("v4", "v3", "7", (424, 171)),
        ("v4", "t", "4", (424, 236)),
    ]:
        figura.aresta(vertices[u], vertices[v], INDIGO, 4, seta=True)
        figura.folha(label, peso)
    for nome, ponto in vertices.items():
        figura.no(ponto, nome, INDIGO if ponto[0] < 382 else VERDE)
    figura.texto((79, 57), "S", 24, INDIGO)
    figura.texto((519, 57), "T", 24, VERDE)
    figura.salvar("mincorte")


def conjuntos():
    periferia = list("abcdeg")
    roda = {"a": (295, 66), "b": (465, 66), "c": (550, 165),
            "d": (465, 264), "e": (295, 264), "g": (210, 165), "f": (380, 165)}
    raios = [("f", vertice) for vertice in periferia]
    figura = Diagrama()
    figura.grafo(roda, ciclo(periferia) + raios, pares("a-b c-d e-g"),
                 {nome: VERDE for nome in "ace"})
    figura.salvar("independentes")

    figura = Diagrama()
    figura.grafo(roda, ciclo(periferia) + raios, raios, {"f": INDIGO})
    figura.salvar("dominantes")

    figura = Diagrama()
    clique = list("2367")
    vertices = {"8": (218, 58), "1": (380, 58), "2": (218, 163), "3": (380, 163),
                "4": (542, 163), "7": (218, 268), "6": (380, 268), "5": (542, 268)}
    destaques = list(combinations(clique, 2))
    arestas = pares("8-1 8-2 8-3 1-3 1-4 3-4 3-5 4-5 4-6") + destaques
    figura.grafo(vertices, arestas, destaques, {nome: INDIGO for nome in clique})
    figura.salvar("cliques")

    figura = Diagrama()
    for centro, arestas, titulo in [
        (198, pares("1-2 4-5"), "Maximal · 2 arestas"),
        (562, pares("1-6 2-3 4-5"), "Máximo · 3 arestas"),
    ]:
        vertices = {"1": (centro-60, 62), "2": (centro+60, 62), "3": (centro+121, 150),
                    "4": (centro+60, 238), "5": (centro-60, 238), "6": (centro-121, 150)}
        figura.grafo(vertices, ciclo(list("123456")) + pares("1-4 2-5"), arestas,
                     {nome: INDIGO for par in arestas for nome in par}, raio=20)
        figura.texto((centro, 288), titulo, 22)
    figura.salvar("casamento")


def alocacao():
    custos = [[3, 5, 6], [5, 4, 2], [2, 3, 4]]
    por_linhas = [[valor - min(linha) for valor in linha] for linha in custos]
    minimos = [min(coluna) for coluna in zip(*por_linhas)]
    reduzida = [[valor - minimo for valor, minimo in zip(linha, minimos)] for linha in por_linhas]
    escolhidos = {(0, 0), (1, 2), (2, 1)}
    figura = Diagrama(288)
    for cx, matriz, titulo in [
        (132, custos, "Custos originais"), (380, por_linhas, "Após linhas"),
        (628, reduzida, "Após colunas"),
    ]:
        figura.texto((cx, 42), titulo, 23)
        figura.lapis.rounded_rectangle((cx - 89, 66, cx + 89, 242), 15, fill=BRANCO, outline=LINHA, width=2)
        for i, linha in enumerate(matriz):
            for j, valor in enumerate(linha):
                x, y = cx + (j - 1) * 53, 101 + i * 53
                selecionado = matriz is reduzida and (i, j) in escolhidos
                if selecionado:
                    figura.lapis.rounded_rectangle((x - 24, y - 22, x + 24, y + 22), 8, fill=INDIGO)
                figura.texto((x, y), str(valor), 29, BRANCO if selecionado else TEXTO)
    for x in (256, 504):
        figura.texto((x, 155), "→", 36, INDIGO)
    figura.salvar("alocacao")


if __name__ == "__main__":
    SAIDA.mkdir(parents=True, exist_ok=True)
    hamiltonianos()
    coloracoes()
    arvores()
    fluxos()
    conjuntos()
    alocacao()
