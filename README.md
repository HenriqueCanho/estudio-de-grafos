# Estúdio de Grafos

Webapp para revisar Teoria dos Grafos. Ele reúne as aulas 05, 06, 07, 08 e 12, as 44 questões das quatro listas oficiais, cinco atividades guiadas e 12 videoaulas narradas. Os PDFs originais e os recortes das figuras acompanham o projeto.

## Abrir

Abra `index.html` no navegador. Para usar um endereço local estável, execute o comando abaixo na pasta do projeto.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Acesse [127.0.0.1:8765](http://127.0.0.1:8765/). O app usa HTML, CSS e JavaScript sem dependências externas.

## Progresso

Os tópicos estudados, os slides e questões revisados, os rascunhos das listas, os exercícios resolvidos, os laboratórios concluídos e o avanço nas videoaulas são salvos no `localStorage`. Cada perfil de navegador mantém seu próprio histórico para o endereço que acessou. Abra o mesmo endereço no mesmo perfil para retomar o estudo. A versão baixada, o servidor local e o site publicado têm históricos próprios. Os passos de uma tentativa guiada em andamento duram até recarregar a página.

## Estrutura

- `index.html` e `estilos.css` definem a navegação e a interface responsiva.
- `conteudo.js` guarda o sumário, os enunciados, as figuras e as referências por página.
- `revisao.js` reúne os tópicos complementares e remete às páginas que fundamentam cada exemplo.
- `questoes-05.js` a `questoes-08.js` descrevem as questões numeradas, suas pistas, recortes, checagens e observações de leitura. `pratica-oficial.js` exibe as listas e mantém os rascunhos.
- `exemplos.js` guarda os cálculos comentados e as referências dos exemplos resolvidos. Os diagramas de `figuras/diagramas/` podem ser recriados com `python3 scripts/gerar_diagramas.py` usando Pillow.
- `trilha-hamilton.js` reúne as oito páginas originais da Aula 05, de 20 a 27, com revisão individual e perguntas.
- `laboratorios.js` permite experimentar ciclos, coloração, Huffman, fluxo residual e o Método Húngaro com dados dos slides.
- `videoaulas.js` organiza o player, os capítulos, a transcrição e as referências das videoaulas. Os roteiros ficam em `roteiros/`.
- `tutor.js` valida cada decisão e prepara as pistas. Para acrescentar uma atividade, cadastre-a em `exercicios` e associe seu identificador a um tutor com `iniciar`, `pergunta` e `conferir`.
- `app.js` conecta as telas, os tutores e o progresso.
- `fontes/` e `figuras/` contêm os originais e as imagens extraídas dos PDFs. A numeração das referências começa pela capa do arquivo.

O feedback vem de regras dos slides e dos dados das questões. Na prática guiada, a questão 5 da Aula 05 cobre o primeiro grafo e suas quatro partidas. A questão 2 da Aula 06 cobre o item (b). As páginas individuais das questões exibem todos os grafos e subitens originais.

## Renderizar as videoaulas

Para regenerar as capas, os MP4, as legendas WebVTT e o catálogo, use Python com Pillow, FFmpeg e o sintetizador `say` do macOS com a voz brasileira Luciana.

```sh
python3 scripts/gerar_videoaulas.py
```
