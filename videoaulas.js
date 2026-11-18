const linkVideoaula = id => '#videoaulas/' + id;
const pastaVideoaula = id => 'media/videoaulas/' + id;
const posicoesVideoNaSessao = new Map();

function tempoVideo(segundos) {
  const total = Math.floor(segundos);
  return Math.floor(total / 60) + ':' + String(total % 60).padStart(2, '0');
}

function posicaoSalvaVideo(id) {
  try {
    const salvo = localStorage.getItem('estudio-de-grafos.videoaula.' + id);
    const segundos = Number(salvo ?? posicoesVideoNaSessao.get(id));
    return Number.isFinite(segundos) && segundos > 0 ? segundos : 0;
  } catch {
    return posicoesVideoNaSessao.get(id) || 0;
  }
}

function salvarPosicaoVideo(player) {
  if (!player || player.readyState < 1 || !Number.isFinite(player.duration) || !Number.isFinite(player.currentTime)) return;
  const id = player.dataset.videoaula;
  if (progresso.videoaulas.includes(id)) return;
  const tempo = Math.round(player.currentTime * 100) / 100;
  posicoesVideoNaSessao.set(id, tempo);
  try {
    localStorage.setItem('estudio-de-grafos.videoaula.' + id, String(tempo));
  } catch { /* A posição da sessão continua disponível. */ }
}

function catalogoDeVideoaulas() {
  const assistidas = progresso.videoaulas.length;
  return `${cabecalho('Videoaulas', 'Acompanhe os algoritmos passo a passo com narração e legendas em português.')}
    <section class="painel painel-video-progresso" aria-label="Progresso nas videoaulas">
      <p><strong>${assistidas} de ${videoaulas.length}</strong> videoaulas assistidas</p>
      ${medidor(assistidas, videoaulas.length, 'Videoaulas assistidas')}
    </section>
    ${aulas.map(aula => `<section class="secao grupo-videoaula" aria-labelledby="videos-aula-${aula.id}">
      <div class="secao-topo">
        <div class="bloco-titulo"><span class="aula-icone ${aula.cor}" aria-hidden="true">${aula.simbolo}</span>
        <div><span class="aula-num">Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span>
        <h2 id="videos-aula-${aula.id}">${html(aula.titulo)}</h2></div></div>
      </div>
      <div class="videoaulas-grid">${videoaulas.filter(video => video.aula === aula.id).map(cartaoVideoaula).join('')}</div>
    </section>`).join('')}`;
}

function cartaoVideoaula(video) {
  const concluida = progresso.videoaulas.includes(video.id);
  const posicao = concluida ? 0 : posicaoSalvaVideo(video.id);
  return `<a class="painel cartao-videoaula" href="${linkVideoaula(video.id)}">
    <div class="capa-videoaula">
      <img src="${pastaVideoaula(video.id)}/capa.webp" alt="" loading="lazy" width="1280" height="720">
      <span class="video-icone" aria-hidden="true">▶</span>
      <span class="duracao-videoaula">${tempoVideo(video.duracao)}</span>
    </div>
    <div class="texto-videoaula">
      <h3>${html(video.titulo)}</h3>
      <p>${html(video.descricao)}</p>
      ${concluida ? '<small class="estado">✓ Assistida</small>' : posicao > 0 ? `<small class="estado">Retomar em ${tempoVideo(posicao)}</small>` : ''}
    </div>
  </a>`;
}

function paginaVideoaula(id) {
  const video = videoaulas.find(item => item.id === id);
  if (!video) return catalogoDeVideoaulas();
  const aula = indiceAulas.get(video.aula);
  const pasta = pastaVideoaula(id);
  const capitulos = video.capitulos.map((capitulo, i) => `<li>
    <button class="capitulo-video" type="button" data-capitulo="${i}" ${i === 0 ? 'aria-current="step"' : ''}>
      <span>${tempoVideo(capitulo.tempo)}</span><span>${html(capitulo.titulo)}</span>
    </button>
  </li>`).join('');
  const topicos = video.topicos.map(idTopico => {
    const topico = aula.topicos.find(item => item.id === idTopico);
    return `<li><a href="${linkTeoria(aula.id, topico.id)}">${html(topico.titulo)}</a></li>`;
  }).join('');
  const questoes = video.questoes.map(numero =>
    `<li><a href="${linkListaOficial(aula.id, numero)}">Questão ${numero} da lista</a></li>`
  ).join('');
  const proximo = videoaulas[videoaulas.indexOf(video) + 1];
  const concluida = progresso.videoaulas.includes(id);
  return `<div class="trilha"><a href="#videoaulas">Videoaulas</a><span>/</span><span>Aula ${aula.id}${aula.id === '12' ? ' · Extra' : ''}</span></div>
    ${cabecalho(video.titulo, video.descricao)}
    <div class="layout-videoaula">
      <div>
        <video class="player-videoaula" data-videoaula="${id}" aria-label="${html(video.titulo)}"
          controls playsinline preload="metadata" poster="${pasta}/capa.webp">
          <source src="${pasta}/aula.mp4" type="video/mp4">
          <track kind="captions" src="${pasta}/legendas.vtt" srclang="pt-BR" label="Português (Brasil)" default>
          <a href="${pasta}/aula.mp4">Abrir o vídeo MP4</a>
        </video>
        <p class="status-videoaula" role="status">${concluida ? '✓ Videoaula assistida' : ''}</p>
      </div>
      <aside class="painel painel-capitulos">
        <h2>Capítulos</h2>
        <ol>${capitulos}</ol>
      </aside>
    </div>
    <section class="painel videoaula-referencias">
      <h2>Estude com o material da aula</h2>
      <ul>${topicos}${questoes}</ul>
      <p class="videoaula-paginas">Páginas do PDF ${video.paginas.map(pagina => arquivoPDF(aula.id, pagina, String(pagina))).join(' ')}</p>
      ${id === 'ciclos-hamiltonianos' ? `<a class="fonte-link" href="${linkSlideHamilton()}">Revisar slides 20 a 27</a>` : ''}
      <details class="transcricao-videoaula">
        <summary>Ler a transcrição</summary>
        ${video.capitulos.map(capitulo => `<section>
          <h3>${tempoVideo(capitulo.tempo)} · ${html(capitulo.titulo)}</h3>
          <p>${capitulo.fala.map(html).join(' ')}</p>
        </section>`).join('')}
      </details>
    </section>
    ${proximo ? `<a class="botao primario acesso-trilha" href="${linkVideoaula(proximo.id)}">Próxima videoaula →</a>` : ''}`;
}

function montarPlayerVideoaula() {
  const player = document.querySelector('[data-videoaula]');
  if (!player) return;
  const id = player.dataset.videoaula;
  const video = videoaulas.find(item => item.id === id);
  const botoes = [...document.querySelectorAll('[data-capitulo]')];
  let posicao = progresso.videoaulas.includes(id) ? 0 : posicaoSalvaVideo(id);
  let ultimoSalvamento = posicao;
  let capituloAtual = -1;

  function destacarCapitulo() {
    const ativo = video.capitulos.findLastIndex(item => item.tempo <= player.currentTime + 0.1);
    if (ativo === capituloAtual) return;
    capituloAtual = ativo;
    botoes.forEach((botao, i) => {
      if (i === ativo) botao.setAttribute('aria-current', 'step');
      else botao.removeAttribute('aria-current');
    });
  }

  function retomar() {
    if (posicao > 0 && posicao < player.duration) player.currentTime = posicao;
    destacarCapitulo();
  }

  if (player.readyState >= 1) retomar();
  else player.addEventListener('loadedmetadata', retomar, { once: true });

  botoes.forEach((botao, i) => botao.addEventListener('click', () => {
    posicao = video.capitulos[i].tempo;
    if (player.readyState >= 1) {
      player.currentTime = posicao;
      destacarCapitulo();
    }
  }));

  player.addEventListener('timeupdate', () => {
    destacarCapitulo();
    if (Math.abs(player.currentTime - ultimoSalvamento) >= 5) {
      salvarPosicaoVideo(player);
      ultimoSalvamento = player.currentTime;
    }
  });
  player.addEventListener('pause', () => salvarPosicaoVideo(player));
  player.addEventListener('seeked', () => salvarPosicaoVideo(player));
  player.addEventListener('ended', () => {
    registrar('videoaulas', id);
    document.querySelector('.status-videoaula').textContent =
      persistenciaDisponivel ? '✓ Videoaula assistida' : '✓ Videoaula assistida nesta sessão';
  });
  player.querySelector('source').addEventListener('error', () => {
    document.querySelector('.status-videoaula').textContent = 'Não foi possível carregar o vídeo. A transcrição está disponível abaixo.';
  });
}
