const questoes07 = [
  {
    numero: 1,
    titulo: 'Árvore e ganho de compressão',
    paginas: [1],
    topico: 'custo-huffman',
    enunciado: 'Mostre a árvore de Huffman para “this is an example of a huffman tree”. A tabela indica espaço (7), a (4), e (4), f (3), h, i, m, n, s e t (2 cada), l, o, p, r, u e x (1 cada). Quantos bits seriam necessários com Huffman? E com 8 bits por caractere? Qual é o ganho de compressão?',
    pista: 'Faça uma folha também para o espaço e recoloque cada nó novo na fila antes de escolher os dois próximos pesos.',
    conferencia: [
      'O peso da raiz deve coincidir com a soma das frequências da tabela.',
      'Compare a soma dos pesos das junções com a soma de frequência × profundidade das folhas. As duas dão o custo de Huffman.',
      'Divida o número de bits economizados pelo total original e multiplique por 100 para obter o ganho percentual.'
    ],
    checagens: [
      { rotulo: 'Total com Huffman (bits)', tipo: 'numero', respostas: ['135'], dica: 'Some os pesos dos nós criados nas junções, incluindo a raiz.' },
      { rotulo: 'Total com 8 bits por caractere', tipo: 'numero', respostas: ['288'], dica: 'Conte também os espaços, depois multiplique o total de caracteres por 8.' },
      { rotulo: 'Ganho percentual (valor exato ou duas casas)', tipo: 'numero', respostas: ['53.125', '53.13'], dica: 'Use a diferença dos totais dividida pelo tamanho com 8 bits por caractere.' }
    ]
  },
  {
    numero: 2,
    titulo: 'Decodifique a palavra',
    paginas: [1],
    topico: 'huffman',
    enunciado: 'Uma palavra foi codificada com Huffman e produziu 10111011010111001110100. O alfabeto é A, B, C, D, E, I, L, R e T, e I recebeu o código 00. As probabilidades são A (0,26), B (0,09), C (0,08), D (0,01), E (0,07), I (0,22), L (0,01), R (0,23) e T (0,03). Qual terá sido a palavra codificada?',
    pista: 'Trabalhe com os pesos inteiros em centésimos e volte à raiz sempre que a leitura dos bits alcançar uma folha.',
    conferencia: [
      'A árvore deve resultar de junções sucessivas dos dois menores pesos.',
      'O caminho até I deve ser 00.',
      'Ao codificar novamente a palavra encontrada, você deve recuperar a sequência de 23 bits.'
    ],
    checagens: [
      { rotulo: 'Palavra com o desempate indicado', tipo: 'texto', respostas: ['ACERTEI'], dica: 'Use ordem alfabética no empate entre folhas, reinsira nós novos depois dos de mesmo peso e dê o ramo 0 ao primeiro nó retirado.' }
    ],
    observacao: 'Fixar I = 00 ainda permite trocar os rótulos de outros ramos e obter outras decodificações. Para a checagem, escolha o primeiro nó retirado para o ramo 0, desempate folhas por ordem alfabética e reinsira novos nós após os de mesmo peso.'
  },
  {
    numero: 3,
    titulo: 'Árvore de nove símbolos',
    paginas: [2],
    topico: 'huffman',
    enunciado: 'Construa a árvore de Huffman usando as frequências A (15), B (6), C (7), D (12), E (25), F (4), G (6), H (1) e I (15).',
    pista: 'Comece pela junção entre H e F. O peso do nó criado precisa participar da seleção seguinte.',
    conferencia: [
      'Use uma folha para cada símbolo e confira se cada nó interno soma o peso de seus filhos.',
      'A cada junção, registre os dois menores pesos da fila. Os empates permitem mais de uma árvore.',
      'A raiz deve pesar a soma de todas as frequências.'
    ],
    checagens: [
      { rotulo: 'Peso da raiz', tipo: 'numero', respostas: ['91'], dica: 'Cada frequência da tabela deve entrar uma única vez nessa soma.' },
      { rotulo: 'Soma dos pesos dos nós internos', tipo: 'numero', respostas: ['262'], dica: 'Há oito junções. Inclua o peso criado por cada uma, até a raiz.' }
    ]
  },
  {
    numero: 4,
    titulo: 'Decodificação e média de bits',
    paginas: [2],
    topico: 'custo-huffman',
    enunciado: 'Uma palavra foi codificada com Huffman e produziu 10111011010111001110100. O alfabeto é A, B, C, D, E, I, L, R e T, com I codificada como 00. As probabilidades são A (0,26), B (0,09), C (0,08), D (0,01), E (0,07), I (0,22), L (0,01), R (0,23) e T (0,03).\n\n(a) Qual terá sido a palavra codificada?\n(b) Calcule a média de bits por caractere com Huffman e compare com um código binário de tamanho fixo para o mesmo alfabeto.',
    pista: 'Use as profundidades das folhas para calcular a média. Cada profundidade entra ponderada pela probabilidade do símbolo.',
    conferencia: [
      'Na letra a, leia a sequência de bits da esquerda para a direita e volte à raiz ao alcançar cada folha.',
      'Na letra b, use todos os símbolos do alfabeto na média ponderada, inclusive os que não aparecem na palavra.',
      'Para o comprimento fixo, busque o menor número de bits que fornece pelo menos nove códigos distintos.'
    ],
    checagens: [
      { rotulo: 'Palavra com o desempate indicado', tipo: 'texto', respostas: ['ACERTEI'], dica: 'Rotule com 0 o ramo do primeiro nó removido em cada junção. Nos empates entre folhas, siga a ordem alfabética.' },
      { rotulo: 'Média com Huffman (bits por caractere)', tipo: 'numero', respostas: ['2.65'], dica: 'Multiplique cada probabilidade pelo comprimento de seu código e some os produtos.' },
      { rotulo: 'Comprimento fixo (bits por caractere)', tipo: 'numero', respostas: ['4'], dica: 'Compare a capacidade de três bits com o número de letras do alfabeto.' }
    ],
    observacao: 'A letra a repete os dados da questão 2. A palavra depende dos rótulos dos ramos. A checagem desempata folhas por ordem alfabética, reinsere novos nós após os de mesmo peso e dá o ramo 0 ao primeiro nó retirado. A média de Huffman é a mesma para essas escolhas.'
  },
  {
    numero: 5,
    titulo: 'Huffman com dados incompletos',
    paginas: [2],
    topico: 'custo-huffman',
    enunciado: 'Aplique a codificação de Huffman a um texto com “100.0” caracteres, como impresso na lista. Os símbolos A, B, C, D, E, F e G têm frequências de 40%, 15%, 1%, 10%, 14%, 7% e 5%, respectivamente. Quantos bits o texto codificado teria com Huffman? E com uma codificação de tamanho fixo?',
    pista: 'Some os percentuais antes de calcular os totais. As junções de Huffman podem ser feitas tratando os valores impressos como pesos relativos.',
    conferencia: [
      'Os sete pesos permitem construir uma árvore de Huffman e conferir as junções.',
      'Para sete símbolos, calcule o menor comprimento fixo que dá pelo menos sete códigos.',
      'Explicite a falta de dados ao discutir os totais em bits do texto.'
    ],
    checagens: [
      { rotulo: 'Soma dos percentuais fornecidos', tipo: 'numero', respostas: ['92'], dica: 'Some os sete valores exatamente como aparecem no recorte.' },
      { rotulo: 'Soma dos pesos das junções usando os valores impressos', tipo: 'numero', respostas: ['215'], dica: 'Junte os dois menores valores de cada vez e some todos os pesos criados.' },
      { rotulo: 'Comprimento fixo para os sete símbolos (bits)', tipo: 'numero', respostas: ['3'], dica: 'Procure a menor potência de 2 que cubra sete símbolos.' }
    ],
    observacao: 'O tamanho “100.0” está ambíguo e os percentuais informados cobrem só parte da distribuição. Os totais pedidos dependem da confirmação do tamanho e da distribuição completa. Os valores impressos permitem trabalhar com pesos relativos.'
  },
  {
    numero: 6,
    titulo: 'Codifique a sequência de DNA',
    paginas: [2],
    topico: 'huffman',
    enunciado: 'Como seria a codificação de Huffman para a sequência de DNA AATGGCATCCTATAC?',
    pista: 'Faça uma tabela com as ocorrências de A, C, G e T antes de montar a árvore.',
    conferencia: [
      'A soma das frequências deve bater com o comprimento da sequência original.',
      'Ao substituir cada base pelo seu código, mantenha a ordem original.',
      'Decodifique os bits com sua própria árvore e confira se recupera exatamente a sequência de DNA.'
    ],
    checagens: [
      { rotulo: 'Total de bits da sequência codificada', tipo: 'numero', respostas: ['30'], dica: 'Conte as ocorrências de cada base e multiplique pelo comprimento que ela recebeu na árvore.' }
    ]
  },
  {
    numero: 7,
    titulo: 'Código livre de prefixos',
    paginas: [2, 3],
    topico: 'prefixos',
    enunciado: 'A tabela dá os códigos de a (00), b (010), c (0110), d (0111), e (10) e f (11). A tabela é livre de prefixos? Em caso afirmativo, exiba a árvore da tabela. Qual é a codificação da sequência “café”?',
    pista: 'Desenhe os códigos como caminhos a partir da raiz. Se o caminho de uma letra terminar antes de outra no mesmo ramo, há um prefixo.',
    conferencia: [
      'Cada código deve terminar em uma folha da árvore.',
      'Verifique se a tabela traz um código para cada caractere da palavra original.',
      'Se você usar a hipótese de retirar o acento, encadeie os códigos de c, a, f e e, nessa ordem.'
    ],
    checagens: [
      { rotulo: 'A tabela é livre de prefixos? (sim/não)', tipo: 'texto', respostas: ['sim'], dica: 'Compare os primeiros bits de cada código longo com os códigos mais curtos.' },
      { rotulo: 'Sequência de bits considerando “cafe”, sem acento', tipo: 'texto', respostas: ['0110001110', '0110 00 11 10'], dica: 'Consulte a tabela na ordem c, a, f, e e concatene os quatro códigos.' }
    ],
    observacao: 'O enunciado pede “café” e a tabela define apenas e sem acento. Para codificar a palavra com o acento seria preciso definir também o código de é. A checagem da sequência considera a hipótese de usar “cafe”.'
  },
  {
    numero: 8,
    titulo: 'Seis símbolos com a mesma frequência',
    paginas: [3],
    topico: 'custo-huffman',
    enunciado: 'Um arquivo tem alfabeto {A, B, C, D, E, F} e cada caractere ocorre exatamente k vezes. (1) Quantos bits terá o arquivo codificado com um número fixo de bits por caractere? (2) Quantos bits terá o arquivo codificado com Huffman?',
    pista: 'Monte uma árvore com peso k em cada uma das seis folhas e mantenha k como fator comum nas junções.',
    conferencia: [
      'O código fixo precisa de combinações suficientes para distinguir seis símbolos.',
      'Some os comprimentos dos seis códigos de Huffman e multiplique o resultado por k.',
      'Os totais devem ser expressos em função de k.'
    ],
    checagens: [
      { rotulo: 'Total fixo em função de k (ex.: 12k)', tipo: 'texto', respostas: ['18k', '18*k', '18×k', 'k*18', 'k×18'], dica: 'Multiplique o comprimento fixo mínimo pelo total de ocorrências, 6k.' },
      { rotulo: 'Total com Huffman em função de k (ex.: 12k)', tipo: 'texto', respostas: ['16k', '16*k', '16×k', 'k*16', 'k×16'], dica: 'A árvore de seis folhas com pesos iguais distribui os símbolos em duas profundidades.' }
    ]
  },
  {
    numero: 9,
    titulo: 'Conte os nós da árvore',
    paginas: [3],
    topico: 'implementacao-huffman',
    enunciado: 'Estime o número de nós de uma árvore gerada pela codificação Huffman para o texto seguinte.\n\n“O design do recém-lançado Nokia 225 pode parecer um tanto antiquado, em contrapartida é esta “simplicidade” e uma bateria potente que podem atrair muitos olhares em torno da novidade. Voltado para o mercado emergente, o dispositivo oferece uma experiência social eficiente, sem a necessidade de gastar muito. E suas facilidades não param por ai, o Nokia 225 é o celular mais fino conectado da companhia finlandesa, com somente 10,4mm de espessura e o peso de 100,59g e sua bateria promete passa 36 dias sem precisar ser recarregada. Serão disponibilizados modelos em cinco cores diferentes, com tela de 2,8 polegadas, teclado físico, câmera de 2 megapixels, rádio FM, Bluetooth e memória expansível a 32 GB com microSD. O dispositivo acessa a Internet através do navegador Nokia Xpress, que proporciona carregamento rápido das páginas sem consumo excessivo de dados e irá conter as principais redes sociais pré-instaladas. As duas versões do aparelho – com entrada para um ou dois chips – devem chegar a Europa, África, Ásia e Oriente Médio no segundo semestre. O preço estipulado é de 39 euros, o que equivale aproximadamente a 120 reais. Não há previsões de sua chegada ao Brasil.”',
    pista: 'Identifique os caracteres distintos que viram folhas. Cada junção reduz em um a quantidade de árvores da fila.',
    conferencia: [
      'Declare como você tratou maiúsculas, acentos, espaços, pontuação e quebras de linha.',
      'Se há N folhas, conte quantas junções são necessárias para sobrar uma única árvore.',
      'Some a quantidade de nós internos à quantidade de folhas.'
    ],
    checagens: [
      { rotulo: 'Nós com a convenção descrita abaixo', tipo: 'numero', respostas: ['123'], dica: 'Conte cada caractere distinto uma vez. Para N folhas, há N − 1 junções e, portanto, N − 1 nós internos.' }
    ],
    observacao: 'A checagem mantém maiúsculas, acentos, espaço, dígitos e pontuação interna. As quebras de linha são tratadas como espaços e as aspas externas como delimitadores do trecho.'
  },
  {
    numero: 10,
    titulo: 'Frequências de Fibonacci',
    paginas: [3],
    topico: 'huffman',
    enunciado: 'Qual é um código de Huffman para as oito frequências de Fibonacci informadas? a (1), b (1), c (2), d (3), e (5), f (8), g (13) e h (21).',
    pista: 'Depois de juntar a e b, compare o peso criado com c. Observe o padrão nas próximas escolhas da fila.',
    conferencia: [
      'Confira se os nós criados foram reinseridos na ordem de seus pesos.',
      'O símbolo de frequência 21 deve receber um código de um bit.',
      'Cada símbolo deve ter um código distinto e nenhum código pode iniciar outro.'
    ],
    checagens: [
      { rotulo: 'Custo do código para as frequências dadas (bits)', tipo: 'numero', respostas: ['132'], dica: 'Some os pesos das sete junções ou multiplique as frequências pelos comprimentos correspondentes.' }
    ]
  },
  {
    numero: 11,
    titulo: 'Códigos para duas fontes sem memória',
    paginas: [3],
    topico: 'custo-huffman',
    enunciado: 'Considere duas fontes discretas sem memória. A fonte 1 tem seis letras com probabilidades 0,30, 0,20, 0,15, 0,15, 0,12 e 0,08. A fonte 2 tem sete letras com probabilidades 0,30, 0,27, 0,13, 0,12, 0,08, 0,05 e 0,05. Construa um código de Huffman binário para cada fonte e determine o número médio de letras de código por letra de fonte.',
    pista: 'Use uma fila de pesos para cada fonte. Se trabalhar com centésimos inteiros, divida a soma das junções por 100 para obter a média.',
    conferencia: [
      'Construa um código com seis folhas para a primeira fonte e outro com sete para a segunda.',
      'Dentro de cada árvore, multiplique cada probabilidade pelo comprimento do código e some os produtos.',
      'A média de símbolos do código binário por letra da fonte é a média em bits por letra.'
    ],
    checagens: [
      { rotulo: 'Média da fonte 1 (bits por letra)', tipo: 'numero', respostas: ['2.5'], dica: 'Calcule a média ponderada dos seis códigos da primeira árvore.' },
      { rotulo: 'Média da fonte 2 (bits por letra)', tipo: 'numero', respostas: ['2.53'], dica: 'Calcule a média ponderada dos sete códigos da segunda árvore.' }
    ]
  }
];
