const catalogoLaboratorios = [
  { id: 'ciclos', aula: '05', topico: 'hamilton', pagina: 21, paginas: '21–26',
    titulo: 'Monte circuitos em K₄ e K₅', descricao: 'Construa circuitos, confira as arestas compartilhadas e compare as duas contagens.' },
  { id: 'cores', aula: '06', topico: 'heuristicas-cores', pagina: 49, paginas: '49–56',
    titulo: 'Compare dois métodos de coloração', descricao: 'Veja como a ordem de visita muda a coloração do mesmo grafo.' },
  { id: 'huffman', aula: '07', topico: 'huffman', pagina: 15, paginas: '15–24, 33–35',
    titulo: 'Construa um código de Huffman', descricao: 'Combine as duas raízes mais leves e acompanhe a tabela de prefixos.' },
  { id: 'fluxo', aula: '08', topico: 'residual', pagina: 28, paginas: '28–32, 47',
    titulo: 'Percorra a rede residual', descricao: 'Encontre o gargalo de cada caminho, aumente o fluxo e confira o corte.' },
  { id: 'alocacao', aula: '12', topico: 'alocacao', pagina: 77, paginas: '74–77',
    titulo: 'Resolva a matriz do Método Húngaro', descricao: 'Reduza linhas e colunas, escolha os zeros e recupere o custo original.' }
];

const estadosLaboratorios = new Map();
const linkLaboratorio = id => '#laboratorios/' + id;
const exibirRota = rota => rota.join(' → ');
const chaveAresta = (u, v) => [u, v].sort().join('–');
const trechos = rota => rota.slice(1).map((v, i) => [rota[i], v]);

function botaoLab(acao, texto, { valor = '', classe = 'secundario', desativado = false, pressionado = null } = {}) {
  return `<button type="button" class="botao ${classe}" data-lab-acao="${acao}" data-lab-valor="${html(valor)}"
    ${desativado ? 'disabled' : ''} ${pressionado === null ? '' : 'aria-pressed="' + pressionado + '"'}>${html(texto)}</button>`;
}

function listaDados(itens) {
  return '<ul class="dados">' + itens.map(item => '<li>' + html(item) + '</li>').join('') + '</ul>';
}

function grafoLab(vertices, posicoes, arestas, { destaques = [], secundarias = [], cores = {}, visitar = null, atual = null } = {}) {
  const destacadas = new Set(destaques);
  const alternativas = new Set(secundarias);
  const linhas = arestas.map(([u, v]) => {
    const [x, y] = posicoes[u];
    const [x2, y2] = posicoes[v];
    const dx = x2 - x;
    const dy = (y2 - y) * 0.6;
    const linha = `--x:${x}%;--y:${y}%;--dist:${Math.hypot(dx, dy)}%;--angulo:${Math.atan2(dy, dx)}rad`;
    const chave = chaveAresta(u, v);
    const classe = destacadas.has(chave) ? 'linha-destaque' : alternativas.has(chave) ? 'linha-alternativa' : '';
    return `<span aria-hidden="true" class="linha-lab ${classe}" style="${linha}"></span>`;
  }).join('');
  const nos = vertices.map(v => {
    const [x, y] = posicoes[v];
    const cor = cores[v] ? ' no-cor-' + cores[v] : '';
    const classe = 'no-lab' + cor + (v === atual ? ' no-atual' : '');
    const estilo = `--x:${x}%;--y:${y}%`;
    if (visitar) return `<button type="button" data-lab-acao="${visitar}" data-lab-valor="${html(v)}"
      class="${classe}" aria-label="Vértice ${html(v)}" style="${estilo}">${html(v)}</button>`;
    return `<span class="${classe}" style="${estilo}" aria-hidden="true">${html(v)}</span>`;
  }).join('');
  return '<div class="grafo-lab">' + linhas + nos + '</div>';
}

function parDisjunto(ciclos) {
  for (const [i, ciclo] of ciclos.entries()) {
    const outro = ciclos.slice(i + 1).find(item => item.arestas.every(aresta => !ciclo.arestas.includes(aresta)));
    if (outro) return [ciclo, outro];
  }
  return null;
}

const ciclosLab = {
  iniciar: () => ({ n: 5, porOrdem: { 4: { rota: ['1'], ciclos: [] }, 5: { rota: ['1'], ciclos: [] } } }),
  mostrar({ n, porOrdem }) {
    const { rota, ciclos, comparando } = porOrdem[n];
    const par = parDisjunto(ciclos);
    const vertices = Array.from({ length: n }, (_, i) => String(i + 1));
    const arestas = vertices.flatMap((v, i) => vertices.slice(i + 1).map(u => [v, u]));
    const posicoes = Object.fromEntries(vertices.map((v, i) => {
      const angulo = 2 * Math.PI * i / n - Math.PI / 2;
      return [v, [50 + 36 * Math.cos(angulo), 50 + 36 * Math.sin(angulo)]];
    }));
    const fechou = rota.length === n + 1;
    const total = vertices.slice(1).reduce((produto, _, i) => produto * (i + 1), 1) / 2;
    const disjuntos = Math.floor((n - 1) / 2);
    return `<div class="acoes" aria-label="Ordem do grafo">
        ${[4, 5].map(ordem => botaoLab('ordem', 'K' + ordem, { valor: ordem, pressionado: n === ordem })).join('')}
      </div>
      <div class="metricas-lab">
        <p><strong>${total}</strong> ciclos no total</p><p><strong>${disjuntos}</strong> disjuntos em arestas</p>
        <p><strong>${ciclos.length}</strong> ciclos encontrados</p>
      </div>
      <p class="conta-lab">Total: (${n} − 1)! ÷ 2 = ${total} · disjuntos: (${n} − ${n % 2 ? 1 : 2}) ÷ 2 = ${disjuntos}</p>
      <p>Parta do vértice 1, visite cada outro vértice uma vez e volte ao 1. Em K₅, encontre dois ciclos sem arestas em comum.</p>
      ${grafoLab(vertices, posicoes, arestas, {
        destaques: comparando ? par[0].arestas : trechos(rota).map(([u, v]) => chaveAresta(u, v)),
        secundarias: comparando ? par[1].arestas : [],
        cores: Object.fromEntries(rota.map(v => [v, 1])),
        visitar: comparando ? null : 'visitar', atual: comparando ? null : rota.at(-1)
      })}
      ${comparando ? `<div class="conta-lab comparacao-ciclos">
        <p><strong>Ciclo azul</strong> ${html(exibirRota(par[0].rota))}</p>
        <p><strong>Ciclo verde</strong> ${html(exibirRota(par[1].rota))}</p>
      </div>` : `<p class="conta-lab"><strong>Percurso</strong> ${html(exibirRota(rota))}</p>`}
      <div class="acoes">
        ${botaoLab('voltar', 'Desfazer último vértice', { desativado: comparando || fechou || rota.length === 1 })}
        ${botaoLab('novo', 'Novo percurso', { desativado: !comparando && rota.length === 1 })}
        ${par ? botaoLab('comparar', 'Sobrepor ciclos disjuntos', { pressionado: Boolean(comparando) }) : ''}
      </div>
      ${ciclos.length ? '<h3>Ciclos já encontrados</h3>' + listaDados(ciclos.map(ciclo => exibirRota(ciclo.rota))) : ''}`;
  },
  agir(estado, acao, valor) {
    if (acao === 'ordem') {
      estado.n = Number(valor);
      return null;
    }
    const { n, porOrdem } = estado;
    const rodada = porOrdem[n];
    const { rota, ciclos } = rodada;
    if (acao === 'comparar') {
      rodada.comparando = !rodada.comparando;
      return null;
    }
    if (acao === 'voltar') {
      rota.pop();
      return correto('Último vértice removido do percurso.');
    }
    if (acao === 'novo') {
      rodada.rota = ['1'];
      rodada.comparando = false;
      return correto('Novo percurso iniciado em 1.');
    }
    if (rota.length === n + 1) return incorreto('O circuito está fechado. Use Novo percurso para explorar outro.');
    if (rota.length === n && valor !== '1') return incorreto('Todos os vértices foram visitados. Volte ao 1 para fechar.');
    if (rota.length < n && rota.includes(valor)) return incorreto('O vértice ' + valor + ' já aparece no percurso. Visite os demais antes de voltar ao 1.');
    rota.push(valor);
    if (rota.length < n + 1) return null;

    const arestas = trechos(rota).map(([u, v]) => chaveAresta(u, v));
    const intersecao = ciclo => arestas.filter(aresta => ciclo.arestas.includes(aresta));
    if (ciclos.some(ciclo => intersecao(ciclo).length === n)) {
      return incorreto('Esse percurso usa exatamente as arestas de um ciclo já registrado. Inverter o sentido mantém o mesmo circuito.');
    }
    const disjunto = ciclos.find(ciclo => intersecao(ciclo).length === 0);
    if (disjunto || !ciclos.length) {
      ciclos.push({ rota: [...rota], arestas });
      if (disjunto && n === 5) return concluir('Os dois ciclos são disjuntos. Juntos usam as 10 arestas de K₅.');
      return correto('Ciclo hamiltoniano registrado. Comece outro percurso para comparar.');
    }
    const compartilhadas = intersecao(ciclos[0]);
    ciclos.push({ rota: [...rota], arestas });
    return correto('Ciclo hamiltoniano registrado. Com o primeiro, ele compartilha ' + compartilhadas.join(', ') + '.');
  }
};

const ordemSequencial = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
const ordemEmpates = ['1', '3', '9', '2', '5', '4', '6', '7', '8', '0'];
const arestasCoresLab = '12 13 15 16 18 23 27 29 36 39 30 40 48 49 57 58 59 69 70'.split(' ').map(par => [...par]);
const posicoesCoresLab = {
  1: [20, 21], 2: [50, 15], 3: [82, 34], 4: [12, 49], 5: [37, 49],
  6: [55, 47], 7: [70, 62], 8: [25, 84], 9: [46, 84], 0: [82, 84]
};

function passosColoracao(modo) {
  const vizinhos = v => arestasCoresLab.flatMap(([a, b]) => a === v ? [b] : b === v ? [a] : []);
  const cores = {};
  const jaUsadas = v => [...new Set(vizinhos(v).map(u => cores[u]).filter(Boolean))].sort();
  return ordemSequencial.map(() => {
    const restantes = (modo === 'sequencial' ? ordemSequencial : ordemEmpates).filter(v => !cores[v]);
    if (modo === 'welch') restantes.sort((a, b) =>
      vizinhos(b).length - vizinhos(a).length || jaUsadas(b).length - jaUsadas(a).length);
    const v = restantes[0];
    const usadas = jaUsadas(v);
    const cor = ordemSequencial.findIndex((_, i) => !usadas.includes(i + 1)) + 1;
    const emConflito = vizinhos(v).filter(u => cores[u]);
    cores[v] = cor;
    return { v, usadas, cor, grau: vizinhos(v).length, emConflito, cores: { ...cores } };
  });
}

const demonstracoesCores = { sequencial: passosColoracao('sequencial'), welch: passosColoracao('welch') };
const totalCoresLab = modo => new Set(Object.values(demonstracoesCores[modo].at(-1).cores)).size;

const coresLab = {
  iniciar: () => ({ modo: 'sequencial', contagens: { sequencial: 0, welch: 0 } }),
  mostrar({ modo, contagens }) {
    const feitas = contagens[modo];
    const passos = demonstracoesCores[modo];
    const passo = passos[feitas - 1];
    const cores = passo?.cores || {};
    const comparacaoPronta = Object.values(contagens).every(valor => valor === ordemSequencial.length);
    const instrucao = modo === 'sequencial'
      ? 'Siga a ordem de 1 a 9 e depois 0. Em cada vértice, use a menor cor livre.'
      : 'Siga a regra do slide 54. Priorize o maior grau e desempate pela quantidade de cores distintas nos vizinhos já coloridos.';
    return `<div class="acoes">
        ${botaoLab('modo', 'Sequencial', { valor: 'sequencial', pressionado: modo === 'sequencial' })}
        ${botaoLab('modo', 'Welch–Powell', { valor: 'welch', pressionado: modo === 'welch' })}
      </div>
      <p>${instrucao}</p>
      <div class="metricas-lab">
        <p><strong>${feitas}/10</strong> vértices coloridos</p>
        <p><strong>${new Set(Object.values(cores)).size}</strong> cores usadas</p>
      </div>
      ${grafoLab(ordemSequencial, posicoesCoresLab, arestasCoresLab, {
        cores, atual: passo?.v, destaques: passo?.emConflito.map(u => chaveAresta(u, passo.v))
      })}
      ${passo ? `<p class="conta-lab">Vértice <strong>${passo.v}</strong> · grau ${passo.grau} ·
        cores dos vizinhos já coloridos ${passo.usadas.length ? passo.usadas.map(c => 'C' + c).join(', ') : 'nenhuma'} · escolha <strong>C${passo.cor}</strong></p>`
        + listaDados(Object.entries(cores).map(([v, cor]) => 'Vértice ' + v + ' · C' + cor))
        : '<p class="conta-lab">Avance uma etapa para aplicar a menor cor disponível.</p>'}
      <div class="acoes">${botaoLab('voltar', 'Voltar uma etapa', { desativado: !feitas })}
        ${botaoLab('avancar', 'Colorir próximo vértice', { classe: 'primario', desativado: feitas === passos.length })}</div>
      ${comparacaoPronta ? `<p class="comparacao-lab">Sequencial usou ${totalCoresLab('sequencial')} cores. Welch–Powell usou ${totalCoresLab('welch')}.</p>`
        : feitas === passos.length ? '<p class="comparacao-lab">Finalize as duas ordens para comparar os totais de cores.</p>' : ''}
      ${modo === 'welch' ? '<details class="dica"><summary>Comparar com a execução do slide 56</summary><p>A ordem registrada no slide 56 coloca o nó 4 antes do 6. O desempate do slide 54 põe o nó 6 antes do 4. As duas execuções chegam a três cores nesse grafo.</p></details>' : ''}`;
  },
  agir(estado, acao, valor) {
    if (acao === 'modo') {
      estado.modo = valor;
      return null;
    }
    const { modo, contagens } = estado;
    contagens[modo] += acao === 'avancar' ? 1 : -1;
    if (acao === 'voltar') return null;
    if (Object.values(contagens).every(valor => valor === ordemSequencial.length)) {
      return concluir('Nas duas execuções, a ordem sequencial usou ' + totalCoresLab('sequencial') + ' cores e Welch–Powell usou ' + totalCoresLab('welch') + '.');
    }
    const { v, cor } = demonstracoesCores[modo][contagens[modo] - 1];
    return correto('Vértice ' + v + ' recebeu C' + cor + ', a menor cor livre.');
  }
};

const palavrasLab = ['bom esse bombom', 'ABRACADABRA'];
const rotuloSimbolo = simbolo => simbolo === ' ' ? 'espaço' : simbolo;

function iniciarHuffmanLab(palavra) {
  const pesos = {};
  for (const simbolo of palavra) pesos[simbolo] = (pesos[simbolo] || 0) + 1;
  const raizes = Object.entries(pesos).map(([id, peso]) => ({ id, peso })).sort(ordenarPesos);
  return { palavra, pesos, raizes, selecionada: null, juncoes: [] };
}

const huffmanLab = {
  iniciar: () => iniciarHuffmanLab(palavrasLab[0]),
  mostrar({ palavra, pesos, raizes, selecionada, juncoes }) {
    const pronto = raizes.length === 1;
    const codigos = pronto ? codigosDaArvore(raizes[0]) : [];
    return `<div class="acoes">
        ${palavrasLab.map(termo => botaoLab('palavra', termo, { valor: termo, pressionado: termo === palavra })).join('')}
      </div>
      <div class="metricas-lab"><p><strong>${raizes.length}</strong> raízes na floresta</p>
        <p><strong>${juncoes.reduce((total, item) => total + item.pai, 0)}</strong> soma dos pesos internos</p></div>
      ${pronto ? `<table class="tabela-lab"><caption>Códigos obtidos na árvore</caption>
        <thead><tr><th scope="col">Símbolo</th><th scope="col">Peso</th><th scope="col">Código</th><th scope="col">Bits usados</th></tr></thead>
        <tbody>${codigos.map(([s, bits]) => `<tr><th scope="row">${html(rotuloSimbolo(s))}</th><td>${pesos[s]}</td><td><code>${bits}</code></td><td>${pesos[s]} × ${bits.length} = ${pesos[s] * bits.length}</td></tr>`).join('')}</tbody></table>`
        : `<p>Selecione as duas raízes de menor peso. A primeira vira o ramo 0 e a segunda, o ramo 1.</p>
        <div class="acoes raizes-lab">${raizes.map(raiz =>
          botaoLab('raiz', rotuloSimbolo(raiz.id) + ' · ' + raiz.peso, { valor: raiz.id, pressionado: selecionada === raiz.id })).join('')}</div>`}
      ${juncoes.length ? '<h3>Pesos somados a cada junção</h3>' + listaDados(juncoes.map(({ a, b, pai }) => a + ' + ' + b + ' = ' + pai)) : ''}
      ${botaoLab('recomecar', 'Recomeçar árvore', { desativado: !juncoes.length && selecionada === null })}`;
  },
  agir(estado, acao, valor) {
    if (acao === 'palavra' || acao === 'recomecar') {
      Object.assign(estado, iniciarHuffmanLab(acao === 'palavra' ? valor : estado.palavra));
      return null;
    }
    const { raizes, selecionada } = estado;
    if (selecionada === valor) {
      estado.selecionada = null;
      return null;
    }
    if (selecionada === null) {
      estado.selecionada = valor;
      return null;
    }
    const esquerda = raizes.find(raiz => raiz.id === selecionada);
    const direita = raizes.find(raiz => raiz.id === valor);
    const pesosEscolhidos = [esquerda.peso, direita.peso].sort((a, b) => a - b);
    estado.selecionada = null;
    if (pesosEscolhidos.some((peso, i) => peso !== raizes[i].peso)) return incorreto('Existe uma raiz mais leve fora da seleção. Compare os pesos antes de tentar outra junção.');
    const peso = esquerda.peso + direita.peso;
    const agrupar = id => id === ' ' ? 'espaço' : id;
    const pai = { id: '(' + agrupar(esquerda.id) + '+' + agrupar(direita.id) + ')', peso, esquerda, direita };
    estado.raizes = [...raizes.filter(raiz => raiz !== esquerda && raiz !== direita), pai].sort(ordenarPesos);
    estado.juncoes.push({ a: esquerda.peso, b: direita.peso, pai: peso });
    if (estado.raizes.length === 1) {
      const bits = estado.juncoes.reduce((total, item) => total + item.pai, 0);
      return concluir('A codificação usa ' + bits + ' bits. A referência de 8 bits por caractere usaria ' + estado.palavra.length * 8 + ' bits.');
    }
    return correto('Junção feita. A nova raiz tem peso ' + peso + '.');
  }
};

const capacidadesAula = [
  ['s', 'v1', 16], ['s', 'v2', 13], ['v1', 'v2', 10], ['v2', 'v1', 4], ['v1', 'v3', 12],
  ['v3', 'v2', 9], ['v2', 'v4', 14], ['v4', 'v3', 7], ['v3', 't', 20], ['v4', 't', 4]
];
const caminhosAula = [
  ['s', 'v1', 'v3', 'v2', 'v4', 't'], ['s', 'v1', 'v2', 'v4', 'v3', 't'],
  ['s', 'v2', 'v1', 'v3', 't'], ['s', 'v2', 'v3', 't']
];

function etapasDeFluxo() {
  const residual = new Map(capacidadesAula.map(([u, v, peso]) => [u + '→' + v, peso]));
  let total = 0;
  const passos = caminhosAula.map(caminho => {
    const arcos = trechos(caminho).map(([u, v]) => ({ u, v, peso: residual.get(u + '→' + v) }));
    const menos = Math.min(...arcos.map(arco => arco.peso));
    const passo = { caminho, arcos, menos, total, residual: new Map(residual) };
    for (const { u, v, peso } of arcos) {
      residual.set(u + '→' + v, peso - menos);
      const inverso = v + '→' + u;
      residual.set(inverso, (residual.get(inverso) || 0) + menos);
    }
    total += menos;
    return passo;
  });
  return [...passos, { total, residual, caminho: null }];
}

const passosFluxoLab = etapasDeFluxo();

function corteFluxoAula(residual) {
  const s = new Set(['s']);
  for (const inicio of s) {
    for (const [arco, peso] of residual) {
      const [u, v] = arco.split('→');
      if (u === inicio && peso > 0) s.add(v);
    }
  }
  const corte = capacidadesAula.filter(([u, v]) => s.has(u) && !s.has(v));
  return { s: [...s], corte };
}

const fluxoLab = {
  iniciar: () => ({ etapa: 0 }),
  mostrar({ etapa }) {
    const atual = passosFluxoLab[etapa];
    const anterior = passosFluxoLab[etapa - 1];
    const terminou = !atual.caminho;
    const corte = terminou ? corteFluxoAula(atual.residual) : null;
    return `<div class="metricas-lab"><p><strong>${atual.total}</strong> unidades de fluxo</p><p><strong>${etapa}/4</strong> aumentos aplicados</p></div>
      ${terminou ? `<h3>Corte mínimo</h3><p>Na rede residual, s alcança apenas ${html(corte.s.join(', '))}. Some as capacidades originais dos arcos que cruzam para o outro lado.</p>
        ${listaDados(corte.corte.map(([u, v, c]) => u + ' → ' + v + ' · ' + c))}
        <p class="conta-lab">${corte.corte.map(([, , c]) => c).join(' + ')} = ${atual.total}</p>`
        : `<h3>Caminho ${etapa + 1}</h3><p class="conta-lab">${html(exibirRota(atual.caminho))}</p>
        <p>Selecione o arco que limita o aumento neste caminho residual.</p>
        <div class="acoes arcos-lab">${atual.arcos.map(({ u, v, peso }, i) =>
          botaoLab('gargalo', u + ' → ' + v + ' · ' + peso, { valor: i })).join('')}</div>`}
      ${anterior ? `<p class="comparacao-lab">Último aumento de ${anterior.menos}. No primeiro arco desse caminho, o residual direto passou
        de ${anterior.arcos[0].peso} para ${anterior.arcos[0].peso - anterior.menos}. O inverso ganhou ${anterior.menos}.</p>` : ''}
      <details class="dica"><summary>Ver arcos da rede residual</summary>
        ${listaDados([...atual.residual].filter(([, peso]) => peso > 0).map(([arco, peso]) => arco + ' · ' + peso))}</details>
      <div class="acoes">${botaoLab('voltar', 'Voltar um aumento', { desativado: !etapa })}</div>`;
  },
  agir(estado, acao, valor) {
    if (acao === 'voltar') {
      estado.etapa--;
      return null;
    }
    const { arcos, menos } = passosFluxoLab[estado.etapa];
    const arco = arcos[Number(valor)];
    if (arco.peso !== menos) return incorreto('O arco ' + arco.u + ' → ' + arco.v + ' ainda admite mais fluxo que outro arco do caminho.');
    estado.etapa++;
    const atual = passosFluxoLab[estado.etapa];
    if (!atual.caminho) return concluir('Os quatro aumentos levaram a ' + atual.total + ' unidades. Agora confira o corte mínimo.');
    return correto('Gargalo de ' + menos + ' confirmado. A rede residual foi atualizada nos dois sentidos.');
  }
};

const custosAula = [[3, 5, 6], [5, 4, 2], [2, 3, 4]];
const minimosLinhas = custosAula.map(linha => Math.min(...linha));
const matrizLinhas = custosAula.map((linha, i) => linha.map(valor => valor - minimosLinhas[i]));
const minimosColunas = matrizLinhas[0].map((_, j) => Math.min(...matrizLinhas.map(linha => linha[j])));
const matrizColunas = matrizLinhas.map(linha => linha.map((valor, j) => valor - minimosColunas[j]));
const matrizesAula = [custosAula, matrizLinhas, matrizColunas];

const alocacaoLab = {
  iniciar: () => ({ fase: 0, zeros: [] }),
  mostrar({ fase, zeros }) {
    const final = fase === 2;
    const titulos = ['Matriz de custos originais', 'Após a redução das linhas', 'Após a redução das colunas'];
    const instrucao = final ? 'Escolha três zeros em linhas e colunas diferentes. Clique em um escolhido para removê-lo.'
      : fase === 0 ? 'Desconte o menor custo de cada linha.' : 'Agora desconte o menor valor de cada coluna.';
    const parcelas = zeros.map(([i, j]) => custosAula[i][j]);
    return `<p>${instrucao}</p>
      <table class="tabela-lab matriz-lab"><caption>${titulos[fase]}</caption>
        <thead><tr><th scope="col">Operário</th><th scope="col">M1</th><th scope="col">M2</th><th scope="col">M3</th></tr></thead>
        <tbody>${matrizesAula[fase].map((linha, i) => `<tr><th scope="row">${i + 1}</th>${linha.map((valor, j) => `<td>
          ${final ? `<button type="button" data-lab-acao="zero" data-lab-valor="${i},${j}" aria-label="Linha ${i + 1}, coluna ${j + 1}, valor ${valor}"
            aria-pressed="${zeros.some(([u, v]) => i === u && j === v)}">${valor}</button>` : valor}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>
      ${fase >= 1 ? '<p class="conta-lab">Mínimos das linhas · ' + minimosLinhas.join(' · ') + '</p>' : ''}
      ${final ? '<p class="conta-lab">Mínimos das colunas · ' + minimosColunas.join(' · ') + '</p>' : ''}
      ${parcelas.length ? '<p class="conta-lab">Custo na matriz original · ' + parcelas.join(' + ') + ' = ' + parcelas.reduce((a, b) => a + b, 0) + '</p>' : ''}
      <div class="acoes">${fase < 2 ? botaoLab('reduzir', fase === 0 ? 'Reduzir linhas' : 'Reduzir colunas', { classe: 'primario' }) : ''}
        ${botaoLab('recomecar', 'Recomeçar matriz', { desativado: !fase })}</div>`;
  },
  agir(estado, acao, valor) {
    if (acao === 'recomecar') {
      Object.assign(estado, this.iniciar());
      return null;
    }
    if (acao === 'reduzir') {
      estado.fase++;
      return correto(estado.fase === 1 ? 'Subtraímos 3, 2 e 2 nas respectivas linhas.' : 'Subtraímos 0, 1 e 0 nas respectivas colunas.');
    }
    const [i, j] = valor.split(',').map(Number);
    if (matrizColunas[i][j] !== 0) return incorreto('Essa posição ainda tem valor ' + matrizColunas[i][j] + ' na matriz reduzida. Selecione um zero.');
    const existente = estado.zeros.findIndex(([u, v]) => u === i && v === j);
    if (existente !== -1) {
      estado.zeros.splice(existente, 1);
      return null;
    }
    if (estado.zeros.some(([u, v]) => u === i || v === j)) return incorreto('Já há um zero escolhido nessa linha ou coluna.');
    estado.zeros.push([i, j]);
    if (estado.zeros.length === 3) return concluir('Os três zeros são independentes. O custo ótimo vem das posições correspondentes na matriz original.');
    return correto('Zero independente registrado.');
  }
};

const laboratorios = { ciclos: ciclosLab, cores: coresLab, huffman: huffmanLab, fluxo: fluxoLab, alocacao: alocacaoLab };

function listaLaboratorios() {
  return cabecalho('Laboratórios', 'Experimente os algoritmos com os mesmos dados que aparecem nos slides.') +
    '<div class="lista-exercicios">' + catalogoLaboratorios.map(lab => {
      const aula = indiceAulas.get(lab.aula);
      return `<a class="painel exercicio-card" href="${linkLaboratorio(lab.id)}">
        <span class="aula-icone ${aula.cor}" aria-hidden="true">${aula.simbolo}</span>
        <div><span class="aula-num">Aula ${lab.aula}</span><h2>${html(lab.titulo)}</h2><p>${html(lab.descricao)}</p></div>
        <span class="estado">${progresso.laboratorios.includes(lab.id) ? '✓ Concluído' : '→'}</span>
      </a>`;
    }).join('') + '</div>';
}

function paginaLaboratorio(id) {
  if (!Object.hasOwn(laboratorios, id)) return listaLaboratorios();
  const lab = catalogoLaboratorios.find(item => item.id === id);
  if (!estadosLaboratorios.has(id)) estadosLaboratorios.set(id, { estado: laboratorios[id].iniciar(), retorno: null });
  return `<div class="trilha"><a href="#laboratorios">Laboratórios</a><span>/</span><a href="${linkTeoria(lab.aula, lab.topico)}">Aula ${lab.aula}</a></div>
    ${cabecalho(lab.titulo, lab.descricao)}
    <div class="laboratorio-grid"><article class="painel painel-lab" data-lab-id="${id}">
      <div class="conteudo-lab">${laboratorios[id].mostrar(estadosLaboratorios.get(id).estado)}</div>
      <div class="retorno-lab" role="status" tabindex="-1">${retornoLaboratorio(estadosLaboratorios.get(id).retorno)}</div>
    </article>
    <aside class="painel referencias-lab"><h2>Material da aula</h2>
      ${arquivoPDF(lab.aula, lab.pagina, 'Aula ' + lab.aula + ' · p. ' + lab.paginas)}
      <a class="fonte-link" href="${linkTeoria(lab.aula, lab.topico)}">Ver teoria e cálculo →</a>
      ${id === 'ciclos' ? `<a class="fonte-link" href="${linkSlideHamilton('21')}">Revisar os slides 20 a 27 →</a>` : ''}
      <p class="legenda" id="estado-lab">${progresso.laboratorios.includes(id) ? '✓ Laboratório concluído' : ''}</p>
    </aside></div>`;
}

function retornoLaboratorio(retorno) {
  return retorno ? `<p class="feedback ${retorno.tipo}">${html(retorno.mensagem)}</p>` : '';
}

function operarLaboratorio(botao) {
  const painel = botao.closest('[data-lab-id]');
  const id = painel.dataset.labId;
  const registro = estadosLaboratorios.get(id);
  const acao = botao.dataset.labAcao;
  const valor = botao.dataset.labValor;
  registro.retorno = laboratorios[id].agir(registro.estado, acao, valor);
  if (registro.retorno?.concluido) {
    registrar('laboratorios', id);
    document.querySelector('#estado-lab').textContent = '✓ Laboratório concluído';
  }
  painel.querySelector('.conteudo-lab').innerHTML = laboratorios[id].mostrar(registro.estado);
  const retorno = painel.querySelector('.retorno-lab');
  retorno.innerHTML = retornoLaboratorio(registro.retorno);
  const novoBotao = [...painel.querySelectorAll('[data-lab-acao]:enabled')].find(item =>
    item.dataset.labAcao === acao && item.dataset.labValor === valor);
  (novoBotao || retorno).focus({ preventScroll: true });
}
