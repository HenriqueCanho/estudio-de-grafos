const listasOficiais = { '05': questoes05, '06': questoes06, '07': questoes07, '08': questoes08 };
const guiasOficiais = {
  '05/4': ['circuito', 'Abrir resolução guiada'],
  '05/5': ['vizinho', 'Praticar o primeiro grafo passo a passo'],
  '06/2': ['coloracao', 'Praticar o item (b) passo a passo'],
  '07/10': ['huffman', 'Abrir resolução guiada'],
  '08/1': ['fluxo', 'Abrir resolução guiada']
};
const questoesOficiais = Object.entries(listasOficiais).flatMap(([aula, lista]) =>
  lista.map(questao => ({ ...questao, id: aula + '/' + questao.numero, aula })));
const indiceQuestoes = new Map(questoesOficiais.map(questao => [questao.id, questao]));
const rascunhosDaSessao = new Map();
const linkListaOficial = (aula, numero) => '#pratica/lista/' + aula + (numero ? '/' + numero : '');
const chaveRascunho = id => 'estudio-de-grafos.rascunho.v1.' + id;

function buscarRascunho(id) {
  try {
    return rascunhosDaSessao.get(id) ?? localStorage.getItem(chaveRascunho(id)) ?? '';
  } catch {
    return rascunhosDaSessao.get(id) ?? '';
  }
}

function salvarRascunho(campo) {
  const id = campo.dataset.rascunho;
  const aviso = document.querySelector('#estado-rascunho');
  rascunhosDaSessao.set(id, campo.value);
  try {
    if (campo.value) localStorage.setItem(chaveRascunho(id), campo.value);
    else localStorage.removeItem(chaveRascunho(id));
    aviso.textContent = campo.value ? 'Rascunho salvo neste navegador.' : 'Rascunho apagado.';
  } catch {
    aviso.textContent = 'Rascunho disponível nesta sessão.';
  }
}

function listaDeUmaAula(aula, total, ativa) {
  const revisadas = progresso.questoes.filter(id => id.startsWith(aula.id + '/')).length;
  return `<a class="aula-card lista-oficial-card" href="${linkListaOficial(aula.id)}" ${ativa ? 'aria-current="page"' : ''}>
    <div class="aula-topo"><span class="aula-icone ${aula.cor}" aria-hidden="true">${aula.simbolo}</span>
      <span class="aula-num">Aula ${aula.id}</span></div>
    <h3>${html(aula.titulo)}</h3><p>${revisadas} de ${total} revisadas</p>
    ${medidor(revisadas, total, 'Questões revisadas da Aula ' + aula.id)}
  </a>`;
}

function paginaListasOficiais(aulaId) {
  const lista = Object.hasOwn(listasOficiais, aulaId) ? listasOficiais[aulaId] : null;
  const aula = indiceAulas.get(aulaId);
  const selecao = Object.entries(listasOficiais).map(([id, itens]) => listaDeUmaAula(indiceAulas.get(id), itens.length, id === aulaId)).join('');
  return `${cabecalho('Listas de exercícios', questoesOficiais.length + ' questões das quatro listas oficiais, com figuras, pistas e espaço para resolver.')}
    <nav class="listas-oficiais-nav" aria-label="Listas por aula">${selecao}</nav>
    ${lista ? `<section class="secao" aria-labelledby="titulo-lista">
      <div class="secao-topo"><h2 id="titulo-lista">${html(aula.titulo)}</h2>
        ${arquivoPDF(aula.id, null, 'PDF da lista completa', true)}</div>
      <div class="questoes-oficiais-grid">${lista.map(questao => {
        const id = aula.id + '/' + questao.numero;
        const revisada = progresso.questoes.includes(id);
        return `<a class="painel questao-card" href="${linkListaOficial(aula.id, questao.numero)}">
          <span class="aula-icone ${aula.cor}" aria-hidden="true">${questao.numero}</span>
          <div><span class="aula-num">Questão ${questao.numero}</span><h3>${html(questao.titulo)}</h3></div>
          <span class="estado">${revisada ? '✓ Revisada' : '→'}</span>
        </a>`;
      }).join('')}</div>
    </section>` : ''}`;
}

function camposDeConferencia(questao) {
  if (!questao.checagens?.length) return '';
  return `<section class="checagens-questao">
    <h3>Conferir resultados</h3>
    <p>Teste os resultados abaixo e use a lista de conferência para revisar a justificativa.</p>
    ${questao.checagens.map((checagem, i) => `<form data-checagem="${i}" class="checagem-questao">
      <div class="campo"><label for="checagem-${i}">${html(checagem.rotulo)}</label>
        <input id="checagem-${i}" name="valor" type="text" ${checagem.tipo === 'numero' ? 'inputmode="decimal"' : ''}
          required maxlength="160" autocomplete="off" spellcheck="false"></div>
      <button class="botao secundario" type="submit">Conferir</button>
      <div class="resposta-checagem" role="status"></div>
    </form>`).join('')}
  </section>`;
}

function paginaQuestaoOficial(questao) {
  const aula = indiceAulas.get(questao.aula);
  const guia = guiasOficiais[questao.id];
  const revisada = progresso.questoes.includes(questao.id);
  const rascunho = buscarRascunho(questao.id);
  const total = listasOficiais[aula.id].length;
  return `<div class="trilha"><a href="#pratica">Prática</a><span>/</span>
    <a href="${linkListaOficial(aula.id)}">Lista da Aula ${aula.id}</a><span>/</span><span>Questão ${questao.numero}</span></div>
    ${cabecalho(questao.titulo, 'Questão ' + questao.numero + ' de ' + total + ' · ' + aula.titulo)}
    <div class="questao-oficial-grid" data-questao-oficial="${questao.id}">
      <article class="painel enunciado enunciado-oficial">
        <h2>Enunciado</h2><p>${html(questao.enunciado)}</p>
        ${questao.paginas.map((pagina, i) => {
          const imagem = 'figuras/questoes/' + aula.id + '/' + questao.numero + '-' + (i + 1) + '.webp';
          return `<figure class="recorte-questao">
            <a href="${imagem}" target="_blank" rel="noopener" aria-label="Ampliar o recorte da página ${pagina}">
              <img src="${imagem}" alt="Recorte original da questão ${questao.numero}, página ${pagina} da Lista ${aula.id}.">
            </a><figcaption>${arquivoPDF(aula.id, pagina, 'Questão no PDF · p. ' + pagina, true)}</figcaption>
          </figure>`;
        }).join('')}
        ${questao.observacao ? `<aside class="nota-fonte"><h3>Observação sobre o enunciado</h3><p>${html(questao.observacao)}</p></aside>` : ''}
      </article>
      <section class="painel etapa caderno-questao" aria-labelledby="titulo-caderno">
        <h2 id="titulo-caderno">Resolva no seu ritmo</h2>
        <a class="fonte-link" href="${linkTeoria(aula.id, questao.topico)}">Consultar teoria →</a>
        ${guia ? `<div class="acoes"><a class="botao secundario" href="${linkPratica(guia[0])}">${html(guia[1])} →</a></div>` : ''}
        <details class="dica"><summary>Ver uma pista</summary><p>${html(questao.pista)}</p></details>
        <div class="campo campo-rascunho">
          <label for="rascunho-questao">Seu rascunho</label>
          <textarea id="rascunho-questao" rows="6" maxlength="16000" data-rascunho="${questao.id}"
            placeholder="Anote as etapas, justificativas e contas.">${html(rascunho)}</textarea>
          <p class="aviso" id="estado-rascunho" role="status">${rascunho ? 'Rascunho carregado.' : ''}</p>
        </div>
        ${camposDeConferencia(questao)}
        <details class="dica conferencia-questao">
          <summary>Revisar a solução depois de tentar</summary>
          <ol>${questao.conferencia.map(passo => '<li>' + html(passo) + '</li>').join('')}</ol>
        </details>
        <div class="acoes rodape"><button type="button" class="botao ${revisada ? 'secundario' : 'primario'}"
          data-revisar-questao="${questao.id}" ${revisada ? 'disabled' : ''}>${revisada ? 'Questão revisada' : 'Marcar como revisada'}</button></div>
      </section>
    </div>
    <div class="acoes navegacao-trilha">
      ${questao.numero > 1 ? `<a class="botao secundario" href="${linkListaOficial(aula.id, questao.numero - 1)}">← Questão ${questao.numero - 1}</a>` : ''}
      ${questao.numero < total ? `<a class="botao primario" href="${linkListaOficial(aula.id, questao.numero + 1)}">Questão ${questao.numero + 1} →</a>` : ''}
      <a class="botao secundario" href="${linkListaOficial(aula.id)}">Ver todas da Aula ${aula.id}</a>
    </div>`;
}

function formasNumericas(valor) {
  const texto = String(valor).trim().replace(/%$/, '').replace(/\s/g, '').replace('−', '-');
  const agrupado = /^[+-]?\d{1,3}(?:\.\d{3})+(?:,\d+)?$/.test(texto);
  const formas = agrupado ? [texto, texto.replaceAll('.', '')] : [texto];
  return formas.flatMap(forma => {
    const partes = /^([+-]?)(\d+)(?:[.,](\d+))?$/.exec(forma);
    if (!partes) return [];
    const [, sinal, inteiro, decimal = ''] = partes;
    const principal = inteiro.replace(/^0+(?=\d)/, '');
    const fracao = decimal.replace(/0+$/, '');
    const negativo = sinal === '-' && (principal !== '0' || fracao);
    return [(negativo ? '-' : '') + principal + (fracao ? '.' + fracao : '')];
  });
}

function formaTextual(valor) {
  return String(valor).trim().normalize('NFC').toLocaleLowerCase('pt-BR').replace(/\s+/g, '');
}

function conferirResultadoOficial(formulario) {
  const questao = indiceQuestoes.get(formulario.closest('[data-questao-oficial]').dataset.questaoOficial);
  const checagem = questao.checagens[Number(formulario.dataset.checagem)];
  const valor = new FormData(formulario).get('valor');
  let acerto;
  if (checagem.tipo === 'numero') {
    const obtidos = formasNumericas(valor);
    const esperados = checagem.respostas.flatMap(resposta => formasNumericas(resposta).slice(0, 1));
    acerto = obtidos.some(forma => esperados.includes(forma));
  } else {
    acerto = checagem.respostas.some(resposta => formaTextual(resposta) === formaTextual(valor));
  }
  const mensagem = acerto ? 'Resultado confere.' : checagem.dica;
  formulario.querySelector('[role="status"]').innerHTML = feedbackHTML(acerto ? correto(mensagem) : incorreto(mensagem));
}

function concluirRevisaoOficial(botao) {
  registrar('questoes', botao.dataset.revisarQuestao);
  botao.textContent = persistenciaDisponivel ? 'Questão revisada' : 'Questão revisada nesta sessão';
  botao.classList.replace('primario', 'secundario');
  botao.disabled = true;
}
