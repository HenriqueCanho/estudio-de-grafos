const rotaTrilhaHamilton = '#teoria/05/slides/';
const slidesHamilton = [
  {
    id: '20', titulo: 'Circuito hamiltoniano e circuito euleriano',
    alt: 'O slide compara as escolhas de arestas no retorno a um vértice em um circuito euleriano e em um hamiltoniano.',
    foco: 'No circuito hamiltoniano, controle quais vértices já foram visitados. No euleriano, controle quais arestas já foram usadas. O retorno à partida fecha o circuito.',
    raciocinio: 'Se você já saiu de um vértice intermediário e volta a ele por uma aresta inédita, a regra de vértices de Hamilton foi violada. A regra de Euler ainda permite esse passo se a aresta for inédita.',
    pergunta: 'Em qual circuito revisitar um vértice intermediário pode ser permitido?',
    opcoes: ['No hamiltoniano', 'No euleriano, usando arestas inéditas', 'Em ambos, se a nova aresta for diferente'],
    resposta: 1,
    dica: 'Confira se o objeto que precisa ser visitado uma única vez é o vértice ou a aresta.',
    explicacao: 'Euler exige cada aresta uma vez. Hamilton exige cada vértice uma vez, com retorno à partida.'
  },
  {
    id: '21', titulo: 'Teorema dos ciclos com arestas disjuntas',
    alt: 'O slide dá a fórmula (n − 1)/2 quando n é ímpar e (n − 2)/2 quando n é par.',
    foco: 'Em Kₙ, a contagem de ciclos simultaneamente disjuntos em arestas é (n − 1) ÷ 2 para n ímpar e (n − 2) ÷ 2 para n par, com n ≥ 3.',
    raciocinio: 'Cada ciclo usa duas arestas em torno de cada vértice de Kₙ. Como existem n − 1 arestas incidentes, cabem até ⌊(n − 1) ÷ 2⌋ ciclos disjuntos. O teorema afirma que esse limite é atingido.',
    pergunta: 'Quantos ciclos disjuntos em arestas o teorema dá para K₆?',
    opcoes: ['1', '2', '3'],
    resposta: 1,
    dica: 'Seis é par. Use o ramo da fórmula para grafos de ordem par.',
    explicacao: '(6 − 2) ÷ 2 = 2.'
  },
  {
    id: '22', titulo: 'Prepare a contagem no K₅',
    alt: 'O slide mostra o grafo completo com vértices 1, 2, 3, 4 e 5 e pede os ciclos.',
    foco: 'O desenho tem cinco vértices. Em K₅, qualquer par distinto está ligado. Um ciclo hamiltoniano usa cinco arestas, incluindo a volta à partida.',
    raciocinio: 'Conte as quatro ligações de cada vértice. Cada ligação foi contada duas vezes, pelas duas pontas. Assim, K₅ tem 5 × 4 ÷ 2 = 10 arestas.',
    pergunta: 'Quantas arestas um único ciclo hamiltoniano usa nesse K₅?',
    opcoes: ['5', '4', '10'],
    resposta: 0,
    dica: 'Conte uma saída por vértice, incluindo a saída do último para a partida.',
    explicacao: 'São quatro deslocamentos até o quinto vértice, mais uma aresta de retorno.'
  },
  {
    id: '23', titulo: 'Identifique os dois ciclos do exemplo',
    alt: 'O slide apresenta os circuitos 1–2–3–4–5–1 e 1–3–5–2–4–1 em K₅.',
    foco: 'O primeiro circuito percorre 1 → 2 → 3 → 4 → 5 → 1. O segundo percorre 1 → 3 → 5 → 2 → 4 → 1.',
    raciocinio: 'Como a ordem é ímpar, (5 − 1) ÷ 2 = 2. Esses dois circuitos realizam esse limite. Para localizar uma aresta, confira os pares consecutivos e inclua o fechamento.',
    pergunta: 'Qual aresta pertence ao segundo ciclo?',
    opcoes: ['2–5', '2–3', '4–5'],
    resposta: 0,
    dica: 'O grafo não tem direção. Procure o par em qualquer ordem na sequência do segundo circuito.',
    explicacao: 'O segundo ciclo passa de 5 para 2, portanto inclui a aresta 2–5.'
  },
  {
    id: '24', titulo: 'Confira que os ciclos são disjuntos em arestas',
    alt: 'Os ciclos do K₅ aparecem lado a lado, com a lista das cinco arestas de cada um.',
    foco: 'O primeiro conjunto tem 1–2, 2–3, 3–4, 4–5 e 1–5. O segundo tem 1–4, 2–4, 2–5, 3–5 e 1–3.',
    raciocinio: 'Compare pares de pontas, sem direção. As listas somam 5 + 5 = 10 arestas diferentes. Os dois ciclos passam pelos mesmos vértices, como exige Hamilton.',
    pergunta: 'Quantas arestas estão presentes ao mesmo tempo nas duas listas?',
    opcoes: ['5', '2', '0'],
    resposta: 2,
    dica: 'Uma aresta em comum teria o mesmo par de pontas nos dois conjuntos.',
    explicacao: 'A interseção é vazia. Os dois ciclos usam todas as arestas de K₅ entre si.'
  },
  {
    id: '25', titulo: 'Conte todos os ciclos sem impor disjunção',
    alt: 'O slide apresenta (n − 1)!/2 e calcula 12 ciclos para K₅ e 3 para K₄.',
    foco: 'Agora conte todos os ciclos, permitindo que diferentes ciclos compartilhem arestas. Em Kₙ, fixe a partida e permute os n − 1 vértices restantes.',
    raciocinio: 'Cada percurso e seu inverso usam as mesmas arestas. Por isso divida por dois. Para K₅, (4 × 3 × 2 × 1) ÷ 2 = 12.',
    pergunta: 'Qual é a contagem total de ciclos de K₄ nessa convenção?',
    opcoes: ['1', '3', '6'],
    resposta: 1,
    dica: 'Fixe o primeiro vértice e divida os 3! percursos pelo par de sentidos.',
    explicacao: '(3 × 2 × 1) ÷ 2 = 3.'
  },
  {
    id: '26', titulo: 'Liste os três ciclos de K₄',
    alt: 'O slide desenha cada um dos três ciclos de K₄ e lista suas arestas.',
    foco: 'Os três representantes da página são 1 → 2 → 3 → 4 → 1, 1 → 3 → 2 → 4 → 1 e 1 → 2 → 4 → 3 → 1.',
    raciocinio: 'Compare o primeiro com o segundo. Ambos usam 2–3 e 1–4. Compartilhar arestas é permitido nessa contagem. Inverter apenas o sentido de um circuito mantém as quatro arestas.',
    pergunta: 'O que acontece ao inverter 1 → 2 → 3 → 4 → 1?',
    opcoes: ['Continuamos contando o mesmo ciclo', 'Ganhamos um quarto ciclo', 'Obtemos um segundo ciclo disjunto do primeiro'],
    resposta: 0,
    dica: 'Escreva a sequência inversa e compare os pares de pontas, sem supor uma direção.',
    explicacao: 'A ordem se inverte, mas o conjunto {1–2, 2–3, 3–4, 1–4} é o mesmo.'
  },
  {
    id: '27', titulo: 'Prove a impossibilidade por remoção',
    alt: 'O slide pede a prova de que mais de k componentes excluem um ciclo e mais de k + 1 excluem também um caminho.',
    foco: 'Remova k vértices e todas as arestas incidentes. Mais de k componentes excluem um ciclo hamiltoniano. Mais de k + 1 componentes excluem também um caminho hamiltoniano aberto.',
    raciocinio: 'Remover k ≥ 1 vértices de um ciclo deixa até k trechos. De um caminho aberto, deixa até k + 1. Arestas extras podem unir trechos, então o grafo restante não pode ter mais componentes do que essa quantidade.',
    pergunta: 'Se k = 2 e sobrarem 3 componentes, o que essa contagem permite concluir?',
    opcoes: ['Exclui tanto o ciclo como o caminho', 'Garante um caminho aberto', 'Exclui o ciclo e deixa o caminho em aberto'],
    resposta: 2,
    dica: 'Compare 3 primeiro com k e depois com k + 1. Os dois critérios usam desigualdades estritas.',
    explicacao: '3 > 2 exclui o ciclo. Como 3 = 2 + 1, o critério para excluir o caminho aberto ainda não se aplica.'
  }
];

const linkSlideHamilton = (id = slidesHamilton[0].id) => rotaTrilhaHamilton + id;

function paginaTrilhaHamilton(id) {
  const slide = slidesHamilton.find(item => item.id === id) || slidesHamilton[0];
  const indice = slidesHamilton.indexOf(slide);
  const anterior = slidesHamilton[indice - 1];
  const proximo = slidesHamilton[indice + 1];
  const revisado = progresso.slides.includes(slide.id);
  return `<div class="trilha"><a href="#teoria">Teoria</a><span>/</span><a href="${linkTeoria('05', 'hamilton')}">Aula 05</a></div>
    ${cabecalho('Hamiltonianos · slides 20 a 27', 'Percorra as páginas originais, refaça as contas e confira o que aprendeu.')}
    <div class="trilha-progresso"><span id="contagem-slides">${progresso.slides.length} de 8 slides revisados</span>
      ${medidor(progresso.slides.length, slidesHamilton.length, 'Slides revisados')}</div>
    <nav class="paginacao-slides" aria-label="Slides 20 a 27">
      ${slidesHamilton.map(item => `<a href="${linkSlideHamilton(item.id)}" aria-label="Slide ${item.id}" ${item === slide ? 'aria-current="page"' : ''}>
        ${item.id}<span data-slide-revisado="${item.id}" aria-hidden="true">${progresso.slides.includes(item.id) ? '✓' : ''}</span></a>`).join('')}
    </nav>
    <div class="trilha-grid">
      <article class="painel slide-trilha">
        <p class="sobretitulo">Slide ${slide.id}</p><h2>${html(slide.titulo)}</h2>
        <figure><img class="slide" src="figuras/aula-05/original-05-${slide.id}.webp" alt="${html(slide.alt)}"></figure>
        ${arquivoPDF('05', slide.id, 'Abrir página ' + slide.id + ' do PDF')}
      </article>
      <section class="painel estudo-slide" aria-label="Revisão do slide ${slide.id}">
        <h2>O que observar</h2><p>${html(slide.foco)}</p><p class="raciocinio-slide">${html(slide.raciocinio)}</p>
        <form data-quiz-slide="${slide.id}">
          <h3>Confira a compreensão</h3><p>${html(slide.pergunta)}</p>
          <div class="campos">${campoHTML(escolha('resposta', 'Sua resposta', slide.opcoes.map((texto, i) => ({ valor: String(i), texto }))))}</div>
          <button class="botao primario" type="submit">Conferir resposta</button>
          <div id="retorno-slide" role="status">${revisado ? '<p class="aviso">Slide já revisado.</p>' : ''}</div>
        </form>
      </section>
    </div>
    <div class="acoes navegacao-trilha">
      ${anterior ? `<a class="botao secundario" href="${linkSlideHamilton(anterior.id)}">← Slide ${anterior.id}</a>` : ''}
      ${proximo ? `<a class="botao primario" href="${linkSlideHamilton(proximo.id)}">Slide ${proximo.id} →</a>` : ''}
      <a class="botao secundario" href="#laboratorios/ciclos">Experimentar ciclos →</a>
    </div>`;
}

function conferirSlide(formulario) {
  const slide = slidesHamilton.find(item => item.id === formulario.dataset.quizSlide);
  const tentativa = new FormData(formulario).get('resposta');
  const acerto = tentativa === String(slide.resposta);
  if (acerto) {
    registrar('slides', slide.id);
    document.querySelector('#contagem-slides').textContent = progresso.slides.length + ' de 8 slides revisados';
    document.querySelector('[aria-label="Slides revisados"]').value = progresso.slides.length;
    document.querySelector('[data-slide-revisado="' + slide.id + '"]').textContent = '✓';
  }
  document.querySelector('#retorno-slide').innerHTML = `<div class="feedback ${acerto ? 'acerto' : 'erro'}">
    <strong>${acerto ? 'Resposta correta' : 'Tente outra vez'}</strong><p>${html(acerto ? slide.explicacao : slide.dica)}</p></div>`;
}
