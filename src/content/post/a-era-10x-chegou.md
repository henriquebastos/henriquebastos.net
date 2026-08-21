---
title: "A era 10x chegou. Mas 10x o que?"
publishDate: 2026-08-21T12:00:00-03:00
description: "Dez vezes mais código é a ambição mais rasa para agentes de programação. A verdadeira alavancagem está em camadas mais profundas."
draft: true
lang: pt-BR
translationOf: the-10x-era-is-here
coverImage:
  src: ./a-era-10x-chegou.png
  alt: "Desenvolvedor cercado por telas e teclados usa braços e tentáculos enquanto olha rapidamente para vários monitores."
---

Você lidera uma equipe de engenharia de software e sai de uma reunião em que
todos perguntaram quando o projeto vai ficar pronto. Abre o roadmap. Ele já está
lotado.

Enquanto isso, sua equipe está experimentando IA. Você vê um agente construir
em uma tarde o que antes levava dias. A demonstração funciona. Há esperança de
lançar antes dos concorrentes. A pergunta óbvia vem em seguida: quanto mais sua
equipe consegue entregar agora?

Não é uma pergunta idiota. Tudo à sua frente aponta nessa direção. Tickets são
fechados. Pull requests são integrados. Funcionalidades são concluídas.
Construir software de repente parece barato. Precisamos de mais 10x!

Parece um sonho. O agente escreve uma funcionalidade, os testes passam, os
revisores aprovam e o código é integrado. A empresa recebe uma funcionalidade
pronta por menos do que teria gasto antes. É difícil não ficar de queixo caído.

Mas há um porém. Escrevemos código, mas isso descreve o que fazemos, não por que
fazemos. O valor não está no código. O investimento só se paga quando alguém usa
o sistema em execução para resolver um problema. É nessa relação entre software
rodando e um usuário satisfeito que mora o valor.

Dez vezes mais código é a parte mais rasa do que os agentes de programação
tornam possível. A verdadeira alavancagem está em camadas mais profundas.

## A magia econômica do software

Impérios foram construídos sobre software porque a mesma implementação pode
servir a milhares de pessoas durante anos. Uma funcionalidade útil ganha escala.
Um defeito também. Essa escala funciona nos dois sentidos.

Ouvi [Joran Greef explicar a economia do software com muita
clareza](https://www.youtube.com/watch?v=8br5QcmYq84&t=3240s). Construir o
software era o insumo caro, não o resultado econômico: pesquisa, design,
código, testes, arquitetura, infraestrutura e manutenção são investimento.
Código é estoque.

O custo de construir e manter o sistema cresce de forma mais ou menos linear,
enquanto o valor do sistema em execução pode crescer muito mais rápido entre
usuários e ao longo do tempo. Os clientes compram o que o software torna
possível, junto com sua qualidade e experiência. Se consigo criar o mesmo valor
com menos código, esse é um resultado melhor, não um feito menor.

Trabalho com software há mais de trinta anos, e o desejo de remover os
desenvolvedores não é novo. Desenvolvedores são escassos e caros porque seu
trabalho e julgamento podem criar um ativo com esse tipo de alavancagem. O
mercado vive tentando obter o retorno escalável sem pagar pelo insumo escasso.

Ferramentas de desenvolvimento rápido, plataformas low-code e plataformas
no-code resolveram problemas pontuais. Elas resolveram como construir certos
tipos de software, mas não chegaram a eliminar o desenvolvimento. Os
desenvolvedores subiram um nível, para a arquitetura, a integração, o design e o
julgamento que as ferramentas não conseguiam resolver.

Algumas transformações tiveram impactos ainda maiores. A Internet mudou a
distribuição e, com ela, a forma de construir e atualizar software. O movimento
Lean Startup atacou o risco de investimento antes do product-market fit para
descobrir algo valioso antes de [focar inteiramente no
crescimento](https://paulgraham.com/earn.html).

IA e Coding Agents são provavelmente a tecnologia mais poderosa das nossas
vidas. O perigo é usar esse poder para aumentar o estoque dentro do mesmo
pipeline de software. E essa é a busca que eu ando vendo por toda a indústria:
se a previsão era de que um roadmap levaria dois anos, talvez os agentes
consigam terminá-lo neste trimestre. Mas um roadmap continua sendo uma lista de
investimentos que a empresa espera transformar em valor. Concluí-lo mais rápido
não melhora essa esperança. Pode fazer a empresa parecer mais rápida nas
entregas enquanto seu software se degrada mais rápido.

## Um dev e um agente entram num PR a 80 km/h

O pipeline de software atual foi construído em torno de uma restrição real.
Construir software era lento, e construir a coisa errada colocava um grande
investimento em risco. O trabalho precisava ser dividido entre desenvolvedores
avançando em velocidades diferentes e depois reconciliado repetidamente até que
o sistema inteiro pudesse rodar.

Um ticket delimitava uma parte do investimento. Uma branch isolava a mudança ao
criar uma linha do tempo alternativa. A main continuava avançando, a branch
continuava avançando, e cada nova branch criava mais um futuro possível
correndo ao lado delas.

Uma pull request obrigava essas linhas do tempo a se encontrar. Os revisores
reconstruíam a intenção e o risco a partir do diff. O CI verificava se o futuro
proposto poderia se reintegrar ao produto atual. Quando as verificações passavam
e as pessoas concordavam, a branch se tornava o novo marco temporal estável.

Essa cerimônia não era arbitrária: coordenava trabalho humano escasso, limitava
o risco acumulado antes da produção e resistia à entropia. Uma gambiarra pode
ajudar uma startup a encontrar product-market fit e depois dificultar todas as
mudanças futuras que o sistema precisar.

Os agentes aceleram essas linhas do tempo. Eles não eliminam os conflitos.

A maioria das empresas que observo mantém todo esse sistema de trabalho e
multiplica as entradas. Gerentes de produto, designers, equipes de suporte e
gestores agora podem criar mudanças ao lado dos desenvolvedores. Agentes abrem
mais pull requests, e mais funcionalidades correm em direção ao lançamento. O
primeiro resultado é mais estoque esperando por integração e julgamento, não
mais valor.

A [lei de Brandolini](https://en.wikipedia.org/wiki/Brandolini%27s_law) diz que
a quantidade de energia necessária para refutar idiotice é uma ordem de
grandeza maior do que a necessária para produzi-la. Mudanças geradas por agentes
criam uma assimetria parecida. Gerar uma mudança plausível é barato. Provar que
ela merece fazer parte do sistema em produção não é. Uma pull request empurra
essa mudança adiante para que outra pessoa a reconstrua e aceite, geralmente um
desenvolvedor. Acoplamento, consequências arquiteturais, invariantes quebradas e
comportamentos não testados ainda exigem julgamento. A geração se expande. A
responsabilidade se concentra.

O problema central é que o caminho até o valor está fragmentado pela empresa.
Engenharia é responsável pelo código; produto, vendas, suporte e sucesso do
cliente são responsáveis por partes da experiência do cliente; plataforma e
operações são responsáveis pelo sistema em execução. Cada função mede sua
própria parte, então a engenharia conta tickets, pull requests e progresso no
roadmap. Quando os agentes barateiam esses resultados, a liderança pede mais, e
os desenvolvedores absorvem o peso da coordenação, da revisão e da qualidade. A
atenção finita deles vira o próximo gargalo a ser otimizado.

Vi o custo humano disso no [relato do
Typecraft](https://www.youtube.com/watch?v=0Lo6MSGrxEA&t=432s). Ele voltou da
licença-paternidade para uma empresa que promovia IA em toda a organização. As
pessoas falavam em se tornar quatro ou dez vezes mais produtivas. Gerentes de
projeto estavam abrindo pull requests. A empresa corria para lançar
funcionalidades antes dos concorrentes.

Os agentes não aliviaram seu trabalho: acrescentaram mais atividade para
acompanhar, mais resultados para avaliar e mais pressão para suportar. A mesma
máquina que podia continuar produzindo enquanto ele dormia lhe exigia atenção
constante enquanto estava acordado.

Continuo ouvindo versões disso de amigos: estresse, jornadas mais longas,
supervisão contínua e perda de autonomia. A fragmentação explica por que a
liderança recorre a resultados visíveis, mas não a isenta. Enxergar além das
funções, conectar atividade a resultados e redesenhar um sistema que usa
pessoas para compensar uma falha estrutural são responsabilidades da liderança.
Aplicar mais pressão enquanto a mesma falha ganha escala é incompetência, mesmo
quando ninguém pretendia causar o dano.

## A solução é mais antiga que o software

A parte constrangedora é que esse problema de produção foi resolvido há 130
anos. A Toyota encontra a origem da lição em [um tear construído em
1896](https://global.toyota/en/company/vision-and-philosophy/production-system/).
Estamos cometendo o mesmo erro outra vez.

Um tear automático podia produzir tecido muito mais rápido do que uma pessoa
enquanto o fio permanecesse intacto. Quando um fio arrebentava e o tear
continuava se movendo, a mesma velocidade desperdiçava material e produzia
defeitos mais rápido. A resposta imediata era razoável: colocar uma pessoa ao
lado dele. Mais teares exigiam mais vigias, ou um trabalhador dividindo sua
atenção entre várias máquinas. A produção ganhava escala. A vigilância também.
Isso soa familiar?

Sakichi Toyoda mudou essa relação. Ele incorporou ao tear a detecção de
anormalidades, a parada automática e a sinalização. O princípio se tornou o
[jidoka](https://global.toyota/en/company/vision-and-philosophy/production-system/).
A operação normal deixou de consumir atenção contínua. A máquina chamava uma
pessoa quando o julgamento era necessário.

A parada protegia o tecido, mas o sinal também mudou o papel humano. Uma falha
se tornou um evento que o sistema de produção podia observar. As pessoas podiam
consertar a máquina, estudar falhas recorrentes e melhorar as condições em que
a produção continuava. As máquinas rodavam na velocidade das máquinas enquanto
os humanos melhoravam o sistema que tornava essa velocidade útil.

A Toyota não obteve paralelismo produtivo exigindo que os trabalhadores
vigiassem mais rápido. Ela redesenhou o maquinário até que uma pessoa pudesse
cuidar de várias máquinas.

É isso que a indústria precisa entender sobre agentes de programação: adicionar
mais agentes enquanto cada resultado ainda espera pela reconstrução humana na
próxima etapa não cria alavancagem. Só alimenta o mesmo congestionamento na
velocidade das máquinas.

## O alvo: Deep Engineering™

Uma tecnologia tão poderosa exige que eu repense o desenvolvimento de software
a partir dos primeiros princípios, em vez de empurrar mais trabalho para o
sistema de produção antigo.

Vivi um uso diferente dessa capacidade em um dos meus projetos. O trabalho
exigia uma estratégia que ninguém dentro da empresa havia usado. Sem agentes,
eu teria recorrido à experiência, a alguns experimentos que coubessem no
orçamento e ao melhor palpite disponível dentro do prazo.

Em vez disso, experimentei seis abordagens.

A maior parte daquele código era descartável. Cada implementação existia para
expor um limite, responder a uma pergunta ou revelar uma propriedade útil. Um
agente podia investigar uma direção enquanto medições e outros experimentos
continuavam. O trabalho rodava em paralelo, mas meu objetivo não. Cada resultado
alimentava o mesmo design.

Juntas, as seis abordagens me mostraram qual solução valia a pena manter. Então
pude construir o caminho completo ao redor dela: comportamento do usuário,
operações, plataforma, arquitetura, instrumentação e escala futura. O projeto
levou cerca de dois meses. Pela natureza do trabalho, estimo que antes teria
levado cerca de seis.

Não usei agentes para pesquisar e depois voltei a uma IDE para fazer o trabalho
de verdade. Fiz todo o trabalho com agentes de programação, do início ao fim.
Projetei com eles, construí o contexto de que precisavam e os usei para
implementar tanto as abordagens descartáveis quanto o sistema que mantivemos.

A velocidade impressiona, mas não é isso que quero enfatizar. Exploração barata
me permitiu evitar um compromisso com a primeira resposta plausível. O código
descartado comprou o conhecimento que fortaleceu o sistema final sem sacrificar
as estruturas que sustentariam o que viria depois. Estou satisfeito com a
qualidade. A equipe também está, e já está construindo coisas novas sobre o
sistema.

A IA não ampliou o escopo do produto. O alvo de valor permaneceu estreito, mas
eu pude levar a engenharia muito mais fundo. Aprendi mais rápido, medi os
efeitos de decisões de design em várias camadas antes que se consolidassem na
arquitetura, comparei implementações alternativas e descobri onde cada uma
falhava. Os agentes podiam procurar propriedades que os testes não protegiam,
conduzir um navegador pela interação real, coletar evidências para eu julgar e
buscar formas de quebrar o que havíamos construído. Esses são os detalhes que
eu normalmente adiaria para caber no prazo. Passei mais tempo projetando o
sistema e menos tempo brigando com o código até que funcionasse.

Coloquei bastante trabalho para rodar em paralelo, mas não ficava trocando de
contexto. Eu fazia uma coisa o tempo todo. Pesquisas, medições e experimentos
continuavam sem mim; os resultados esperavam em uma fila até precisarem do meu
julgamento. Em vez de ficar pulando entre seis funcionalidades sem relação
entre si, pude continuar aprofundando uma única visão.

Essa profundidade não pode parar no merge, porque uma funcionalidade integrada
ainda é estoque até o sistema em execução chegar a um usuário. Uma mudança
estreita pode ser integrada por trás de uma feature flag, carregar sua
instrumentação e chegar à equipe ou a um grupo pequeno de clientes antes de
chegar a todos.

As pessoas concluíram a tarefa? O sistema permaneceu saudável? Alguma premissa
falhou? A exposição limitada transforma essas respostas em parte do design. Um
defeito encontrado e corrigido ali pode causar menos dano do que um distribuído
a todos os clientes e descoberto pelo suporte semanas depois.

É isso que quero que 10x signifique: não mais lâmpadas espalhando luz pelo
roadmap, mas um laser concentrando essa energia em um único alvo de valor e o
conduzindo pelo sistema de ponta a ponta, até chegar a um usuário. O alvo
permanece estreito. A engenharia percorre o caminho inteiro.

## Liberte sua mente

Tudo ainda está mudando depressa. É cedo demais para engessar qualquer parte
disso em uma resposta fixa de longo prazo. Meu ambiente de desenvolvimento muda
a cada poucas semanas: aprendo outra técnica, encontro outra ferramenta e
ajusto meu processo. Construo software de um jeito completamente diferente de
um ano atrás, e espero que isso continue.

Mas não é cedo demais para escolher uma direção. Independentemente dos recursos
e do ponto de partida, uma empresa pode direcionar essa nova capacidade para
acumular estoque de código mais rápido ou aumentar a vazão de valor do sistema
inteiro: a velocidade com que um investimento chega a um usuário, cria valor e
informa a próxima mudança. Essa segunda direção exige aprendizado,
experimentação e disposição para assumir riscos. Na minha experiência,
compensa.

Já consigo ver partes de um novo sistema de produção tomando forma. Os [orbs
multiplayer da Amp](https://ampcode.com/news/multiplayer) e o [Delta da
Zed](https://zed.dev/blog/introducing-delta) colocam pessoas e agentes em
ambientes compartilhados e executáveis. Conversa, código, comportamento em
execução e evidências podem convergir ali. Não vejo nenhum deles como o
maquinário final, mas ambos são sinais de que o desenvolvimento de software
está subindo mais um nível de abstração.

Hoje, os usuários experimentam o defeito primeiro, o suporte acaba revelando o
padrão e a engenharia reconstrói o que aconteceu. Em um sistema de produção que
conecta agentes ao comportamento em execução, um agente pode detectar uma
tendência negativa enquanto ela se forma, rastreá-la até uma regressão e
preparar um reparo com evidências para o desenvolvedor julgar. A detecção e a
investigação passam a acontecer mais cedo, contendo o problema antes que ele se
torne a reputação do produto.

Chegar lá eleva o nível exigido da liderança. A aposta não é maximizar o gasto
de tokens nem colocar mais desenvolvedores para supervisionar mais agentes. É
dar espaço às equipes para repensar como projetam, constroem, avaliam, lançam e
aprendem com o software, mantendo o sistema inteiro conectado ao valor que um
usuário experimenta. Fazer essa aposta antes que os métodos estejam
consolidados exige coragem. Isso faz parte do trabalho.

A IA tornou o código mais rápido. Tornar o software melhor agora é uma decisão
da liderança.
