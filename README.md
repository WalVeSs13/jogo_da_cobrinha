🐍 Jogo da Cobrinha (Snake Game)

Um jogo clássico da cobrinha desenvolvido com HTML5, CSS e JavaScript puro, executado diretamente no navegador utilizando <canvas>.

O objetivo é controlar a cobra, comer a comida e evitar colidir com o próprio corpo enquanto acumula a maior pontuação possível.

🎮 Demonstração

O jogo roda localmente no navegador — não requer instalação de dependências.

🚀 Funcionalidades

✅ Interface com menu inicial

✅ Sistema de pontuação

✅ Tela de Game Over

✅ Reiniciar partida

✅ Tela de controles

✅ Tela de créditos

✅ Movimentação com teclado (setas ou WASD)

✅ Pausar e continuar jogo

✅ Wrap-around nas bordas (atravessa paredes)

✅ Comida nunca nasce dentro do corpo da cobra

✅ Interface com Canvas HTML5

✅ Design minimalista estilo arcade

🎯 Como jogar
Controles
Tecla	Ação
↑ ↓ ← →	Movimentar cobra
W A S D	Movimentar cobra
P	Pausar / Continuar
R	Reiniciar jogo
ESC	Voltar ao menu
📂 Estrutura do projeto
/jogo da cobrinha
 ├── index.html
 ├── style.css
 ├── game.js
 └── README.md

Arquivos

index.html → estrutura da interface

style.css → estilos do jogo

game.js → lógica completa do jogo

⚡ Como executar

Baixe ou clone o projeto

Abra o arquivo index.html no navegador

Não precisa instalar nada.

🧠 Lógica do jogo

O jogo utiliza:

Renderização com Canvas API

Loop de jogo com setInterval

Sistema de grid baseado em coordenadas

Detecção de colisão com o próprio corpo

Geração segura de comida fora do corpo da cobra

Gerenciamento de estado do jogo

🎨 Tecnologias utilizadas

HTML5

CSS3

JavaScript (Vanilla JS)

Canvas API

🔮 Melhorias futuras

Sistema de níveis

Aumento progressivo de velocidade

High score salvo no navegador

Sons e efeitos

Versão mobile com touch

Obstáculos no mapa

Animações da cobra

👨‍💻 Autor

Desenvolvido por Hellon Alves