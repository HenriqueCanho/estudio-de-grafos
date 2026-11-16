/* Diagramas redesenhados e cálculos derivados das páginas indicadas de cada aula. */
const exemplosResolvidos = {
  hamilton: {
    titulo: 'Quantos ciclos hamiltonianos há em K₄?',
    pagina: 26, paginas: '25–26',
    alt: 'Grafo completo de quatro vértices com o ciclo 1, 2, 3, 4, 1 destacado e as diagonais em cinza.',
    etapas: [
      ['Fixe a partida em 1', 'Como todo par de vértices tem uma aresta, qualquer ordem dos outros três serve.', '3! = 3 × 2 × 1 = 6 ordens'],
      ['Conte cada ciclo uma vez', 'Percorrer 1 → 2 → 3 → 4 → 1 de trás para a frente usa o mesmo conjunto de arestas. Cada ciclo foi contado duas vezes.', '6 ÷ 2 = 3 ciclos']
    ]
  },
  graus: {
    titulo: 'Teste a condição de grau no hexágono',
    pagina: 18, paginas: '14–18',
    alt: 'Hexágono numerado de 1 a 6. Em destaque, as duas arestas incidentes ao vértice 1.',
    etapas: [
      ['Calcule o limiar', 'O grafo do slide tem seis vértices. O teorema exige grau de pelo menos metade dessa ordem em cada vértice.', '6 ÷ 2 = 3'],
      ['Conte as ligações em um vértice', 'Cada vértice tem só os dois vizinhos do contorno. O critério não se aplica.', 'grau(v) = 2 < 3'],
      ['Exiba o ciclo', 'Percorra o contorno. Essa sequência passa uma vez por cada vértice e fecha na partida.', '1 → 2 → 3 → 4 → 5 → 6 → 1']
    ]
  },
  cortes: {
    titulo: 'O que muda quando removemos p?',
    pagina: 30, paginas: '27–30',
    alt: 'Duas componentes triangulares destacadas. O vértice p e as seis arestas incidentes aparecem tracejados para indicar a remoção.',
    etapas: [
      ['Remova p e suas arestas', 'Use o primeiro grafo da página 30. Retirar p elimina todas as ligações entre as duas partes.', 'k = 1 vértice removido'],
      ['Conte as componentes restantes', 'Cada lado continua conectado por suas três arestas. As duas partes ficam separadas.', '2 componentes'],
      ['Compare as quantidades', 'Um ciclo que passasse por todos os vértices deixaria um único trecho ao remover um vértice. O grafo original não admite esse ciclo.', '2 > 1']
    ]
  },
  caixeiro: {
    titulo: 'Some o percurso iniciado em s',
    pagina: 52,
    alt: 'Grafo ponderado do slide 52 com a rota s, v, w, u, z, s destacada. Pesos na ordem da rota: 5, 6, 7, 7 e 9.',
    etapas: [
      ['Saia de s pelo menor peso', 'A partir de s, compare v, w, z e u. O menor custo leva a v.', 'mín(5, 6, 9, 10) = 5'],
      ['Compare somente os destinos inéditos', 'Em v, escolha w, pois 6 é menor que 10 para z e 11 para u. Em w, escolha u, pois 7 é menor que 9 para z. De u, vá a z, o último vértice inédito.', 'v → w (6) · w → u (7) · u → z (7)'],
      ['Feche a rota e faça a soma', 'O retorno de z para s custa 9 e entra no total junto com os quatro passos anteriores.', '5 + 6 + 7 + 7 + 9 = 34']
    ]
  },
  cores: {
    titulo: 'Quantas cores são necessárias em K₄?',
    pagina: 23,
    alt: 'Cada vértice do grafo completo K₄ tem uma cor e um número distintos.',
    etapas: [
      ['Justifique o limite inferior', 'Cada vértice do K₄ é adjacente aos outros três. Se algum par repetisse uma cor, haveria conflito na aresta que o liga.', 'χ(K₄) ≥ 4'],
      ['Exiba uma coloração', 'Use as cores 1, 2, 3 e 4, uma em cada vértice. A coloração atende a todas as arestas e atinge o limite inferior.', 'χ(K₄) = 4']
    ]
  },
  'heuristicas-cores': {
    titulo: 'Como Welch–Powell escolhe a cor do vértice 2?',
    pagina: 55, paginas: '54–56',
    alt: 'Grafo dos slides 55 e 56 colorido em três classes. As arestas de 2 a 1, 3 e 9 estão destacadas.',
    etapas: [
      ['Comece pelos maiores graus', 'Os vértices 1, 3 e 9 têm cinco vizinhos. A execução do slide atribui C1 a 1, C2 a 3 e C1 a 9.', 'grau(1) = grau(3) = grau(9) = 5'],
      ['Desempate entre 2 e 5', 'Ambos têm grau 4. O vértice 2 já vê C1 em 1 e 9 e C2 em 3. O vértice 5 vê apenas C1 nos seus vizinhos coloridos 1 e 9.', 'grau de coloração de 2 = 2 · de 5 = 1'],
      ['Atribua a menor cor livre a 2', 'C1 e C2 estão ocupadas entre seus vizinhos. Escolha C3 e continue. Ao terminar, as classes são {1, 7, 9}, {3, 4, 5} e {0, 2, 6, 8}.', '3 classes = 3 cores']
    ]
  },
  planaridade: {
    titulo: 'Conte as faces no desenho planar do K₄',
    pagina: 80,
    alt: 'K₄ desenhado como triângulo com um vértice no interior. As três faces internas e a face externa são rotuladas.',
    etapas: [
      ['Conte vértices e arestas', 'Use o terceiro desenho da página 80. Há três vértices no contorno e um no centro, ligado aos três de fora.', 'n = 4 · m = 3 do contorno + 3 internas = 6'],
      ['Isole f na fórmula de Euler', 'O grafo está desenhado no plano e é conexo. A conta inclui a face de fora.', 'f = 2 − n + m = 2 − 4 + 6 = 4'],
      ['Confira no desenho', 'Os três triângulos menores são as faces internas. O lado de fora do contorno é a quarta face.', '3 internas + 1 externa = 4']
    ]
  },
  huffman: {
    titulo: 'Junte os pesos de “bom esse bombom”',
    pagina: 16, paginas: '16–24',
    alt: 'Árvore de Huffman de peso 15 com os nós internos 6, 9, 4 e 5 e folhas para o, m, e, s, espaço e b. Cada ramo tem seu bit 0 ou 1.',
    etapas: [
      ['Faça as três primeiras junções', 'Os pesos 2 correspondem a e, s e ao espaço. Os pesos 3 são de b, o e m. O slide mostra uma ordem possível para os empates.', 'e + s: 2 + 2 = 4 · espaço + b: 2 + 3 = 5 · o + m: 3 + 3 = 6'],
      ['Continue com as subárvores mais leves', 'Após essas junções, restam 4, 5 e 6. Junte 4 e 5, depois use a nova raiz de peso 9.', '4 + 5 = 9 · 6 + 9 = 15'],
      ['Some os pesos dos nós internos', 'Cada símbolo contribui com sua frequência uma vez por nível entre a folha e a raiz. A soma dos pesos internos conta exatamente esse total.', '4 + 5 + 6 + 9 + 15 = 39 bits']
    ]
  },
  prefixos: {
    titulo: 'Leia os bits na árvore de ABRACADABRA',
    pagina: 35,
    alt: 'Árvore de prefixos com os códigos A igual a 0, C igual a 100, D igual a 101, B igual a 110 e R igual a 111.',
    etapas: [
      ['Leia da raiz até a folha', 'À esquerda da raiz está A, com código 0. Para chegar a B, vá à direita, à direita e à esquerda.', 'A → 0 · B → 110 · R → 111'],
      ['Codifique e confira a leitura', 'Use as quatro primeiras letras do exemplo. Para decodificar, volte à raiz depois de cada folha.', 'ABRA → 0 | 110 | 111 | 0 → 01101110'],
      ['Calcule os bits da palavra inteira', 'Em ABRACADABRA há cinco A, um C, um D, dois B e dois R. Só A tem código de um bit. Os outros códigos têm três bits.', '5 × 1 + 1 × 3 + 1 × 3 + 2 × 3 + 2 × 3 = 5 + 3 + 3 + 6 + 6 = 23 bits']
    ]
  },
  residual: {
    titulo: 'Calcule o primeiro aumento de fluxo',
    pagina: 28, paginas: '28–29',
    alt: 'Caminho orientado s, v₁, v₃, v₂, v₄, t. As capacidades são 16, 12, 9, 14 e 4. O último arco é o gargalo.',
    etapas: [
      ['Leia as capacidades do caminho', 'Na primeira iteração, o fluxo começa em zero. O slide escolhe s → v₁ → v₃ → v₂ → v₄ → t.', 'residuais na ordem do caminho: 16, 12, 9, 14 e 4'],
      ['Identifique o gargalo', 'O arco de v₄ a t limita o fluxo de todo o caminho. Envie quatro unidades.', 'mín(16, 12, 9, 14, 4) = 4'],
      ['Atualize os dois sentidos', 'Em s → v₁, desconte as quatro unidades usadas. A capacidade reversa de v₁ → s ganha quatro. No gargalo, o residual direto chega a zero.', '16 − 4 = 12 · 0 + 4 = 4 · 4 − 4 = 0']
    ]
  },
  mincorte: {
    titulo: 'Some só os arcos que atravessam o corte',
    pagina: 47,
    alt: 'Do lado S estão s, v₁, v₂ e v₄. Do lado T estão v₃ e t. Os três arcos destacados que cruzam de S para T têm capacidades 12, 7 e 4.',
    etapas: [
      ['Separe os vértices', 'Depois do último aumento, copie os vértices que ainda podem ser alcançados a partir de s pela rede residual. Os outros ficam em T.', 'S = {s, v₁, v₂, v₄} · T = {v₃, t}'],
      ['Some as capacidades originais', 'O desenho mostra v₁ → v₃, v₄ → v₃ e v₄ → t. Esses são os arcos que saem de S e chegam a T.', '12 + 7 + 4 = 23'],
      ['Confira pelo fluxo entregue', 'Na solução final, chegam 19 unidades a t por v₃ e 4 por v₄. O fluxo alcança a capacidade do corte e portanto é máximo.', '19 + 4 = 23']
    ]
  },
  independentes: {
    titulo: 'Por que {a, c, e} tem tamanho máximo?',
    pagina: 7, paginas: '7–8',
    alt: 'Grafo do slide com os vértices a, c e e em destaque. Os pares adjacentes a e b, c e d, e e g estão marcados.',
    etapas: [
      ['Confira os escolhidos', 'Os vértices a, c e e alternam na borda do desenho. Nenhum dos três pares entre eles tem aresta.', '|{a, c, e}| = 3'],
      ['Limite o tamanho das outras escolhas', 'Com f, só cabe f, pois ele é vizinho de todos. Sem f, cada aresta destacada permite escolher no máximo uma ponta. Essas três arestas cobrem os seis vértices restantes.', '(a, b), (c, d), (e, g) → no máximo 1 + 1 + 1'],
      ['Compare com o conjunto encontrado', 'O limite de três é alcançado por {a, c, e}. Já {a, d} é maximal com dois porque qualquer vértice a mais cria uma aresta.', 'α(G) = 3']
    ]
  },
  cliques: {
    titulo: 'Conte as ligações no grupo {2, 3, 6, 7}',
    pagina: 36,
    alt: 'Grafo do slide com 2, 3, 6 e 7 em azul e as seis arestas entre eles destacadas.',
    etapas: [
      ['Confira todas as duplas', 'Cada um dos quatro vértices liga-se aos outros três do grupo. Divida por dois porque cada aresta é contada pelas duas pontas.', '4 × 3 ÷ 2 = 6 arestas'],
      ['Exclua uma clique maior', 'Uma clique de cinco exigiria cinco vértices com grau de pelo menos quatro. No desenho só 2, 3, 4 e 6 atingem esse grau.', '4 candidatos < 5 vértices necessários'],
      ['Leia o tamanho da clique máxima', 'O grupo destacado tem quatro vértices e o grau impede um grupo maior.', 'ω(G) = 4']
    ]
  },
  dominantes: {
    titulo: 'Quanto vale escolher só o vértice f?',
    pagina: 54,
    alt: 'O vértice central f está destacado e se liga a todos os seis vértices da borda.',
    etapas: [
      ['Marque o escolhido', 'Comece com D = {f}. O próprio f já pertence a D.', '|D| = 1'],
      ['Conte os atingidos pelas arestas', 'Cada um dos seis vértices da borda é vizinho direto de f. Isso cobre o grafo inteiro.', '1 escolhido + 6 vizinhos = 7 vértices'],
      ['Justifique o mínimo', 'Como o grafo tem vértices, um conjunto vazio não cobre nenhum deles. Um único vértice já basta nesse exemplo.', 'γ(G) = 1']
    ]
  },
  casamento: {
    titulo: 'Compare dois casamentos do mesmo grafo',
    pagina: 65,
    alt: 'Dois desenhos do grafo de seis vértices. No primeiro são destacadas duas arestas. No segundo, três arestas disjuntas cobrem todos os vértices.',
    etapas: [
      ['Conte os vértices já usados', 'No exemplo da esquerda, as duas arestas em azul ocupam quatro vértices. Os dois livres ficam nas pontas do desenho e não são vizinhos. Portanto o casamento já é maximal.', '2 × 2 = 4 vértices saturados'],
      ['Calcule o limite máximo', 'Cada aresta escolhida ocupa dois vértices que nenhuma outra aresta do casamento pode usar. O grafo tem seis.', '6 ÷ 2 = 3 arestas'],
      ['Confira o segundo desenho', 'As três arestas destacadas têm pontas distintas. Todos os vértices ficam saturados, então o casamento é máximo e perfeito.', '3 × 2 = 6 vértices saturados']
    ]
  },
  alocacao: {
    titulo: 'Reduza a matriz e leia o custo original',
    pagina: 77, paginas: '74–77',
    alt: 'Três matrizes de custos mostram a original, a redução por linhas e a redução por colunas. Na última, os zeros escolhidos são (1,1), (2,3) e (3,2).',
    etapas: [
      ['Reduza cada linha', 'Subtraia 3 da linha 1, 2 da linha 2 e 2 da linha 3. Cada linha passa a ter pelo menos um zero.', '(3, 5, 6) − 3 → (0, 2, 3)'],
      ['Reduza cada coluna', 'Os mínimos das colunas agora são 0, 1 e 0. A segunda coluna é a única que muda.', '(2, 2, 1) − 1 → (1, 1, 0)'],
      ['Escolha zeros em linhas e colunas distintas', 'A linha 1 usa a coluna 1. A linha 2 usa a coluna 3. Na linha 3, use a coluna 2, pois a coluna 1 já foi usada.', '(1, 1) · (2, 3) · (3, 2)'],
      ['Volte à matriz original', 'Some os três custos que correspondem a essas posições. Os zeros da matriz reduzida indicam a escolha.', '3 + 2 + 3 = 8']
    ]
  }
};
