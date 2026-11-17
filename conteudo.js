/* Páginas contadas a partir da capa de cada PDF. */
const aulas = [
  {
    id: '05', titulo: 'Grafos hamiltonianos', cor: 'indigo', simbolo: '◇',
    resumo: 'Caminhos, ciclos, remoção de vértices e caixeiro viajante.',
    topicos: [
      {
        id: 'hamilton', titulo: 'Caminhos e ciclos hamiltonianos', paginas: '3–8, 21–26', pagina: 3,
        figura: 'ciclo-exemplo', legenda: 'Comparação entre os grafos G₁ e G₂ (p. 8).',
        alt: 'O grafo G₁ tem um ciclo destacado que percorre os cinco vértices. G₂ não tem ciclo hamiltoniano.',
        pontos: [
          'Num caminho hamiltoniano, percorremos cada vértice exatamente uma vez. Num ciclo hamiltoniano, o percurso também volta ao vértice de partida.',
          'Em G₁, acompanhe as setas de v₁ a v₂, v₃, v₄ e v₅. A aresta de v₅ a v₁ fecha o ciclo. Basta encontrar um ciclo assim para confirmar que o grafo é hamiltoniano.',
          'Com n vértices, um caminho hamiltoniano aberto tem n − 1 arestas. Um ciclo hamiltoniano tem n, pois inclui a volta. Em K₂ há caminho aberto. Em Kₙ simples com n > 2 há ciclo.',
          'Em Kₙ, com n ≥ 3, há (n − 1)!/2 ciclos quando contamos todas as possibilidades sem exigir arestas disjuntas. O slide 21 trata do caso em que os ciclos precisam usar conjuntos de arestas disjuntos.'
        ],
        treino: 'circuito'
      },
      {
        id: 'graus', titulo: 'Condições suficientes e necessárias', paginas: '14–18', pagina: 14,
        figura: 'grau-exemplo', legenda: 'Ciclo de ordem 6 usado como contraexemplo (p. 18).',
        alt: 'Hexágono em que os seis vértices têm grau 2.',
        pontos: [
          'Em um grafo simples de ordem p ≥ 3, a condição de graus do slide 14 garante um ciclo hamiltoniano quando todos os vértices têm grau de pelo menos p/2.',
          'No ciclo de ordem 6 do slide, o limiar é 3 e cada vértice tem grau 2. Ainda assim, o contorno inteiro já é um ciclo hamiltoniano. Por isso o teste é suficiente e o resultado fica em aberto quando o teste falha.'
        ]
      },
      {
        id: 'cortes', titulo: 'Remoção de vértices e redução', paginas: '27–36, 43', pagina: 27,
        figura: 'corte-exemplo', legenda: 'Exemplos de remoção que impedem um ciclo (p. 30).',
        alt: 'O vértice p é a única ligação entre as duas partes do primeiro grafo.',
        pontos: [
          'Remova k vértices com suas arestas incidentes. Se sobrarem mais de k componentes, o grafo original não admite ciclo hamiltoniano. A remoção de p no primeiro desenho deixa duas componentes com k = 1.',
          'Se sobrarem mais de k + 1 componentes, fica excluído também o caminho hamiltoniano aberto. Em um percurso aberto, remover k vértices o separa em no máximo k + 1 trechos.',
          'Ao construir um ciclo, inclua as duas arestas de qualquer vértice de grau 2. Quando duas arestas de um vértice já forem obrigatórias, descarte as demais. Um ciclo fechado antes de visitar todos os vértices invalida a construção.'
        ],
        treino: 'circuito'
      },
      {
        id: 'caixeiro', titulo: 'Caixeiro viajante e vizinho mais próximo', paginas: '44, 49–53', pagina: 51,
        figura: 'vizinho-exemplo', legenda: 'Percurso iniciado em s, destacado no slide (p. 52).',
        alt: 'Grafo ponderado com o percurso s, v, w, u, z, s destacado.',
        pontos: [
          'O objetivo do caixeiro viajante é construir um ciclo que visite todas as cidades e minimize o custo total. No vizinho mais próximo, parta de uma cidade e compare as arestas que levam a cidades ainda não visitadas.',
          'A cada passo, escolha uma dessas arestas de menor custo. Quando todas as cidades tiverem sido visitadas, volte ao ponto de partida e inclua essa última aresta na soma.',
          'No exemplo iniciado em s, o slide marca s → v → w → u → z → s. O próximo slide mostra que a escolha mais barata a cada passo pode deixar um retorno muito caro.'
        ],
        treino: 'vizinho'
      }
    ]
  },
  {
    id: '06', titulo: 'Coloração de grafos', cor: 'violet', simbolo: '◐',
    resumo: 'Número cromático, heurísticas de coloração e planaridade.',
    topicos: [
      {
        id: 'cores', titulo: 'Coloração própria e número cromático', paginas: '11–24, 33–39', pagina: 18,
        figura: 'cores-exemplo', legenda: 'Exames organizados em dois horários (p. 39).',
        alt: 'As disciplinas com estudantes em comum são ligadas no grafo e aparecem em classes de cores distintas.',
        pontos: [
          'Uma coloração de vértices é própria quando as pontas de cada aresta têm cores diferentes. O número cromático χ(G) é o menor número de cores com que podemos atender a essa regra.',
          'Nos slides de horários de prova, cada vértice é uma disciplina. A aresta indica um aluno em comum. Cada classe de cor reúne disciplinas que podem aplicar a prova simultaneamente.',
          'O exemplo divide as disciplinas em {B, G, H, M} e {F, I, P, Q}. Observe que toda aresta entre disciplinas tem pontas em grupos diferentes.'
        ],
        treino: 'coloracao'
      },
      {
        id: 'heuristicas-cores', titulo: 'Métodos de coloração de vértices', paginas: '49–67', pagina: 49,
        figura: 'sequencial-exemplo', legenda: 'O mesmo grafo que recebeu quatro cores no slide anterior admite três (p. 51).',
        alt: 'Grafo do exemplo da coloração sequencial, mostrado ao lado de três cores possíveis.',
        pontos: [
          'Na coloração sequencial, siga a lista dada e escolha a menor cor que ainda está livre entre os vizinhos já coloridos.',
          'No Welch–Powell apresentado no slide 54, a prioridade é o maior grau. Entre vértices empatados, priorize aquele com o maior número de cores distintas nos seus vizinhos já coloridos. Então atribua a menor cor disponível.',
          'Os slides mostram também ordens de visita obtidas por busca em profundidade e em largura. A ordem pode alterar a quantidade de cores usada. No exemplo dos slides 50–51, a coloração sequencial usou quatro, mas existe uma coloração com três.'
        ],
        treino: 'coloracao'
      },
      {
        id: 'planaridade', titulo: 'Coloração de arestas e planaridade', paginas: '68–85', pagina: 68,
        figura: 'planaridade-exemplo', legenda: 'Diferentes desenhos do grafo e contagem de faces (p. 80).',
        alt: 'Desenhos do grafo completo de quatro vértices, incluindo representações planares com faces nomeadas.',
        pontos: [
          'Na coloração de arestas, arestas com um vértice em comum precisam de cores distintas. O índice cromático é a menor quantidade de cores necessária para colorir as arestas.',
          'Um desenho planar posiciona as arestas sem cruzamentos. Para os desenhos planares conexos do slide, use a fórmula de Euler n − m + f = 2. Conte também a face exterior.',
          'A aula cita o teorema das quatro cores para vértices de grafos planares (p. 32).'
        ]
      }
    ]
  },
  {
    id: '07', titulo: 'Algoritmo de Huffman', cor: 'orange', simbolo: '⑂',
    resumo: 'Códigos de prefixo, construção da árvore e compressão.',
    topicos: [
      {
        id: 'huffman', titulo: 'Construção da árvore de Huffman', paginas: '13–24, 41–42', pagina: 15,
        figura: 'huffman-exemplo', legenda: 'Primeira junção do exemplo “bom esse bombom” (p. 18).',
        alt: 'As folhas e e s, ambas com peso 2, são reunidas sob uma raiz de peso 4.',
        pontos: [
          'Crie uma folha por símbolo, com o peso dado pela frequência. Retire as duas árvores de menor peso, crie um pai com a soma e reinsira a nova árvore. Repita até restar uma raiz.',
          'Na primeira junção de “bom esse bombom”, e e s têm peso 2 e formam um nó de peso 4. O espaço também tem peso 2 e é uma escolha válida no empate.',
          'A soma do peso de cada folha multiplicado pela profundidade dá o total de bits. No exemplo, o resultado é 39 bits. A aula mostra como conferir esse valor somando os pesos dos nós internos.'
        ],
        treino: 'huffman'
      },
      {
        id: 'prefixos', titulo: 'Prefixos, codificação e leitura', paginas: '3–12, 25–26, 33–35', pagina: 6,
        figura: 'prefixo-exemplo', legenda: 'Árvore e tabela de códigos de ABRACADABRA (p. 35).',
        alt: 'No exemplo, A recebe 0, C recebe 100, D recebe 101, B recebe 110 e R recebe 111.',
        pontos: [
          'A regra do prefixo impede que o código de um símbolo seja o início do código de outro. Com símbolos apenas nas folhas da árvore, alcançar uma folha indica que o símbolo terminou.',
          'Para obter um código, siga da raiz à folha, anotando 0 à esquerda e 1 à direita. Para decodificar, siga os bits até a próxima folha, emita seu símbolo e recomece na raiz.',
          'No exemplo de ABRACADABRA, A tem código 0. As cinco ocorrências de A contribuem com 5 bits do total.'
        ],
        treino: 'huffman'
      }
    ]
  },
  {
    id: '08', titulo: 'Fluxo em redes', cor: 'teal', simbolo: '⇄',
    resumo: 'Rede residual, Ford–Fulkerson e corte mínimo.',
    topicos: [
      {
        id: 'residual', titulo: 'Capacidade, rede residual e Ford–Fulkerson', paginas: '6–15, 19–32', pagina: 20,
        figura: 'residual-exemplo', legenda: 'Exemplo com um caminho aumentante destacado (p. 23).',
        alt: 'Redes de fluxo e redes residuais, com um caminho marcado que admite quatro unidades adicionais.',
        pontos: [
          'Uma rede tem arcos orientados, capacidades, uma fonte e um sumidouro. Em cada vértice intermediário, o fluxo que entra é igual ao que sai.',
          'A capacidade residual direta é a capacidade do arco menos o fluxo já enviado. A reversa representa quanto desse envio pode ser desfeito.',
          'Escolha um caminho da fonte ao destino com capacidades residuais positivas. O menor residual do caminho é o gargalo. Diminua-o nos arcos residuais percorridos e aumente pelo mesmo valor os arcos residuais inversos.'
        ],
        treino: 'fluxo'
      },
      {
        id: 'mincorte', titulo: 'Fluxo máximo e corte mínimo', paginas: '36–47', pagina: 36,
        figura: 'mincorte-exemplo', legenda: 'Identificação do corte mínimo depois de Ford–Fulkerson (p. 47).',
        alt: 'No exemplo, as capacidades 12, 7 e 4 dos arcos que cruzam de S para T somam 23.',
        pontos: [
          'Um corte separa os vértices em S e T, com a fonte em S e o sumidouro em T. Para calcular a capacidade do corte, some as capacidades dos arcos que vão de S para T.',
          'Ao terminar Ford–Fulkerson, tome S como o conjunto dos vértices ainda alcançáveis a partir da fonte na rede residual. O restante pertence a T. A capacidade desse corte é igual ao fluxo máximo.',
          'No exemplo final, três arcos cruzam de S para T com capacidades 12, 7 e 4, certificando o valor 23.'
        ],
        treino: 'fluxo'
      }
    ]
  },
  {
    id: '12', titulo: 'Conjuntos, casamento e alocação', cor: 'slate', simbolo: '⊞',
    resumo: 'Conjuntos independentes, cliques, dominantes e Método Húngaro.',
    topicos: [
      {
        id: 'independentes', titulo: 'Conjuntos independentes', paginas: '5–29', pagina: 7,
        figura: 'independente-exemplo', legenda: 'Conjuntos maximal e máximo no mesmo grafo (p. 7).',
        alt: 'O conjunto a, d é maximal com dois vértices. O conjunto a, c, e é máximo com três.',
        pontos: [
          'Um conjunto independente é um grupo de vértices em que nenhum par é vizinho. No exemplo de provas, uma aresta representa conflito de horário.',
          'No grafo do slide, não cabe acrescentar nenhum vértice a {a, d}, portanto ele é maximal. {a, c, e} tem três vértices e atinge o tamanho máximo, α(G) = 3.',
          'O algoritmo guloso da aula começa pelo menor grau, inclui um vértice elegível e remove esse vértice e os seus vizinhos do grafo restante.'
        ]
      },
      {
        id: 'cliques', titulo: 'Cliques', paginas: '34–52', pagina: 34,
        figura: 'clique-exemplo', legenda: 'Cliques maximais de diferentes tamanhos (p. 34).',
        alt: 'Um grafo acompanhado por vários grupos destacados em que todo par de vértices está ligado.',
        pontos: [
          'Uma clique reúne vértices em que cada par é adjacente. Uma clique é maximal quando nenhum vértice externo pode ser incluído. Uma clique máxima tem o maior tamanho possível, ω(G).',
          'O slide mostra que um mesmo grafo pode ter várias cliques maximais. No grafo complementar, as ligações trocam com as ausências de ligações. Assim um conjunto independente no grafo vira uma clique no complementar (p. 52).'
        ]
      },
      {
        id: 'dominantes', titulo: 'Conjuntos dominantes', paginas: '54–63', pagina: 54,
        figura: 'dominante-exemplo', legenda: 'Duas maneiras de dominar o mesmo grafo (p. 54).',
        alt: 'Os vértices a e d dominam o grafo em um exemplo. O vértice central f, sozinho, domina o mesmo grafo.',
        pontos: [
          'Em um conjunto dominante, todo vértice pertence ao conjunto ou é vizinho de um vértice escolhido. No exemplo, f alcança todos os demais e sozinho dá γ(G) = 1.',
          'Um dominante minimal perde a propriedade se algum escolhido for removido. Um dominante mínimo usa a menor quantidade possível de vértices.'
        ]
      },
      {
        id: 'casamento', titulo: 'Casamento em grafos', paginas: '65–71', pagina: 65,
        figura: 'casamento-exemplo', legenda: 'Casamentos maximal e máximo (p. 65).',
        alt: 'O mesmo grafo com um casamento maximal de duas arestas e um casamento máximo de três.',
        pontos: [
          'Um casamento é um conjunto de arestas que não compartilham vértices. É perfeito se todos os vértices pertencem a alguma das arestas escolhidas.',
          'Uma cadeia M-aumentante alterna arestas fora e dentro do casamento e liga dois vértices livres. Ao trocar quais arestas da cadeia pertencem ao casamento, ganhamos uma aresta. Pelo teorema de Berge apresentado na aula, um casamento só é máximo quando já não existe cadeia aumentante.',
          'Um vértice saturado é ponta de uma aresta escolhida. Um casamento máximo pode deixar vértices livres, como na estrela do slide 69. No grafo bipartido do slide 71, as arestas ligam lados distintos. Na convenção daquela página, um casamento de X em Y satura todos os vértices de Y.'
        ]
      },
      {
        id: 'alocacao', titulo: 'Alocação linear e Método Húngaro', paginas: '73–84', pagina: 73,
        figura: 'alocacao-exemplo', legenda: 'Redução por linhas e colunas na matriz operários × máquinas (p. 77).',
        alt: 'Uma matriz de custos três por três é reduzida até ser possível escolher três zeros, um por linha e coluna.',
        pontos: [
          'Cada operário recebe uma máquina diferente. Na matriz de custos, escolha um elemento por linha e coluna com a menor soma possível.',
          'Subtraia o menor valor de cada linha, depois de cada coluna. Cubra os zeros com o menor número de linhas ou colunas. Se faltarem riscos, use o menor valor descoberto para ajustar a matriz conforme o slide 84.',
          'Quando for possível selecionar zeros em linhas e colunas distintas, leia o custo da alocação na matriz original. É ali que estão os custos reais.'
        ]
      }
    ]
  }
];

const exercicios = [
  {
    id: 'circuito', aula: '05', numero: '4', pagina: 1, topico: 'cortes',
    titulo: 'Um circuito ou dois ciclos menores?',
    enunciado: 'Explique por que a sequência ACEDBCA não é um circuito hamiltoniano para o grafo a seguir. Esse grafo admite um circuito hamiltoniano?',
    preparo: 'Confira as arestas entre letras consecutivas e procure vértices repetidos. Para verificar se existe algum circuito hamiltoniano, relacione a remoção de vértices com a quantidade de componentes que sobram.',
    figura: 'circuito',
    alt: 'Grafo com as arestas A–B, A–C, B–C, C–D, C–E e D–E.'
  },
  {
    id: 'vizinho', aula: '05', numero: '5 · primeiro grafo', pagina: 2, topico: 'caixeiro',
    titulo: 'Vizinho mais próximo',
    enunciado: 'Usando o vizinho mais próximo, encontre possíveis soluções para o problema do caixeiro viajante, considerando pelo menos quatro pontos de partida. Aqui você vai resolver o primeiro grafo, no canto superior esquerdo da lista.',
    preparo: 'Compare os pesos das arestas que saem da cidade atual e chegam a cidades inéditas. Depois de visitar todas, contabilize o retorno à partida. Faça uma rodada para cada vértice.',
    figura: 'vizinho',
    alt: 'Grafo completo em que 1–2 tem peso 39, 1–3 tem 41, 1–4 tem 73, 2–3 tem 82, 2–4 tem 58 e 3–4 tem 32.'
  },
  {
    id: 'coloracao', aula: '06', numero: '2(b)', pagina: 1, topico: 'heuristicas-cores',
    titulo: 'Coloração com Welch–Powell',
    enunciado: 'Utilize o algoritmo de Welch–Powell para colorir o grafo do item b e determine seu número cromático. Mostre a aplicação passo a passo.',
    preparo: 'Escolha um vértice sem cor de maior grau. No empate, verifique quantas cores distintas aparecem entre os vizinhos já coloridos de cada candidato. Atribua a menor cor disponível.',
    figura: 'coloracao',
    alt: 'Quadrado com contorno 1–4–3–2–1 e vértice central 5 ligado aos quatro cantos.'
  },
  {
    id: 'huffman', aula: '07', numero: '10', pagina: 3, topico: 'huffman',
    titulo: 'Huffman com frequências de Fibonacci',
    enunciado: 'Qual é um código de Huffman para as frequências a:1, b:1, c:2, d:3, e:5, f:8, g:13 e h:21?',
    preparo: 'Em cada rodada, selecione as duas raízes de menor peso. A primeira seleção vira o ramo esquerdo (0), a segunda, o direito (1). As escolhas podem variar quando os pesos empatam.'
  },
  {
    id: 'fluxo', aula: '08', numero: '1', pagina: 1, topico: 'residual',
    titulo: 'Fluxo máximo de 1 até 5',
    enunciado: 'Encontre o fluxo máximo da rede de 1 a 5. Mostre passo a passo a aplicação do algoritmo de Ford–Fulkerson.',
    preparo: 'Trabalhe com a rede residual. Em cada caminho de 1 a 5, use apenas arcos com residual positivo. Encontre o gargalo e acompanhe a atualização das capacidades nos dois sentidos.',
    figura: 'fluxo',
    alt: 'Arcos e capacidades: 1→2: 4, 1→3: 3, 2→4: 5, 2→5: 2, 4→3: 7, 4→5: 2, 3→5: 6.'
  }
];
