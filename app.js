const principal = document.querySelector('#principal');
const todosTopicos = aulas.flatMap(aula => aula.topicos);
const indiceAulas = new Map(aulas.map(aula => [aula.id, aula]));
const chaveProgresso = 'estudio-de-grafos.v1';
const tentativas = new Map();
const catalogosProgresso = {
  topicos: todosTopicos, exercicios, slides: slidesHamilton, laboratorios: catalogoLaboratorios,
  questoes: questoesOficiais, videoaulas
};
let persistenciaDisponivel = true;

function carregarProgresso() {
  let dados = {};
  try {
    dados = JSON.parse(localStorage.getItem(chaveProgresso)) || {};
  } catch { /* Um histórico ilegível é tratado como vazio. */ }
  return Object.fromEntries(Object.entries(catalogosProgresso).map(([campo, catalogo]) => {
    const ids = Array.isArray(dados[campo]) ? dados[campo] : [];
    return [campo, [...new Set(ids.filter(id => catalogo.some(item => item.id === id)))]];
  }));
}

let progresso = carregarProgresso();

function registrar(tipo, id) {
  const salvo = carregarProgresso();
  for (const campo of Object.keys(catalogosProgresso)) {
    progresso[campo] = [...new Set([...salvo[campo], ...progresso[campo]])];
  }
  if (!progresso[tipo].includes(id)) progresso[tipo].push(id);
  try {
    localStorage.setItem(chaveProgresso, JSON.stringify(progresso));
  } catch {
    persistenciaDisponivel = false;
  }
}

function html(texto) {
  const entidades = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' };
  return String(texto).replace(/[&<>"']/g, caractere => entidades[caractere]);
}

const linkTeoria = (aula, id) => '#teoria/' + aula + '/' + id;
const linkPratica = id => '#pratica/' + id;
const paginaPDF = (aula, pagina, lista = false) => 'fontes/' + (lista ? 'lista-' : 'aula-') + aula + '.pdf' + (pagina ? '#page=' + pagina : '');
const arquivoPDF = (aula, pagina, texto, lista = false) =>
  '<a class="fonte-link" target="_blank" rel="noopener" href="' + paginaPDF(aula, pagina, lista) + '">' + html(texto) + ' <span aria-hidden="true">↗</span></a>';

function cabecalho(titulo, descricao) {
  return '<header class="cabecalho"><h1>' + html(titulo) + '</h1><p>' + html(descricao) + '</p></header>';
}

function medidor(feitos, total, rotulo) {
  return '<progress aria-label="' + html(rotulo) + '" value="' + feitos + '" max="' + total + '"></progress>';
}

function cartaoAula(aula) {
  const feitos = aula.topicos.filter(topico => progresso.topicos.includes(topico.id)).length;
  return `<a class="aula-card" href="${linkTeoria(aula.id, aula.topicos[0].id)}">
    <div class="aula-topo"><span aria-hidden="true" class="aula-icone ${aula.cor}">${aula.simbolo}</span>
      <span class="aula-num">Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span><span class="seta" aria-hidden="true">↗</span></div>
    <h3>${html(aula.titulo)}</h3><p>${html(aula.resumo)}</p>
    <div class="aula-medidor">${medidor(feitos, aula.topicos.length, 'Tópicos de ' + aula.titulo)}<span>${feitos}/${aula.topicos.length}</span></div>
  </a>`;
}

function inicio() {
  const estudados = progresso.topicos.length;
  const resolvidos = progresso.exercicios.length;
  const primeira = aulas.find(aula => aula.topicos.some(t => !progresso.topicos.includes(t.id)));
  const proximo = primeira?.topicos.find(t => !progresso.topicos.includes(t.id));
  const link = proximo ? linkTeoria(primeira.id, proximo.id) : '#teoria';
  const acao = estudados === 0 ? 'Começar revisão' : proximo ? 'Continuar revisão' : 'Rever teoria';
  const slidePendente = slidesHamilton.find(slide => !progresso.slides.includes(slide.id));
  return `<section class="hero" aria-labelledby="titulo-inicio">
    <div class="hero-texto">
      <p class="sobrelinha">Preparação para a prova</p>
      <h1 id="titulo-inicio">Sua revisão de grafos</h1>
      <p>Revise os slides do professor e resolva questões da lista, passo a passo.</p>
      <div class="acoes"><a class="botao botao-branco" href="${linkSlideHamilton(slidePendente?.id)}">Slides 20 a 27</a>
      <a class="botao hero-secundario" href="${link}">${acao} <span aria-hidden="true">→</span></a>
      <a class="botao hero-secundario" href="#pratica">Todas as listas</a></div>
    </div>
    <div class="grafo-hero" aria-hidden="true">
      <span class="aresta lado topo"></span><span class="aresta lado base"></span><span class="aresta lado esq"></span><span class="aresta lado dir"></span>
      <span class="aresta diagonal diagonal-1"></span><span class="aresta diagonal diagonal-2"></span>
      <span class="peso peso-12">39</span><span class="peso peso-13">41</span><span class="peso peso-24">58</span><span class="peso peso-34">32</span>
      <span class="peso peso-14">73</span><span class="peso peso-23">82</span>
      <span class="no no-1">1</span><span class="no no-2">2</span><span class="no no-3">3</span><span class="no no-4">4</span>
    </div>
  </section>
  <section aria-labelledby="titulo-progresso" class="secao">
    <div class="secao-topo"><h2 id="titulo-progresso">Seu progresso</h2></div>
    <div class="progresso-grid">
      <article class="painel numero-card"><div><span class="aula-icone indigo" aria-hidden="true">▤</span><h3>Tópicos estudados</h3></div>
        <p><strong>${estudados}</strong> / ${todosTopicos.length}</p>${medidor(estudados, todosTopicos.length, 'Tópicos estudados')}</article>
      <article class="painel numero-card"><div><span class="aula-icone teal" aria-hidden="true">✓</span><h3>Exercícios resolvidos</h3></div>
        <p><strong>${resolvidos}</strong> / ${exercicios.length}</p>${medidor(resolvidos, exercicios.length, 'Exercícios resolvidos')}</article>
      <article class="painel numero-card"><div><span class="aula-icone slate" aria-hidden="true">✎</span><h3>Questões revisadas</h3></div>
        <p><strong>${progresso.questoes.length}</strong> / ${questoesOficiais.length}</p>${medidor(progresso.questoes.length, questoesOficiais.length, 'Questões revisadas')}</article>
      <article class="painel numero-card"><div><span class="aula-icone orange" aria-hidden="true">▤</span><h3>Slides 20–27</h3></div>
        <p><strong>${progresso.slides.length}</strong> / ${slidesHamilton.length}</p>${medidor(progresso.slides.length, slidesHamilton.length, 'Slides prioritários revisados')}</article>
      <article class="painel numero-card"><div><span class="aula-icone violet" aria-hidden="true">⌘</span><h3>Laboratórios concluídos</h3></div>
        <p><strong>${progresso.laboratorios.length}</strong> / ${catalogoLaboratorios.length}</p>${medidor(progresso.laboratorios.length, catalogoLaboratorios.length, 'Laboratórios concluídos')}</article>
    </div>
  </section>
  <section aria-labelledby="titulo-aulas" class="secao">
    <div class="secao-topo"><h2 id="titulo-aulas">Aulas</h2>
      <div class="acoes"><a href="#videoaulas">Ver videoaulas <span aria-hidden="true">→</span></a>
      <a href="#teoria">Ver sumário <span aria-hidden="true">→</span></a></div></div>
    <div class="aulas-grid">${aulas.map(cartaoAula).join('')}</div>
  </section>`;
}

function sumario() {
  return cabecalho('Teoria', 'Escolha um tópico para ver o raciocínio, o diagrama e as contas passo a passo.') +
    '<div class="sumario">' + aulas.map(aula => `<section class="painel bloco-aula">
      <div class="bloco-titulo"><span class="aula-icone ${aula.cor}" aria-hidden="true">${aula.simbolo}</span>
        <div><span class="aula-num">Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span><h2>${html(aula.titulo)}</h2></div></div>
      <ul class="lista-topicos">${aula.topicos.map(t => `<li><a href="${linkTeoria(aula.id, t.id)}"><span>${html(t.titulo)}</span>
        <span class="estado">${progresso.topicos.includes(t.id) ? '✓ Estudado' : '→'}</span></a></li>`).join('')}</ul>
      ${aula.id === '05' ? `<a class="botao primario acesso-trilha" href="${linkSlideHamilton()}">Revisar slides 20 a 27 →</a>` : ''}
      ${Object.hasOwn(listasOficiais, aula.id) ? `<a class="fonte-link acesso-trilha" href="${linkListaOficial(aula.id)}">Praticar lista da Aula ${aula.id} →</a>` : ''}
    </section>`).join('') + '</div>';
}

function mostrarExemplo(aula, topico) {
  const exemplo = topico.exemplo || exemplosResolvidos[topico.id];
  const paginas = exemplo.paginas || exemplo.pagina;
  const fonte = arquivoPDF(aula.id, exemplo.pagina, 'Aula ' + aula.id + ' · p. ' + paginas);
  return `<section class="exemplo-resolvido" aria-labelledby="titulo-exemplo">
    <h2 id="titulo-exemplo">Exemplo resolvido</h2>
    <h3>${html(exemplo.titulo)}</h3>
    ${exemplo.alt ? `<figure class="diagrama-exemplo">
      <img src="figuras/diagramas/${topico.id}.webp" alt="${html(exemplo.alt)}">
      <figcaption>Redesenho do exemplo da ${fonte}</figcaption>
    </figure>` : `<p class="legenda">Fonte do exemplo · ${fonte}</p>`}
    <ol class="etapas-calculo">
      ${exemplo.etapas.map(([titulo, explicacao, conta]) => `<li>
        <h4>${html(titulo)}</h4>
        <p>${html(explicacao)}</p>
        <p class="conta">${html(conta)}</p>
      </li>`).join('')}
    </ol>
  </section>`;
}

function lerTopico(aula, topico) {
  const estudado = progresso.topicos.includes(topico.id);
  const lista = aula.topicos;
  const proximo = lista[lista.indexOf(topico) + 1];
  const laboratorio = catalogoLaboratorios.find(lab => lab.aula === aula.id);
  const video = videoaulas.find(item => item.aula === aula.id && item.topicos.includes(topico.id));
  return `<div class="trilha"><a href="#teoria">Teoria</a><span>/</span><span>Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span></div>
  ${cabecalho(topico.titulo, aula.titulo)}
  <div class="leitura-grid">
    <article class="painel leitura">
      <h2>Como raciocinar</h2>
      <ol class="raciocinio">${topico.pontos.map(ponto => '<li>' + html(ponto) + '</li>').join('')}</ol>
      ${mostrarExemplo(aula, topico)}
      <h2>Slide original</h2>
      <figure>
        <img class="slide" src="figuras/${topico.figura}.webp" alt="${html(topico.alt)}">
        <figcaption>${html(topico.legenda)}</figcaption>
      </figure>
      ${arquivoPDF(aula.id, topico.pagina, 'Slides da Aula ' + aula.id + ' · p. ' + topico.paginas)}
      <div class="acoes rodape">
        <button type="button" class="botao ${estudado ? 'secundario' : 'primario'}" data-estudar="${topico.id}" ${estudado ? 'disabled' : ''}>${estudado ? 'Estudado' : 'Marcar como estudado'}</button>
        ${topico.treino ? '<a class="botao secundario" href="' + linkPratica(topico.treino) + '">Praticar tópico <span aria-hidden="true">→</span></a>' : ''}
        ${proximo ? '<a class="botao secundario" href="' + linkTeoria(aula.id, proximo.id) + '">Próximo tópico</a>' : ''}
      </div>
      <p class="aviso" role="status">${persistenciaDisponivel ? '' : 'O navegador bloqueou o armazenamento. O progresso vale para esta sessão.'}</p>
    </article>
    <aside class="painel nesta-aula"><h2>Nesta aula</h2><ul class="lista-topicos">
      ${lista.map(t => `<li><a href="${linkTeoria(aula.id, t.id)}" ${t.id === topico.id ? 'aria-current="page"' : ''}><span>${html(t.titulo)}</span>${progresso.topicos.includes(t.id) ? '<span aria-label="Estudado" class="estado">✓</span>' : ''}</a></li>`).join('')}
    </ul><div class="atalhos-leitura">
      ${aula.id === '05' ? `<a class="fonte-link" href="${linkSlideHamilton()}">Revisar slides 20 a 27 →</a>` : ''}
      ${video ? `<a class="fonte-link" href="${linkVideoaula(video.id)}">Assistir à videoaula →</a>` : ''}
      ${Object.hasOwn(listasOficiais, aula.id) ? `<a class="fonte-link" href="${linkListaOficial(aula.id)}">Ver todos os exercícios da aula →</a>` : ''}
      <a class="fonte-link" href="${linkLaboratorio(laboratorio.id)}">Abrir laboratório da aula →</a>
    </div></aside>
  </div>`;
}

function campoHTML(campo) {
  const id = 'resposta-' + campo.nome;
  const controle = campo.opcoes ? `<select required id="${id}" name="${campo.nome}">
    <option value="">Selecione…</option>${campo.opcoes.map(opcao => {
      const { valor, texto } = typeof opcao === 'string' ? { valor: opcao, texto: opcao } : opcao;
      return '<option value="' + html(valor) + '">' + html(texto) + '</option>';
    }).join('')}</select>` : `<input required ${campo.numerica ? 'type="number" min="0" step="1" inputmode="numeric"' : 'type="text"'} id="${id}" name="${campo.nome}" placeholder="${html(campo.exemplo)}" autocomplete="off">`;
  return '<div class="campo"><label for="' + id + '">' + html(campo.rotulo) + '</label>' + controle + '</div>';
}

function feedbackHTML(resultado) {
  return resultado ? `<div class="feedback ${resultado.tipo}"><strong>${resultado.tipo === 'erro' ? 'Revise este passo' : resultado.concluido ? 'Exercício concluído' : 'Passo conferido'}</strong><p>${html(resultado.mensagem)}</p></div>` : '';
}

function painelPratica(exercicio, tentativa) {
  if (!tentativa) return `<section class="painel etapa"><h2>Antes de tentar</h2><p>${html(exercicio.preparo)}</p>
    <button type="button" class="botao primario" data-iniciar="${exercicio.id}">Começar exercício <span aria-hidden="true">→</span></button></section>`;

  const resposta = tentativa.resultado;
  if (resposta?.concluido) return `<section class="painel etapa"><div role="status">${feedbackHTML(resposta)}</div>
    ${resposta.resumo.length ? '<ul class="dados">' + resposta.resumo.map(item => '<li>' + html(item) + '</li>').join('') + '</ul>' : ''}
    ${persistenciaDisponivel ? '' : '<p class="aviso">O navegador bloqueou o armazenamento. O progresso vale para esta sessão.</p>'}
    <div class="acoes"><a class="botao primario" href="#pratica">Ver exercícios</a><button type="button" class="botao secundario" data-iniciar="${exercicio.id}">Refazer</button></div></section>`;

  const passo = tutores[exercicio.id].pergunta(tentativa.estado);
  return `<section class="painel etapa">
    <p class="sobretitulo">Passo ${tentativa.passo}</p><h2 tabindex="-1" id="passo-titulo">${html(passo.titulo)}</h2>
    <p>${html(passo.enunciado)}</p>
    ${passo.detalhes?.length ? '<ul class="dados">' + passo.detalhes.map(item => '<li>' + html(item) + '</li>').join('') + '</ul>' : ''}
    <form data-resolver="${exercicio.id}">
      <div class="campos">${passo.campos.map(campoHTML).join('')}</div>
      <button class="botao primario" type="submit">Conferir passo</button>
    </form>
    <div id="retorno" role="status">${feedbackHTML(resposta)}</div>
    <details class="dica"><summary>Ver dica</summary><p>${html(passo.dica)}</p></details>
  </section>`;
}

function praticar(exercicio) {
  const idOficial = Object.keys(guiasOficiais).find(id => guiasOficiais[id][0] === exercicio.id);
  const questao = indiceQuestoes.get(idOficial);
  return `<div class="trilha"><a href="#pratica">Prática</a><span>/</span><span>Aula ${exercicio.aula} · Questão ${html(exercicio.numero)}</span></div>
    ${cabecalho(exercicio.titulo, progresso.exercicios.includes(exercicio.id) ? '✓ Exercício já resolvido' : 'Exercício da lista oficial')}
    <div class="pratica-grid">
      <section class="painel enunciado"><h2>Enunciado</h2><p>${html(exercicio.enunciado)}</p>
        ${exercicio.figura ? `<figure class="figura-questao"><img src="figuras/${exercicio.figura}.webp" alt="${html(exercicio.alt)}"><figcaption>Figura da lista oficial</figcaption></figure>` : ''}
        ${arquivoPDF(exercicio.aula, exercicio.pagina, 'Lista da Aula ' + exercicio.aula + ' · p. ' + exercicio.pagina, true)}
        <a class="fonte-link" href="${linkTeoria(exercicio.aula, exercicio.topico)}">Consultar teoria <span aria-hidden="true">→</span></a>
        ${questao ? `<a class="fonte-link" href="${linkListaOficial(questao.aula, questao.numero)}">Ver a questão completa →</a>` : ''}
      </section>
      ${painelPratica(exercicio, tentativas.get(exercicio.id))}
    </div>`;
}

function material() {
  return cabecalho('Material da disciplina', 'Consulte os slides e as listas originais.') +
    '<div class="sumario">' + aulas.map(aula => `<section class="painel bloco-aula">
      <div class="bloco-titulo"><span class="aula-icone ${aula.cor}" aria-hidden="true">${aula.simbolo}</span>
      <div><span class="aula-num">Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span><h2>${html(aula.titulo)}</h2></div></div>
      ${arquivoPDF(aula.id, null, 'Slides da aula')}${aula.id === '12' ? '<p class="legenda">Os exercícios do material extra estão nos slides.</p>' : `<a class="fonte-link" href="${linkListaOficial(aula.id)}">Lista no site →</a>${arquivoPDF(aula.id, null, 'PDF da lista', true)}`}
      </section>`).join('') + '</div>';
}

function mostrarPagina() {
  salvarPosicaoVideo(principal.querySelector('[data-videoaula]'));
  const [secao, id, topicoId, slideId] = location.hash.slice(1).split('/');
  const aula = indiceAulas.get(id);
  const topico = aula?.topicos.find(item => item.id === topicoId);
  const exercicio = exercicios.find(item => item.id === id);
  const questao = id === 'lista' ? indiceQuestoes.get(topicoId + '/' + slideId) : null;
  const paginas = {
    inicio, teoria: () => id === '05' && topicoId === 'slides' ? paginaTrilhaHamilton(slideId)
      : topico ? lerTopico(aula, topico) : sumario(),
    pratica: () => exercicio ? praticar(exercicio) : questao ? paginaQuestaoOficial(questao) : paginaListasOficiais(topicoId),
    laboratorios: () => paginaLaboratorio(id), videoaulas: () => paginaVideoaula(id), fontes: material
  };
  const pagina = Object.hasOwn(paginas, secao) ? secao : 'inicio';

  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === pagina) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  document.querySelector('#atalhos').innerHTML = '<p>Aulas</p>' + aulas.map(item => `<a href="${linkTeoria(item.id, item.topicos[0].id)}">
    <span class="atalho-num ${item.cor}">${item.id}</span><span>${html(item.titulo)}</span></a>`).join('');
  principal.innerHTML = paginas[pagina]();
  montarPlayerVideoaula();
}

function atualizarEtapa(id) {
  const exercicio = exercicios.find(item => item.id === id);
  document.querySelector('.etapa').outerHTML = painelPratica(exercicio, tentativas.get(id));
  const foco = document.querySelector('#passo-titulo, .etapa .acoes a');
  foco?.focus({ preventScroll: true });
}

principal.addEventListener('click', evento => {
  const botao = evento.target.closest('button');
  if (!botao) return;
  if (botao.dataset.revisarQuestao) {
    concluirRevisaoOficial(botao);
    return;
  }
  if (botao.dataset.labAcao) {
    operarLaboratorio(botao);
    return;
  }
  if (botao.dataset.estudar) {
    registrar('topicos', botao.dataset.estudar);
    botao.textContent = 'Estudado';
    botao.classList.replace('primario', 'secundario');
    botao.disabled = true;
    const selecionado = document.querySelector('.nesta-aula [aria-current="page"]');
    selecionado?.insertAdjacentHTML('beforeend', '<span aria-label="Estudado" class="estado">✓</span>');
    document.querySelector('.aviso').textContent = persistenciaDisponivel ? 'Tópico marcado como estudado.' : 'Progresso registrado para esta sessão.';
  }
  const id = botao.dataset.iniciar;
  if (id) {
    tentativas.set(id, { estado: tutores[id].iniciar(), passo: 1, resultado: null });
    atualizarEtapa(id);
  }
});

principal.addEventListener('submit', evento => {
  if (evento.target.dataset.checagem !== undefined) {
    evento.preventDefault();
    conferirResultadoOficial(evento.target);
    return;
  }
  if (evento.target.dataset.quizSlide) {
    evento.preventDefault();
    conferirSlide(evento.target);
    return;
  }
  const id = evento.target.dataset.resolver;
  if (!id) return;
  evento.preventDefault();
  const tentativa = tentativas.get(id);
  const resultado = tutores[id].conferir(tentativa.estado, Object.fromEntries(new FormData(evento.target)));
  tentativa.resultado = resultado;
  if (resultado.tipo === 'erro') {
    document.querySelector('#retorno').innerHTML = feedbackHTML(resultado);
    return;
  }
  tentativa.passo++;
  if (resultado.concluido) registrar('exercicios', id);
  atualizarEtapa(id);
});

principal.addEventListener('input', evento => {
  if (evento.target.dataset.rascunho) salvarRascunho(evento.target);
});

document.querySelector('.pular').addEventListener('click', evento => {
  evento.preventDefault();
  principal.focus();
});
window.addEventListener('hashchange', () => {
  mostrarPagina();
  window.scrollTo(0, 0);
  principal.focus({ preventScroll: true });
});
window.addEventListener('storage', evento => {
  if (evento.key === chaveProgresso) {
    progresso = carregarProgresso();
    if (!/^#(pratica|videoaulas)\//.test(location.hash)) mostrarPagina();
  }
});
window.addEventListener('pagehide', () => salvarPosicaoVideo(principal.querySelector('[data-videoaula]')));

mostrarPagina();
