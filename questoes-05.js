const questoes05 = [
  {
    numero: 1, titulo: 'Identificar um circuito hamiltoniano', paginas: [1], topico: 'hamilton',
    enunciado: 'Qual dos grafos (a) e (b) admite um circuito hamiltoniano? Caso algum circuito seja admitido, mostre-o.',
    pista: 'Num dos desenhos, há um vértice que é a única passagem entre duas partes. No outro, siga o contorno.',
    conferencia: [
      'Em (a), remover V5 separa os vértices em dois pares conectados, logo um único corte deixa mais de uma componente.',
      'Em (b), V1 → V2 → V3 → V4 → V1 é um circuito hamiltoniano. Ele usa cada vértice uma vez antes da volta.'
    ],
    checagens: [{ rotulo: 'Grafo que admite o circuito', tipo: 'texto', respostas: ['b', '(b)', 'grafo b'], dica: 'Compare as componentes após remover o vértice central de (a) e procure um ciclo pelo contorno de (b).' }]
  },
  {
    numero: 2, titulo: 'Contar ciclos em cinco grafos completos', paginas: [1], topico: 'hamilton',
    enunciado: 'Conte os ciclos hamiltonianos nos cinco grafos da questão. Calcule tanto a quantidade total quanto o maior número de ciclos que podem ter arestas mutuamente disjuntas.',
    pista: 'Conte os vértices marcados de cada desenho. A contagem total fixa a partida e identifica sentidos inversos. A contagem disjunta depende da paridade da ordem.',
    conferencia: [
      'De cima para baixo, lendo cada linha da esquerda para a direita, as ordens dos desenhos são 5, 4, 8, 20 e 11.',
      'Os totais são 12, 3, 2.520, 60.822.550.204.416.000 e 1.814.400. Cada total vem de (n − 1)! ÷ 2.',
      'As quantidades máximas mutuamente disjuntas em arestas são 2, 1, 3, 9 e 5. Aplique a fórmula par ou ímpar do slide 21.'
    ],
    checagens: [
      { rotulo: 'Total de ciclos no grafo verde de ordem 20', tipo: 'numero', respostas: ['60822550204416000'], dica: 'Fixe a partida, permute os 19 vértices restantes e divida o fatorial por dois.' },
      { rotulo: 'Máximo de ciclos mutuamente disjuntos no grafo de ordem 11', tipo: 'numero', respostas: ['5'], dica: 'Use o ramo da fórmula da Aula 05 para ordem ímpar.' }
    ]
  },
  {
    numero: 3, titulo: 'Arranjos de nove pessoas à mesa', paginas: [1], topico: 'hamilton',
    enunciado: 'Nove membros de um clube almoçam juntos todos os dias. Querem se sentar a cada dia ao lado de pessoas diferentes. Durante quantos dias podem fazer novos arranjos? Quais são esses arranjos?',
    pista: 'Um dia equivale a um ciclo no grafo que liga todos aos outros. Uma dupla que já ficou lado a lado corresponde a uma aresta usada.',
    conferencia: [
      'Cada pessoa tem oito possíveis vizinhos e usa dois por dia. Assim, oito dividido por dois dá um limite de quatro dias.',
      'Com as pessoas A até I, quatro arranjos circulares válidos são A–B–I–C–H–D–G–E–F, A–C–B–D–I–E–H–F–G, A–D–C–E–B–F–I–G–H e A–E–D–F–C–G–B–H–I.',
      'Feche cada mesa voltando a A e confira os pares sem direção. As 36 adjacências dos quatro dias são diferentes.'
    ],
    checagens: [{ rotulo: 'Máximo de dias', tipo: 'numero', respostas: ['4'], dica: 'Divida a quantidade de vizinhos possíveis para uma pessoa pela quantidade de vizinhos usados a cada dia.' }]
  },
  {
    numero: 4, titulo: 'Testar a sequência ACEDBCA', paginas: [1], topico: 'cortes',
    enunciado: 'Explique por que a sequência ACEDBCA não é um circuito hamiltoniano para o grafo mostrado. O grafo admite algum circuito hamiltoniano?',
    pista: 'Cheque cada par consecutivo e as repetições. Depois retire o vértice que liga os dois lados.',
    conferencia: [
      'A sequência usa D–B, que não é uma aresta do desenho. C é repetido como vértice intermediário.',
      'Ao retirar C ficam dois componentes. Como 2 > 1, o grafo não tem circuito hamiltoniano.'
    ]
  },
  {
    numero: 5, titulo: 'Vizinho mais próximo com quatro partidas por grafo', paginas: [2], topico: 'caixeiro',
    enunciado: 'Use o algoritmo do vizinho mais próximo para obter possíveis soluções do problema do caixeiro viajante nos três grafos apresentados. Para cada grafo, experimente pelo menos quatro pontos de partida diferentes.',
    pista: 'Compare apenas as arestas do vértice atual que levam a vértices ainda não visitados. Registre também a aresta de retorno.',
    conferencia: [
      'Separe as partidas por grafo e anote as escolhas, os custos e o retorno em cada tentativa.',
      'No primeiro grafo, as quatro partidas produzem o mesmo custo 170. A versão guiada confere cada aresta desse primeiro desenho.',
      'Nos outros desenhos, siga as arestas que o enunciado apresenta. Registre se uma partida ficar sem candidato ou sem aresta de retorno e compare os ciclos que conseguiu fechar.'
    ]
  },
  {
    numero: 6, titulo: 'Encontrar dois circuitos começando em a', paginas: [2], topico: 'hamilton',
    enunciado: 'No grafo da figura, encontre pelo menos dois circuitos hamiltonianos diferentes que comecem no vértice a.',
    pista: 'Use as ligações entre o contorno exterior e o quadrado interior para visitar todos os oito vértices.',
    conferencia: [
      'Confira as oito arestas de cada circuito, inclusive o fechamento em a. Os vértices b, c, d, e, f, g e h devem aparecer uma única vez.',
      'Duas possibilidades são a → b → d → c → e → f → h → g → a e a → c → d → b → h → f → e → g → a. Compare os conjuntos de arestas para distinguir um ciclo de sua inversão.'
    ],
    checagens: [{ rotulo: 'Número de arestas em cada circuito', tipo: 'numero', respostas: ['8'], dica: 'Cada vértice fornece um deslocamento de saída, inclusive o último que fecha a volta.' }]
  },
  {
    numero: 7, titulo: 'Provar que G₁ e G₂ não são hamiltonianos', paginas: [2], topico: 'cortes',
    enunciado: 'Dê uma prova de que os dois grafos, G₁ e G₂, não são hamiltonianos.',
    pista: 'Procure em cada desenho um único vértice cuja remoção deixe duas partes sem ligação.',
    conferencia: [
      'Em G₁, retire o vértice comum aos dois triângulos. Em G₂, retire um dos vértices em que um triângulo externo encontra o miolo.',
      'Em cada caso, o número de componentes restantes é maior que o número de vértices retirados. Isso exclui a existência do circuito.'
    ]
  },
  {
    numero: 8, titulo: 'Escolher uma rota pela Península Ibérica', paginas: [3], topico: 'caixeiro',
    enunciado: 'Um viajante precisa visitar clientes em seis cidades da Península Ibérica. Use o mapa e a tabela de distâncias do enunciado para encontrar a rota de menor custo obtida pelo vizinho mais próximo. Pode partir de qualquer cidade.',
    pista: 'Experimente cada uma das seis cidades como partida. A última distância é a volta à cidade inicial.',
    conferencia: [
      'Em ordem de partida de Aveiro, Évora, Faro, Badajoz, Córdoba e Madrid, os custos obtidos são 2.356, 2.337, 2.164, 2.011, 2.164 e 2.259 km.',
      'A menor entre essas tentativas começa em Badajoz e passa por Évora, Faro, Córdoba, Madrid, Aveiro e volta a Badajoz.',
      'Some 99 + 231 + 326 + 424 + 559 + 372. O resultado compara partidas da heurística ensinada nos slides 51–53.'
    ],
    checagens: [{ rotulo: 'Custo da melhor tentativa em quilômetros', tipo: 'numero', respostas: ['2011'], dica: 'Compare as seis partidas da tabela, somando a volta à origem em cada uma.' }]
  }
];
