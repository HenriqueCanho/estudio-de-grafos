// Gerado por scripts/gerar_videoaulas.py.
const videoaulas = [
  {
    "id": "ciclos-hamiltonianos",
    "titulo": "Hamilton, Euler e a contagem de ciclos",
    "descricao": "Acompanhe os percursos e calcule quantos ciclos completos existem e quantos podem coexistir sem compartilhar arestas.",
    "aula": "05",
    "paginas": [
      20,
      26
    ],
    "topicos": [
      "hamilton"
    ],
    "questoes": [
      2,
      3
    ],
    "duracao": 157.08,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "O que cada circuito percorre",
        "fala": [
          "Num circuito hamiltoniano, percorremos cada vértice uma vez e voltamos à partida.",
          "Um circuito euleriano percorre cada aresta uma vez e também fecha na partida.",
          "Saia de a, passe por bê, pê, cê, dê, pê e feche na partida.",
          "Repare que pê aparece duas vezes, mesmo usando cada aresta uma única vez."
        ]
      },
      {
        "tempo": 21.977,
        "titulo": "Fixe o vértice de partida",
        "fala": [
          "No grafo completo, uma sequência de três ou mais vértices distintos sempre fecha.",
          "Escolha o vértice um como partida e ordene todos os demais vértices.",
          "Assim, cada circuito aparece em dois percursos, um para cada sentido.",
          "A inversão muda a ordem da visita e preserva as mesmas arestas."
        ]
      },
      {
        "tempo": 42.816,
        "titulo": "Os três ciclos de K₄",
        "fala": [
          "No completo de quatro vértices, sobram três posições depois da partida.",
          "Três vezes dois vezes um dá seis ordens para essas posições.",
          "Dividindo por dois, obtemos os três ciclos distintos da tabela.",
          "Os dois primeiros compartilham as ligações entre dois e três, e entre um e quatro."
        ]
      },
      {
        "tempo": 63.221,
        "titulo": "A fórmula do total e o caso de K₅",
        "fala": [
          "Para ene vértices, permute os ene menos um vértices depois da partida.",
          "O total é o fatorial de ene menos um, dividido por dois.",
          "No completo de cinco vértices, quatro fatorial dividido por dois dá doze."
        ]
      },
      {
        "tempo": 78.341,
        "titulo": "O limite de ciclos disjuntos",
        "fala": [
          "Ciclos disjuntos em arestas passam pelos mesmos vértices usando sempre ligações diferentes.",
          "Em cada vértice, um ciclo consome duas das ene menos uma arestas incidentes.",
          "O teorema dos completos garante que podemos atingir o limite inteiro dessa divisão.",
          "Divida por dois, usando ene menos um na ordem ímpar ou ene menos dois na par."
        ]
      },
      {
        "tempo": 102.163,
        "titulo": "Qual ciclo sobra em K₅?",
        "fala": [
          "O ciclo destacado usa as cinco arestas do contorno do grafo.",
          "Você consegue fechar outro ciclo usando apenas as ligações que ficaram livres?"
        ]
      },
      {
        "tempo": 116.024,
        "titulo": "As diagonais fecham um segundo ciclo",
        "fala": [
          "Siga de um para três, cinco, dois, quatro, e volte para um.",
          "Cada uma dessas cinco arestas é diferente das cinco arestas do contorno.",
          "Os dois ciclos juntos usam todas as dez arestas do grafo.",
          "A contagem disjunta é dois, e a contagem total continua sendo doze."
        ]
      },
      {
        "tempo": 135.31,
        "titulo": "Em K₄ só um ciclo por vez",
        "fala": [
          "No completo de quatro vértices, cada vértice tem três arestas incidentes.",
          "Depois de um circuito, sobra apenas uma ligação livre junto a cada vértice.",
          "Um segundo ciclo precisaria de duas ligações livres em todos eles.",
          "Ao ler um exercício, confira se ele pede o total ou a maior coleção disjunta."
        ]
      }
    ]
  },
  {
    "id": "graus-cortes-e-reducao",
    "titulo": "Graus, remoção de vértices e redução",
    "descricao": "Use a condição de Dirac para garantir um ciclo e procure certificados de impossibilidade por remoção ou redução.",
    "aula": "05",
    "paginas": [
      14,
      43
    ],
    "topicos": [
      "graus",
      "cortes"
    ],
    "questoes": [
      1,
      4,
      7
    ],
    "duracao": 152.09,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Quando o grau mínimo garante o ciclo",
        "fala": [
          "O teorema de Dirac se aplica a grafos simples com pelo menos três vértices.",
          "Se todo grau é pelo menos metade da ordem, existe um ciclo hamiltoniano.",
          "Neste exemplo, são seis vértices, cada qual com três arestas incidentes."
        ]
      },
      {
        "tempo": 16.54,
        "titulo": "O hexágono também tem ciclo",
        "fala": [
          "Retiramos as três diagonais do exemplo, deixando apenas as seis arestas do contorno.",
          "Cada vértice agora tem grau dois, abaixo do limiar de três.",
          "Mesmo assim, o contorno passa por todos os vértices e fecha em A.",
          "Quando o teste de graus falha, ainda precisamos investigar o grafo."
        ]
      },
      {
        "tempo": 36.703,
        "titulo": "Por que contar componentes",
        "fala": [
          "Retirar um vértice de um ciclo deixa um único trecho, com duas pontas.",
          "Cada retirada seguinte pode partir um trecho em, no máximo, dois.",
          "Ao retirar cá vértices de um caminho aberto, podemos obter até cá mais um trechos.",
          "Como as arestas extras só podem unir trechos, obtemos limites para as componentes."
        ]
      },
      {
        "tempo": 58.933,
        "titulo": "O que muda quando retiramos p?",
        "fala": [
          "Imagine que retiramos o vértice pê com todas as suas ligações.",
          "Quantas componentes ficam, e qual dos dois percursos esse número permite excluir?"
        ]
      },
      {
        "tempo": 72.846,
        "titulo": "Duas componentes excluem o ciclo",
        "fala": [
          "A remoção deixa dois grupos, e dois é maior que um.",
          "Isso exclui o ciclo e mantém em aberto a questão do caminho.",
          "Neste grafo, existe um caminho aberto que passa por a, bê, cê, pê, dê, é, efe."
        ]
      },
      {
        "tempo": 88.062,
        "titulo": "Teste um conjunto de dois vértices",
        "fala": [
          "Neste grafo, retirar apenas a ou apenas b ainda deixa todos conectados.",
          "Retirando os dois juntos, sobram quatro vértices isolados, cada qual uma componente.",
          "Quatro é maior que dois mais um, portanto até o caminho aberto fica excluído."
        ]
      },
      {
        "tempo": 105.587,
        "titulo": "Grau dois força as duas arestas",
        "fala": [
          "Cada vértice precisa de uma chegada e uma saída num ciclo hamiltoniano.",
          "Por isso, em b, d e f, todas as arestas disponíveis são obrigatórias.",
          "As seis arestas destacadas formam um trecho obrigatório entre a e h."
        ]
      },
      {
        "tempo": 121.207,
        "titulo": "Descarte as saídas que perderam espaço",
        "fala": [
          "Os vértices c e e já têm duas arestas obrigatórias cada.",
          "Apague as duas ligações extras de cada um e atualize os graus.",
          "Agora gê, dáblio e xis também têm exatamente duas arestas disponíveis."
        ]
      },
      {
        "tempo": 135.417,
        "titulo": "Um ciclo obrigatório fecha cedo",
        "fala": [
          "As ligações restantes de dáblio e xis forçam o triângulo destacado.",
          "Esse triângulo já fecha o percurso e deixa todos os outros vértices de fora.",
          "Como as regras forçaram esse fechamento, o grafo original fica sem ciclo hamiltoniano."
        ]
      }
    ]
  },
  {
    "id": "caixeiro-vizinho-mais-proximo",
    "titulo": "Caixeiro viajante e vizinho mais próximo",
    "descricao": "Siga as escolhas da heurística até a volta à origem e compare dois ciclos de custos muito diferentes.",
    "aula": "05",
    "paginas": [
      44,
      53
    ],
    "topicos": [
      "caixeiro",
      "heuristicas-pcv"
    ],
    "questoes": [
      5,
      8
    ],
    "duracao": 157.78,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Uma rota que volta à origem",
        "fala": [
          "Cada vértice representa uma cidade, e cada peso indica um custo de viagem.",
          "O caixeiro precisa visitar as cidades uma vez e voltar à cidade inicial.",
          "Entre esses ciclos, procuramos aquele cuja soma de custos é a menor."
        ]
      },
      {
        "tempo": 15.521,
        "titulo": "A regra da menor saída disponível",
        "fala": [
          "Comece em qualquer cidade e marque essa cidade como a primeira visitada.",
          "Da cidade atual, considere somente as arestas que levam a cidades inéditas.",
          "Percorra a de menor peso e repita a comparação na nova cidade.",
          "Em caso de empate, fixe um critério para conseguir reproduzir a rota."
        ]
      },
      {
        "tempo": 36.101,
        "titulo": "Primeira escolha no grafo de cinco cidades",
        "fala": [
          "Do vértice esse, as quatro cidades restantes ainda estão disponíveis para visita.",
          "A tabela mostra quanto custa sair do vértice esse para cada cidade.",
          "Qual cidade o vizinho mais próximo escolhe, e qual é o custo?"
        ]
      },
      {
        "tempo": 55.208,
        "titulo": "A primeira aresta custa cinco",
        "fala": [
          "A opção de menor custo é vê, porque a aresta vale cinco.",
          "Marque vê como visitado e passe a comparar as saídas desse vértice.",
          "Entre dáblio, zê e u, dáblio tem o menor custo, seis."
        ]
      },
      {
        "tempo": 68.639,
        "titulo": "Complete as visitas em ordem",
        "fala": [
          "De vê seguimos a dáblio, com seis, e de dáblio comparamos u e zê.",
          "A ligação até u custa sete, e a ligação até zê custa nove.",
          "Escolhemos u e depois zê, a última cidade ainda sem visita."
        ]
      },
      {
        "tempo": 83.034,
        "titulo": "Some também a última aresta",
        "fala": [
          "A partir de zê, voltamos à cidade inicial pela ligação de custo nove.",
          "O custo é cinco mais seis, mais sete, mais sete, mais nove, totalizando trinta e quatro.",
          "Nesse exemplo, a menor soma entre os doze ciclos possíveis também é trinta e quatro."
        ]
      },
      {
        "tempo": 101.327,
        "titulo": "Três escolhas baratas e uma volta cara",
        "fala": [
          "Neste novo grafo, parta do vértice esse e use as saídas de menor custo.",
          "Vamos a tê, depois u, depois vê, pagando uma unidade por trecho.",
          "Ao voltar de vê para esse, o último trecho custa um milhão.",
          "Com o fechamento, o custo total chega a um milhão e três."
        ]
      },
      {
        "tempo": 120.094,
        "titulo": "Um ciclo mais barato no mesmo grafo",
        "fala": [
          "Agora saímos de casa, passamos por tê, vê, u e voltamos ao vértice inicial.",
          "Os custos são um, dois, um e dois, que juntos somam seis.",
          "Esse ciclo viável de custo seis prova que a rota gulosa anterior é pior."
        ]
      },
      {
        "tempo": 136.474,
        "titulo": "Compare partidas e ciclos completos",
        "fala": [
          "Fixando a partida e identificando sentidos inversos, existem três ciclos neste grafo.",
          "A comparação dos três custos confirma seis como o melhor valor.",
          "Em exercícios, faça a heurística de várias partidas e registre cada volta.",
          "A menor soma obtida é a melhor entre as tentativas que você executou."
        ]
      }
    ]
  },
  {
    "id": "coloracao-sequencial-welch",
    "titulo": "Coloração sequencial e Welch–Powell",
    "descricao": "Compare as duas ordens de coloração no grafo de dez vértices e verifique o desempate da aula.",
    "aula": "06",
    "paginas": [
      49,
      50,
      51,
      54,
      55,
      56
    ],
    "topicos": [
      "cores",
      "heuristicas-cores"
    ],
    "questoes": [
      2,
      4,
      10
    ],
    "duracao": 148.04,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Uma cor por vértice",
        "fala": [
          "Uma coloração própria dá cores diferentes aos dois extremos de cada aresta.",
          "No método sequencial, a lista estabelece a ordem em que vamos colorir.",
          "Para cada vértice, use a menor cor ausente entre seus vizinhos já coloridos."
        ]
      },
      {
        "tempo": 16.098,
        "titulo": "As três primeiras escolhas",
        "fala": [
          "Comece pelo vértice um, que recebe a primeira cor porque seus vizinhos ainda estão livres.",
          "O dois toca o um e precisa usar a segunda cor.",
          "O três toca os dois anteriores e recebe, então, a terceira cor."
        ]
      },
      {
        "tempo": 31.388,
        "titulo": "A quarta cor aparece no nove",
        "fala": [
          "Quando chega a vez do nove, seus vizinhos já usam três cores diferentes.",
          "Os vértices quatro, dois e três bloqueiam, respectivamente, as cores um, dois e três.",
          "Por isso nove recebe a quarta cor, enquanto zero pode reutilizar a segunda."
        ]
      },
      {
        "tempo": 49.09,
        "titulo": "O grau decide a primeira prioridade",
        "fala": [
          "A regra da página cinquenta e quatro prioriza os vértices sem cor de maior grau.",
          "Em caso de empate, conte as cores distintas entre os vizinhos já coloridos.",
          "Recalcule essa contagem após cada escolha, porque as cores disponíveis podem mudar."
        ]
      },
      {
        "tempo": 66.249,
        "titulo": "O começo de Welch–Powell",
        "fala": [
          "Começamos por um, três e nove, os três vértices de grau cinco.",
          "O nove reutiliza a primeira cor, pois só o três já está colorido entre seus vizinhos.",
          "O dois vê as duas primeiras cores e usa a terceira.",
          "O cinco vê a primeira cor em seus vizinhos coloridos e usa a segunda."
        ]
      },
      {
        "tempo": 85.766,
        "titulo": "Quem avança entre quatro e seis?",
        "fala": [
          "Quatro e seis têm o mesmo grau, com três vizinhos cada um.",
          "Qual dos dois tem mais cores distintas entre os vizinhos já coloridos?"
        ]
      },
      {
        "tempo": 98.41,
        "titulo": "Seis tem duas cores bloqueadas",
        "fala": [
          "O quatro vê apenas a primeira cor, que já pertence ao nove.",
          "O seis vê duas cores, mesmo tendo três vizinhos com cor atribuída.",
          "Sete e oito também veem duas cores, e o laboratório escolhe seis pela ordem original."
        ]
      },
      {
        "tempo": 114.161,
        "titulo": "A sequência registrada nos slides",
        "fala": [
          "A execução da página cinquenta e seis registra quatro antes de seis.",
          "A lista escrita termina no dez, que aparece como zero no desenho.",
          "A sequência registrada e o desempate da página cinquenta e quatro produzem a mesma coloração."
        ]
      },
      {
        "tempo": 130.869,
        "titulo": "Por que três cores bastam e são necessárias",
        "fala": [
          "Os vértices um, dois e três formam um triângulo e exigem cores diferentes.",
          "A coloração de Welch–Powell mostra como usar só essas três cores no grafo inteiro.",
          "Na questão dois, combine a simulação do algoritmo com uma justificativa do mínimo."
        ]
      }
    ]
  },
  {
    "id": "coloracao-com-buscas",
    "titulo": "Coloração em largura e profundidade",
    "descricao": "Siga as duas buscas dos slides e prove o número cromático com limites inferior e superior.",
    "aula": "06",
    "paginas": [
      57,
      58,
      59,
      60,
      61,
      62,
      63,
      64,
      65,
      66,
      67
    ],
    "topicos": [
      "cores",
      "heuristicas-cores"
    ],
    "questoes": [
      2,
      4
    ],
    "duracao": 126.96,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Escolha a raiz e a ordem dos vizinhos",
        "fala": [
          "Nos slides, as duas buscas começam em D, o vértice de maior grau.",
          "A sequência da lista de adjacência decide qual vizinho visitar primeiro em cada busca.",
          "Em cada visita, atribua a menor cor livre entre os vizinhos já coloridos."
        ]
      },
      {
        "tempo": 17.086,
        "titulo": "Profundidade segue um ramo",
        "fala": [
          "Em profundidade, percorremos o primeiro ramo disponível até precisar voltar ao vértice anterior.",
          "A busca sai de D, passa por B, depois por A, F e E.",
          "E precisa da terceira cor, pois D e F já usam cores diferentes."
        ]
      },
      {
        "tempo": 33.661,
        "titulo": "Que cor sobra para C?",
        "fala": [
          "O próximo vizinho disponível de E é C, que ainda está sem cor.",
          "Qual é a menor cor livre olhando apenas para os vizinhos de C?"
        ]
      },
      {
        "tempo": 46.552,
        "titulo": "A quarta cor nesta execução",
        "fala": [
          "C encontra as três primeiras cores em D, B e E e escolhe a quarta.",
          "A página sessenta e dois chama esse resultado de número cromático no desenho.",
          "Essa execução certifica apenas que quatro cores bastam para colorir o grafo."
        ]
      },
      {
        "tempo": 62.714,
        "titulo": "Largura usa uma fila",
        "fala": [
          "Em largura, colocamos primeiro na fila todos os vizinhos que D acaba de descobrir.",
          "Quando processamos B, acrescentamos A ao fim da fila, atrás de C, E e F.",
          "Assim, C é colorido antes de E e encontra apenas duas cores bloqueadas."
        ]
      },
      {
        "tempo": 80.111,
        "titulo": "Largura termina com três cores",
        "fala": [
          "C recebe a terceira cor, e então E pode reutilizar a segunda.",
          "D e E bloqueiam as duas primeiras cores em F, que recebe a terceira.",
          "A vê a segunda e a terceira cores, então reutiliza a primeira."
        ]
      },
      {
        "tempo": 94.369,
        "titulo": "O triângulo certifica o mínimo",
        "fala": [
          "Os vértices B, C e D formam um triângulo e exigem três cores distintas.",
          "A busca em largura já mostrou como usar três cores em todos os vértices.",
          "Com os dois limites iguais, o número cromático é três, como na página sessenta e sete."
        ]
      },
      {
        "tempo": 111.821,
        "titulo": "Aplique a prova ao centro e aos cantos",
        "fala": [
          "No item B da questão dois, o vértice cinco é ligado aos quatro cantos.",
          "Os vértices um, dois e cinco formam um triângulo que exige três cores.",
          "Dê uma cor ao centro e alterne as outras duas nos cantos do quadrado."
        ]
      }
    ]
  },
  {
    "id": "indice-cromatico-e-planaridade",
    "titulo": "Índice cromático e planaridade",
    "descricao": "Organize tarefas em duplas, conte as faces de um desenho plano e aplique o limite de arestas.",
    "aula": "06",
    "paginas": [
      32,
      68,
      69,
      70,
      72,
      75,
      77,
      80,
      83,
      85
    ],
    "topicos": [
      "planaridade"
    ],
    "questoes": [
      2,
      7
    ],
    "duracao": 157.43,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Uma cor por tarefa em dupla",
        "fala": [
          "Cada pessoa é um vértice, e cada tarefa em dupla é uma aresta.",
          "Tarefas que compartilham uma pessoa precisam acontecer em horários diferentes, cada uma com sua cor.",
          "A participa de quatro tarefas, então são necessários pelo menos quatro horários."
        ]
      },
      {
        "tempo": 17.662,
        "titulo": "Uma escala com quatro horários",
        "fala": [
          "No primeiro horário, as duplas A B, C E e D F cobrem seis pessoas diferentes.",
          "A mesma verificação nos outros horários confirma que nenhuma pessoa recebe duas tarefas simultâneas.",
          "A escala cobre todas as tarefas e atinge o mínimo de quatro horários."
        ]
      },
      {
        "tempo": 36.027,
        "titulo": "Limites pelo grau máximo",
        "fala": [
          "As arestas incidentes num vértice de grau máximo exigem uma cor diferente para cada uma.",
          "Para grafos simples, o índice cromático está entre o grau máximo e esse grau mais um.",
          "Em grafos bipartidos, o próprio grau máximo já dá o índice cromático."
        ]
      },
      {
        "tempo": 53.438,
        "titulo": "Duas cores bastam no triângulo?",
        "fala": [
          "No triângulo, cada vértice tem grau dois e o limite inferior vale dois.",
          "É possível colorir as três arestas desse triângulo usando apenas duas cores?"
        ]
      },
      {
        "tempo": 67.565,
        "titulo": "Cada par de arestas se encontra",
        "fala": [
          "Cada aresta toca as outras duas em algum vértice, então nenhuma cor pode se repetir.",
          "O triângulo precisa de três cores nas arestas e atinge o limite superior."
        ]
      },
      {
        "tempo": 79.113,
        "titulo": "O cruzamento do desenho pode desaparecer",
        "fala": [
          "O grafo completo de quatro vértices aparece com duas diagonais cruzadas neste desenho.",
          "Para decidir se é planar, procure outro desenho com as mesmas seis arestas.",
          "Os quatro vértices continuam sendo apenas os pontos marcados nos cantos do desenho."
        ]
      },
      {
        "tempo": 96.51,
        "titulo": "Um desenho planar com quatro faces",
        "fala": [
          "Mova D para dentro do triângulo e ligue esse vértice às três pontas.",
          "O desenho fica sem cruzamentos, com três faces internas e uma face externa.",
          "Na fórmula de Euler, quatro vértices menos seis arestas mais quatro faces dá dois."
        ]
      },
      {
        "tempo": 113.174,
        "titulo": "Dez arestas ultrapassam o limite",
        "fala": [
          "Um grafo simples planar tem até três vezes o número de vértices menos seis arestas.",
          "Com cinco vértices, o limite é nove, mas o grafo completo tem dez arestas.",
          "Logo, o grafo completo de cinco vértices é impossível de desenhar sem cruzamentos.",
          "Quando a contagem respeita o limite, procure ainda um desenho sem cruzamentos para concluir planaridade."
        ]
      },
      {
        "tempo": 138.551,
        "titulo": "Quatro cores nos vértices planares",
        "fala": [
          "O teorema das quatro cores garante até quatro cores nos vértices de um grafo planar.",
          "No grafo completo de quatro vértices, todos são adjacentes, então as quatro cores são necessárias.",
          "No exercício do mapa, conecte as regiões que dividem um trecho de fronteira."
        ]
      }
    ]
  },
  {
    "id": "huffman-construcao",
    "titulo": "Huffman: da contagem aos códigos",
    "descricao": "Conte os símbolos de “bom esse bombom”, acompanhe as cinco junções e codifique um trecho com a árvore pronta.",
    "aula": "07",
    "paginas": [
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ],
    "topicos": [
      "huffman",
      "prefixos"
    ],
    "questoes": [
      1,
      3,
      6,
      10
    ],
    "duracao": 124.07,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Uma folha por símbolo",
        "fala": [
          "Vamos construir um código de Huffman para a frase bom esse bombom.",
          "A frase tem quinze caracteres, contando os dois espaços entre as palavras.",
          "Comece com seis folhas e use a frequência de cada símbolo como peso."
        ]
      },
      {
        "tempo": 15.11,
        "titulo": "Primeira junção",
        "fala": [
          "Retire duas raízes de menor peso e crie um pai cuja frequência seja a soma.",
          "Nesta execução, juntamos as letras E e S, ambas com peso dois.",
          "A nova raiz pesa quatro e volta para a fila em ordem crescente.",
          "O espaço também pesa dois e poderia participar dessa primeira junção."
        ]
      },
      {
        "tempo": 35.729,
        "titulo": "Antecipe a próxima junção",
        "fala": [
          "A fila atual começa pelo espaço e tem três letras de peso três.",
          "Quais pesos você retiraria agora, depois que o nó quatro voltou para a fila?"
        ]
      },
      {
        "tempo": 50.085,
        "titulo": "Forme os nós cinco e seis",
        "fala": [
          "O espaço pesa dois e a letra B pesa três, então o pai pesa cinco.",
          "Depois dessa junção, as letras O e M são as duas raízes mais leves.",
          "Juntas, elas formam o nó seis e deixam apenas três raízes na fila."
        ]
      },
      {
        "tempo": 66.328,
        "titulo": "Junte as árvores mais leves",
        "fala": [
          "Quatro e cinco são os menores pesos, então suas árvores ganham um pai de peso nove.",
          "Os descendentes de cada árvore mantêm as ligações que já tinham.",
          "Agora as duas raízes disponíveis têm os pesos seis e nove."
        ]
      },
      {
        "tempo": 81.171,
        "titulo": "Encontre a raiz final",
        "fala": [
          "Junte seis e nove para obter a raiz de peso quinze.",
          "O peso da raiz bate com o comprimento do texto original.",
          "Para ler os códigos, marque zero à esquerda e um à direita."
        ]
      },
      {
        "tempo": 93.312,
        "titulo": "Leia um código da árvore",
        "fala": [
          "Para chegar ao espaço, vá à direita duas vezes e depois à esquerda.",
          "Os três ramos percorridos dão o código um, um, zero.",
          "Cada código termina numa folha, então nenhum deles começa o código de outra folha."
        ]
      },
      {
        "tempo": 108.599,
        "titulo": "Codifique a palavra bom",
        "fala": [
          "Troque cada letra pelo seu código, obedecendo à ordem da palavra bom.",
          "A letra B usa três bits, enquanto O e M usam dois cada.",
          "Junte os três trechos em sequência para produzir a palavra codificada em sete bits."
        ]
      }
    ]
  },
  {
    "id": "huffman-leitura-e-custo",
    "titulo": "Huffman: leitura, custo e implementação",
    "descricao": "Decodifique um trecho, calcule os bits do texto e recupere um código pelo vetor de pais.",
    "aula": "07",
    "paginas": [
      23,
      24,
      26,
      27,
      28,
      29,
      30,
      37,
      38
    ],
    "topicos": [
      "prefixos",
      "custo-huffman",
      "implementacao-huffman"
    ],
    "questoes": [
      2,
      4,
      7,
      9,
      11
    ],
    "duracao": 159.5,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Um bit por ramo",
        "fala": [
          "Para decodificar uma mensagem, comece na raiz da mesma árvore usada para codificar.",
          "Leia um bit por vez e siga o ramo com esse rótulo.",
          "Ao chegar numa folha, emita o símbolo e volte para a raiz."
        ]
      },
      {
        "tempo": 14.415,
        "titulo": "Leia o primeiro grupo",
        "fala": [
          "Um, zero, um nos leva à folha que guarda a letra S.",
          "A partir da raiz, um, zero, zero forma a letra E.",
          "Em seguida, zero e um formam a letra M e completam o trecho sem."
        ]
      },
      {
        "tempo": 28.332,
        "titulo": "Antecipe o próximo símbolo",
        "fala": [
          "Você acabou de emitir a letra M e está novamente na raiz.",
          "Que símbolo aparece ao seguir os próximos bits um, um e zero?"
        ]
      },
      {
        "tempo": 40.797,
        "titulo": "O espaço também é uma folha",
        "fala": [
          "Dois ramos à direita e um à esquerda levam à folha do espaço.",
          "Depois do espaço, as próximas folhas são as letras S, O e M.",
          "A mensagem decodificada é sem som, e todos os dezoito bits foram consumidos."
        ]
      },
      {
        "tempo": 56.402,
        "titulo": "Some as contribuições das folhas",
        "fala": [
          "De volta ao texto bom esse bombom, a letra O ocorre três vezes.",
          "Seu código tem dois bits, então ela contribui com seis bits para o total.",
          "Multiplique a frequência pelo comprimento para cada símbolo e some todos os produtos.",
          "O total fica em trinta e nove bits, ou dois vírgula seis por caractere."
        ]
      },
      {
        "tempo": 77.861,
        "titulo": "Identifique a referência do ganho",
        "fala": [
          "Para seis símbolos distintos, dois bits seriam insuficientes e três bits oferecem oito combinações.",
          "Quinze caracteres com três bits custam quarenta e cinco bits, contra cento e vinte em ASCII.",
          "Divida a economia de bits pelo total de referência para calcular a redução proporcional.",
          "A redução é cerca de treze vírgula três por cento frente ao melhor código fixo."
        ]
      },
      {
        "tempo": 103.411,
        "titulo": "Guarde cada nó em um vetor",
        "fala": [
          "Seis folhas exigem cinco junções, e cada junção cria um nó interno.",
          "São onze posições no vetor, incluindo a raiz criada na última junção.",
          "Cada posição guarda peso, símbolo quando houver, índice do pai e lado do ramo."
        ]
      },
      {
        "tempo": 119.79,
        "titulo": "Reconstrua o código de baixo para cima",
        "fala": [
          "Subindo da letra S, anote um no ramo direito e depois anteponha zero.",
          "A última subida vem da direita, então anteponha mais um e obtenha o código.",
          "A subida visita os ramos em ordem inversa à leitura feita pelo decodificador."
        ]
      },
      {
        "tempo": 136.103,
        "titulo": "Separe a fila da árvore",
        "fala": [
          "A fila de prioridade guarda raízes disponíveis, enquanto o vetor conserva os nós criados.",
          "Com um heap, remover ou inserir uma raiz leva tempo logarítmico no número de símbolos.",
          "As junções dão tempo total proporcional ao número de símbolos vezes seu logaritmo.",
          "Quatro mais cinco mais seis mais nove mais quinze dão trinta e nove bits."
        ]
      }
    ]
  },
  {
    "id": "ford-fulkerson-quatro-aumentos",
    "titulo": "Ford–Fulkerson: quatro caminhos aumentantes",
    "descricao": "Use gargalos e arcos reversos para chegar ao fluxo máximo de 23 unidades na rede da aula.",
    "aula": "08",
    "paginas": [
      20,
      21,
      25,
      26,
      28,
      29,
      30,
      31,
      32,
      47
    ],
    "topicos": [
      "residual",
      "modelagem-fluxo",
      "mincorte"
    ],
    "questoes": [
      1,
      3,
      7,
      8
    ],
    "duracao": 145.53,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Comece pela rede de capacidades",
        "fala": [
          "A origem envia o fluxo e o destino recebe tudo que atravessa a rede.",
          "Cada arco orientado tem um limite, indicado pelo número perto da seta.",
          "Nos vértices intermediários, o fluxo que entra precisa igualar o que sai.",
          "Para aplicar Ford Fulkerson neste exemplo, começamos com fluxo zero em todos os arcos."
        ]
      },
      {
        "tempo": 22.023,
        "titulo": "Trabalhe na rede residual",
        "fala": [
          "A folga direta é a capacidade original menos o fluxo que já passa no arco.",
          "A contribuição reversa é o fluxo enviado, pois essa quantidade pode ser desfeita.",
          "Escolha um caminho da origem ao destino usando somente arcos residuais com folga positiva."
        ]
      },
      {
        "tempo": 40.018,
        "titulo": "Antecipe o primeiro gargalo",
        "fala": [
          "A mesma quantidade de fluxo adicional precisa caber em todos os arcos do caminho.",
          "Entre dezesseis, doze, nove, catorze e quatro, qual residual limita o aumento possível?"
        ]
      },
      {
        "tempo": 56.481,
        "titulo": "Aumente quatro unidades",
        "fala": [
          "O menor residual é quatro, no arco que liga vê quatro ao destino.",
          "Subtraia quatro dos residuais percorridos e some quatro aos seus respectivos inversos.",
          "Da origem até vê um restam doze unidades, e a reversa ganha quatro.",
          "Agora o fluxo vale quatro e a rede residual serve para buscar outro caminho."
        ]
      },
      {
        "tempo": 77.975,
        "titulo": "Segundo caminho: some sete",
        "fala": [
          "No segundo caminho, passamos de vê um para vê dois e depois para vê quatro.",
          "A menor folga é sete, entre vê quatro e vê três.",
          "Após atualizar os arcos desse caminho e os inversos, o fluxo sobe para onze."
        ]
      },
      {
        "tempo": 92.891,
        "titulo": "Terceiro caminho: use a reversa",
        "fala": [
          "De vê dois para vê um, a capacidade original quatro soma com sete reversos.",
          "O gargalo é oito, no arco que vai de vê um para vê três.",
          "Podemos cancelar sete unidades de vê um para vê dois, enviando uma no sentido oposto.",
          "O aumento de oito leva o valor do fluxo de onze para dezenove."
        ]
      },
      {
        "tempo": 113.743,
        "titulo": "Quarto caminho: desfaça um envio",
        "fala": [
          "De vê dois para vê três, toda a folga vem de um envio anterior.",
          "As quatro unidades reversas cancelam o fluxo que ia de vê três para vê dois.",
          "O valor total aumenta de dezenove para vinte e três."
        ]
      },
      {
        "tempo": 128.277,
        "titulo": "Encerre quando o destino ficar inacessível",
        "fala": [
          "Da origem, ainda alcançamos vê um, vê dois e vê quatro na rede residual.",
          "Nenhum arco residual positivo leva desses vértices até vê três ou ao destino.",
          "Sem outro caminho aumentante, o algoritmo termina com fluxo máximo de vinte e três."
        ]
      }
    ]
  },
  {
    "id": "edmonds-karp-fluxo-inicial-e-corte",
    "titulo": "Edmonds–Karp: fluxo inicial e corte mínimo",
    "descricao": "Valide um fluxo de dez unidades, use a busca em largura para ampliá-lo e certifique o máximo pelo corte.",
    "aula": "08",
    "paginas": [
      19,
      21,
      25,
      26,
      36,
      37,
      47,
      49
    ],
    "topicos": [
      "residual",
      "fluxo-parcial",
      "mincorte"
    ],
    "questoes": [
      7,
      8,
      10,
      13
    ],
    "duracao": 143.71,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Confira o fluxo inicial",
        "fala": [
          "Cada rótulo mostra primeiro o fluxo atual e depois a capacidade do arco.",
          "Em A entram sete unidades, das quais cinco seguem ao destino e duas ao vértice B.",
          "Em B entram três mais duas unidades, e todas as cinco saem para o destino.",
          "O valor do fluxo é sete mais três, que dá dez unidades."
        ]
      },
      {
        "tempo": 21.069,
        "titulo": "Obtenha a residual do fluxo existente",
        "fala": [
          "Da origem até B, a folga direta vale seis menos três, que dá três.",
          "No sentido de B para a origem, há três unidades que podemos desfazer.",
          "O arco de A até o destino está saturado, pois carrega toda a sua capacidade.",
          "O desenho inclui apenas arcos residuais com folga positiva."
        ]
      },
      {
        "tempo": 41.963,
        "titulo": "Antecipe o caminho da busca em largura",
        "fala": [
          "Edmonds Karp usa a busca em largura para visitar vértices por distância em arcos.",
          "A e B aparecem na primeira camada, ambos a um arco da origem.",
          "Qual deles leva ao destino na etapa seguinte, usando apenas folgas positivas?"
        ]
      },
      {
        "tempo": 61.73,
        "titulo": "Encontre o caminho de dois arcos",
        "fala": [
          "A busca chega ao destino por B, que tem três unidades de capacidade residual até lá.",
          "Os dois arcos têm folga três, então o gargalo também vale três.",
          "Some três ao fluxo atual nos arcos da origem para B e de B ao destino."
        ]
      },
      {
        "tempo": 78.389,
        "titulo": "Atualize o fluxo nos arcos originais",
        "fala": [
          "Da origem para B, o fluxo passa de três para seis e satura o arco.",
          "De B para o destino, o fluxo passa de cinco para oito e também satura.",
          "O novo valor na origem é sete mais seis, que soma treze unidades."
        ]
      },
      {
        "tempo": 94.339,
        "titulo": "Refaça a busca na residual atualizada",
        "fala": [
          "Recomece a busca na origem, usando os residuais depois do aumento.",
          "A origem ainda alcança A, e a ligação de A para B alcança B.",
          "O destino fica de fora porque os dois arcos que entravam nele ficaram saturados."
        ]
      },
      {
        "tempo": 109.535,
        "titulo": "Some as capacidades originais do corte",
        "fala": [
          "O corte separa os vértices alcançáveis na residual dos vértices fora desse conjunto.",
          "Na rede original, só os arcos de A e de B atravessam na direção do destino.",
          "Some suas capacidades, cinco mais oito, e obtenha uma capacidade de corte igual a treze."
        ]
      },
      {
        "tempo": 128.2,
        "titulo": "Certifique os dois ótimos",
        "fala": [
          "A capacidade de qualquer corte limita por cima o valor de todo fluxo viável.",
          "Encontramos um fluxo de treze e um corte com capacidade exatamente treze.",
          "A igualdade prova que o fluxo é máximo e que o corte é mínimo."
        ]
      }
    ]
  },
  {
    "id": "conjuntos-e-casamento",
    "titulo": "Conjuntos, cliques e casamento",
    "descricao": "Compare independência, adjacência e cobertura. Depois aumente um casamento alternando arestas.",
    "aula": "12",
    "paginas": [
      7,
      8,
      16,
      36,
      44,
      52,
      54,
      60,
      63,
      65,
      67
    ],
    "topicos": [
      "independentes",
      "cliques",
      "dominantes",
      "casamento",
      "heuristicas-conjuntos"
    ],
    "questoes": [],
    "duracao": 174.25,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Independente maximal e máximo",
        "fala": [
          "Um conjunto é independente quando não existe aresta entre nenhum par de vértices escolhidos.",
          "Aqui, os vértices A e D formam um conjunto maximal com apenas dois elementos.",
          "Para verificar isso, confira que cada vértice de fora é vizinho de A ou de D."
        ]
      },
      {
        "tempo": 17.295,
        "titulo": "Por que três é o máximo?",
        "fala": [
          "O conjunto A, C e E também é independente e já tem três vértices.",
          "Se você incluir o centro F, todos os outros vértices ficam bloqueados de uma vez.",
          "Se excluir F, pode escolher no máximo uma ponta de cada aresta destacada na borda.",
          "São três arestas que cobrem a borda toda, então três é o tamanho máximo."
        ]
      },
      {
        "tempo": 40.129,
        "titulo": "Escolha gulosa e complemento",
        "fala": [
          "A heurística para conjunto independente prefere grau baixo para bloquear poucos vértices a cada escolha.",
          "Inclua um candidato e retire do grafo restante esse candidato e todos os seus vizinhos.",
          "No complemento, cada par sem aresta passa a ter aresta. Assim, um independente vira clique."
        ]
      },
      {
        "tempo": 59.773,
        "titulo": "Reconheça uma clique",
        "fala": [
          "Numa clique com quatro vértices, cada par distinto tem uma aresta dentro do grupo.",
          "No desenho, dois, três, seis e sete formam um subgrafo completo com seis arestas.",
          "A heurística da aula começa com um vértice de grau alto e filtra seus vizinhos.",
          "Confira todas as duplas antes de chamar o grupo de clique."
        ]
      },
      {
        "tempo": 81.926,
        "titulo": "Preveja quem domina o grafo",
        "fala": [
          "Um conjunto dominante cobre cada vértice escolhido e também os vizinhos diretos dos escolhidos.",
          "Observe a figura e tente apontar um único vértice cuja escolha cubra todos os outros."
        ]
      },
      {
        "tempo": 98.073,
        "titulo": "Certifique a dominação mínima",
        "fala": [
          "O centro F é adjacente aos seis vértices da borda. Com ele, todos estão cobertos.",
          "O conjunto vazio não cobre nenhum vértice, então o número de dominação é um.",
          "Por outro lado, um independente maximal é dominante porque já bloqueia todo vértice de fora.",
          "O exemplo da página sessenta mostra que a estratégia de maior grau pode exceder o mínimo."
        ]
      },
      {
        "tempo": 122.384,
        "titulo": "Um casamento ocupa duas pontas",
        "fala": [
          "No casamento, escolha arestas que ocupam pares disjuntos de vértices. Cada ponta fica saturada.",
          "As duas arestas destacadas ocupam quatro vértices. Os vértices três e seis estão livres.",
          "Como três e seis não têm ligação, você não consegue acrescentar uma aresta diretamente.",
          "Esse casamento é maximal. Para saber se é máximo, procure uma cadeia aumentante."
        ]
      },
      {
        "tempo": 149.36,
        "titulo": "Alterne para aumentar o casamento",
        "fala": [
          "Siga seis, um, dois, três. A primeira e a última aresta estão fora do casamento.",
          "A aresta entre um e dois está dentro. Faça a troca ao longo desse caminho.",
          "Entram duas arestas e sai uma. Agora há três arestas e todos os vértices ficam saturados.",
          "A inexistência de cadeia aumentante caracteriza o casamento máximo pelo teorema de Berge."
        ]
      }
    ]
  },
  {
    "id": "metodo-hungaro",
    "titulo": "Método Húngaro e ajuste pelos riscos",
    "descricao": "Reduza a matriz, escolha zeros independentes e ajuste o quadro quando eles ainda não cobrem todos os operários.",
    "aula": "12",
    "paginas": [
      73,
      74,
      76,
      77,
      78,
      79,
      81,
      82,
      83,
      84
    ],
    "topicos": [
      "alocacao",
      "ajuste-hungaro"
    ],
    "questoes": [],
    "duracao": 154.05,
    "capitulos": [
      {
        "tempo": 0,
        "titulo": "Modele a alocação como matriz",
        "fala": [
          "As linhas são operários. As colunas são máquinas. Cada número é o custo daquela dupla.",
          "Uma alocação válida escolhe uma célula por linha e uma por coluna, sem repetir máquinas.",
          "A diagonal inicial custa onze. Vamos procurar uma alocação válida de menor custo."
        ]
      },
      {
        "tempo": 19.274,
        "titulo": "Subtraia o mínimo de cada linha",
        "fala": [
          "Na primeira linha, subtraia três. Na segunda e na terceira, subtraia dois de cada célula.",
          "Toda alocação válida escolhe uma célula de cada linha. Logo, cada custo cai pelo mesmo total.",
          "As diferenças entre os custos das alocações permanecem iguais depois da redução."
        ]
      },
      {
        "tempo": 39.261,
        "titulo": "Agora reduza as colunas",
        "fala": [
          "Na matriz reduzida por linhas, as colunas têm mínimos zero, um e zero, respectivamente.",
          "Somente a segunda coluna muda. Seus valores dois, dois e um passam a um, um e zero.",
          "A redução preserva a comparação porque sempre escolhemos uma entrada de cada coluna."
        ]
      },
      {
        "tempo": 58.381,
        "titulo": "Preveja a posição do último zero",
        "fala": [
          "A primeira linha só pode usar a máquina um. A segunda só pode usar a máquina três.",
          "Quais máquinas ainda sobram? Escolha um zero para a terceira linha sem repetir coluna."
        ]
      },
      {
        "tempo": 74.456,
        "titulo": "Leia o custo na matriz original",
        "fala": [
          "A máquina dois é a escolha da terceira linha. Assim temos três zeros em colunas distintas.",
          "Volte às posições correspondentes na matriz de custos. Elas custam três, dois e três.",
          "Na matriz reduzida, os custos são não negativos e o total zero prova que essa escolha é ótima."
        ]
      },
      {
        "tempo": 94.656,
        "titulo": "Quando os zeros entram em conflito",
        "fala": [
          "No segundo exemplo, depois das duas reduções, as duas primeiras linhas só têm zero na primeira coluna.",
          "Para cobrir todos os zeros, risque a primeira coluna e também toda a terceira linha.",
          "Dois riscos cobrem todos. São menos que três, então ainda não há uma alocação só de zeros."
        ]
      },
      {
        "tempo": 115.085,
        "titulo": "Ajuste a matriz com o menor descoberto",
        "fala": [
          "Entre as quatro entradas descobertas, o menor valor é três. Subtraia três dessas quatro células.",
          "Some três na interseção dos dois riscos, na terceira linha com a primeira coluna.",
          "Mantenha os valores cobertos por um só risco. Depois, procure uma nova escolha de zeros."
        ]
      },
      {
        "tempo": 135.214,
        "titulo": "Um ótimo pode ter mais de uma alocação",
        "fala": [
          "Agora os três zeros diagonais são compatíveis. A soma dos custos originais é doze.",
          "Outra escolha usa máquina três para O um, máquina um para O dois e máquina dois para O três.",
          "Ela também custa doze. A prova do mínimo vem do total zero na matriz ajustada."
        ]
      }
    ]
  }
];
