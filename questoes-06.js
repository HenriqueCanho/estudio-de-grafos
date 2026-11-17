const questoes06 = [
  {
    numero: 1,
    titulo: 'Número cromático de cinco grafos',
    paginas: [1],
    topico: 'limites-cromaticos',
    enunciado: 'Determine o número cromático de cada um dos cinco grafos da figura.',
    pista: 'Procure um conjunto de vértices todos adjacentes entre si ou um ciclo ímpar para obter um limite inferior. Depois tente construir uma coloração que atinja esse limite.',
    conferencia: [
      'Na primeira linha, identifique o grafo completo, o bipartido completo e o ciclo ímpar.',
      'Na segunda linha, separe os vértices em duas classes e verifique que cada aresta liga classes diferentes.',
      'Em cada desenho, mostre uma coloração válida e justifique por que usar uma cor a menos é impossível.'
    ],
    checagens: [
      { rotulo: 'Número cromático do grafo superior esquerdo', tipo: 'numero', respostas: ['6'], dica: 'Conte quantos vértices são adjacentes entre si.' },
      { rotulo: 'Número cromático do grafo superior central', tipo: 'numero', respostas: ['2'], dica: 'Tente usar uma cor em cada coluna.' },
      { rotulo: 'Número cromático do grafo superior direito', tipo: 'numero', respostas: ['3'], dica: 'Siga o ciclo até a aresta que liga o último vértice ao primeiro.' },
      { rotulo: 'Número cromático do grafo inferior esquerdo', tipo: 'numero', respostas: ['2'], dica: 'Alterne cores de pai para filho a partir de qualquer raiz.' },
      { rotulo: 'Número cromático do grafo inferior central', tipo: 'numero', respostas: ['2'], dica: 'Verifique a paridade do ciclo.' }
    ]
  },
  {
    numero: 2,
    titulo: 'Welch–Powell passo a passo',
    paginas: [1],
    topico: 'heuristicas-cores',
    enunciado: 'Aplique o algoritmo de Welch–Powell aos grafos de (a) a (e). Mostre a aplicação passo a passo e determine o número cromático de cada grafo.',
    pista: 'Liste os graus. A cada passo, priorize o maior grau e desempate pelo maior número de cores distintas entre os vizinhos já coloridos, como no slide 54.',
    conferencia: [
      'Registre o vértice escolhido, as cores bloqueadas pelos vizinhos e a menor cor disponível em cada passo.',
      'Para certificar o mínimo, procure uma clique em (a), (b), (d) e (e). Em (c), use o padrão de tabuleiro e a existência de arestas.'
    ],
    checagens: [
      { rotulo: 'Número cromático de (a)', tipo: 'numero', respostas: ['5'], dica: 'Verifique as adjacências de cada vértice, incluindo as diagonais.' },
      { rotulo: 'Número cromático de (b)', tipo: 'numero', respostas: ['3'], dica: 'Compare as cores do vértice central com as de dois vizinhos adjacentes.' },
      { rotulo: 'Número cromático de (c)', tipo: 'numero', respostas: ['2'], dica: 'Alterne as cores tanto em cada linha quanto em cada coluna.' },
      { rotulo: 'Número cromático de (d)', tipo: 'numero', respostas: ['3'], dica: 'Procure um triângulo que inclua A e B e tente completar uma coloração.' },
      { rotulo: 'Número cromático de (e)', tipo: 'numero', respostas: ['4'], dica: 'Confira se A, B, E e F são dois a dois adjacentes.' }
    ]
  },
  {
    numero: 3,
    titulo: 'Frequências para estações de rádio',
    paginas: [2],
    topico: 'buscas-cores',
    enunciado: 'Use os algoritmos sequencial, maior grau primeiro, busca em largura e busca em profundidade para calcular quantas frequências são necessárias para evitar interferências entre as estações de rádio. Use as distâncias da tabela. Duas estações interferem quando estão a menos de 100 km uma da outra.',
    pista: 'Monte o grafo de interferência usando só as distâncias abaixo de 100 km. Cada cor representa uma frequência.',
    conferencia: [
      'Confira os pares na tabela e assinale a ordem dos vértices nos quatro métodos.',
      'Ao colorir cada estação, descarte as frequências das vizinhas já atendidas.',
      'Compare o total de frequências de cada método. O grupo C, D, E e G dá um limite inferior.'
    ],
    checagens: [
      { rotulo: 'Número de pares que interferem', tipo: 'numero', respostas: ['12'], dica: 'Conte uma vez cada entrada inferior a 100 km.' },
      { rotulo: 'Frequências usadas pelo sequencial na ordem A a G', tipo: 'numero', respostas: ['4'], dica: 'Para cada estação, use a menor frequência que não aparece nas vizinhas anteriores.' }
    ]
  },
  {
    numero: 4,
    titulo: 'Quatro métodos no mesmo grafo',
    paginas: [2],
    topico: 'buscas-cores',
    enunciado: 'Aplique ao grafo da figura os algoritmos de coloração sequencial, maior grau primeiro, busca em largura e busca em profundidade.',
    pista: 'Monte uma lista de adjacências a partir dos oito vértices numerados. Anote o critério de desempate e o vértice inicial de cada busca.',
    conferencia: [
      'Cruze a lista de adjacências com a figura e confira que cada vértice tem o mesmo grau.',
      'Registre a ordem de processamento e verifique a menor cor disponível no momento de cada atribuição.',
      'Valide cada coloração comparando os extremos de todas as arestas.'
    ],
    checagens: [
      { rotulo: 'Grau comum aos oito vértices', tipo: 'numero', respostas: ['4'], dica: 'Conte apenas as arestas incidentes nos vértices numerados.' },
      { rotulo: 'Cores usadas pelo sequencial na ordem 1 a 8', tipo: 'numero', respostas: ['3'], dica: 'Recalcule as cores bloqueadas pelos vizinhos a cada passo.' }
    ]
  },
  {
    numero: 5,
    titulo: 'Emissoras em nove cidades',
    paginas: [2],
    topico: 'modelagem-cores',
    enunciado: 'Emissoras de televisão serão instaladas em nove cidades, de A a I. Uma emissora não pode ser instalada em duas cidades que distem menos de 150 km. Com base na tabela de distâncias, determine o menor número de emissoras que pode atender às nove cidades. Use teoria dos grafos para justificar a resposta.',
    pista: 'Faça uma aresta quando duas cidades estiverem próximas demais para compartilhar a emissora. Procure um grupo de cidades todas ligadas entre si.',
    conferencia: [
      'O grafo contém as nove cidades e usa o limiar estrito de 150 km.',
      'Compare A, B, D, F e H aos pares na tabela para obter um limite inferior.',
      'Na alocação proposta, cidades da mesma classe usam uma emissora e respeitam a distância regulamentar.'
    ],
    checagens: [
      { rotulo: 'Menor número de emissoras', tipo: 'numero', respostas: ['5'], dica: 'Compare o tamanho de uma clique com o número de classes da sua alocação.' }
    ]
  },
  {
    numero: 6,
    titulo: 'Horários de provas finais',
    paginas: [2, 3],
    topico: 'modelagem-cores',
    enunciado: 'Organize as provas finais de sete disciplinas de modo que nenhum aluno tenha duas provas no mesmo horário. Na matriz simétrica, um asterisco na célula (i, j) indica que as disciplinas i e j têm pelo menos um aluno em comum. Quantos horários são necessários e quais disciplinas podem fazer prova juntas?',
    pista: 'Represente cada disciplina por um vértice e cada asterisco por uma aresta. Disciplinas que recebem a mesma cor podem fazer prova no mesmo horário.',
    conferencia: [
      'Leia a metade preenchida da matriz e trate cada conflito como um par sem direção.',
      'Confira quais conflitos existem entre as disciplinas 1, 2, 3 e 7 para justificar o limite inferior.',
      'Cada disciplina aparece em um único grupo e nenhum grupo reúne um par marcado com asterisco.'
    ],
    checagens: [
      { rotulo: 'Menor número de horários de prova', tipo: 'numero', respostas: ['4'], dica: 'Procure um grupo de disciplinas que tenham conflitos em todos os pares.' }
    ]
  },
  {
    numero: 7,
    titulo: 'Coloração de um mapa',
    paginas: [3],
    topico: 'buscas-cores',
    enunciado: 'Faça a coloração do mapa da figura de modo que regiões vizinhas recebam cores diferentes. Aplique os algoritmos sequencial, maior grau primeiro, busca em largura e busca em profundidade.',
    pista: 'Faça um vértice para cada região e ligue os pares que compartilham um trecho de fronteira. Observe quais regiões fazem divisa com C.',
    conferencia: [
      'A região C tem fronteira com as outras cinco. Entre as cinco regiões externas, confira a sequência A, B, E, F, D e o retorno a A.',
      'Registre a ordem de visita e a cor de cada região para os quatro métodos.',
      'Confira a cor dos dois lados de cada fronteira comum no mapa.'
    ],
    checagens: [
      { rotulo: 'Número de pares de regiões com um trecho de fronteira em comum', tipo: 'numero', respostas: ['10'], dica: 'Some os pares incidentes a C e os pares que dividem fronteira ao redor de C.' },
      { rotulo: 'Cores usadas pelo sequencial na ordem A a F', tipo: 'numero', respostas: ['4'], dica: 'Antes de colorir cada região, confira quais de suas vizinhas já receberam cor.' }
    ],
    observacao: 'Considere vizinhas as regiões que compartilham um trecho de fronteira.'
  },
  {
    numero: 8,
    titulo: 'Períodos para disciplinas da nona fase',
    paginas: [3],
    topico: 'limites-cromaticos',
    enunciado: 'O Departamento de Informática vai oferecer sete disciplinas da nona fase de Computação. Cada estudante pretende cursar as disciplinas indicadas na tabela. Determine o menor número de períodos para oferecer todas as disciplinas sem choques de horário. Considere N = Análise de Algoritmos, P = Probabilidade, S = Engenharia de Software, T = Arquitetura de Computadores, C = Compiladores, G = Grafos e L = Lógica.',
    pista: 'Para cada estudante, ligue todos os pares de disciplinas que ele pretende cursar. Junte os conflitos em um único grafo.',
    conferencia: [
      'Uma lista de três disciplinas gera três pares de conflitos. Confira os pares de Aldo, Batista e Janete.',
      'Tente usar três cores partindo do triângulo C, G, L. Verifique quais cores sobram para T, S e N e o que acontece com P.',
      'Confirme que cada estudante pode cursar todas as disciplinas da sua lista na alocação proposta.'
    ],
    checagens: [
      { rotulo: 'Menor número de períodos', tipo: 'numero', respostas: ['4'], dica: 'Experimente fixar três cores no triângulo C, G, L e propagar as restrições.' }
    ]
  },
  {
    numero: 9,
    titulo: 'Depósitos para produtos incompatíveis',
    paginas: [3, 4],
    topico: 'modelagem-cores',
    enunciado: 'Uma indústria farmacêutica precisa armazenar nove produtos químicos. Na tabela, cada X indica um par de produtos que não podem entrar em contato. Determine o número mínimo de depósitos necessários para armazenar todos os produtos.',
    pista: 'Monte o grafo de incompatibilidades. Se tentar apenas três cores, triângulos que compartilham uma aresta podem forçar a igualdade de cor entre dois produtos.',
    conferencia: [
      'Interprete as linhas na ordem A₁ a A₉ e confira as marcações simétricas.',
      'Teste a hipótese de três cores usando os triângulos da tabela. Compare A₁, A₉ e A₆ a partir de A₂ e A₅.',
      'Verifique se nenhuma classe do armazenamento proposto contém um par marcado com X.'
    ],
    checagens: [
      { rotulo: 'Número de pares incompatíveis', tipo: 'numero', respostas: ['18'], dica: 'Conte só as marcas de uma metade da tabela. O x minúsculo também registra incompatibilidade.' },
      { rotulo: 'Menor número de depósitos', tipo: 'numero', respostas: ['4'], dica: 'Propague as cores dos triângulos e confira se três cores levam a alguma contradição.' }
    ],
    observacao: 'A tabela tem cabeçalhos apenas nas colunas. As linhas seguem a mesma ordem, de A₁ a A₉.'
  },
  {
    numero: 10,
    titulo: 'Simulação de horários de exames',
    paginas: [4],
    topico: 'modelagem-cores',
    enunciado: 'Monte o grafo a partir da tabela de exames requeridos na mesma época pelos alunos da universidade. Os vértices representam as disciplinas e uma aresta liga duas disciplinas que pelo menos um aluno cursa. Simule os algoritmos de coloração e registre quantas cores cada um gera.',
    pista: 'Converta cada linha da tabela em pares de disciplinas. Para a coloração sequencial, experimente a ordem alfabética.',
    conferencia: [
      'O aluno 3 gera as arestas D–E, D–F e E–F. Confira também a aresta E–G do aluno 8.',
      'Registre a ordem em cada método e verifique as cores vedadas antes de colorir cada disciplina.',
      'Compare as contagens dos métodos e explique qualquer diferença usando as respectivas ordens de processamento.'
    ],
    checagens: [
      { rotulo: 'Número de arestas no grafo de exames', tipo: 'numero', respostas: ['10'], dica: 'Conte os pares distintos. Quando um aluno tem três disciplinas, use todos os pares.' },
      { rotulo: 'Cores usadas pelo sequencial na ordem A a G', tipo: 'numero', respostas: ['4'], dica: 'Confira as cores de C, D e E antes de escolher a cor de F.' }
    ]
  },
  {
    numero: 11,
    titulo: 'Contêineres para produtos reativos',
    paginas: [4],
    topico: 'limites-cromaticos',
    enunciado: 'Um químico deseja embarcar A, B, C, D, E, F e X usando o menor número de contêineres. Cada par de produtos entre A, B, C e X reage. A reage com F e D, e E também reage com F e D. Descreva o grafo que modela a situação e use-o para determinar quantos contêineres são necessários.',
    pista: 'Faça um vértice por produto. Escolha todos os pares entre A, B, C e X e marque também os demais pares de reação indicados.',
    conferencia: [
      'Confira todas as arestas entre A, B, C e X e use esse grupo para justificar um limite inferior.',
      'Mostre uma distribuição completa dos sete produtos. Dentro de cada contêiner, nenhum par reage.'
    ],
    checagens: [
      { rotulo: 'Menor número de contêineres', tipo: 'numero', respostas: ['4'], dica: 'Compare o número de contêineres da sua distribuição com o grupo de produtos que reagem dois a dois.' }
    ]
  },
  {
    numero: 12,
    titulo: 'Calendário de reuniões do Senado',
    paginas: [4],
    topico: 'limites-cromaticos',
    enunciado: 'Dez comissões do Senado se reúnem uma hora por semana. O grafo mostra quais comissões têm membros em comum. Monte um calendário que minimize o total de horários de uma hora e impeça que comissões com membros em comum se reúnam ao mesmo tempo.',
    pista: 'Identifique os dez vértices por posição. Comece pelos triângulos à esquerda e veja que cores eles impõem aos vértices vizinhos quando se tenta usar três horários.',
    conferencia: [
      'Atribua um horário a cada comissão e confira que cada aresta liga comissões de horários diferentes.',
      'Para provar o mínimo, tente três horários e propague as cores pelos triângulos da esquerda até a aresta vertical à direita.'
    ],
    checagens: [
      { rotulo: 'Menor número de horários de uma hora', tipo: 'numero', respostas: ['4'], dica: 'Veja quais horários seriam forçados nos dois extremos da aresta vertical à direita com apenas três cores.' }
    ],
    observacao: 'Para obter os dez vértices do enunciado, conte os sete pontos pretos, o cruzamento à esquerda do losango central e as junções superior e inferior desse losango.'
  }
];
