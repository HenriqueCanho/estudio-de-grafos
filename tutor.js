/* Cada atividade expõe iniciar(), pergunta(estado) e conferir(estado, resposta).
 * Somente respostas válidas alteram o estado. O resultado pode concluir a atividade.
 */
const incorreto = mensagem => ({ tipo: 'erro', mensagem });
const correto = mensagem => ({ tipo: 'acerto', mensagem });
const concluir = (mensagem, resumo = []) => ({ tipo: 'acerto', mensagem, resumo, concluido: true });
const escolha = (nome, rotulo, opcoes) => ({ nome, rotulo, opcoes });
const entrada = (nome, rotulo, exemplo = '', numerica = false) => ({ nome, rotulo, exemplo, numerica });

const passosCircuito = [
  {
    titulo: 'Confira as arestas', enunciado: 'Qual par consecutivo de ACEDBCA não está ligado no grafo?',
    campo: escolha('par', 'Par consecutivo', ['A–C', 'C–E', 'E–D', 'D–B', 'B–C', 'C–A']),
    resposta: 'D–B', erro: r => r.par + ' é uma aresta do desenho. Confira cada par da sequência.',
    dica: 'Siga o traço entre as duas letras. Cruzar pelo vértice intermediário já exige duas arestas.',
    acerto: 'D e B só se conectam por meio de outros vértices. Falta uma aresta direta nesse passo.'
  },
  {
    titulo: 'Confira as visitas', enunciado: 'Além da volta a A, qual vértice aparece mais de uma vez?',
    campo: escolha('vertice', 'Vértice repetido', ['A', 'B', 'C', 'D', 'E']),
    resposta: 'C', erro: () => 'A letra inicial pode reaparecer no fechamento. Conte as ocorrências das outras letras.',
    dica: 'Escreva as letras em posições consecutivas e marque as duplicatas.',
    acerto: 'C aparece na segunda e na sexta posição. Só a partida pode reaparecer no fechamento.'
  },
  {
    titulo: 'Procure um vértice de corte', enunciado: 'Qual vértice deixa o desenho dividido quando ele e suas arestas são removidos?',
    campo: escolha('vertice', 'Vértice a remover', ['A', 'B', 'C', 'D', 'E']),
    resposta: 'C', erro: r => 'Remover ' + r.vertice + ' ainda deixa os vértices restantes conectados. Procure o ponto de encontro entre os dois lados.',
    dica: 'Compare quais vértices pertencem a apenas um triângulo e quais participam dos dois.',
    acerto: 'Ao remover C, ficam dois grupos sem caminho entre si.'
  },
  {
    titulo: 'Aplique a condição de remoção', enunciado: 'Uma remoção deixou duas componentes. O que isso garante?',
    campo: escolha('conclusao', 'Conclusão', ['Exclui qualquer ciclo hamiltoniano', 'Exclui também todo caminho hamiltoniano', 'Garante um ciclo hamiltoniano']),
    resposta: 'Exclui qualquer ciclo hamiltoniano',
    erro: () => 'Compare o número de componentes com k para ciclos e com k + 1 para caminhos, usando k = 1.',
    dica: 'Num ciclo, a remoção de um único vértice deixaria um só trecho. Num caminho aberto, pode deixar dois trechos.',
    acerto: 'Como 2 > 1, o grafo não admite circuito hamiltoniano. A sequência também falha pela aresta ausente e pela repetição de C.'
  }
];

const circuito = {
  iniciar: () => ({ passo: 0 }),
  pergunta({ passo }) {
    const { titulo, enunciado, campo, dica } = passosCircuito[passo];
    return { titulo, enunciado, campos: [campo], dica };
  },
  conferir(estado, resposta) {
    const passo = passosCircuito[estado.passo];
    if (resposta[passo.campo.nome] !== passo.resposta) return incorreto(passo.erro(resposta));
    estado.passo++;
    return estado.passo === passosCircuito.length ? concluir(passo.acerto) : correto(passo.acerto);
  }
};

const cidades = ['1', '2', '3', '4'];
const pesos = { '12': 39, '13': 41, '14': 73, '23': 82, '24': 58, '34': 32 };
const distancia = (a, b) => pesos[[a, b].sort().join('')];

const vizinho = {
  iniciar: () => ({ partida: 0, rota: ['1'], custo: 0, rodadas: [] }),
  pergunta({ partida, rota, rodadas }) {
    const fechado = rota.length === cidades.length + 1;
    return {
      titulo: 'Partida ' + cidades[partida] + ' · ' + (partida + 1) + ' de ' + cidades.length,
      detalhes: ['Percurso: ' + rota.join(' → '), ...rodadas],
      enunciado: fechado ? 'Qual é o custo total deste ciclo?' : 'Qual vértice você visita depois de ' + rota.at(-1) + '?',
      campos: [fechado ? entrada('custo', 'Custo total', '', true) : escolha('destino', 'Próximo vértice', cidades)],
      dica: fechado ? 'Some o peso de todas as arestas percorridas, incluindo a última.' : 'Compare apenas as arestas que saem do último vértice e chegam a vértices ainda não visitados. Depois da última visita, feche o ciclo.'
    };
  },
  conferir(estado, { destino, custo }) {
    const { rota, partida, rodadas } = estado;
    const atual = rota.at(-1);
    if (rota.length === cidades.length + 1) {
      if (Number(custo) !== estado.custo) return incorreto('A soma diverge dos pesos percorridos. Refaça as quatro parcelas do ciclo, incluindo o retorno.');
      rodadas.push(rota.join(' → ') + ' = ' + estado.custo);
      if (partida === cidades.length - 1) return concluir('As quatro partidas resultaram no mesmo custo. Compare os ciclos abaixo.', rodadas);
      estado.partida++;
      estado.rota = [cidades[estado.partida]];
      estado.custo = 0;
      return correto('Custo conferido. Agora recomece em outro vértice.');
    }

    if (rota.length === cidades.length) {
      if (destino !== rota[0]) return incorreto('Todos os vértices já foram visitados. A próxima aresta deve fechar o ciclo no ponto de partida.');
    } else {
      if (rota.includes(destino)) return incorreto('O vértice ' + destino + ' já faz parte do percurso. Compare apenas os destinos inéditos.');
      const menor = Math.min(...cidades.filter(v => !rota.includes(v)).map(v => distancia(atual, v)));
      if (distancia(atual, destino) > menor) return incorreto('A aresta ' + atual + '–' + destino + ' custa ' + distancia(atual, destino) + '. Há uma aresta mais barata que sai de ' + atual + ' para um vértice ainda inédito.');
    }
    const peso = distancia(atual, destino);
    rota.push(destino);
    estado.custo += peso;
    return correto('Aresta ' + atual + '–' + destino + ' confirmada. O peso deste passo é ' + peso + '.');
  }
};

const verticesCor = ['1', '2', '3', '4', '5'];
const adjacentes = { 1: ['2', '4', '5'], 2: ['1', '3', '5'], 3: ['2', '4', '5'], 4: ['1', '3', '5'], 5: ['1', '2', '3', '4'] };

function verticesDigitados(texto) {
  const limpo = texto.trim();
  return /^\d+$/.test(limpo) ? [...limpo] : limpo.split(/[\s,;→>\-–—]+/).filter(Boolean);
}

const coloracao = {
  iniciar: () => ({ cores: {}, triangulo: null }),
  pergunta({ cores, triangulo }) {
    const detalhes = Object.entries(cores).map(([v, cor]) => 'Vértice ' + v + ' → cor ' + cor);
    const restantes = verticesCor.filter(v => !cores[v]);
    if (restantes.length) return {
      titulo: 'Colorir vértice · ' + (detalhes.length + 1) + ' de 5', detalhes,
      enunciado: 'Qual vértice vem a seguir e qual é a menor cor disponível?',
      campos: [escolha('vertice', 'Vértice sem cor', restantes), escolha('cor', 'Cor', verticesCor)],
      dica: 'Compare primeiro a quantidade total de vizinhos. Para desempatar, conte cores diferentes, e então verifique as cores proibidas no vértice escolhido.'
    };
    if (!triangulo) return {
      titulo: 'Justifique o mínimo', detalhes,
      enunciado: 'Digite três vértices que sejam mutuamente vizinhos. Esse triângulo fornece um limite inferior.',
      campos: [entrada('triangulo', 'Vértices do triângulo', 'Separe por vírgulas')],
      dica: 'Procure uma aresta do contorno e verifique se as suas duas pontas se ligam ao centro.'
    };
    return {
      titulo: 'Número cromático', detalhes,
      enunciado: 'Combine o limite do triângulo com a sua coloração. Qual é o menor número possível de cores?',
      campos: [entrada('numero', 'Número cromático', '', true)],
      dica: 'O triângulo dá um limite inferior. O total de cores da sua coloração dá um limite superior.'
    };
  },
  conferir(estado, { vertice, cor, triangulo, numero }) {
    const { cores } = estado;
    if (vertice) {
      const restantes = verticesCor.filter(v => !cores[v]);
      const grau = adjacentes[vertice].length;
      const maiorGrau = Math.max(...restantes.map(v => adjacentes[v].length));
      if (grau < maiorGrau) return incorreto('O vértice ' + vertice + ' tem grau ' + grau + ' e ainda há um vértice sem cor de grau maior.');
      const usadas = v => new Set(adjacentes[v].map(u => cores[u]).filter(Boolean));
      const proibidas = usadas(vertice);
      const empatados = restantes.filter(v => adjacentes[v].length === maiorGrau);
      if (proibidas.size < Math.max(...empatados.map(v => usadas(v).size))) {
        return incorreto('O grau é válido, mas outro candidato de mesmo grau tem mais cores distintas entre os vizinhos já coloridos.');
      }
      const conflito = adjacentes[vertice].find(v => cores[v] === cor);
      if (conflito) return incorreto('A cor ' + cor + ' já foi usada no vértice vizinho ' + conflito + '.');
      const menorCor = verticesCor.find(c => !proibidas.has(c));
      if (cor !== menorCor) return incorreto('A cor escolhida é possível, mas uma cor de índice menor ainda está livre entre os vizinhos.');
      cores[vertice] = cor;
      return correto('Vértice ' + vertice + ' colorido com a cor ' + cor + '.');
    }

    if (!estado.triangulo) {
      const grupo = verticesDigitados(triangulo);
      if (grupo.length !== 3 || new Set(grupo).size !== 3 || grupo.some(v => !verticesCor.includes(v))) {
        return incorreto('Escolha três vértices distintos do desenho.');
      }
      for (const [i, v] of grupo.entries()) {
        const distante = grupo.slice(i + 1).find(u => !adjacentes[v].includes(u));
        if (distante) return incorreto('Os vértices ' + v + ' e ' + distante + ' não são adjacentes. As três duplas precisam ter arestas.');
      }
      estado.triangulo = grupo;
      return correto('O triângulo confere. Cada um de seus três vértices exige uma cor distinta.');
    }

    if (Number(numero) < estado.triangulo.length) return incorreto('Esse número não cobre as cores exigidas pelo triângulo.');
    if (Number(numero) > new Set(Object.values(cores)).size) return incorreto('A sua coloração já usa menos cores que esse número.');
    return concluir('Você encontrou uma coloração de três cores e um triângulo que exige três. Logo, χ(G) = 3.');
  }
};

const frequencias = { a: 1, b: 1, c: 2, d: 3, e: 5, f: 8, g: 13, h: 21 };
const ordenarPesos = (a, b) => a.peso - b.peso;
const rotuloRaiz = raiz => raiz.id + ' (peso ' + raiz.peso + ')';

function codigosDaArvore(no, bits = '') {
  if (!no.esquerda) return [[no.id, bits]];
  return [...codigosDaArvore(no.esquerda, bits + '0'), ...codigosDaArvore(no.direita, bits + '1')];
}

const huffman = {
  iniciar: () => ({ raizes: Object.entries(frequencias).map(([id, peso]) => ({ id, peso })) }),
  pergunta({ raizes }) {
    const opcoes = raizes.map(raiz => ({ valor: raiz.id, texto: rotuloRaiz(raiz) }));
    return {
      titulo: 'Junção ' + (Object.keys(frequencias).length - raizes.length + 1) + ' de 7',
      enunciado: 'Escolha as duas árvores que devem ser reunidas agora.',
      campos: [escolha('ramo0', 'Ramo 0', opcoes), escolha('ramo1', 'Ramo 1', opcoes)],
      detalhes: raizes.map(rotuloRaiz),
      dica: 'Compare os pesos das raízes atuais, incluindo as árvores das junções anteriores. Se houver empate, qualquer raiz com o mesmo peso serve.'
    };
  },
  conferir({ raizes }, { ramo0, ramo1 }) {
    if (ramo0 === ramo1) return incorreto('Você escolheu a mesma árvore para os dois ramos. Cada ramo precisa vir de uma árvore diferente.');
    const esquerda = raizes.find(raiz => raiz.id === ramo0);
    const direita = raizes.find(raiz => raiz.id === ramo1);
    const ordenadas = [esquerda, direita].sort(ordenarPesos);
    const posicaoErrada = ordenadas.findIndex((raiz, i) => raiz.peso !== raizes[i].peso);
    if (posicaoErrada >= 0) {
      return incorreto('Uma das raízes selecionadas tem peso ' + ordenadas[posicaoErrada].peso + '. Há raiz de peso menor fora da sua seleção.');
    }
    const pai = { id: '(' + esquerda.id + '+' + direita.id + ')', peso: esquerda.peso + direita.peso, esquerda, direita };
    raizes.splice(0, raizes.length, ...raizes.filter(raiz => raiz !== esquerda && raiz !== direita), pai);
    raizes.sort(ordenarPesos);
    if (raizes.length > 1) return correto('Junção confirmada. A nova raiz volta à lista com peso ' + pai.peso + '.');
    const codigos = codigosDaArvore(pai).sort(([a], [b]) => a.localeCompare(b));
    const total = codigos.reduce((soma, [letra, bits]) => soma + frequencias[letra] * bits.length, 0);
    return concluir('Árvore concluída. O código construído nesta tentativa usa ' + total + ' bits para as frequências dadas.',
      codigos.map(([letra, bits]) => letra + ' → ' + bits));
  }
};

const arcosOriginais = [
  ['1', '2', 4], ['1', '3', 3], ['2', '4', 5], ['2', '5', 2], ['4', '3', 7], ['4', '5', 2], ['3', '5', 6]
];
const verticesFluxo = ['1', '2', '3', '4', '5'];
const chaveArco = (u, v) => u + v;

function alcancaveis(residual) {
  const fila = ['1'];
  for (const u of fila) {
    for (const v of verticesFluxo) {
      if (residual[chaveArco(u, v)] > 0 && !fila.includes(v)) fila.push(v);
    }
  }
  return fila;
}

const fluxo = {
  iniciar: () => ({
    residual: Object.fromEntries(arcosOriginais.map(([u, v, c]) => [chaveArco(u, v), c])),
    total: 0, caminho: null, aumentos: []
  }),
  pergunta({ residual, total, caminho }) {
    const detalhes = ['Fluxo atual: ' + total, ...Object.entries(residual)
      .filter(([, capacidade]) => capacidade > 0)
      .map(([arco, capacidade]) => arco[0] + ' → ' + arco[1] + ': ' + capacidade)];
    if (caminho) return {
      titulo: 'Calcule o gargalo', detalhes,
      enunciado: 'Quanto fluxo você pode acrescentar em ' + caminho.join(' → ') + '?',
      campos: [entrada('gargalo', 'Aumento de fluxo', '', true)],
      dica: 'O arco de menor capacidade residual limita todo o caminho.'
    };
    return {
      titulo: 'Procure um caminho aumentante', detalhes,
      enunciado: 'Digite um caminho residual simples de 1 a 5. Digite “fim” quando não houver mais caminho.',
      campos: [entrada('rota', 'Caminho residual', 'Vértices separados por vírgulas')],
      dica: 'Use somente os arcos orientados de capacidade positiva listados acima. A rede residual pode mostrar arcos reversos que não estavam no desenho original.'
    };
  },
  conferir(estado, { rota, gargalo }) {
    const { caminho, residual } = estado;
    if (!caminho) {
      if (rota.trim().toLowerCase() === 'fim') {
        const s = alcancaveis(residual);
        if (s.includes('5')) return incorreto('Ainda há como chegar a 5 na rede residual. Siga as setas de valor positivo a partir de 1.');
        const t = verticesFluxo.filter(v => !s.includes(v));
        const custo = arcosOriginais.filter(([u,v]) => s.includes(u) && t.includes(v)).reduce((soma, [, , c]) => soma + c, 0);
        return concluir('O fluxo máximo é ' + estado.total + '. O corte S = {' + s.join(', ') + '} e T = {' + t.join(', ') + '} tem capacidade ' + custo + '.', estado.aumentos);
      }
      const vertices = verticesDigitados(rota);
      if (vertices.length < 2 || vertices[0] !== '1' || vertices.at(-1) !== '5') return incorreto('O caminho precisa começar na fonte 1 e terminar no destino 5.');
      if (vertices.some(v => !verticesFluxo.includes(v))) return incorreto('Use somente os vértices 1, 2, 3, 4 e 5.');
      if (new Set(vertices).size !== vertices.length) return incorreto('O caminho precisa ser simples. Remova o trecho que repete um vértice.');
      for (let i = 1; i < vertices.length; i++) {
        const [u, v] = [vertices[i - 1], vertices[i]];
        if (!(residual[chaveArco(u, v)] > 0)) return incorreto('O passo ' + u + ' → ' + v + ' não tem capacidade residual positiva nesse sentido.');
      }
      estado.caminho = vertices;
      return correto('Caminho aumentante válido. Compare agora as capacidades residuais ao longo dele.');
    }

    const arcos = caminho.slice(1).map((v, i) => [caminho[i], v]);
    const menor = Math.min(...arcos.map(([u, v]) => residual[chaveArco(u, v)]));
    if (Number(gargalo) > menor) {
      const [u, v] = arcos.find(([a, b]) => residual[chaveArco(a, b)] < Number(gargalo));
      return incorreto('O aumento escolhido ultrapassa a capacidade residual de ' + u + ' → ' + v + '.');
    }
    if (Number(gargalo) < menor) return incorreto('Todos os arcos desse caminho admitem um aumento maior. Identifique o menor residual entre eles.');

    for (const [u, v] of arcos) {
      residual[chaveArco(u, v)] -= menor;
      const reverso = chaveArco(v, u);
      residual[reverso] = (residual[reverso] || 0) + menor;
    }
    estado.total += menor;
    estado.aumentos.push(caminho.join(' → ') + ' · +' + menor + ' · fluxo ' + estado.total);
    estado.caminho = null;
    return correto('Aumento de ' + menor + ' confirmado. Os arcos residuais foram atualizados nos dois sentidos.');
  }
};

const tutores = { circuito, vizinho, coloracao, huffman, fluxo };
