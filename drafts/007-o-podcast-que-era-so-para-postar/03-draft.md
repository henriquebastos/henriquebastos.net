# Eu só ia subir o vídeo

Eu gravei uma conversa com o Alisson Vale pelo Zoom. A gente conversa há vinte anos, e dessa vez resolveu deixar gravando. O plano era nenhum: subir no YouTube, quem ouviu ouviu.

Na segunda de manhã me veio uma dúvida boba. Será que a IA faz alguma diferença nisso aqui? Ditei uma mensagem longa para o agente, dessas que saem tortas pela transcrição de voz: baixa o vídeo do Drive, transcreve, analisa, olha como funcionam os podcasts que eu acompanho, o Latent Space, o Next Token e o do Armin Ronacher. E terminei com "eu não estou preocupado em editar o vídeo agora não".

Dois dias e meio depois, o episódio estava no ar com cold open, trilha, tarjas animadas, capítulos, legenda revisada, miniatura, seis Shorts agendados e um texto no blog. Eu não teria feito isso sozinho. Não por preguiça: me falta talento para design e mixagem, me falta capacidade técnica de motion graphics, e me falta tempo. Quero contar como foi, com o que deu certo, o que deu errado e quanto custou.

## Uma tela de login no caminho de 336 MB

O primeiro obstáculo foi o mais banal possível. O Alisson tinha deixado a gravação num link "compartilhado" do Drive, e o link pedia login. O agente tentou quatro caminhos em um minuto, incluindo o [Executor](https://github.com/RhysSullivan/executor), que eu uso como ponte para as APIs do Google. O Executor achava o arquivo, mas não tinha como gravar 336 MB no disco.

Enquanto o download estava travado, ele não ficou parado. Instalou o transcritor, testou o fluxo com um áudio sintético gerado pelo `say` do macOS, analisou os três podcasts de referência pela API do YouTube e abriu um conduit no meu Obsidian, que é onde eu planejo trabalho longo com agentes. Tudo isso em sete minutos, e depois me devolveu três opções para o download.

A solução foi uma cópia do arquivo no meu Drive, compartilhada por alguns minutos, baixada com `curl` e apagada em seguida. O tamanho bateu no byte: 336.565.359.

Aí veio a primeira decisão que ele tomou sozinho. Eu tinha pedido para transcrever com o Parakeet, que roda local e é rápido. Ele rodou, e em alguns blocos de cinco minutos até 78% das palavras saíram em inglês. Onde o Alisson diz "porque eu acho que a IA é um veículo novo de expressão", o Parakeet escreveu "Because I ask that a IA is expression". O agente testou o Whisper no mesmo trecho, viu que funcionava, trocou e me contou depois: "Essa é a mudança mais importante, e eu fiz sem te perguntar antes."

Eu gostei de duas coisas aí. Ele trocou porque tinha a evidência na mão, e não escondeu que trocou.

## Metade da tela era preta, e o editor era cego

A gravação era o Zoom lado a lado: 1280 por 720, mas só uma faixa de 1280 por 360 tinha imagem. A outra metade era preto, em cima e embaixo. Os dois canais de áudio eram idênticos, então nada separava a minha voz da do Alisson.

O agente propôs usar o preto como espaço: título em cima, capítulos embaixo, e uma etiqueta quando alguém cita um projeto. E disse uma frase que me acompanhou o resto do processo: "Não consigo assistir ao vídeo. Você vai ser a única pessoa a ver o resultado de verdade."

Isso mudou o jeito de trabalhar dos dois lados. Ele passou a conferir o próprio trabalho de outras formas. Para saber se um corte pegava meia palavra, ele renderizava o trecho e transcrevia de novo. Foi assim que descobriu que o som de transição do cold open cobria a palavra "Amp": o Whisper ouviu "a galera do REN". Para saber se o vídeo final estava sincronizado depois de treze cortes de pausa, comparou quadros da gravação com quadros do episódio. E toda vez que me entregava algo, separava o que tinha conferido do que não tinha: "Não assisti aos Shorts com movimento e som; vi só quadros parados."

Do meu lado, eu virei o único par de olhos e ouvidos. Isso cobrou o preço quando ele me mostrou uma animação em quadros soltos. Eu respondi: "Você fez animação, mas não renderizou ela para eu assistir animação." Daí em diante, todo teste chegava como vídeo.

## A conversa aconteceu no Obsidian

As decisões nasciam nas páginas do conduit, não no chat. Para cada entrega, o agente escrevia uma página: o vídeo embutido, uma tabela de tempos, o que ele tinha decidido sozinho e por quê, e perguntas numeradas, cada uma com uma recomendação. Eu lia no Obsidian e respondia ali mesmo, dentro da página, ou no chat pelo número: "1a ok 1b ok", "3b B", "65%".

Quase tudo que eu mandei foi ditado. As mensagens chegavam com a cara da transcrição de voz, meio português, meio inglês, com "you gostei mucho" no meio de uma frase e "umg2" no lugar de "1g2". Ele precisava adivinhar, e quando adivinhava, dizia o que tinha suposto.

Esse formato tem uma vantagem que eu não esperava. As minhas respostas ficavam no git. Ele lia o `git diff` da página para saber o que eu tinha mudado, e cada rodada virava um commit. Foram 49 commits no conduit durante a produção. Quando eu quis revisar o texto do episódio, pedi para ele marcar as mudanças com o destaque do próprio Obsidian. Assim eu lia só o que tinha mudado.

Eu mandei 71 mensagens em dois dias e meio. Muitas têm uma palavra só: "sim", "aprovado", "pode.", "push". O trabalho ativo, nós dois juntos, somou umas sete horas. O resto foi ele trabalhando, eu dormindo, almoçando ou cuidando de outra coisa.

## Bonito, sem ser rebuscado

Antes de qualquer edição, eu freei: "A minha preocupação é com a estética. Então, acho que antes de você fazer um monte de edição, que pode ser cara, talvez você devesse fazer alguns exercícios." E dei a única direção que eu sabia dar: "Nada muito sofisticado ou rebuscado, mas algo bonito."

Ele foi atrás das referências de um jeito que eu não teria pensado. Leu o CSS do site do Alisson e do meu para achar as fontes e as cores, e montou três direções sobre quadros reais da gravação. Eu escolhi a terceira. A miniatura saiu de uma pintura cubista gerada por IA, porque a conversa passa por fotografia, pintura e Picasso. O dourado que ficou em tudo saiu da mediana dos pixels dessa pintura, um pouco clareada: `#c9a25a`.

O meu papel ali foi de filtro. Uma das cartelas tinha uma borda só do lado esquerdo, e eu reconheci na hora: "Esse estilo com uma borda somente à esquerda é muito frequente em coisas geradas por IA." Ele também tinha proposto uma linha do tempo com relógio na tarja. Eu recusei por gosto e por engenharia: um relógio correndo obrigaria a renderizar o vídeo inteiro de forma dinâmica. A tarja muda só quando muda o capítulo.

Uma coisa que deu errado de um jeito bem humano: eu respondi "Dourado" a uma pergunta, querendo dizer que o destaque de tudo passava a ser dourado. Ele entendeu que só a miniatura ficava dourada. Custou um render e uma mensagem.

## Cortar antes da promessa

O cold open foi a parte em que eu mais ensinei. A primeira versão tinha 47 segundos e cada trecho entregava a resposta. Eu expliquei o que vejo nos podcasts que acompanho: "geralmente o pessoal corta uma frase no meio quando vai entregar uma promessa". A versão nova caiu para 27 segundos e terminava cada trecho antes da conclusão.

Depois veio o som, e aí só eu podia decidir. Ele gerou dez opções de música e efeito no ElevenLabs, por uns 65 centavos de dólar, e eu fui ouvindo. Tirei o som de transição, escolhi a música eletrônica, pedi o whoosh "bem baixinho" e depois "um pouquinho mais alto". Foram cinco mixagens numa noite. Quando ele me ofereceu escurecer as tarjas em 40% ou 55%, eu respondi "65%".

## Cinco erros, nenhum grave

**A invenção que era verdade.** Na análise, o agente escreveu que o Jev era "da TypeSafe". Depois, revisando, não achou isso na transcrição, concluiu que tinha inventado, me disse isso com todas as letras e tirou. Quando eu mandei os links dos projetos citados, o link do Jev era da TypeSafe. O erro não foi a frase. Foi tirar a frase sem conferir fora da transcrição. Na mesma rodada, "Petros" virou Petrus, o projeto que o Whisper não conhecia.

**Os capítulos atrasados.** No começo, ele calculou os capítulos somando 47 segundos aos tempos da gravação, que era a duração do cold open. Depois vieram os cortes de pausa e um cold open menor, e a regra continuou lá. Quando ele recalculou a partir da linha do tempo real, todos os capítulos estavam de 17 a 39 segundos atrasados.

**A madrugada calada.** O render completo caiu na primeira tentativa, e a conta de disco não fechava: a ferramenta de motion graphics extrai todos os quadros do vídeo antes de começar, uns 27 GB para o episódio inteiro. Ele dividiu em nove partes de dez minutos e rodou uma de cada vez. Foi uma hora e meia de render, de madrugada, e ele ficou esperando sem me dizer nada. Às 2h34 eu mandei: "is this working?". Estava. Mas eu não tinha como saber.

**O Mac bloqueado.** Para subir os vídeos no YouTube Studio, eu sugeri que ele usasse um navegador com um perfil só desse projeto, e eu mesmo fiz o login. O episódio subiu bem. No primeiro Short, os diálogos do Studio pararam de aparecer. Ele investigou por uns dez minutos e umas 25 chamadas: a página, o processo, o navegador, a janela. A causa era que eu tinha saído e a tela do Mac bloqueou. Com a tela bloqueada, o navegador não desenha. Ele parou, me explicou e esperou eu voltar.

**O post sem as minhas correções.** No fim, com o texto do blog pronto, eu revisei a versão final direto na página do conduit e corrigi algumas coisas. Ele publicou a partir de outro arquivo. Eu escrevi: "eu acho que vc publicou sem atualizar as minhas correções". Pior: um commit dele tinha levado as minhas edições junto com uma mudança que não tinha nada a ver, o que atrapalhou achar o problema. O texto errado ficou uns dez minutos no ar e custou um segundo deploy.

Quase todos têm a mesma forma: uma informação que existia em algum lugar e não foi conferida antes de virar ação.

## Cinquenta dólares, sete horas minhas

A sessão inteira está guardada, então dá para contar. Da primeira mensagem ao último Short agendado, foram cerca de 55 horas de relógio, umas sete delas comigo ativo. O agente deu 770 respostas e fez 806 chamadas de ferramenta, 539 delas no terminal. O custo do modelo na produção foi de US$ 49,46, e uns 65 centavos no ElevenLabs. As imagens geradas não entram nessa conta.

Eu fiz 29 correções de rumo. Algumas eram de gosto, como o dourado, o "EP #1" e o 65%. Outras eram de conteúdo: os títulos dos Shorts, por exemplo. Eu reescrevi quatro dos seis porque "zoológico" sozinho não diz nada para quem está rolando a tela. Nas minhas palavras: "tem que ter uma coisa a ver com o IA, um cercadinho de IA para você morar".

## O episódio 1 virou teste

A parte que mais me interessa agora é a próxima. Um episódio é pouco para tirar conclusão, mas é o bastante para não pagar tudo de novo.

Depois da publicação, eu pedi duas coisas: esta história e uma receita. A receita tinha uma exigência. Se eu quiser mudar o estilo visual, mudo só o estilo. Se a próxima gravação vier com cada pessoa num arquivo separado, muda só a montagem. A transcrição serve para tudo.

Para escrever esta história, o agente fatiou a sessão de 108 MB nos pontos de compactação. Cada fatia foi para um subagente que extraiu os fatos, e no fim uma linha do tempo única foi conferida contra os commits e as datas dos arquivos. Os números deste texto saíram dali.

A receita virou um conjunto de skills no projeto do podcast. Cada episódio tem um arquivo com o conteúdo: os cortes, os capítulos, os títulos e as correções de nomes. O formato da gravação tem o dele, e o estilo visual tem uma pasta. Os scripts recebem a pasta do episódio e leem o resto dali. Uma skill olha a pasta, diz em que etapa o episódio está, e aponta o que fazer e o que espera a minha aprovação.

E o teste da receita é o próprio episódio 1. Um script refaz o episódio a partir desses arquivos e compara com o que foi publicado. As páginas de animação saem idênticas byte a byte. Um Short renderizado de novo saiu idêntico pixel a pixel, e o arquivo final tem os mesmos hashes de vídeo e áudio. Se eu mexer no estilo e o episódio 1 mudar, o teste avisa. Se a receita serve para um episódio novo, só o episódio 2 vai dizer.

## O que eu não sabia fazer

O episódio que eu gravei com o Alisson é sobre IA como veículo de expressão, mais do que como ferramenta. Ele compara com a fotografia, que obrigou a pintura a se reinventar.

Eu não tinha pensado nisso enquanto produzia, mas foi o que aconteceu comigo. Eu não sei mixar som, não sei fazer motion graphics, não sei escolher uma serifa. Eu sei reconhecer quando um corte entrega a promessa cedo demais, quando uma cartela tem cara de IA, quando o whoosh está alto. O agente fez o que eu não sei fazer, e eu decidi o que ele não tinha como saber.

Foi uma experiência muito incrível. O episódio está [no YouTube](https://youtu.be/2VQ58dqC12k), e o que a gente conversou virou [este texto](/pt/artigos/eu-nao-quero-morar-dentro-do-seu-produto/).
