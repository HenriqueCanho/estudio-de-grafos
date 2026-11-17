/* Páginas contadas desde a capa de cada PDF. Os exemplos usam os dados mostrados nas fontes. */
const topicosComplementares = {
  '05': [
    {
      id: 'heuristicas-pcv', titulo: 'Heurística, ótimo e sequenciamento', pagina: 53, paginas: '44, 46–55',
      figura: 'revisao/aula-05-p53', legenda: 'Contraexemplo ao vizinho mais próximo (p. 53).',
      alt: 'Grafo ponderado de quatro vértices. A aresta usada para fechar o percurso guloso custa um milhão.',
      pontos: [
        'O problema do caixeiro viajante pede um ciclo de custo mínimo. Uma heurística construtiva parte de uma solução vazia e vai construindo uma solução viável por escolhas locais.',
        'O vizinho mais próximo compara as saídas para vértices inéditos. Um retorno muito caro pode anular a economia das escolhas anteriores. Comparar partidas melhora a busca por uma boa rota, sem certificar o ótimo.',
        'O slide 50 também lista variantes de inserção, maior ângulo e método das economias. No sequenciamento de tarefas do slide 54, o peso cᵢⱼ representa o tempo de fazer j depois de i. O objetivo é um caminho aberto de custo mínimo.'
      ],
      exemplo: {
        titulo: 'Por que o retorno pode estragar a rota?', pagina: 53,
        etapas: [
          ['Siga a chegada do vizinho mais próximo', 'A partir de s, o slide percorre t, u, v e volta a s. As três primeiras arestas custam 1 cada.', '1 + 1 + 1 + 1.000.000 = 1.000.003'],
          ['Compare outra ordem no mesmo grafo', 'A rota s → t → v → u → s evita a ligação entre s e v.', '1 + 2 + 1 + 2 = 6']
        ]
      },
      treino: 'vizinho'
    }
  ],
  '06': [
    {
      id: 'limites-cromaticos', titulo: 'Como provar o número cromático', pagina: 29, paginas: '23–32',
      figura: 'revisao/aula-06-p29', legenda: 'Ciclo par e ciclo ímpar (p. 29).',
      alt: 'O slide contrasta um ciclo de quatro vértices com outro de cinco e enuncia o critério de ausência de ciclos ímpares.',
      pontos: [
        'Separe dois passos na prova de χ(G). Uma coloração própria com k cores prova χ(G) ≤ k. Uma clique de ordem r exige r cores diferentes e prova χ(G) ≥ r. Quando os limites coincidem, você tem o valor exato.',
        'Em um grafo com vértices e sem arestas, uma cor basta. Um grafo com pelo menos uma aresta usa exatamente duas cores se é bipartido, condição equivalente a não ter ciclos ímpares. Toda árvore de pelo menos dois vértices usa duas.',
        'O grau máximo Δ dá χ(G) ≤ Δ + 1. Para grafo simples conexo que não é completo e com Δ ≥ 3, a Aula 06 dá o limite χ(G) ≤ Δ. O teorema das quatro cores dá χ(G) ≤ 4 para grafos planares.'
      ],
      exemplo: {
        titulo: 'Prove χ(C₅) com duas etapas', pagina: 29,
        etapas: [
          ['Tente alternar duas cores no ciclo', 'A volta do quinto vértice ao primeiro coloca a mesma cor nos extremos da última aresta. Há um ciclo ímpar, portanto duas cores são insuficientes.', 'χ(C₅) ≥ 3'],
          ['Exiba uma coloração de três cores', 'Numere os cinco vértices na ordem do ciclo. Nos quatro primeiros, alterne as cores 1 e 2. Use a cor 3 no quinto.', '1, 2, 1, 2, 3 ⇒ χ(C₅) = 3']
        ]
      }
    },
    {
      id: 'modelagem-cores', titulo: 'Conflitos, horários e frequências', pagina: 43, paginas: '33–48',
      figura: 'revisao/aula-06-p43', legenda: 'Aplicação a estações de rádio (p. 43).',
      alt: 'Slide que associa os vértices aos transmissores, as arestas à interferência e as cores às frequências.',
      pontos: [
        'Defina o que uma cor representa antes de montar o grafo. Horários, frequências, depósitos e recursos são exemplos. Cada aresta registra um par que precisa de cores diferentes.',
        'Em horário de provas, os vértices são disciplinas e uma aresta indica pelo menos um aluno em comum. Em rádio, a aresta indica interferência. Em produtos químicos, indica incompatibilidade.',
        'Transforme a tabela em lista de pares antes de colorir. Se o enunciado diz distância inferior a um limite, um par exatamente no limite fica fora. Use a mesma regra para todos os pares.'
      ],
      exemplo: {
        titulo: 'De uma matriz de alunos a dois horários', pagina: 39, paginas: '36–39',
        etapas: [
          ['Construa as classes', 'No exemplo dos slides, um horário reúne B, G, H e M. O outro reúne F, I, P e Q.', '{B, G, H, M} · {F, I, P, Q}'],
          ['Justifique a quantidade', 'A coloração prova que dois horários bastam. Como há pelo menos um par de disciplinas em conflito, concentrar todas em um horário é impossível.', '2 ≤ χ(G) ≤ 2']
        ]
      }
    },
    {
      id: 'buscas-cores', titulo: 'Coloração em largura e profundidade', pagina: 62, paginas: '57–67',
      figura: 'revisao/aula-06-p62', legenda: 'Passos finais da busca em profundidade (p. 62).',
      alt: 'No mesmo grafo de seis vértices, a busca em profundidade pinta C com a quarta cor.',
      pontos: [
        'Nas duas buscas, dê ao vértice a menor cor livre entre os vizinhos já coloridos. Em profundidade, siga um ramo da adjacência até precisar retornar. Em largura, processe os vizinhos em camadas, com fila.',
        'Nos desenhos da Aula 06, as duas execuções começam em D, de maior grau, e usam a ordem dada nas listas de adjacência. Mudanças na partida ou na ordem dos vizinhos podem mudar a quantidade encontrada.',
        'A página 62 chama 4 de número cromático no desenho da execução em profundidade. Nesse mesmo grafo, a página 67 exibe uma coloração de 3 cores. O triângulo B–C–D confirma que o mínimo é 3.'
      ],
      exemplo: {
        titulo: 'A escolha de C depende da ordem da busca', pagina: 62, paginas: '59–67',
        etapas: [
          ['Em profundidade, C chega depois de E', 'A ordem é D, B, A, F, E, C. Ao chegar em C, seus vizinhos D, B e E já usam três cores diferentes.', 'C recebe a cor 4'],
          ['Em largura, C vem logo após B', 'A ordem é D, B, C, E, F, A. Quando chega a vez de C, apenas D e B estão coloridos entre seus vizinhos.', 'C recebe a cor 3 · 3 cores na execução']
        ]
      },
      treino: 'coloracao'
    },
    {
      id: 'indice-cromatico', titulo: 'Coloração de arestas e índice cromático', pagina: 75, paginas: '68–76',
      figura: 'revisao/aula-06-p75', legenda: 'Limites em função do grau máximo (p. 75).',
      alt: 'O slide mostra o intervalo de delta a delta mais um entre os limites do índice cromático.',
      pontos: [
        'Agora cores pertencem às arestas. Duas arestas incidentes ao mesmo vértice precisam de cores distintas. As arestas de uma mesma cor formam um acoplamento e podem representar tarefas simultâneas.',
        'Para grafos simples, o índice cromático χ′(G) fica entre Δ e Δ + 1. Para grafos bipartidos, χ′(G) = Δ. A regra é para arestas e usa grau máximo, enquanto χ(G) mede a coloração de vértices.'
      ],
      exemplo: {
        titulo: 'Transforme o grau em limite inferior', pagina: 72, paginas: '69–72',
        etapas: [
          ['Observe as tarefas incidentes em a', 'No exemplo do laboratório, a participa de quatro tarefas. Elas precisam acontecer em horários diferentes.', 'χ′(G) ≥ 4'],
          ['Combine com a escala do slide', 'A distribuição da página 72 usa quatro horários. O limite inferior e a escala viável têm o mesmo valor.', 'χ′(G) = 4']
        ]
      }
    },
    {
      id: 'limite-planar', titulo: 'Usar o limite de arestas para testar planaridade', pagina: 85, paginas: '77–85',
      figura: 'revisao/aula-06-p85', legenda: 'Teste de arestas para três desenhos (p. 85).',
      alt: 'C4 e K4 respeitam o limite de arestas. K5 tem dez arestas e ultrapassa o limite de nove.',
      pontos: [
        'Para um grafo simples planar com pelo menos três vértices, m ≤ 3n − 6. Se m ultrapassar o limite, o grafo é não planar.',
        'Satisfazer o limite deixa a planaridade em aberto. Para confirmar a planaridade, um desenho sem cruzamentos serve como testemunha, como o desenho planar de K₄ no slide 80.',
        'Em desenhos planares conexos, a fórmula n − m + f = 2 inclui a face externa. Cruzamentos entre linhas de um desenho, sem um ponto marcado, não são vértices.'
      ],
      exemplo: {
        titulo: 'Certifique que K₅ não é planar', pagina: 85,
        etapas: [
          ['Conte suas ligações', 'Cinco vértices têm grau quatro. Divida por dois porque cada aresta foi contada pelas duas pontas.', 'm = 5 × 4 ÷ 2 = 10'],
          ['Compare com o limite planar', 'Com cinco vértices, um grafo simples planar pode ter até nove arestas.', '10 > 3 × 5 − 6 = 9']
        ]
      }
    }
  ],
  '07': [
    {
      id: 'custo-huffman', titulo: 'Bits por caractere e ganho de compressão', pagina: 23, paginas: '3–5, 14, 23–25, 35, 42',
      figura: 'revisao/aula-07-p23', legenda: 'Comparação entre Huffman e duas referências de tamanho fixo (p. 23).',
      alt: 'A tabela de bom esse bombom mostra 39 bits para Huffman, 45 para código fixo de três bits e 120 para ASCII.',
      pontos: [
        'O custo total do texto é a soma da frequência de cada símbolo vezes o comprimento do seu código. Para obter bits por caractere, divida pelo número de ocorrências. Se o enunciado fornece probabilidades, some pᵢ × comprimentoᵢ.',
        'Para um alfabeto de m símbolos, procure o menor b inteiro com 2ᵇ ≥ m quando a referência for o melhor código fixo. Use oito bits somente quando a referência for o ASCII do exemplo ou quando o enunciado pedir.',
        'Calcule a economia como 1 menos o quociente entre tamanho comprimido e referência. Informe qual referência usou. As tabelas dos slides tratam dos bits do texto, e a recuperação do texto também precisa da tabela de códigos.',
        'Empates de pesos e inversões dos ramos podem mudar os códigos, mantendo o custo ótimo total.'
      ],
      exemplo: {
        titulo: 'Calcule duas economias para o mesmo texto', pagina: 23,
        etapas: [
          ['Escolha a largura fixa', 'São seis símbolos e 15 ocorrências. Dois bits só distinguem quatro símbolos. Três bits distinguem oito.', '15 × 3 = 45 bits'],
          ['Compare com os 39 bits de Huffman', 'A média é 39 ÷ 15 = 2,6 bits por caractere. Com código fixo de três bits, a economia é de cerca de 13,3%. Com referência de oito bits, é 67,5%.', '1 − 39 ÷ 45 ≈ 13,3% · 1 − 39 ÷ 120 = 67,5%']
        ]
      }
    },
    {
      id: 'implementacao-huffman', titulo: 'Vetor de nós, fila de prioridade e pseudocódigo', pagina: 28, paginas: '27–32, 41–43',
      figura: 'revisao/aula-07-p28', legenda: 'Árvore guardada com índices de pais e informação do ramo (p. 28).',
      alt: 'A tabela mostra os campos symbol, freq, father e isLeft para os onze nós do exemplo.',
      pontos: [
        'Há N folhas para N símbolos distintos. Cada junção transforma duas árvores em uma e cria um nó interno. São N − 1 junções, portanto o vetor tem 2N − 1 posições.',
        'A árvore guarda o pai, o lado do ramo, o símbolo na folha e o peso. A fila de prioridade guarda somente as raízes da floresta corrente. Com heap, remoções e inserções custam O(log N), dando O(N log N) para construir a árvore.',
        'Para gerar o código pela estrutura dos slides, suba da folha até à raiz. Em cada subida, anteponha 0 se veio da esquerda e 1 se veio da direita.'
      ],
      exemplo: {
        titulo: 'Recupere o código de s pelo vetor', pagina: 29,
        etapas: [
          ['Conte nós no exemplo dos seis símbolos', 'São seis folhas e cinco nós internos. O último nó interno é a raiz.', '2 × 6 − 1 = 11 nós'],
          ['Siga os pais a partir de s', 'Do índice 1 ao 6 acrescente 1. Do 6 ao 9 anteponha 0. Do 9 ao 10 anteponha 1.', '1 → 01 → 101']
        ]
      }
    }
  ],
  '08': [
    {
      id: 'modelagem-fluxo', titulo: 'Modelar capacidades, múltiplas fontes e arcos opostos', pagina: 11, paginas: '6–19, 48–50',
      figura: 'revisao/aula-08-p11', legenda: 'Transformação de uma rede com arcos antiparalelos (p. 11).',
      alt: 'Um arco de capacidade dez é substituído por dois arcos em série com um vértice auxiliar.',
      pontos: [
        'Use um digrafo com fonte s, sumidouro t e capacidades não negativas. Um fluxo viável respeita a capacidade de cada arco e a conservação nos vértices intermediários. O valor é a saída líquida da fonte, igual à entrada líquida no destino.',
        'Na convenção de fluxo líquido dos slides, f(u, v) = −f(v, u). Isso é diferente de haver dois arcos originais em sentidos opostos com capacidades próprias.',
        'No modelo sem arcos antiparalelos, troque um dos dois por dois arcos em série de mesma capacidade através de um vértice auxiliar.',
        'Com várias origens ou destinos, use uma superfonte e um supersumidouro. Se a fonte ou o destino individual tiver limite, represente-o no arco de ligação. O slide 13 usa ligação sem limite quando não há essa restrição.'
      ],
      exemplo: {
        titulo: 'Preserve o limite de um arco dividido', pagina: 11,
        etapas: [
          ['Insira v′ no arco de capacidade 10', 'Ligue v₁ a v′ e v′ a v₂. Anote 10 em cada arco.', 'v₁ → v′ → v₂'],
          ['Cheque a conservação em v′', 'Tudo que entra em v′ tem de sair por v′ → v₂. Os dois arcos em série continuam permitindo no máximo dez unidades nesse sentido.', 'mín(10, 10) = 10']
        ]
      }
    },
    {
      id: 'fluxo-parcial', titulo: 'Fluxo inicial, caminhos mínimos e certificado de corte', pagina: 49, paginas: '19, 21–27, 36–49',
      figura: 'revisao/aula-08-p49', legenda: 'Exercício da aula com arco no formato fluxo/capacidade (p. 49).',
      alt: 'Rede com fluxo inicial de s para A igual a sete e de s para B igual a três unidades.',
      pontos: [
        'Com um fluxo parcial, leia a legenda antes de interpretar cada par. Confira capacidades e conservação, calcule o valor atual e construa a residual a partir desse fluxo.',
        'Em Ford–Fulkerson, escolha um caminho residual s–t, ache o menor residual e aumente por esse valor. A versão Edmonds–Karp, citada na página 19, escolhe o caminho com menos arestas usando busca em largura.',
        'No caminho reverso, você pode desfazer fluxo. Ao terminar, tome S como os alcançáveis a partir de s no residual. A capacidade do corte soma só as capacidades originais de S para T. Fluxo líquido e capacidade do corte são conceitos distintos.'
      ],
      exemplo: {
        titulo: 'Complete a rede que começa com dez unidades', pagina: 49,
        etapas: [
          ['Confira conservação em A e B', 'A recebe 7 e envia 5 + 2. B recebe 3 + 2 e envia 5. Os valores de todos os arcos respeitam suas capacidades.', '|f| = 7 + 3 = 10'],
          ['Aumente pelo caminho s → B → t', 'O arco s → B tem residual 6 − 3. B → t tem residual 8 − 5. O aumento possível é o menor dos dois.', 'mín(3, 3) = 3 · 10 + 3 = 13'],
          ['Certifique pelo corte de entrada em t', 'Os arcos A → t e B → t estão saturados. O corte que deixa t sozinho tem capacidade 13 e iguala o fluxo encontrado.', 'c({s, A, B}, {t}) = 5 + 8 = 13']
        ]
      }
    }
  ],
  '12': [
    {
      id: 'heuristicas-conjuntos', titulo: 'Gulosos, complemento e limites do ótimo', pagina: 60, paginas: '11–29, 44–52, 54–63',
      figura: 'revisao/aula-12-p60', legenda: 'Contraexemplo à escolha de maior grau para dominar (p. 60).',
      alt: 'O exemplo mostra que a escolha gulosa domina com três vértices, enquanto dois bastam.',
      pontos: [
        'Nas quatro rainhas, cada casa vira vértice e cada ataque vira aresta. Procurar quatro casas que não se ataquem é procurar um conjunto independente de quatro vértices.',
        'O guloso do independente escolhe grau menor para bloquear menos vizinhos. A heurística de clique parte de grau maior e filtra candidatos. Enumerar todos os 2ⁿ subconjuntos oferece uma verificação exata para grafos pequenos.',
        'Um conjunto independente em G é uma clique no complemento de G. Um independente maximal também é dominante, pois qualquer vértice de fora sem vizinho poderia ser acrescentado ao conjunto.',
        'Para dominantes, a heurística por grau maior pode exceder o mínimo. Além da quantidade, verifique se cada vértice está escolhido ou adjacente a pelo menos um escolhido.'
      ],
      exemplo: {
        titulo: 'Compare a heurística com o certificado do mínimo', pagina: 60,
        etapas: [
          ['Aplique a ordem do exemplo', 'A heurística parte de um vértice de grau 3 e seleciona três vértices.', '|D guloso| = 3'],
          ['Compare com o conjunto destacado na melhor escolha', 'Dois vértices já dominam o grafo. Nenhum vértice sozinho cobre a rede inteira do desenho.', 'γ(G) = 2 < 3']
        ]
      }
    },
    {
      id: 'ajuste-hungaro', titulo: 'Método Húngaro quando ainda faltam zeros', pagina: 93, paginas: '76–100',
      figura: 'revisao/aula-12-p93', legenda: 'Menor valor descoberto e ajuste no exemplo 5×5 (p. 93).',
      alt: 'Na matriz do exemplo, as células não cobertas perdem duas unidades e os cruzamentos ganham duas.',
      pontos: [
        'Subtrair uma constante de uma linha ou coluna altera todas as alocações completas pelo mesmo valor. Por isso, as reduções conservam a ordem dos custos.',
        'Após reduzir linhas e colunas, cubra todos os zeros com o menor número de linhas ou colunas. Se precisar de menos que n riscos, ainda não existem n zeros em linhas e colunas distintas.',
        'Use k, o menor valor entre as células não cobertas. Subtraia k das descobertas, some k nas interseções de dois riscos e preserve as cobertas uma vez. Repita até encontrar uma atribuição de zeros independentes.',
        'Leia o custo na matriz original. Mais de uma escolha de zeros independentes pode atingir o mesmo ótimo.'
      ],
      exemplo: {
        titulo: 'Um ajuste no exercício 5×5 do slide', pagina: 93, paginas: '85–99',
        etapas: [
          ['Leia as células descobertas', 'O menor valor não riscado é 2. As células sem risco diminuem 2 e as que receberam dois riscos aumentam 2.', 'k = 2'],
          ['Escolha os zeros da matriz final e retorne aos custos', 'Uma alocação da página 99 associa os operários 1, 2, 3, 4 e 5 às máquinas 4, 2, 1, 3 e 5, respectivamente.', '9 + 4 + 6 + 12 + 14 = 45']
        ]
      }
    }
  ]
};

for (const aula of aulas) {
  aula.topicos.push(...(topicosComplementares[aula.id] || []));
}
