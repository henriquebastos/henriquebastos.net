---
title: "Eu não quero morar dentro do seu produto"
publishDate: 2026-10-21
description: "Os produtos de IA querem que você more dentro deles. O que eu pus no lugar: agentes pequenos como comandos e uma timeline de fatos."
draft: false
lang: pt-BR
ogImage: /og-image/eu-nao-quero-morar-dentro-do-seu-produto.jpg
coverImage:
  src: ./eu-nao-quero-morar-dentro-do-seu-produto.png
  alt: "Miniatura de um homem de óculos e barba sentado numa poltrona com um notebook, dentro de uma caixa de produto fechada e mobiliada com estante, luminária e telas, sobre uma mesa escura com colinas desfocadas ao fundo."
---

Eu usava muito o aplicativo desktop da OpenAI. Já tinha me adaptado ao jeito
como ele organizava os projetos, à barra lateral, a onde cada coisa ficava. Aí
saiu uma versão nova cheia de recursos: arquivos, criação de documentos, até um
mapa. O aplicativo deixou de ser uma ferramenta que eu usava para mexer nas
minhas coisas e virou um lugar onde tudo ficava lá dentro. Ficou complexo e
acoplado demais. Parei de usar.

Não foi a primeira vez. Nos últimos meses eu testei quase tudo: Claude Code, o
da OpenAI, o [Amp](https://ampcode.com), que eu adoro e usei muito. Eu não
estava só usando. Eu estava estudando o design de cada um, tentando entender o
que os caras queriam fazer. E todos tinham o mesmo problema. Cada produto vem
com um jeito de trabalhar já decidido, e aderir a ele é tudo ou nada. Na hora em
que aparece o meu caso estranho, um projeto mais antigo da empresa com uma
restrição que não encaixa, começa o workaround. Eu passo a me adaptar ao fluxo
que alguém desenhou para um usuário que não sou eu.

Há 20 anos eu converso com o [Alisson Vale](https://alissonvale.com) sobre
software. Desta vez a gente gravou, e nessa conversa achou uma imagem para isso.
Ele olhou para o que eu estou construindo e chamou de floresta: um ambiente em
que a IA vive, com trilhas, onde agentes, dados e ferramentas crescem do jeito
de quem mora ali. Ele vê a mesma coisa acontecendo com ele. Os produtos são o
contrário. As empresas estão todas tentando criar um produto para você morar
dentro. É um zoológico: está tudo fechado, pré-definido, e o cercado tem o
tamanho que alguém escolheu.

## O que o Unix já sabia

O engraçado é que eu nunca quis construir nada disso. Eu resisti por um bom
tempo. Eu gosto de resolver os meus problemas e queria evitar a distração de
construir ferramentas antes de resolvê-los.

Quando eu digo ferramenta, penso no PyCharm que usei por anos. É grande, mas
coeso: uma IDE que traz tudo dentro e me deixa resolver os meus problemas. Isso
funciona quando o jeito de trabalhar já se estabilizou. Com IA, nada está
estável, e os produtos ainda não têm identidade.

Nesses momentos de volatilidade, comandos são melhores. O Unix tem um monte
deles, cada um faz uma coisa só e combina com os outros. Eu encadeio,
reorganizo, adapto. Quando alguma coisa muda, eu não troco tudo. Troco só aquele
pedacinho.

É isso que me falta no mundo da IA. Ninguém quer me dar os comandos, as
primitivas. Todo mundo quer que eu use o produto inteiro, que vai resolver o meu
problema. E não resolve. Nem os melhores, como o Amp, resolvem.

O que mudou foi o
[pi-durable](https://www.npmjs.com/package/@earendil-works/pi-durable), que traz
agentes duráveis para o [Pi](https://pi.dev). Ele me dá as primitivas para eu
montar os meus agentes com pouco esforço, cada um configurado para uma tarefa e
com a permissão de que precisa. São os meus comandos. Coloco cinquenta deles na
mesma máquina e não tem problema nenhum. Um conversa comigo pelo WhatsApp. Eu
mando um áudio, ele transcreve e guarda. Os sensores da casa, as máquinas e os
servidores jogam tudo no mesmo lugar. Quando alguma coisa sai do normal, o
agente me manda um print no WhatsApp.

Não é sofisticado. Eu peguei o que a gente usa para observar sistemas em
produção e fiz isso para a minha vida.

## A caixa d'água não tira conclusões

Quando eu olho para o que construí, o que se repete não são ferramentas. São
padrões, estratégias de dividir e conquistar. O principal é separar fatos de
conclusões.

Quando você usa o Dots da OpenAI ou o GrokBot, eles ficam buscando informações
até chegar a uma conclusão. Depois a sessão é arquivada. Ninguém consegue
reproduzir a conclusão, e eu não consigo rastrear como eles chegaram ali. Se
você não se organizar, o conhecimento vai junto.

Eu não quero guardar conclusões. Eu quero guardar fatos. A CPU do servidor está
em 80%. O que significa? Não importa agora. É um fato com um horário. Alguém me
mandou uma mensagem às tantas horas. Outro fato. Na minha casa tem um sensor
ultrassônico na caixa d'água que mede o nível a cada cinco minutos. Depois de
uma semana, de um mês, eu sei como a casa consome água. Quando o consumo sai do
padrão, isso vira um alerta, e só então vem a pergunta: o que aconteceu?

Eu quero, sim, que a IA me dê conclusões. Mas quero os fatos organizados por
baixo. Aí a conclusão não é o fim. A partir dela eu faço perguntas novas, e
essas perguntas olham para o conjunto inteiro dos fatos e trazem análises
melhores.

## O que a fotografia fez com a pintura

O Alisson leu tudo isso de um jeito que eu não tinha lido. Quando a fotografia
apareceu, ela arrebentou com a pintura. A pintura tinha o monopólio de
representar a realidade, e de repente qualquer um registrava a realidade com
mais fidelidade. Os pintores tiveram que se perguntar o que fazer. A resposta
veio com Matisse e depois com Picasso: parar de pintar o real e pintar o que se
sente sobre o real.

Para o Alisson, a IA é um veículo novo de expressão. Ela encurtou a distância
entre o que cada um percebe da própria situação e a possibilidade de
materializar isso. E o material é o mesmo para todo mundo. Eu pego o caderninho
do pintor e desenho bonequinho de palito. O pintor pega o mesmo caderninho e sai
uma coisa linda. O que separa os dois é o repertório.

Isso explicou a minha frustração com os produtos melhor do que eu tinha
conseguido. Um produto é feito para um usuário médio. Um veículo de expressão
depende de quem está usando.

Também explicou outra coisa. Alguém escreveu no X que a IA deixou a gente
preguiçoso de pensar. Comigo aconteceu o contrário. Eu estou tendo que fazer
outras coisas para conseguir parar de pensar. Acho que é porque a minha relação
com isso não é só de utilidade. Eu quero entender como isso funciona na minha
vida, no meu trabalho, no meu dia a dia.

## Uma conclusão jogada na parede

Tem muita ansiedade por aí. Todo mundo quer saber como encaixar a IA no que já
tem, e muita gente cria uma conclusão e joga na parede para ver se cola. Eu acho
que ninguém tem essa resposta ainda. A gente está num momento pré-paradigmático.
Quando eu comecei, a pergunta era qual a forma certa de fazer software, e isso
foi se descobrindo com o tempo. Agora a pergunta é qual a forma certa de usar
isso, e também vai ter que se descobrir.

Por isso eu prefiro sustentar a pergunta: como eu posso usar isso de um jeito
que ainda não usei? Isso tem um custo. Manter a pergunta aberta exige disciplina
nos experimentos. Se cada experimento não for feito para mudar, eu passo o tempo
todo refazendo tudo. E eu sei que parte dessa liberdade vem de um momento
específico: hoje as assinaturas subsidiam os tokens, e explorar sai barato. Isso
pode mudar.

## Andando de lado

O Alisson fechou essa ideia com uma imagem que eu gosto muito. As coisas estão
mudando rápido e vão continuar mudando. Quem pula de ferramenta em ferramenta
parece que está andando de lado. Ele se diz meio maquinista: vai construindo o
trilho por onde está andando.

Esse trilho é o centro estável. É um ambiente em que ele sabe qual modelo usar,
quando usar e onde entrar para resolver cada problema. Pode acontecer qualquer
coisa lá fora, e o ambiente dele continua estável para trabalhar hoje. Ao mesmo
tempo, ele é aberto. Quando sai um modelo novo, a novidade é acoplada ao que já
existe, sem refazer tudo.

O meu homelab é a minha versão disso, e é aqui que as primitivas fazem
diferença. Se tudo é moldado em função de uma ferramenta, quando chega uma coisa
nova eu não consigo aproveitar. Se eu me esforço para encontrar as primitivas e
o design certo para a minha floresta, a coisa nova entra naturalmente no
processo.

A floresta não é o oposto da estrutura. Ela é uma estrutura que é sua e que foi
feita para mudar.

## O desafio de ser único

A floresta tem um preço. Ela fica tão ligada ao jeito de quem construiu que é
difícil colocar outra pessoa para operar o mesmo ambiente. O Alisson chamou isso
de inteligência composicional: a pessoa e a IA viram uma terceira coisa, e as
duas não se separam com facilidade.

E aí chega o problema que nenhum de nós resolveu: como pessoas diferentes, e
agentes, trabalham juntos? Na minha casa, a minha mulher organiza tudo em papel.
Ela pensa de um jeito completamente diferente do meu. No outro extremo, o Amp
trabalha sem code review e sem pull request. A gente terminou a conversa sem
resposta, e eu acho que esse é o próximo assunto.

A conversa completa com o Alisson [está no meu canal do
YouTube](https://youtu.be/2VQ58dqC12k). A versão em áudio está no [Segue o
Flow](https://open.spotify.com/show/31I2zHW1EdTLNqap1XcfaO), o podcast do
Alisson. Se você também está montando a sua floresta, quero comparar notas. Eu
desconfio que a parte interessante não é a ferramenta que cada um escolheu. É o
momento em que o seu ambiente fica estruturado o bastante para os seus agentes
trabalharem nele junto com você.
