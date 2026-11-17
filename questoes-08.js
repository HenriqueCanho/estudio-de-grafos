const questoes08 = [
  {
    numero: 1,
    titulo: 'Ford–Fulkerson de 1 a 5',
    paginas: [1],
    topico: 'residual',
    enunciado: 'Encontre o fluxo máximo da rede da figura com origem no vértice 1 e destino no vértice 5. Mostre, passo a passo, a aplicação do algoritmo de Ford–Fulkerson.',
    pista: 'Comece com fluxo zero. A cada caminho de 1 a 5, anote a menor capacidade residual e atualize os arcos diretos e reversos.',
    conferencia: [
      'Uma sequência possível envia 2 por 1→2→5, 3 por 1→3→5 e 2 por 1→2→4→5.',
      'Os arcos 1→2 e 1→3 ficam saturados. O corte que deixa apenas 1 no lado da origem tem capacidade 4 + 3 = 7.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo de 1 a 5', tipo: 'numero', respostas: ['7'], dica: 'Compare a soma dos seus aumentos com a capacidade total que sai de 1.' }
    ]
  },
  {
    numero: 2,
    titulo: 'Transporte de arroz',
    paginas: [1],
    topico: 'modelagem-fluxo',
    enunciado: 'A tabela da lista dá as capacidades rodoviárias entre cidades, em milhares de toneladas por dia. A estação de beneficiamento distribui toda a produção e pode enviar até 30 para PA e até 20 para Cx. O armazém é o destino final, com demanda indicada de 40 toneladas. Recebe de Rio, Flo, Cur e SP por ligações de capacidades 15, 4, 7 e 19, respectivamente. Determine a quantidade máxima transportável. A demanda é atendida? Caso seja preciso adequar a malha para atendê-la, indique uma alteração.',
    pista: 'Use a estação e o armazém como novos vértices. Leia cada entrada da tabela no sentido De → Para e compare o que pode chegar a cada cidade com a respectiva saída ao armazém.',
    conferencia: [
      'PA pode repassar 10 a Rio, 3 a Flo, 5 a Cur e 10 a SP. Cx pode repassar 5 a Rio, 1 a Flo, 2 a Cur e 7 a SP.',
      'Um corte cruza as saídas de Rio, Flo e Cur para o armazém e as entradas em SP vindas de PA e Cx. A capacidade é 15 + 4 + 7 + 10 + 7 = 43.',
      'Usando 40 na escala da tabela, a rede atende à demanda e dispensa adequação. O fluxo máximo excede essa demanda em 3.'
    ],
    checagens: [
      { rotulo: 'Capacidade máxima em milhares de toneladas por dia', tipo: 'numero', respostas: ['43'], dica: 'A ligação de SP ao armazém admite 19, mas verifique quanto consegue chegar a SP.' },
      { rotulo: 'A demanda de 40 é atendida? Responda sim ou não.', tipo: 'texto', respostas: ['sim', 'sim, é atendida', 'sim, a demanda é atendida'], dica: 'Compare os dois valores na escala da tabela.' }
    ],
    observacao: 'O original informa a demanda em toneladas e as capacidades em milhares de toneladas por dia. A comparação usa o valor 40 na escala da tabela.'
  },
  {
    numero: 3,
    titulo: 'Ford–Fulkerson de 1 a 7',
    paginas: [1, 2],
    topico: 'residual',
    enunciado: 'Encontre o fluxo máximo da rede da figura com origem no vértice 1 e destino no vértice 7. Mostre, passo a passo, a aplicação do algoritmo de Ford–Fulkerson.',
    pista: 'Antes de montar o primeiro caminho, confira quais setas entram em 7. Observe a ponta da seta entre 6 e 7.',
    conferencia: [
      'O caminho 1→4→5→7 admite um aumento de 3, a menor capacidade do caminho.',
      'Após o aumento, o único arco que entra em 7, vindo de 5, fica saturado. O arco de capacidade 10 sai de 7 em direção a 6.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo de 1 a 7', tipo: 'numero', respostas: ['3'], dica: 'Some somente as capacidades dos arcos que chegam a 7.' }
    ]
  },
  {
    numero: 4,
    titulo: 'Tráfego de v a w',
    paginas: [2],
    topico: 'mincorte',
    enunciado: 'No grafo da figura, cada arco representa uma rua de mão única e seu peso indica o maior fluxo que a rua comporta, em veículos por hora. Qual é o maior número de veículos que pode viajar de v a w em uma hora?',
    pista: 'Considere as entradas em w e pergunte se as ruas até x e z permitem ocupar todas elas ao mesmo tempo.',
    conferencia: [
      'É possível fazer chegar 2 veículos a w via x e 4 via z. Para chegar a z, use 1 de v, 2 de y e 1 de x.',
      'As duas entradas em w têm capacidade total 2 + 4 = 6. O fluxo construído atinge esse limite.'
    ],
    checagens: [
      { rotulo: 'Máximo de veículos por hora', tipo: 'numero', respostas: ['6'], dica: 'Verifique o sentido das duas setas verticais e quanto pode passar de x para z.' }
    ]
  },
  {
    numero: 5,
    titulo: 'Modelagem do transporte por caminhões',
    paginas: [2],
    topico: 'modelagem-fluxo',
    enunciado: 'Uma empresa deseja transportar a maior quantidade possível de produtos entre duas cidades pela rede rodoviária. Cada estrada comporta um número finito de caminhões. Como determinar o fluxo máximo que a rede permite?',
    pista: 'Indique quais elementos da situação viram vértices, arcos e capacidades. Explique também como verificar se ainda cabe mais um aumento.',
    conferencia: [
      'Modele as cidades como vértices, as estradas como arcos nos sentidos permitidos e o limite de caminhões por período como capacidade de cada arco.',
      'Escolha a cidade de partida como fonte e a de chegada como sumidouro. Em cada cidade intermediária, iguale as quantidades de caminhões que entram e saem.',
      'Aplique Ford–Fulkerson, aumentando pelo gargalo de cada caminho residual e atualizando os arcos reversos. O processo termina quando o destino deixa de ser alcançável pela origem na rede residual.'
    ]
  },
  {
    numero: 6,
    titulo: 'Da tabela de capacidades à rede S–T',
    paginas: [2],
    topico: 'modelagem-fluxo',
    enunciado: 'Desenhe o grafo a partir da tabela de custos da lista, usando os valores como capacidades. Em seguida, calcule o fluxo máximo do grafo montado.',
    pista: 'Leia a linha como origem do arco e a coluna como destino. Compare a capacidade que sai de S com a capacidade disponível para encaminhar o fluxo pelos vértices 1 e 2.',
    conferencia: [
      'Os vértices são S, 1, 2, 3, 4 e T. As entradas positivas geram arcos dirigidos. Por exemplo, a linha 4 dá os arcos 4→3 de capacidade 2 e 4→T de capacidade 6.',
      'É possível enviar 2 por S→1→3→T, 1 por S→1→4→T, 1 por S→2→3→T e 3 por S→2→4→T.',
      'O corte com S e 2 no lado da origem cruza S→1, 2→3 e 2→4, com capacidade 3 + 1 + 3 = 7.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo de S a T', tipo: 'numero', respostas: ['7'], dica: 'A saída total de S é 8. Veja se o vértice 2 consegue encaminhar todas as 5 unidades que poderia receber.' }
    ],
    observacao: 'O original menciona “exercício anterior (questão 4)”. A rede pedida é a definida pela tabela desta questão, com fonte S e destino T.'
  },
  {
    numero: 7,
    titulo: 'Fluxo máximo e corte mínimo em D',
    paginas: [3],
    topico: 'mincorte',
    enunciado: 'Considere a rede dirigida D = (V, E), com V = {s, v1, v2, v3, v4, t}. As capacidades são c(s, v1) = 4, c(s, v2) = 4, c(s, v3) = 3, c(v1, v3) = 5, c(v3, v2) = 2, c(v2, v3) = 3, c(v4, v1) = 4, c(v3, v4) = 4, c(v2, t) = 3 e c(v4, t) = 6. Determine um fluxo máximo e um corte mínimo em D.',
    pista: 'Examine o que limita a entrada em v4, além da ligação de v2 diretamente a t. Para localizar um corte, marque os vértices alcançáveis a partir de s na rede residual final.',
    conferencia: [
      'Uma solução envia 3 por s→v2→t, 3 por s→v3→v4→t e 1 por s→v1→v3→v4→t.',
      'No corte {s, v1, v2, v3} e {v4, t}, os arcos do lado da fonte para o lado do destino são v3→v4 e v2→t. A soma é 4 + 3 = 7.',
      'O arco v4→v1 atravessa o corte no sentido de volta e fica de fora da capacidade.'
    ],
    checagens: [
      { rotulo: 'Valor do fluxo máximo', tipo: 'numero', respostas: ['7'], dica: 'v4→t comporta 6, mas v4 só recebe fluxo pela ligação v3→v4.' },
      { rotulo: 'Capacidade do corte mínimo', tipo: 'numero', respostas: ['7'], dica: 'Some as capacidades dos arcos que atravessam do lado de s para o lado de t.' }
    ]
  },
  {
    numero: 8,
    titulo: 'Aumento a partir de um fluxo existente',
    paginas: [3],
    topico: 'fluxo-parcial',
    enunciado: 'Na rede da figura, os pares indicam a capacidade e o fluxo de cada arco, nessa ordem. Partindo do fluxo atual de 2 unidades, determine o fluxo máximo do nó 1 para o nó 4.',
    pista: 'Procure um caminho na rede residual que desfaça parte do fluxo de 2 para 3 e aproveite a capacidade livre rumo a 4.',
    conferencia: [
      'O arco 2→3 carrega 1 unidade, portanto a rede residual tem 1 unidade disponível em 3→2.',
      'O caminho residual 1→3→2→4 aumenta o total em 1 e zera o fluxo original de 2→3.',
      'O novo total é 3. Os dois arcos que saem de 1 ficam saturados.'
    ],
    checagens: [
      { rotulo: 'Capacidade residual de 3 para 2 no início', tipo: 'numero', respostas: ['1'], dica: 'Use o fluxo já enviado de 2 para 3 para determinar quanto pode ser desfeito.' },
      { rotulo: 'Fluxo máximo de 1 a 4', tipo: 'numero', respostas: ['3'], dica: 'Acrescente ao fluxo inicial o gargalo do caminho residual que usa 3→2.' }
    ]
  },
  {
    numero: 9,
    titulo: 'Petróleo do poço ao navio',
    paginas: [3],
    topico: 'mincorte',
    enunciado: 'Qual é a quantidade máxima de petróleo que pode seguir do poço ao navio pela rede da figura?',
    pista: 'Veja quanto petróleo consegue passar pelo ramo inferior, pela entrada em c, e pelo ramo superior, pela saída de b.',
    conferencia: [
      'É possível enviar 30 pelo caminho s→a→b→t e 40 pelo caminho s→c→d→t.',
      'Com {s, a, b} no lado da fonte e {c, d, t} no lado do destino, o corte cruza s→c e b→t. Sua capacidade é 40 + 30 = 70.'
    ],
    checagens: [
      { rotulo: 'Quantidade máxima de petróleo', tipo: 'numero', respostas: ['70'], dica: 'A ligação d→t permite 50. Verifique o limite de abastecimento de d a partir da fonte.' }
    ]
  },
  {
    numero: 10,
    titulo: 'Rede com arcos opostos entre 3 e 4',
    paginas: [3, 4],
    topico: 'residual',
    enunciado: 'Calcule o fluxo máximo do vértice 1 para o vértice 5 na rede da figura.',
    pista: 'Tente ocupar as três entradas em 5. Observe as capacidades e os sentidos dos dois arcos entre 3 e 4.',
    conferencia: [
      'É possível enviar 8 por 1→2→5, 4 por 1→3→5 e 2 por 1→4→5. A rede ainda admite 1 por 1→4→2→5 e 1 por 1→4→3→5.',
      'Os arcos que entram em 5 ficam saturados. O corte que isola 5 tem capacidade 9 + 5 + 2 = 16.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo de 1 a 5', tipo: 'numero', respostas: ['16'], dica: 'Veja quanto pode chegar ao destino passando por 2, 3 e 4 ao mesmo tempo.' }
    ]
  },
  {
    numero: 11,
    titulo: 'Maximização de s a t',
    paginas: [4],
    topico: 'residual',
    enunciado: 'Maximize o fluxo de s a t no grafo da figura.',
    pista: 'O arco vertical permite transferir fluxo do vértice superior para o inferior. Veja quanto ainda cabe nas rotas inferior e curva até t.',
    conferencia: [
      'Use 1 unidade pela rota que vai do vértice superior direto a t. Encaminhe outras 2 do superior para o inferior, que recebe também 3 diretamente de s.',
      'Do vértice inferior saem 4 pelo arco curvo e 1 pelo vértice intermediário. As três entradas em t ficam saturadas, com capacidades 1, 1 e 4.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo de s a t', tipo: 'numero', respostas: ['6'], dica: 'Some a capacidade dos três arcos que chegam ao destino, incluindo o arco curvo.' }
    ]
  },
  {
    numero: 12,
    titulo: 'Fluxo máximo pelo teorema do corte',
    paginas: [4],
    topico: 'mincorte',
    enunciado: 'Encontre o fluxo máximo do grafo da figura utilizando o teorema do corte.',
    pista: 'Use o vértice mais à esquerda como fonte e o mais à direita como destino. Procure um fluxo realizável que iguale a capacidade de um corte.',
    conferencia: [
      'Separar apenas o destino no lado do sumidouro dá um corte de capacidade 1 + 5 + 4 = 10.',
      'Envie 4 diretamente do vértice inferior para o destino. Faça outras 5 chegarem pelo centro, com 3 vindas do vértice superior esquerdo e 2 do inferior.',
      'A décima unidade segue pelo arco horizontal superior até o vértice superior direito e de lá para o destino.'
    ],
    checagens: [
      { rotulo: 'Valor do fluxo máximo pelo teorema do corte', tipo: 'numero', respostas: ['10'], dica: 'Compare a capacidade das entradas no destino com um fluxo que respeite as ligações intermediárias.' }
    ]
  },
  {
    numero: 13,
    titulo: 'Caminhos aumentantes mínimos em duas redes',
    paginas: [4, 5],
    topico: 'fluxo-parcial',
    enunciado: 'Para cada uma das duas redes da figura, determine o fluxo máximo do nó 1 ao nó 6 pelo método dos caminhos aumentantes mínimos. Na rede superior, cada par (xij, uij) indica, respectivamente, o fluxo atual e a capacidade da aresta.',
    pista: 'Faça uma busca em largura na rede residual a cada iteração. Na rede superior, calcule as folgas com base no fluxo inicial. Na rede inferior, comece com fluxo zero.',
    conferencia: [
      'Na rede superior, o fluxo inicial é 14. A busca em largura encontra 1→3→5→6, com aumento 1, e em seguida 1→2→4→5→6, com aumento 1.',
      'Na rede inferior, os caminhos 1→5→6 e 1→3→6 admitem 2 cada, em qualquer ordem. Depois, 1→2→4→6 admite mais 1.',
      'As entradas no nó 6 ficam saturadas em ambas as redes. Os fluxos máximos são 16 na superior e 5 na inferior.'
    ],
    checagens: [
      { rotulo: 'Fluxo máximo na rede superior', tipo: 'numero', respostas: ['16'], dica: 'Some o fluxo que já entra em 6 aos aumentos possíveis pelas arestas residuais.' },
      { rotulo: 'Fluxo máximo na rede inferior', tipo: 'numero', respostas: ['5'], dica: 'Compare as três entradas em 6 após os aumentos encontrados por busca em largura.' }
    ],
    observacao: 'A segunda rede apresenta um número por arco. Ele foi interpretado como capacidade, com fluxo inicial zero.'
  }
];
