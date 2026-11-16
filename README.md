# Estúdio de Grafos

Protótipo local para revisar Teoria dos Grafos. Ele reúne 16 tópicos das aulas 05, 06, 07, 08 e 12 e cinco atividades guiadas das quatro listas oficiais. Os PDFs originais e os recortes das figuras acompanham o projeto.

## Abrir

Abra `index.html` no navegador. Para usar um endereço local estável, execute o comando abaixo na pasta do projeto.

```sh
python3 -m http.server 8765 --bind 127.0.0.1
```

Acesse [127.0.0.1:8765](http://127.0.0.1:8765/). O app usa HTML, CSS e JavaScript sem dependências externas.

## Progresso

Os tópicos estudados e os exercícios concluídos são salvos no `localStorage`. Cada perfil de navegador mantém seu próprio histórico para o endereço que acessou. Abra o mesmo endereço no mesmo perfil para retomar o estudo. A versão baixada, o servidor local e o site publicado têm históricos próprios. Os passos de uma tentativa em andamento duram até recarregar a página.

## Estrutura

- `index.html` e `estilos.css` definem a navegação e a interface responsiva.
- `conteudo.js` guarda o sumário, os enunciados, as figuras e as referências por página.
- `tutor.js` valida cada decisão e prepara as pistas. Para acrescentar uma atividade, cadastre-a em `exercicios` e associe seu identificador a um tutor com `iniciar`, `pergunta` e `conferir`.
- `app.js` conecta as telas, os tutores e o progresso.
- `fontes/` e `figuras/` contêm os originais e as imagens extraídas dos PDFs. A numeração das referências começa pela capa do arquivo.

O feedback vem de regras dos slides e dos dados das questões. A questão 5 da Aula 05 cobre o primeiro grafo e suas quatro partidas. A questão 2 da Aula 06 cobre o item (b). Os demais itens podem ser consultados nas listas.
