import React, { useState, useEffect } from 'react';
import { Card, CardContent, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./especies.css";


const EspeciesPage = () => {

    function EspecieHumano() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Typography variant="h4" className="MainTitleC">Espécies</Typography>

                <Typography className="bigBoxTextClasses" sx={{ mt: 2 }}>
                    A escolha da espécie em um TTRPG é crucial, pois molda a essência do personagem e influencia a narrativa. No Sistema Lâmina do Oculto (LDO), as regalias de espécie permitem uma customização única, tornando cada indivíduo de uma espécie singular e diversificado. Essas regalias refletem habilidades, traços culturais e vantagens peculiares, adicionando profundidade à caracterização e à interação com o mundo do jogo. Portanto, a escolha da espécie no LDO é uma promessa de aventuras únicas e uma oportunidade para destacar a individualidade do personagem.<br />
                    Cada espécie possui um grupo de Regalias que podem custar um ou mais Pontos de Regalia. O valor só será especificado quando custar pelo menos 2 pontos de Regalia.<br />


                </Typography>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Humano</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }} >
                            Na vasta tapeçaria dos mundos, os seres humanos são frequentemente retratados como uma espécie de notável versatilidade. Eles são os sobreviventes por excelência, moldando-se e adaptando-se a uma miríade de circunstâncias desafiadoras, como a argila nas mãos de um habilidoso oleiro.<br />
                            A resiliência dos seres humanos é uma característica que os destaca. Diante de adversidades intransponíveis, eles não apenas resistem, mas florescem. Desafiando os elementos, as ameaças e as adversidades do destino, os humanos provaram ser mais do que meros mortais. Eles são a personificação da determinação, da vontade indomável de superar obstáculos e de encontrar maneiras de prosperar, não importa quão sombrio seja o cenário.<br />
                            Mas não é apenas a capacidade de sobrevivência que define os humanos. Sua capacidade destrutiva também é notável. Com criatividade e intelecto afiado, eles desvendam segredos, criam máquinas de guerra imponentes e dominam a magia como nenhuma outra espécie. Eles trazem a destruição, tanto com suas habilidades como com suas inovações, como uma força da natureza que molda o mundo ao seu redor.<br />
                            Assim, os seres humanos em um mundo representam mais do que simples mortais. Eles personificam a versatilidade, resiliência e capacidade destrutiva que reside no coração de todos nós. Eles nos lembram que, no jogo da vida e da imaginação, somos todos heróis em nossas próprias histórias, prontos para enfrentar o desconhecido, resistir à adversidade e moldar nosso destino à medida que avançamos corajosamente em direção ao desconhecido.
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Prodígio Militar:</strong><br /> Um humano que seja um prodígio militar pode realizar um teste de Percepção na mesma ação de atacar, a fim de identificar as fraquezas e forças do seu adversário. Ao passar no teste de habilidade com dificuldade estipulada pelo mestre, o humano ganha vantagem no rolamento de acerto deste e dos próximos ataques, e sua margem de cŕitico diminui em um até o final de seu turno atual. Ele pode executar essa leitura 3 vezes em um mesmo dia. O valor do teste pode ser alternativamente estipulado pela percepção do alvo, com um padrão de 10 + valor de percepção, se ele não tiver valor declarado, tome como base a dificuldade 15.<br />
                            Além disso, possui proficiência com espadas bastardas.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Gênio Acadêmico:</strong><br /> Um humano que seja um gênio acadêmico possui um vasto conhecimento e memória excepcional. Um gênio acadêmico não esquece nada do que leu ou ouviu nos últimos 30 dias. Ele sempre sabe a hora do dia e a estação do ano. Gênios acadêmicos podem usar a ação Recordar Conhecimento enquanto realizam a ação Ler Ambiente ou Buscar Cobertura. Ele pode executar essa ação desta forma 5 vezes em um mesmo dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Faz Tudo:</strong> <br />Um humano que seja um faz-tudo é um indivíduo que não se dedicou a dominar uma habilidade específica, mas aprendeu várias delas. Um faz-tudo pode realizar a ação Abrir fechadura e a ação Preparar com apenas uma ação, e a ação Desabilitar Dispositivo com  duas ações.  Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia.<br />
                            Ou pode escolher uma Proficiência para alocar 1 ponto.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Sobrevivente do deserto:</strong><br /> Resiste à condição de cansaço causada pela falta de comida, água ou sono. Recebe apenas um nível de exaustão para cada 3 noites sem dormir ou a cada 2 dias de viagem sem água e recursos.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem Tribal (2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Falcão:</strong>Testes de Percepção, que dependam da visão, para observar algo em até 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Touro:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Raposa:</strong> Tentativas de enganar perseguidores em uma fuga recebem vantagem do rolamento do rolamento de Enganação.</li>
                            <li><strong>Tartaruga:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar. Desde que estejam carregando um escudo ou tenha uma cobertura em alcance </li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Pantaneiro:</strong><br /> Por passar muito tempo em ambiente pantanoso consegue se cuidar para não deixar o ambiente te atrasar. Pode andar em terrenos difíceis que sejam por alagamento ou lama sem sofrer penalidade de movimento. Além disso, recebe +2 em testes de natureza para lembrar alguma informação sobre a natureza de mangues e pântanos.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Determinação Humana (2 pontos de Regalia):</strong><br /> A determinação do ser humano é o que o leva a conquistar e ter sucesso. Um humano com essa Regalia pode rolar novamente o d20 em qualquer teste de Habilidade que tenha falhado, porém deve usar o novo resultado independente do resultado. Essa habilidade de poder mudar seu destino pode ser usada duas vezes por dia. Além disso, ao sofrer dano que o levaria a zero pontos de vida, o humano pode, antes de entrar na condição À Beira da Morte, usar uma única ação como sua reação. Essa segunda parte da habilidade  pode ser usada apenas uma vez por dia.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento de Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieElfo() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Elfo</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Dentro dos vastos mundos, a raça dos Elfos, com suas três distintas facções - os Elfos Exordiais, os Elfos Selvagens e os Elfos Lunares, apesar das diferenças evidentes, compartilham algumas notáveis semelhanças que refletem a essência de sua linhagem comum.<br />
                            Independentemente de suas origens, os Elfos são uma espécie que tende a viver vidas notavelmente longas, muitas vezes atingindo séculos de idade. Essa longevidade confere uma profunda perspectiva de vida, permitindo que eles acumulem conhecimento e sabedoria ao longo dos anos. Todos os Elfos possuem traços físicos distintos, como a delicadeza de seus traços faciais e a graça de sua aparência, que são igualmente apreciados nas três subespécies.<br />
                            Os Elfos, em geral, compartilham uma conexão singular com a magia e o mundo natural. Eles são conhecidos por sua afinidade natural com a magia, o que é especialmente perceptível nos Elfos Lunares, que banham-se na luz noturna e tiram proveito da magia lunar. Os Elfos Exordiais também mantêm uma relação profunda com a magia, refletindo em sua habilidade telepática e visão única. Já os Elfos Selvagens, embora priorizem a natureza, também têm um respeito inabalável pelo equilíbrio mágico da vida selvagem.<br />
                            As três subespécies de Elfos compartilham uma perspectiva unificada sobre a coexistência com outras raças, valorizando a diversidade e a paz inter-racial. Cada grupo reconhece que, apesar das diferenças, todos os seres têm um papel a desempenhar na narrativa do mundo.
                            Os Elfos Exordiais, enraizados nas origens da civilização élfica, possuem uma perspectiva de vida milenar. Eles carregam consigo um profundo respeito pelas tradições e pela sabedoria ancestral. Sua aparência física frequentemente reflete a antiguidade de sua linhagem, com traços delicados e refinados. Sua sociedade é centrada no compartilhamento de conhecimento, em que as histórias do passado são valorizadas e transmitidas às gerações mais jovens. Eles têm uma visão das relações inter-raciais que é enraizada no respeito pela história e pela continuidade da cultura élfica.<br />
                            Os Elfos Selvagens, por outro lado, abraçam a natureza como parte fundamental de suas vidas. Sua aparência física muitas vezes apresenta características que se harmonizam com os ambientes naturais que habitam. Eles tendem a viver em ambientes intocados, onde a conexão com a natureza é mais forte do que qualquer outra coisa. Sua sociedade valoriza a proteção da vida selvagem e a coexistência pacífica com ela. Quando se relacionam com outras raças, a preservação da natureza é frequentemente um ponto de discordância e compreensão.<br />
                            Os Elfos Lunares são noturnos por natureza, e suas vidas estão entrelaçadas com as fases da lua. Sua aparência frequentemente incorpora tons prateados e uma aura mágica que reflete sua afinidade com as estrelas e a luz da lua. Eles veem o cosmos como uma fonte de inspiração e poder, e sua sociedade é construída em torno da magia noturna e do conhecimento místico. Quando interagem com outras raças, muitas vezes são vistos como guardiões dos segredos do céu noturno, mas também como misteriosos e imprevisíveis.<br />
                            Em resumo, a diversidade cultural e a relação com outras raças definem os Elfos. Suas perspectivas de vida milenar, aparência física e conexão com a natureza ou o cosmos moldam profundamente suas sociedades e interações em um mundo repleto de diversidade e maravilhas. Cada facção de Elfos traz consigo sua própria essência e valores, enriquecendo o panorama da civilização élfica e do mundo em que habitam.

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 7,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Elfo Exordial:</strong><br /> Elfos Exordiais  são a espécie original dos primeiros elfos. Elfos exordiais Conseguem enxergar no escuro em até 9 metros de distância como se fosse em meia luz e como luz completa em meia luz. Elfos exordiais conseguem se comunicar com outros seres por telepatia, com uma distância máxima de 15 metros. Se o alvo da telepatia for outro elfo exordial esse alcance aumenta para 36 metros.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Elfo Selvagem:</strong><br />Elfos Selvagens gostam de viver em ambientes naturais com pouca intervenção para construir suas sociedades. Elfos selvagens não precisam de equipamento de acampamentos para conseguir os benefícios de um descanso longo. Elfos selvagens também tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 12 metros de velocidade de movimento base. Possuem visão no escuro com alcance de até 18 metros de distância como se fosse em meia luz e como luz completa em meia luz.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Elfo Lunar:</strong> <br />Elfos lunares gostam de se banhar na luz noturna e são mais ativos durante a noite. Elfos lunares conseguem enxergar no escuro com alcance de 18 metros como se fosse luz completa e adicionais 18 metros como se fossem meia luz, e 36 metros como luz completa em meia luz. Elfos lunares conseguem se direcionar através da posição dos astros do céu noturno e não ficam perdidos viajando em ambientes abertos durante a noite. Elfos lunares são resistentes ao dano sombrio.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Marca de Origem  (2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma marca de nascença por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Fênix:</strong>Ao tomar dano que causaria a criatura com essa tatuagem a ficar com 0 pontos de vida, a criatura pode escolher resistir e ficar com 1 ponto de vida. Uma criatura pode resistir a ficar com 0 pontos de vida apenas 3 vezes em toda sua vida. Na última a tatuagem some. Para fazer uma nova tatuagem é necessário gastar 1000 M.O. em pó de rubi e mais 1000M.O. em platina em pó.</li>
                            <li><strong>Búfalo:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Nove Caudas:</strong> Tentativas de seduzir criaturas que sentem atração pelo sexo do portador da tatuagem recebem +3 de bônus do rolamento de Sedução. E recebe +1 em qualquer outro teste de sedução.</li>
                            <li><strong>Tartaruga Leão:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que atacar com magia, feitiço ou milagre. Desde que estejam carregando um escudo ou tenha uma cobertura em alcance  </li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Vida longa (requisito, ter mais de 100 anos):</strong><br /> Um elfo que tenha mais de 100 anos pode receber vantagem dupla (rola 3 dados e pega o melhor resultado) em testes de qualquer Habilidade da aba  de Conhecimento com um assunto relacionado a algo que aconteceu durante seu tempo de vida. </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Armas exóticas:</strong><br /> Recebe 2 pontos na proficiência em Armas Exóticas.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Anatomia Esguia:</strong><br /> Mesmo elfos que são mais fortes e de porte físico mais largo tem uma maior elasticidade e capacidade de se dobrar e entrar em lugares apertados. Um elfo com esse talento tem um bônus de +3 em testes de acrobacia para entrar e passar por lugares apertados.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Passos largos:</strong><br /> Um elfo com essa Regalia tem +3 metros de velocidade de movimento. Além disso, ganha vantagem em testes de atletismo para realizar saltos.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Um com a natureza:</strong><br /> Um elfo com essa Regalia não recebe penalidade de movimento em terrenos difíceis naturais. Além disso, ganha  vantagem em testes de atletismo para escalar árvores e paredes rochosas naturais.</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Passo místico:</strong><br /> O elfo pode, como uma ação, teletransportar para um espaço desocupado  que possa ver, com uma distância igual  ou menor a seu valor de velocidade de movimento. Pode fazer isso 3 vezes ao dia, recuperando os usos em um descanso longo.<br />
                            Elfo Exordial: Após realizar este teletransporte seu próximo ataque causa dano igual ao seu nível.<br />
                            Elfo Selvagem: Após realizar este teletransporte fica invisível até o início de seu próximo turno. Enquanto invisível a criatura está Obscurecida.<br />
                            Elfo Lunar:  Ao realizar o teletransporte é criado uma cópia ilusória do elfo lunar onde estava na hora de realizar o passo místico. Além de idêntica a original, a cópia se movimenta como se estivesse viva (respirando e oscilando como se tivesse peso). Para descobrir se a cópia é uma criatura real é necessário contato físico ou um teste de Investigação com dificuldade 15. Essa cópia ao ser acertada por um ataque explode em luz, deixando o atacante cego até  o fim do turno do ataque.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }

    function EspecieAnao() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Anão</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Dentro da cultura geral dos Anões, as três vertentes - Domínio das Minas, Domínio da Forja e os Anões Exilados - são elementos cruciais que se entrelaçam e enriquecem a sociedade anã como um todo.<br />
                            Os Anões, como um povo, são conhecidos por sua durabilidade e sua determinação inabalável. A cultura anã valoriza a honestidade, a lealdade e o senso de comunidade. Os princípios éticos e a profunda reverência pelas tradições são aspectos centrais da vida anã. As histórias e lendas passadas de geração em geração têm um papel crucial na manutenção da identidade e na transmissão dos valores.<br />
                            A busca pela maestria e pela excelência é um componente intrínseco da cultura anã. Seja na habilidade de identificar minérios e antecipar desastres naturais dos Anões do Domínio das Minas, na habilidade de forjar e apreciar a qualidade das armas e armaduras dos Anões do Domínio da Forja, ou na versatilidade dos Anões Exilados, que valorizam a aprendizagem constante e a habilidade de se adaptar a diversas situações, todos compartilham o compromisso com a expertise e a excelência em seu campo.<br />
                            Além disso, a sociedade anã é profundamente centrada na comunidade. Os laços familiares e a solidariedade entre clãs são inegociáveis. As cidades anãs são geralmente escavadas nas profundezas da terra e, embora cada vertente possua seu próprio espaço e funcionalidade específica, todas colaboram para o bem-estar da comunidade. A sociedade anã é altamente organizada, com sistemas de governo e hierarquias que garantem a ordem e a prosperidade.<br />
                            A fé desempenha um papel significativo na vida dos Anões, independentemente da vertente. Eles geralmente veneram deuses relacionados à terra, mineração e forja. Seus rituais religiosos são eventos comunitários que fortalecem a coesão e a espiritualidade.<br />
                            Em resumo, a cultura geral dos Anões é uma celebração da durabilidade, da expertise e da comunidade. As diferentes vertentes - Domínio das Minas, Domínio da Forja e os Anões Exilados - contribuem para essa cultura diversificada, enriquecendo o mosaico da sociedade anã. <br />Independentemente da linhagem, os Anões compartilham um profundo respeito por suas tradições, valores éticos e um senso inabalável de identidade e comunidade.


                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 12<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 4,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Pequeno / Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Domínio das Minas:</strong><br /> Um anão que vem do domínio das minas tem uma linhagem de trabalhadores ou donos de minas. Um anão dessa linhagem reconhece  com mais precisão veias de minério em cavernas e túneis de pedra caso existam, ganhando um bônus de +10 em testes de conhecimento e exploração que envolve perceber ou identificar a presença de minério em cavernas e outros. <br />
                            Um anão desta linhagem também conseguem sentir tremores e vibrações na rocha relacionados a desastres naturais (terremotos, enchentes, deslizamentos), recebendo vantagem em testes de Habilidades(Investigação ou Percepção) para saber se irá acontecer algum tipo de deslocamento terrestre natural em rochas.  <br />
                            Dentro do domínio das minas, um anão é treinado em perceber e navegar sem luz ou pouca luz e pode enxergar no escuro em até 9 metros como se fosse meia luz e como luz completa em meia luz.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Domínio da Forja:</strong><br />Um anão do domínio da forja se origina de uma linhagem de trabalhadores de metal e consegue reconhecer a qualidade de uma arma apenas de olhar para ela. Testes de Habilidade de história, Natureza ou apuração de itens mágicos recebe um valor igual a +1 quando se trata de itens forjados em metal.<br />
                            Anões da forja também tem proficiência em machado anão.<br />
                            Anões da forja tem resistência a dano de fogo.<br />

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Exilado:</strong> <br />O Exilado é um indivíduo que nunca se dedicou a masterizar nenhuma habilidade por estar fora das linhagens principais da sociedade anã, porém aprendeu várias Habilidades mundo afora. Um exilado consegue usar a ação Abrir fechadura e Preparar com apenas uma ação e a ação Desabilitar Dispositivo com duas ações.  Ele pode escolher uma destas opções para executar desta maneira 3 vezes ao dia. <br />
                            Ou pode escolher uma Proficiência para alocar 1 ponto.<br />

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Marca de Origem  (2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma marca de nascença por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Topeira:</strong>Testes de Percepção para sentir vibrações no solo  recebem +3 de bônus do rolamento. Consegue cavar as mãos em solo macio 1,5 metros de a cada  minuto, e 30 segundos com ferramentas.</li>
                            <li><strong>Picareta:</strong> Tentativas de escalar paredes rochosas recebem +3 de bônus do rolamento de Atletismo. Recebe +1 em, qualquer outro teste de atletismo para escalar.</li>
                            <li><strong>Mula:</strong> Ao tentar ser movido contra sua vontade, o anão com esta tatuagem pode escolher resistir e não mover 3 vezes ao dia.</li>
                            <li><strong>Jabuti:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for Recuar cuidadosamente, desde que esteja usando um escudo ou exista uma cobertura em alcance.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Glória a Terra:</strong><br /> Um anão com esta Regalia pode ao realizar um ataque usar a ação derrubar.  Essa manobra  pode ser utilizada até 3 vezes em um dia, recuperando os usos em um descanso longo. </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Resistência a Deslizamentos(2):</strong><br /> Um anão com essa Regalia têm resistência a ataques da propriedade terra ou Concussivo. Escolha apenas 1.<br />
                            Recebe vantagem em testes de atletismo para mover pedras e objetos pesados.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Ódio Anão(2):</strong><br /> Um anão pode escolher um oponente dentro do campo de batalha que esteja em até 30 metros para ser Odiado. Ao fazer isso ele canaliza todo seu rancor, recebendo vantagem no rolamento de acerto e 1d4 de dano do ataque em ataques contra o alvo. Porém ele recebe -2 de penalidade em ataques e dano contra criaturas que não são seu alvo Odiado. A habilidade dura por 10 minutos, ou até que ou o anão ou a criatura Odiada cheguem a 0 pontos de vida, e pode ser usada 1 vez ao dia, recuperando o uso em um descanso longo.<br />
                            Ao atingir o nível 10 ganha mais um uso por descanso longo.<br />
                            Ao atingir o nível 20 ganha mais um uso por descanso longo.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieFeerico() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Feérico</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Em meio a um mundo repleto de criaturas feéricas de todas as formas e tamanhos, a sociedade feérica é uma tapeçaria de diversidade e mágica. Cada subespécie, como os Gnomos, Pixies, Dríades, Sátiros, Ninfas da Névoa, Mariposas Eternas e Menecmas, contribui de maneira única para a intrincada teia da convivência e interações entre esses seres mágicos e o mundo que os cerca.<br />
                            Os Gnomos, pequenos e ágeis, são habilidosos em se mover através de ambientes hostis e em permanecerem despercebidos. Eles frequentemente servem como mensageiros e exploradores, fornecendo informações valiosas para sua sociedade feérica. Sua destreza é uma ferramenta importante em ambientes densos e perigosos.<br />
                            As Pixies e Sprites, com suas asas brilhantes, trazem a alegria da liberdade e da exploração. Eles são embaixadores naturais entre a sociedade feérica e as criaturas do ar, proporcionando uma conexão única com as alturas. Sua capacidade de se mesclar com o ambiente torna-os mestres da evasão e do sigilo.<br />
                            As Dríades, ancestrais das árvores, são guardiãs dos bosques e matas. Sua habilidade de atravessar madeira e ganhar força com a energia das árvores é essencial para a preservação das florestas. Elas servem como sentinelas e curandeiras da natureza.<br />
                            Os Sátiros, com sua mistura de natureza e animalidade, trazem a vitalidade e a alegria da dança e da música para a sociedade feérica. Sua agilidade e capacidade de saltar os tornam excelentes exploradores das áreas selvagens.<br />
                            As Ninfas da Névoa, ligadas à névoa e ao orvalho, são especialistas em evasão e movimento furtivo. Sua habilidade de evitar ataques físicos e deslizar através de frestas torna-as mensageiras eficazes e exploradoras de terrenos perigosos.<br />
                            As Mariposas Eternas, com asas iridescentes, possuem habilidades únicas de ilusão que adicionam uma camada de encanto e diversão à sociedade feérica. Elas frequentemente atuam como artistas e ilusionistas, cativando multidões com seu espetáculo de luzes e cores.<br />
                            Os Menecmas, mestres da ilusão e da transformação, são diplomatas e espiões consumados. Sua habilidade de assumir a forma de outras criaturas permite que estabeleçam conexões e obtenham informações cruciais para a sociedade feérica.<br />
                            Em conjunto, essas subespécies feéricas criam uma sociedade complexa e rica em diversidade, onde cada ser desempenha um papel único e vital. Suas interações com o mundo humano e outras criaturas moldam o equilíbrio mágico do universo de fantasia, criando um cenário onde a magia, a diversão e a intriga se entrelaçam de maneiras fascinantes.<br />
                            Hierarquia na Sociedade Feérica:<br />
                            Famílias e Clãs Feéricos: A base da sociedade feérica é frequentemente composta por famílias e clãs, cada um com sua própria linhagem e tradições. Os líderes dessas famílias muitas vezes detêm grande influência sobre seus membros, e a hierarquia interna pode variar. Os clãs são responsáveis por manter tradições, cuidar da natureza e gerenciar recursos mágicos.<br />
                            Reis e Rainhas Feéricos: Em algumas sociedades feéricas, há reis e rainhas que governam sobre várias famílias e clãs. Eles são frequentemente escolhidos com base em suas habilidades mágicas, sabedoria e conexão com a natureza. Sua autoridade é reconhecida, mas pode variar em extensão, dependendo da sociedade.<br />
                            Conselhos e Assembleias: Alguns grupos feéricos têm conselhos ou assembleias formados por líderes de famílias e clãs. Esses órgãos podem ser consultados para tomar decisões importantes e resolver disputas. Os líderes eleitos ou designados servem como representantes de suas comunidades.<br />
                            Protetores da Natureza: Muitas subespécies feéricas, como as Dríades e as Ninfas da Névoa, desempenham papéis fundamentais na preservação e proteção da natureza. Elas são vistas como guardiãs e líderes espirituais de seus territórios naturais, recebendo respeito e deferência de outras criaturas feéricas.<br />
                            Artesãos e Curandeiros: A sociedade feérica valoriza habilidades artísticas e mágicas. Artesãos habilidosos, como as Mariposas Eternas, são respeitados por suas contribuições culturais, enquanto curandeiros e curandeiras têm um papel vital na manutenção da saúde e bem-estar da comunidade.<br />
                            Exploradores e Emissários: Alguns feéricos assumem a tarefa de explorar o mundo exterior e estabelecer relações com outras raças. Isso pode envolver embaixadores, emissários e espiões, como os Menecmas. Sua habilidade de assumir a forma de outras criaturas é uma vantagem nesses papéis.<br />

                            Características da Sociedade Feérica:<br />
                            Diversidade Cultural: A sociedade feérica é caracterizada por uma rica diversidade de culturas e tradições. Cada subespécie tem suas próprias práticas e crenças, mas elas muitas vezes coexistem em harmonia.<br />
                            Celebrações Mágicas: Festivais e celebrações mágicas desempenham um papel importante na sociedade feérica. Eles são oportunidades para compartilhar histórias, músicas e danças, além de fortalecer os laços com a natureza.<br />
                            Respeito pela Natureza: A natureza é reverenciada e protegida, pois os feéricos têm uma conexão profunda com o mundo natural. A preservação da flora e fauna é uma responsabilidade compartilhada por todos.<br />
                            Magia e Artes: As artes mágicas desempenham um papel central na sociedade feérica. Muitos feéricos praticam magia, seja como curandeiros, invocadores de ilusões ou mestres de elementos naturais.<br />
                            Espírito Comunitário: Os feéricos geralmente têm um forte senso de comunidade e cuidado mútuo. A cooperação é valorizada, e muitas decisões são tomadas coletivamente.
                            <br />
                            A sociedade feérica é um reflexo da magia e diversidade que permeiam seu mundo. Suas hierarquias variam entre as subespécies, mas todas compartilham um profundo respeito pela natureza, uma conexão mágica e uma cultura rica. Ela é um lugar de encanto e mistério, onde a harmonia com o mundo natural é essencial.


                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Minúsculo / Pequeno / Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Gnomo:</strong><br /> O gnomo é um ser feérico minúsculo e, por isso, sua velocidade de movimento é de 4,5 metros. Um gnomo, por ser pequeno e ágil, consegue atravessar por debaixo de criaturas médias ou maiores sem penalidade de movimento. Um gnomo tem a capacidade de ficar tão imóvel que chega a parecer parte do ambiente e recebe vantagem em testes de furtividade enquanto imóvel em um ambiente de luz completa  ou meia luz, e de vantagem dupla em ambientes escuros.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Pixies/Sprites:</strong><br />A pixie ou o sprite  são fadas minúsculas e sua velocidade de movimento base por terra é de 4,5 metros, porém eles têm uma velocidade de movimento base de voo igual a 7,5 metros.  Em um combate, a fada/sprite pode usar a ação esconder junto com a ação recuar cuidadosamente, para mesclar mágicamente  com o ambiente e se esconder se passar, sumindo da visão de todos e ficando Obscurecido.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Dríade:</strong> <br />A dríade é um espírito, de tamanho médio ou pequeno, feérico antigo de carvalhos e outros membros anciões de uma mata ou floresta. Dríades conseguem atravessar superfícies de madeira de até 1,5 metros de espessura e podem escalar árvores sem precisar realizar um teste de atletismo. Ao realizar um descanso longo em um ambiente de floresta a dríade ganha o seu nível em pontos de vida temporários, que duram até perdê-los ou receber uma nova fonte de vida temporária.

                        </Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong>Sátiro:</strong><br /> O sátiro é uma criatura de tamanho médio ou pequeno, metade cervo/bode e metade homem. Esse ser feérico tem a capacidade de saltar igual a sua velocidade de movimento em um salto horizontal, ou metade de sua velocidade de movimento para um salto vertical. Pode usar seu chifre como uma arma natural que causa 1d8 de dano de impacto.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Ninfa da Névoa:</strong><br /> As Névoa Ninfas são seres humanóides feéricos, de tamanho médio ou grande, associados à névoa e ao orvalho. Sua velocidade de movimento é de 7,5 metros, mas podem se transformar em névoa por um curto período (1 minuto), permitindo-lhes deslizar através de fendas e frestas inacessíveis para a maioria. Quando em forma de névoa, são quase intangíveis e podem evitar ataques físicos, porém não podem atacar enquanto nesta forma.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong> Mariposas Eternas :</strong> <br />São fadas humanoides de tamanho médio que se assemelham a mariposas com asas iridescentes. Sua velocidade de voo é incrivelmente rápida, atingindo 12 metros por turno. Elas têm a habilidade de criar ilusões  coloridas pequenas, com uma ação em combate de até um cubo com 1,5m de aresta, que podem distrair e confundir inimigos possuem valor de dificuldade 10 para discernir se é uma ilusão ou não com um teste de Investigação, tornando-as mestres da ilusão.
                        </Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong> Menecma :</strong> <br />O menecma é um humanóide feérico capaz de assumir aparência de seres de tamanho médio ou pequeno. Ele pode roubar a aparência de qualquer humanóide de tamanho parecido do seu que tenha visto. A transformação é mágica, aparece em detecção de magia e possui duração de 1 hora. Pode se transformar dessa forma até 4 vezes em um dia.
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Coruja:</strong>Testes de Percepção na escuridão ou meia luz recebem vantagem do rolamento.</li>
                            <li><strong>Unicórnio:</strong> Tentativas de uma criatura atravessar obstáculos recebem +4 de bônus do rolamento de Atletismo.</li>
                            <li><strong>Duende da Rocha:</strong> Tentativas de se esconder de perseguidores em uma fuga recebem +3 de bônus do rolamento de furtividade.</li>
                            <li><strong>Dragão feérico:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for Performar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Eu aposto que esse bicho me aguenta:</strong><br /> Qualquer feérico minúsculo pode montar em qualquer besta ou monstro pequeno ou maior. Ganha os benefícios de montar essa criatura e ainda pode conversar com elas como se falasse a língua delas (caso não fale).  </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Asas pra quem te quero (2):</strong><br /> Desperta asas em seu corpo que brotam de suas costas. Velocidade voo igual a sua velocidade de movimento.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Anatomia feérica:</strong><br /> Recebe resistência ao dano arcano. Porém vulnerabilidade a ataques com armas de aço negro.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Camaleão mágico:</strong><br /> Consegue ficar invisível enquanto encostado em qualquer superfície e com movimento máximo de 3 metros a cada 6 segundos. A duração da habilidade acaba quando se move mais rápido que 3 metros, sem contato com nenhuma superfície ou realizar um ataque. Pode usar essa habilidade 3 vezes em um dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }

    function EspecieDraconiano() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Draconiano</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Nas vastas terras deste mundo, uma espécie singular conhecida como Draconianos deixa sua marca indelével. Estes seres, fruto da fusão entre dragões ancestrais e outras linhagens, são uma presença notável em nossa realidade.<br />
                            Com uma aparência majestosa, os Draconianos podem ostentar asas imponentes, escamas iridescentes e olhos que irradiam sabedoria. Eles carregam não apenas a força e resistência de seus antecessores draconianos, mas também uma série de habilidades especiais que refletem o tipo de dragão a que estão ligados. Essas habilidades variam de controlar chamas, gelo ou raios, e são uma manifestação da diversidade mágica que permeia o mundo.<br />
                            Os Draconianos desempenham papéis de destaque em nossa sociedade, muitas vezes ocupando cargos de liderança ou oferecendo sua experiência como conselheiros sábios. Sua influência é sentida em todos os cantos, e eles inspiram respeito e admiração.<br />
                            Além de seu impacto na sociedade, a presença dos Draconianos enriquece a narrativa de nosso mundo. Eles podem ser heróis que protegem nossos reinos, ou personagens complexos com objetivos próprios. Seu papel é fundamental em nossa realidade, onde a magia e o extraordinário se entrelaçam em uma teia de maravilhas.


                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 9<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 4,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Grande
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Dragão:</strong><br /> O meio dragão é fruto de uma quase incompatível combinação de um dragão com um elfo ou humano. Um meio dragão tem sua descendência de um dos três tipos de dragão: fogo, gelo e raio. O meio dragão tem resistência ao dano  correspondente de seu ancestral.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Wyvern:</strong><br />O meio wyvern é a mistura do dracônico wyvern com um bestial ou humano. É menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. Um meio wyvern é o mais rápido dos draconianos e possui uma velocidade de movimento base de 6 m. O meio wyvern pode também usar uma ação para dar um grande avanço correspondente a 15 metros. Uma vez que ele tenha feito isso deve esperar ao menos 1 minuto para fazer de novo.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Wyrm:</strong> <br />O meio wyrm é uma mistura entre o dracônico wyrm com um feérico ou um humano. O meio wyrm é menor que meio dragão e meio draco, por isso é uma criatura considerada de tamanho médio. O meio wyrm traz consigo a mordida venenosa de seu parente e podem tentar como uma ação envenenar uma criatura com um ataque de mordida. Caso acerte o ataque causa 1d6 de dano e deixa o inimigo envenenado com dano por rodada de 1d4 de dano por 3 rodadas. Pode fazer essa mordida uma vez a cada 1 minuto.
                        </Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Draco :</strong><br />O meio draco é uma mistura  do dracônico draco com um bestial ou troll. Esse draconiano é o único que não pode escolher a regalia de Asas Draconianas, então para se adaptar a sua vida terrestre possui longas garras e chifres. O meio draco pode usar sua garra como uma arma de uma mão e se tiver o treinamento considerar cada mão como uma arma. O dano de seu ataque com garra é de 1d10 de dano cortante.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Kobolds:</strong><br /> Kobolds são pequenos draconianos que são a mistura de raças pequenas ou minúsculas com qualquer tipo de dragão. Eles possuem uma velocidade de movimento igual a 4,5 m por serem pequenos. Eles têm a capacidade de usar sua criatividade e inteligência para solucionar problemas. Eles podem usar a ação esconder quando usar a ação Bustar cobertura ao mesmo tempo sem custo extra, como também conseguem usar a ação habilitar / desabilitar dispositivo como uma ação.

                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Dragão ancião:</strong>Testes de percepção contra criaturas menores que o tamanho do portador da tatuagem recebem +1 de bônus do rolamento.</li>
                            <li><strong>Dragão do fogo:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Dragão do trovão:</strong> Ganha 1,5 m de velocidade de movimento enquanto estiver fugindo de perseguidores.</li>
                            <li><strong>Tartaruga dragão:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que usar Habilidades mágicas (magia, milagres e feitiços) que não causem dano.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Asa Draconiana (2):</strong><br /> Manifesta asas de couro e ossos igual a de seu ancestral draconiano. Ganha a Habilidade de voar igual à sua velocidade de movimento. </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Bafo de Dragão:</strong><br /> Escolha um dos 3 elementos naturais (fogo, gelo e raio) para ser o elemento de sua arma de sopro. Em um cone de 6 metros de comprimento e 60° de abertura em frente ao draconiano é expelido 2d10 de dano do elemento selecionado. Custa 1 ação e só pode ser feito 2 vezes a cada descanso curto.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Escamas(2):</strong><br /> O draconiano desenvolve uma forte carapaça com suas escamas que ficam em suas pernas, braços e torso. O valor de defesa base do draconiano com essa Regalia é de 10 + agilidade + armadura leve ou média, ao invés de 7.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Sabedoria Hereditária:</strong><br /> A linhagem ancestral dos dragões pulsa com conhecimento antigo e instintos aguçados. Como herdeiro do sangue dracônico, você carrega ecos da sabedoria dos grandes dragões anciões. Recebe um bônus de +5 em testes de História e Arcanismo relacionados a dragões, suas origens, cultos, territórios e influência mágica.<br />
                            Além disso, recebe +5 em testes para Recordar Conhecimento sobre dragões específicos, suas fraquezas, hábitos e lendas associadas. Você também pode reconhecer a presença de um ninho de dragão ou área de influência dracônica quando estiver a até 1 km de distância, mesmo que ele esteja oculto — um instinto ancestral se manifesta em forma de sensações, sonhos ou visões breves.<br />
                            Por fim, você tem vantagem em testes de Intuição ao lidar com dragões, sendo capaz de perceber motivações ocultas ou detectar mentiras vindas dessas criaturas majestosas.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieMeioElfo() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Meio Elfo</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Meio-Elfos, graciosos e dotados de beleza etérea, são a manifestação da união entre elfos e humanóides. Com uma herança mista que combina a paixão e a curiosidade dos humanos com a conexão profunda dos elfos com a natureza, eles se tornam um elo especial entre dois mundos.<br />
                            Essa raça é abençoada com características marcantes: a pele delicada dos elfos e a resistência dos humanos, a agilidade dos primeiros e a versatilidade dos segundos. Os Meio-Elfos herdam a habilidade de se comunicar com a natureza, percebendo suas nuances e entrando em sintonia com o ambiente ao seu redor.<br />
                            Mas sua singularidade não se limita apenas às características físicas. São também mediadores naturais, capazes de harmonizar comunidades diversas. Eles carregam consigo a riqueza das histórias e culturas de ambas as raças, criando pontes e promovendo a compreensão entre elfos e humanos.<br />
                            Os Meio-Elfos são espíritos inquietos, sempre buscando um propósito maior. Eles podem escolher entre os caminhos de seus antecessores, abraçando a natureza e a magia, ou embarcar em jornadas de exploração e aventura em busca de seu destino.<br />
                            Com uma beleza cativante e um espírito resiliente, os Meio-Elfos são a encarnação da diversidade e da harmonia, representando a fusão das tradições antigas e do ímpeto de novas descobertas. Eles são uma ponte entre dois mundos, unindo-os em uma só raça com um potencial ilimitado.
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 9<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Exordial:</strong><br /> O meio exordial é um meio elfo formado por pais elfo exordial e humano. Este meio elfo é capaz de conversar telepaticamente com outras criaturas e não só elfos, porém só pode usar essa telepatia por 6 segundos. Após sua telepatia por 6 segundos deve esperar 10 minutos para usar novamente. Consegue usar a ação Desabilitar Dispositivo com duas ações.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Selvagem:</strong><br />O meio selvagem é um meio elfo formado por pais elfo selvagem e humano. Este meio elfo tem uma velocidade de movimento elevada, enquanto não usam armadura pesada, de 7,5 metros de velocidade de movimento base. Além disso, proficiência com espadas-diapasão.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Meio-Lunar:</strong> <br />O meio lunar é um meio elfo formado por pais elfo lunar e humano. Este meio elfo é capaz de enxergar no escuro com alcance de 6 metros como se fosse meia luz na escuridão, e luz completa na meia luz. Não esquece nada que leu ou ouviu nos últimos 30 dias.
                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Falcão:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Touro:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Nove Caudas:</strong> Tentativas de seduzir criaturas que sentem atração pelo sexo do portador da tatuagem recebem +5 de bônus do rolamento de Sedução.</li>
                            <li><strong>Tartaruga Leão:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que atacar com magia, feitiço ou milagre.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Determinação Humana (2):</strong><br /> A determinação do ser humano, e seus descendentes, é o que o leva a conquistar e ter sucesso. Um meio-elfo com essa Regalia pode rolar novamente o d20 em qualquer teste de Habilidade que tenha falhado, porém deve usar o novo resultado independente do resultado. Essa habilidade de poder mudar seu destino pode ser usada uma vez por dia. Além disso, ao sofrer dano que o levaria a zero pontos de vida, o humano pode, antes de entrar na condição À Beira da Morte, usar uma única ação como sua reação. Essa habilidade pode ser usada apenas uma vez por dia. </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Vida longa:</strong><br /> Recebe proficiência com as seguintes armas:<br />
                            - Espada de lâminas duplas<br />
                            - Espada diapasão<br />
                            - Katar

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Vida longa, menos amigos:</strong><br /> Um meio elfo ainda possui grande ligação com humanos de vida curta. Ver seus parentes e amigos morrerem um a um enquanto permanece jovem pode afetar o meio-elfo. O meio-elfo com essa Regalia recebe +2 em testes de enganação ou persuasão para esconder seus verdadeiros sentimentos, e também um bônus de +3 em testes de intuição para tentar entender os verdadeiros sentimentos de outra criatura com rosto humano ou parecido.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Influência Social:</strong><br />Toda vez que fizer um teste de Habilidade e rolar um 20 no d20, o meio-elfo pode garantir a uma criatura um bônus de +4 em qualquer rolamento que faça no próximo minuto. O uso deste bônus deve ser anunciado antes da outra criatura fazer o rolamento.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieMeioDemonio() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Meio Demônio</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Meio-Demônios, criaturas marcadas pela dualidade em sua essência, são o resultado da união entre seres demoníacos e humanóides. Eles carregam uma herança mágica sombria e uma natureza única que os distingue em meio aos dois mundos de sua ancestralidade.<br />
                            Com uma aparência que combina a complexidade dos traços humanos com a aura misteriosa dos demônios, os Meio-Demônios exibem uma beleza sobrenatural que oscila entre o fascínio e o temor. Seus olhos muitas vezes revelam um brilho ardente, refletindo a dualidade que reside em sua alma.<br />
                            Além das características físicas marcantes, os Meio-Demônios herdam poderes sombrios e habilidades mágicas das profundezas do inferno. Eles são capazes de conjurar chamas infernais, sombras sedutoras e manipular as energias demoníacas a seu favor.<br />
                            No entanto, essa dualidade não se limita à sua aparência e habilidades. Os Meio-Demônios frequentemente enfrentam uma luta interior, tentando encontrar um equilíbrio entre sua herança demoníaca e sua humanidade. Alguns abraçam seu lado sombrio, usando seus poderes para buscar objetivos nefastos, enquanto outros lutam para resistir à influência demoníaca, dedicando-se a causas nobres.<br />
                            Essa raça é muitas vezes vista com desconfiança e preconceito, mas também com um certo fascínio, já que eles personificam a eterna luta entre a luz e a escuridão. Os Meio-Demônios carregam consigo a responsabilidade de moldar seus destinos, escolhendo entre a redenção e a perdição.<br />
                            Com uma aura enigmática e uma alma dividida, os Meio-Demônios são uma encarnação da dualidade inerente ao ser humano, forjando seus próprios caminhos em meio à eterna luta entre o bem e o mal. Eles são testemunhas da complexidade da existência, representando a capacidade de escolher entre a luz e as sombras.

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 11<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Demônio Arcano:</strong><br /> Um meio-demônio arcano é filho de um elfo, humano ou feérico com um demônio conjurador de feitiços. Com seu sangue demoníaco, o meio demônio desta linhagem pode conjurar feitiços ou magias com sua vitalidade quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 1d6 pontos de vida.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Demônio Guerreiro:</strong><br />Um meio-demônio guerreiro é filho de um elfo, humano ou feérico com um demônio do exército do inferno. Com seu sangue demoníaco, o meio demônio desta linhagem pode realizar manobras ou habilidades com sua vitalidade quando estiver sem pontos de Estâmina. Para cada ponto de Estâmina  necessário para usar uma Habilidade são gastos 1d6 pontos de vida.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Súcubos/Íncubos:</strong> <br />Um meio-demônio súcubo ou íncubo é filho de um elfo, humano ou feérico com uma súcubo ou íncubo. Com seu sangue demoníaco, o meio demônio desta linhagem pode tentar encantar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o demônio, a não ser que este a ataque ou lhe cause algum mal. O personagem pode tentar uma criatura por vez e uma vez a cada um minuto. A chance de sucesso é de 50%.

                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Hebrides:</strong>Testes de ritualismo para procurar por sinais de invocações demoníacas recebem +4 de bônus do rolamento.</li>
                            <li><strong>Bode:</strong> Tentativas de uma criatura escalar rochas ou obstáculos, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Ovelha:</strong> Tentativas de enganar fingindo ser um civil normal em uma multidão recebem vantagem no rolamento do rolamento de Enganação.</li>
                            <li><strong>Carneiro:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que saltar ou escalar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Olhos negros:</strong><br /> Um meio-demônio com essa Regalia é capaz de enxergar no escuro com alcance de 6 metros como se fosse meia luz na escuridão, e luz completa na meia luz.  Além disso, recebe um bônus de vantagem em testes de ocultismo para procurar rastros de contratos e resquícios de atividades demoníacas. </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Resistência Demoníaca (2):</strong><br />Um meio demônio com essa Regalia tem resistência a dano sombrio. Além disso, pode escolher resistir um ataque do elemento fogo uma vez por dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Intimidação Infernal:</strong><br /> Um meio demônio com essa Regalia pode ativar sua herança infernal para brilhar seus olhos, crescer seus chifres e garras  de maneira ameaçadora. Ganha um bônus de vantagem em rolamentos para intimidar outra criatura. Pode usar essa habilidade 5 vezes em um dia.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Má Influência:</strong><br />Toda vez que fizer um teste de Habilidade e rolar um 20 no d20, o meio-demônio pode garantir a uma criatura uma penalidade de -2 no próximo rolamento. Se uma criatura sofrer a penalidade, imposta pelo meio-demônio em um ataque, o valor da penalidade aumenta para -5.  Pode usar essa habilidade 3 vezes em um dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieMeioCelestial() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Meio Celestial</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Meio-Celestiais são seres excepcionais, nascidos da união entre celestiais e humanóides. Eles carregam em si a luminosidade e a benevolência das esferas divinas, manifestando essa herança em sua existência terrena.<br />
                            Com uma beleza angelical e uma aura de bondade, os Meio-Celestiais irradiam uma luz celestial que envolve todos aqueles que se aproximam deles. Suas características físicas exalam uma beleza etérea e uma sensação de harmonia que inspira admiração e respeito.<br />
                            Além da aparência marcante, os Meio-Celestiais possuem dons divinos que variam dependendo de sua linhagem celestial. Eles podem curar feridas com um toque, invocar proteção divina e canalizar energias sagradas para banir o mal. Essas habilidades refletem a bênção de sua herança celestial.<br />
                            Os Meio-Celestiais também possuem uma moral firme e um profundo senso de justiça. Eles são frequentemente vistos como guias espirituais e protetores de comunidades, buscando erradicar a injustiça e trazer cura aos necessitados.<br />
                            No entanto, apesar de sua herança celestial, os Meio-Celestiais não estão isentos de desafios e tentações terrenas. Eles devem equilibrar sua natureza divina com as complexidades e imperfeições da vida mortal. Essa dualidade muitas vezes os leva a questionar seu propósito e a buscar uma compreensão mais profunda de sua existência.<br />
                            Os Meio-Celestiais são uma presença iluminada no mundo, uma lembrança constante da divindade e da possibilidade de transcender as limitações terrenas. Sua influência é sentida em todas as esferas da vida, inspirando esperança, compaixão e um compromisso inabalável com o bem. Com sua luz radiante e determinação nobre, eles personificam a capacidade de elevar o espírito humano e relembram a todos que a bondade é uma força poderosa na luta contra as trevas.

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 9<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Celestial Arcano:</strong><br /> Um meio celestial arcano é filho de um elfo, humano ou feérico com um celestial conjurador de magias e milagres. Com seu sangue sagrado, o meio celestial desta linhagem pode conjurar milagres ou magias com seu vigor quando estiver sem pontos de magia. Para cada ponto de magia necessário para conjurar uma magia ou feitiço são gastos 2 pontos de Estamina.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Celestial Guerreiro:</strong><br />Um meio-celestial guerreiro é filho de um elfo, humano ou feérico com um celestial do exército divino. Com seu sangue sagrado, o meio celestial desta linhagem pode realizar manobras ou Habilidades com sua magia quando estiver sem pontos de Estamina. Para cada ponto de Estamina  necessário para usar uma Habilidade são gastos 2 pontos de magia.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Celestial Intermediador:</strong> <br />Um meio-celestial intermediador é filho de um elfo, humano ou feérico com um juiz sagrado. Com seu sangue sagrado, o meio celestial desta linhagem pode tentar apaziguar uma criatura como uma ação. A criatura encantada não agirá de maneira hostil com o celestial ou seus aliados, a não ser que a ataquem ou lhe causem algum mal. O personagem pode tentar uma criatura por vez,  uma vez a cada um minuto. A chance de sucesso é de 40%.

                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Cordeiro:</strong>Testes de Persuasão para convencer outra criatura que quer evitar batalha recebem +5 de bônus do rolamento.</li>
                            <li><strong>Cervo:</strong> Tentativas de encontrar água em ambientes de floresta recebem +5 de bônus do rolamento de sobrevivência.</li>
                            <li><strong>Mariposa:</strong> Testes de ritualismo para procurar por sinais de invocações celestiais recebem +4 de bônus do rolamento.</li>
                            <li><strong>Anjo do mar:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Olhos Iluminados:</strong><br /> Um meio-celestial com essa Regalia é capaz de enxergar no escuro com alcance de 6 metros como se fosse meia luz na escuridão, e luz completa na meia luz.  Além disso, recebe um bônus de vantagem em testes de teologia para procurar rastros de atividade derivada do divino.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Resistência Celestial(2):</strong><br />Um meio celestial com essa Regalia tem resistência a dano sagrado.
                            Além disso, pode escolher resistir um ataque do elemento arcano uma vez por dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Mãos Abençoadas:</strong><br />Ganha uma quantidade de pontos por nível de personagem igual a 4. Esses pontos podem ser usados para curar uma criatura em até 10 pontos de vida com uso de uma ação. Esses pontos são recuperados após um descanso longo.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Juiz:</strong><br />Um meio-celestial com essa  Regalia é capaz de criar uma área com 6 metros de raio ao redor de si. Dentro dessa área o meio celestial possui vantagem  em testes de intuição para determinar se alguém está mentindo. Essa área fica iluminada com meia luz, caso esteja escuro. Dura por tempo indeterminado, mas é percepitivel por todos a sua volta.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieMeioGenio() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Meio Gênio</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Meio-Gênios, fruto de uma união entre elementais e humanóides, são seres cujas almas estão profundamente entrelaçadas com os segredos dos elementos. Eles representam uma ligação especial entre os reinos elementais e o mundo dos mortais, trazendo consigo tanto os dons quanto as limitações dessa conexão única.<br />
                            Com uma aparência que muitas vezes reflete os elementos dos quais descendem, os Meio-Gênios podem exibir características associadas à terra, fogo, água, ar ou outros elementos da natureza. Seus olhos costumam brilhar com uma energia inerente, sugerindo a influência dos elementos em sua essência.<br />
                            Além da aparência marcante, os Meio-Gênios herdam certas afinidades elementais. Eles podem sentir as mudanças no clima e nos elementos, controlando em certa medida os poderes naturais ao seu redor. No entanto, essa capacidade é limitada em comparação com a dos gênios puros, e os Meio-Gênios geralmente precisam de um esforço maior para realizar feitos elementais extraordinários.<br />
                            A dualidade da herança elemental dos Meio-Gênios também se estende à sua personalidade. Eles podem oscilar entre estados de calma e agitação, refletindo as mudanças nos elementos que os influenciam. Esta conexão com a natureza muitas vezes os torna peritos na resolução de problemas relacionados ao ambiente natural.<br />
                            A influência dos Meio-Gênios na sociedade é palpável. Sua compreensão dos elementos e sua capacidade de mediar conflitos entre humanos e elementais os tornam líderes e diplomatas procurados. Além disso, suas habilidades com os elementos frequentemente os destacam como guardiões da natureza e protetores do equilíbrio ecológico.<br />
                            Em última análise, os Meio-Gênios personificam a intersecção entre os segredos dos elementos e o mundo dos mortais. Eles lembram a todos que, mesmo nas limitações de sua herança, a conexão com a natureza e o respeito pelos elementos podem moldar um destino extraordinário.<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Gênio do Fogo:</strong><br /> Este meio gênio tem afinidade com o elemento fogo e possui resistência ao dano de fogo, porém tem vulnerabilidade a dano de gelo.Consegue acender velas e fogueiras com uma pequena chama em seus dedos.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Gênio do Gelo:</strong><br />Este meio gênio tem afinidade com o elemento Gelo e possui resistência ao dano de gelo, porém tem vulnerabilidade a dano de raio. Consegue resfriar objetos e congelar pequenas quantidades (10 cm cúbicos) de líquidos a cada 12 segundos.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Gênio do Raio:</strong> <br />Este meio gênio tem afinidade com o ar e o raio e possui resistência ao dano de raio, porém tem vulnerabilidade a dano de terra. Ele também consegue criar pequenas descargas elétricas que podem gerar luz por um minuto e faz o seu e cabelo e od e outras criaturas em até 3 metros ficar de pé.

                        </Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Gênio da Terra:</strong> <br />Este meio gênio tem afinidade com o elemento terra e possui resistência ao dano de terra, porém tem vulnerabilidade a dano de fogo. Ele também consegue mover uma pequena quantidade (50 cm cúbicos) de terra com a mão a cada 6 segundos.
                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Ar:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Terra:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Gelo:</strong> Testes para se esconder de perseguidores, em uma fuga, recebem vantagem do rolamento de Furtividade.</li>
                            <li><strong>Fogo:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Domínio do Ar (2)</strong><br />
                            Um meio gênio com essa Regalia perde sua afinidade com seu elemento e se torna neutro. Ao se tornar neutro perde a vulnerabilidade e a resistência que tinha antes de escolher essa Regalia. Ao fazer isso ganha a capacidade de voar com velocidade igual a de movimento e consegue segurar a respiração por 5 horas de uma só vez com um tempo de descanso de 10 minutos para fazer novamente.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Controle do Elemento Interior (2):</strong><br />
                            Um meio gênio com essa Regalia consegue carregar elementalmente seus ataques desarmados durante um período de tempo. Ao imbuir seu corpo com dano elemental seus ataques desarmados ganham 1d6 de dano do elemento herdado, e consegue manter esse bônus por 1 minuto. Pode usar essa habilidade 3 vezes em um dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Conceder desejos (2):</strong><br />
                            Um meio gênio com essa Regalia concede um simples desejo a cada 3 dias. Esse desejo concede um item que caiba em sua mão e custe até 50 peças de Ouro. Se o item for uma cópia de um item real, a cópia fica evidente e não possui os efeitos mágicos do item, se houver, só a aparência.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieMeioTroll() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Meio Troll</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Meio-Trolls são criaturas únicas, resultado da fusão entre humanóides e a resistência formidável dos trolls. Com uma linhagem que inclui diversos tipos de trolls, como os de areia, gelo e montanha, eles carregam em si a dualidade de uma herança selvagem e formidável.<br />
                            A aparência dos Meio-Trolls varia amplamente, refletindo a diversidade de sua herança troll. Alguns podem exibir pele resistente e áspera, outros podem herdar a resistência ao frio ou uma afinidade com as alturas das montanhas. No entanto, todos compartilham a característica comum de regeneração acelerada, que lhes permite se curar mais rapidamente do que a maioria dos humanóides.<br />
                            Além das características físicas impressionantes, os Meio-Trolls herdam uma resistência excepcional. Seja a resistência ao calor abrasador das dunas, a adaptabilidade ao frio glacial, ou a força formidável necessária para navegar pelas escarpas das montanhas, eles são capazes de enfrentar ambientes extremos com coragem e determinação.<br />
                            A dualidade da herança dos Meio-Trolls também se estende à sua personalidade. Eles podem exibir uma natureza forte e impetuosa, mas também são conhecidos por sua determinação e resistência inabaláveis. Essa tenacidade muitas vezes os torna líderes em situações desafiadoras.<br />
                            Os Meio-Trolls desempenham papéis importantes nas sociedades que habitam, frequentemente como protetores de suas comunidades e defensores contra ameaças externas. Sua resistência e habilidades de combate os tornam aliados valiosos, enquanto sua natureza adaptável lhes permite sobreviver e prosperar em condições adversas.<br />
                            Em última análise, os Meio-Trolls personificam a força bruta e a adaptação à adversidade. Eles lembram a todos que, mesmo nas circunstâncias mais difíceis, a determinação e a coragem podem superar desafios aparentemente insuperáveis, e que a herança diversificada é uma força a ser valorizada.<br />

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 12<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 7,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Médio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>  Meio-Montanhoso:</strong><br /> Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço pode arremessar qualquer objeto, forte o suficiente para causar dano que pese até 5kg. Causando 1d10 pontos de dano de impacto, com uma distância de 15 metros. Podendo utilizar esse arremesso uma vez a cada 10 minutos.

                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Geloso:</strong><br /> Um meio-troll é a mistura de um troll com um ser humanoide. Esse mestiço tem resistência ao dano elemental de gelo. Além de possuírem uma velocidade de movimento de 9 metros.
                        </Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong> Meio-Arenoso:</strong> <br />Um meio-troll é a mistura de um troll com um ser humanoide. Esses mestiços são resistentes ao cansaço, não sofrem com os efeitos dos 2 primeiros níveis de cansado. Além de não sofrerem penalidade de movimento por andar em um terreno difícil.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Nuvem:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Gelo:</strong> Ganha 1,5 m de velocidade de movimento enquanto estiver fugindo de perseguidores.</li>
                            <li><strong>Areia:</strong>Testes de Percepção para sentir vibrações no solo  recebem +5 de bônus do rolamento.</li>
                            <li><strong>Rocha:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Físico Incomparável</strong><br />
                            Um meio troll com essa Regalia tem um físico incrível e possui uma capacidade de carga maior como se fosse um tamanho maior. Além disso, recebe vantagem dupla (rola 3 dados) em testes de atletismo para escalar superfícies naturais.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Descendente Monstruoso:</strong><br />
                            Um meio troll com essa Regalia tem traços de um troll bem marcados em sua fisionomia. Em situações sociais em que trolls não sejam comuns o meio troll recebe +10 em intimidação e -5 em persuasão e negociação. Em todas as outras recebe apenas +2 em testes de intimidação, sem penalidades.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Gigante Pela Própria Natureza (2):</strong><br />
                            Um meio troll com essa Regalia tem o tamanho  “Muito Grande” e recebe todas as vantagens de ter esse tamanho. Importante tomar a decisão de pegar este talendo com cuidado pois fisicamente muito maior o personagem pode ficar com dificuldade de acessar certos lugares normais que não estão preparados para receber uma criatura deste tamanho. Como seu tamanho muda ele sofre esta mutação ao dormir.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieBestial() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Bestial</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Bestiais são uma espécie singular que personifica a diversidade do reino animal em uma forma humanoide. Eles representam uma maravilhosa manifestação da natureza, trazendo consigo uma ampla variedade de características e habilidades, refletindo os muitos aspectos da vida selvagem.<br />
                            Sua aparência é tão diversa quanto a própria natureza. Alguns exibem traços de aves, com asas que lhes permitem voar com graça e leveza, enquanto outros são imponentes e maciços, lembrando animais de grande porte. Há também aqueles que carregam características de caçadores terrestres, com velocidade e garras afiadas, e os pequenos e ágeis, que lembram os herbívoros ou onívoros ágeis e esquivos.<br />
                            Mas a verdadeira beleza dos Bestiais vai além de sua aparência. Cada subespécie traz consigo habilidades únicas que se enraízam em sua herança animal. Alguns são mestres da caça e da sobrevivência, enquanto outros são habilidosos na arte de voar ou na capacidade de resistir aos desafios das terras inóspitas.<br />
                            A presença dos Bestiais no mundo é uma lembrança constante da amplitude da natureza e de sua incrível capacidade de adaptação. Eles nos ensinam que, assim como a natureza é diversa, somos todos únicos em nossas habilidades e características. Os Bestiais são uma celebração da maravilha da vida e da riqueza que a natureza oferece em todas as suas formas.<br />

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Pequenos, Médios ou Grandes
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>  Alados:</strong><br />
                            Bestiais alados são humanoides com traços de qualquer pássaro. Bestiais alados podem voar até sua velocidade de movimento. Enquanto um bestial alado estiver caindo pode usar sua reação para abrir suas asas e quebrar a queda. Ao realizar essa reação não sofrerá o dano da queda.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Brutamontes:</strong><br />
                            Bestiais brutamontes são humanoides grandes com traços de animais que pesam naturalmente pelo menos 400 kg e possuem um valor de vida inicial igual a 12 (2 pontos acima do valor base da espécie). Após se mover por pelo menos 4,5 metros em linha reta, o Bestial brutamontes pode realizar um ataque com seu chifre, galhada ou cabeça, que causa 2d6 pontos de dano, além de empurrar seu inimigo por 3m. Se o rolamento de ataque for um acerto crítico, além do dano dobrado, empurra o dobro da distância.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Predadores:</strong><br />
                            Bestiais predadores são humanóides carnívoros e caçadores terrestres (Canídeos, répteis e felinos principalmente). Predadores possuem uma maior velocidade de movimento de 7,5 metros e também possuem armas naturais, que podem ser garras ou presas. Essas armas naturais causam 1d10 pontos de dano perfurante ou cortante.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Herbivoraz:</strong><br />
                            Bestiais herbivorazes são pequenos humanóides com traços de animais herbívoros ou onívoros leves e ágeis, seu valor de Velocidade de Movimento é igual a 4,5. Um bestial herbivoraz pode usar sua agilidade de fuga para escapar do perigo, ou corajosamente avançar para atacar primeiro como instinto de sobrevivência.<br />
                            Um herbivoraz pode usar a ação disparada com o custo de duas ações ao invés de três. Ao usar a ação correr ou andar pode realizar, como parte da mesma ação,  usar a ação Buscar Cobertura. Desde que esteja usando um escudo ou tenha cobertura próximo de si.

                        </Typography>
                        <Typography className="bigBoxTextEquips">
                            <strong>  Aquáticos:</strong><br />
                            Bestiais aquáticos são humanoides com traços de animais aquáticos como os mais variados peixes e anfíbios. Esses bestiais conseguem respirar debaixo d’água. Nadam em qualquer tipo de correnteza sem precisar de um teste de atletismo. Com as escamas que se formam em sua pele, um bestial aquático recebe um bônus de 2 pontos de valor de defesa enquanto não estiver usando armadura média ou pesada. Um bestial aquático que não fica submergido por pelo menos uma hora a cada 48 horas fica um nível de Cansado,  que pode acumular com outras fontes.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Elfo:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Draconiano:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Feérico:</strong>Tentativas de enganar perseguidores em uma fuga recebem vantagem do rolamento de Enganação.</li>
                            <li><strong>Anão:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Animal Noturno:</strong><br />
                            Um bestial com essa Regalia consegue enxergar no escuro como se fosse meia luz e na meia luz como se fosse luz completa em uma distância de até 12 metros.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Instintivo:</strong><br />
                            Um bestial com essa Regalia tem um forte senso de autopreservação e ao cair em uma armadilha natural ou ser pego por uma emboscada feita por animais selvagens ganham +3 de bônus em iniciativa e vantagem dupla em testes de atletismo para evitar a armadilha.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Reação instantânea:</strong><br />
                            Um bestial com essa Regalia consegue usar sua reação para recuar 1,5 metros de uma criatura que se aproxima dele em um turno de combate. O bestial pode tomar a decisão de recuar se a criatura conseguir se aproximar a uma distância de pelo menos 6 metros dele. Pode fazer essa reação 5 vezes por dia.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieHalfling() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Halfling</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Os Halflings, apesar de seu tamanho modesto, são gigantes quando se trata de coragem e espírito aventureiro. Eles vivem suas vidas com uma determinação feroz, enfrentando desafios muito maiores do que eles mesmos. Seus sorrisos são tão amplos quanto seus corações, e sua disposição para explorar o desconhecido é incomparável.<br />
                            Sua estatura pequena não é um impedimento, mas sim uma vantagem. Eles passam facilmente despercebidos e são mestres em navegar por lugares apertados e esconder-se nas sombras. Sua agilidade é lendária, e muitos inimigos subestimam a habilidade de um Halfling, apenas para serem surpreendidos por sua destreza em combate.<br />
                            Nada é mais importante para um Halfling do que a família e os amigos. Eles estão dispostos a fazer qualquer coisa para proteger aqueles que amam e nunca recuam diante de um desafio. Sua determinação é incomparável, e sua alegria de viver é contagiante.<br />
                            Os Halflings são uma prova viva de que o tamanho não define o heroísmo. Eles são uma espécie de espíritos aventureiros, prontos para enfrentar o mundo com um sorriso no rosto e uma sede insaciável por novas experiências. Eles são pequenos em estatura, mas grandes em coragem e determinação.<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 10<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 4,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Pequenos
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>  Comuns:</strong><br />
                            Halflings que lembram pequenos humanos, são ágeis e agitados. Esses halflings possuem a capacidade de usar a ação Esconder estando logo atrás de um aliado. Um halfling consegue se esconder mas não buscar cobertura desta maneira.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Subterrâneos:</strong><br />
                            Halflings que vivem nas profundezas das cavernas e túneis subterrâneos, em constante harmonia com a escuridão e os segredos das entranhas da terra. Eles possuem a pele pálida e avermelhada nas extremidades e olhos maiores que os comuns e que possuem pupilas enormes. Halflings do Subterrâneo possuem visão no escuro com alcance de 64 metros, enxergando como se estivessem em meia luz.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Monstruosidades:</strong><br />
                            Halflings monstros são todas as espécies de goblinóides e kobolds (canídeos). Esses halflings são conhecidos por trabalhar em equipe e cultuar seres mais fortes. São muito orgulhosos do próprio povo ou de quem cultuam, esse orgulho se traduz em confiança e determinação em batalha. Quando realizam um ataque esses halflings conseguem usar ação Intimidar ao mesmo tempo. Essa habilidade pode ser usada 3 vezes ao dia. Quando estão com um ou mais aliados flanqueando um inimigo recebe vantagem em jogadas de acerto.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Coruja Anã:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Pônei:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Raposa do deserto:</strong>Tentativas de enganar perseguidores em uma fuga recebem vantagem do rolamento de Enganação.</li>
                            <li><strong>Caranguejo-ermitão:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Monstruoso:</strong><br />
                            Um halfling monstruoso com essa Regalia tem traços assustadores para o humanóide comum. Em situações sociais em que essas criaturas não sejam comuns, recebem +10 em intimidação e -5 em persuasão e negociação.  Em todas as outras recebe +2 em testes de intimidação.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Pequeno e Frágil:</strong><br />
                            Um halfling com essa Regalia consegue usar sua estatura e aparência frágil para fingir que é inofensivo. Como reação o halfling pode se encolher e fazer com que um atacante desista de um ataque contra ele e escolha um novo alvo. O halfling faz um teste de performance ou enganação contra a intuição do atacante, se for um sucesso ele não pode sofrer ataques deste atacante até o início do próximo turno do halfling. Pode fazer isso 3 vezes em um dia

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Entocar:</strong><br />
                            Halflings têm uma maior elasticidade e capacidade de se dobrar e entrar em lugares apertados, além de serem menores. Um Halfling com esse talento tem um bônus de +4 em testes de acrobacia para entrar e passar por lugares apertados. Recebe +1 em qualquer outro teste de acrobacia. Uma vez em um espaço confinado descrito acima, todas tentativas de ser tirado de onde se encontra terá uma penalidade de -2.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieTroll() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Troll</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Trolls são seres colossais, conhecidos por sua resistência sobrenatural e presença imponente. Independentemente da variação específica de sua linhagem, todos os Trolls compartilham traços comuns que os tornam verdadeiras forças da natureza no mundo da alta fantasia.<br />
                            Possuindo uma natureza monstruosa, os Trolls são gigantes imunes a muitos dos obstáculos que afetam criaturas menores. Sua imponência física e força descomunal lhes conferem a capacidade de realizar feitos impressionantes, como arremessar objetos maciços a grandes distâncias e transportar cargas consideráveis por curtos períodos de tempo.<br />
                            Além disso, a resistência inerente dos Trolls permite que eles prosperem em ambientes extremos, como montanhas, tundras congeladas e desertos escaldantes. Seus corpos robustos e peles resistentes protegem-nos das agruras do ambiente, tornando-os mestres da sobrevivência em terrenos hostis.<br />
                            A linhagem de um Troll é uma marca de sua jornada única e destino no mundo da alta fantasia. Cada subespécie de Troll representa uma adaptação especializada a um ambiente particular, mas todos compartilham a herança de força e resistência que os torna verdadeiramente formidáveis. Independentemente da variação, os Trolls são gigantes que se destacam, deixando sua marca indelével no mundo de aventuras e desafios.<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 15<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 4,5 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Muito grande
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>   Troll da Montanha:</strong><br />

                            Um Troll da Montanha são grandes seres humanóides monstruosos. Eles podem arremessar qualquer objeto grande e pesado, como pedras, toras de madeira e etc. em uma distância de até 15m. Um alvo atingido por esses objetos sofrem 2d10 de dano. Arremessar um objeto é uma ação e exige que tenha tal objeto próximo. Seu físico incomparável os permite ultrapassar a sua capacidade de carga em até 50 quilos por ponto de força durante 1 hora. Após realizar tal feito é necessário ao menos um descanso curto.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Troll do Gelo:</strong><br />

                            Um Troll do Gelo são grandes seres humanóides monstruosos. Esses trolls são imunes ao frio, ao dano de gelo e à condição Congelando.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Troll do Deserto:</strong><br />

                            Um Troll do Deserto são grandes seres humanóides monstruosos. Esses trolls são imunes ao cansaço e são adaptados para andar na areia, ignorando terrenos difíceis naturais.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>

                        <Typography className="bigBoxTextEquips"><strong>Tatuagem tribal(2 pontos de Regalia):</strong></Typography>
                        <Typography className="bigBoxTextEquips">
                            Uma criatura com esse talento recebeu uma tatuagem mágica por ter passado em algum teste em sua tribo. Cada tatuagem tem uma vantagem, confira a seguir
                        </Typography>
                        <ul className="bigBoxTextBG">
                            <li><strong>Harpia:</strong>Testes de Percepção para observar algo a mais de 100 metros de distância recebem vantagem do rolamento.</li>
                            <li><strong>Bisão:</strong> Tentativas de uma criatura mover grandes rochas ou obstáculos mais pesados que ela mesma, recebem vantagem do rolamento de Atletismo.</li>
                            <li><strong>Coiote:</strong>Tentativas de enganar perseguidores em uma fuga recebem vantagem do rolamento de Enganação.</li>
                            <li><strong>Tatu:</strong> Uma criatura com essa tatuagem pode usar a ação Buscar Cobertura na mesma ação que for correr/andar.</li>
                        </ul>

                        <Typography className="bigBoxTextEquips"><strong>Físico Incomparável:</strong><br />
                            Um troll com essa Regalia tem um físico incrível e possui uma capacidade de carga maior como se fosse um tamanho maior. Além disso, recebe um bônus de +5 em testes de atletismo para escalar superfícies naturais.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Monstruoso:</strong><br />
                            Um troll com essa Regalia tem traços assustadores para o humanóide comum. Em situações sociais em que essas criaturas não sejam comuns, recebem +10 em intimidação e -5 em persuasão e negociação.
                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Presas Esmagadoras(2):</strong><br />
                            Um troll tem grandes bocas e mandíbulas fortíssimas. Um troll com essa Regalia consegue, 3 vezes ao dia, recuperar os usos em um descanso longo, morder com força esmagadora outra criatura ou objeto. Esse ataque causa 2d10 de dano.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong> Terreno Favorito:</strong><br />
                            Um troll que estiver em seu ambiente de origem recebe um bônus de mais 3 metros de velocidade de movimento.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieConstructo() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };

        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Constructo</Typography>

                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Regalia Obrigatória" className="tabs" />
                        <Tab label="Regalias Opcionais" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>
                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Na penumbra do mundo da alta fantasia, os Constructos erguem-se como testemunhos vivos da união entre a magia ancestral e a habilidade criativa dos artífices. São entidades de energias elementais, infundidas com as almas ardentes do fogo, da eletricidade, do ar e da sombra, cada qual trazendo consigo uma personalidade distinta e um conjunto inigualável de talentos.<br />
                            Nascidos de uma alquimia complexa e do domínio das artes mágicas, os Constructos são verdadeiras quimeras, distintas de qualquer forma de vida convencional. Eles não conhecem a vida como a compreendemos, mas em seu íntimo, mantêm uma consciência singular, originada das energias elementais que os compõem. O resultado é uma fusão fascinante de artifícios e elementos, um casamento de magia e engenhosidade.<br />
                            Independentemente de suas vocações como utilitários, guerreiros, agentes infiltrados ou exploradores destemidos, todos os Constructos partilham uma verdade fundamental: a natureza de sua existência é essencialmente artificial. São criaturas que se destacam, em virtude de sua singularidade, destacando-se como a conjunção mais notável entre o mundo natural e o reino das criações mágicas.<br />
                            Assim, os Constructos perduram como criaturas enigmáticas e imponentes, dotadas de habilidades incomuns, capazes de desempenhar tarefas intrincadas e superar muitas das limitações inerentes às formas de vida orgânicas. Essa união única entre magia elemental e artifício confere a eles um lugar ilustre no teatro de maravilhas e desafios que compõem o mundo da alta fantasia.<br />

                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Pontos de Vida Inicial:</strong> 11<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Velocidade de Movimento:</strong> 6 metros<br />
                        </Typography>
                        <Typography className="bigBoxTextEquips" style={{ marginTop: "1rem" }}>
                            <strong>Tamanho:</strong> Medio
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography className="bigBoxTextEquipsHeader">Escolha uma entre:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>   Constructo de Utilidade:</strong><br />

                            O constructo de utilidade foi criado ao usar um espírito elemental de fogo para alimentar uma máquina ajudante. Usadas em forjas, construções e transporte , essas máquinas são capazes de grande capacidade de carga, sendo capazes de carregar o dobro de carga que uma criatura orgânica de mesmo tamanho. Os constructos de Habilidade são duráveis porém lentos, sua velocidade de movimento é igual a 4,5 metros. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de fogo e imunes ao dano de venenos e a condição Envenenado ou Sangrando. São vulneráveis ao dano de gelo.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Constructo de Batalha:</strong><br />

                            O constructo de batalha foi criado ao usar um espírito elemental de raio para alimentar uma máquina combatente. Usadas como guardas, soldados e assassinos, essas máquinas possuem uma armadura embutida que pode ser melhorada e reforçada. Seu valor de defesa inicial é de 15. Um constructo de batalha não pode adicionar sua agilidade ao seu valor de defesa e nem usar armaduras. Eles são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo um constructo precisa ficar parado em modo inativo por 4 horas, e seu descanso curto funciona de maneira padrão. São resistentes ao dano de raio e imunes ao dano de venenos, a condição Envenenado e a condição Sangrando. São vulneráveis ao dano de terra.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Constructo de Exploração:</strong><br />

                            O constructo de exploração foi criado ao utilizar um espírito elemental do ar para alimentar uma máquina de exploração versátil. Essas máquinas são frequentemente usadas em missões de reconhecimento, exploração de áreas desconhecidas e busca de tesouros escondidos. Possuem uma capacidade de voo limitada, permitindo-lhe voar por 10 minutos a cada descanso curto ou longo. Sua velocidade de movimento é de 9 metros em terra e 18 metros no ar. Os constructos de exploração são imunes à condição de Cansado e não precisam de comida ou água. Para um descanso longo, um constructo precisa ficar inativo em modo de economia de energia por 2 horas, enquanto seu descanso curto funciona como o padrão. São resistentes ao dano de raio e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos de gelo e terra.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Constructo de Invasão:</strong><br />

                            O constructo de sigilo foi criado ao utilizar um espírito elemental sombrio para alimentar uma máquina furtiva especializada em missões secretas e espionagem. Essas máquinas são especialistas em se mover em silêncio e em se esconder nas sombras. Possuem a habilidade de camuflagem que as tornam quase invisíveis em ambientes escuros, fornecendo +3 em testes de furtividade enquanto fora de luz completa. Sua velocidade de movimento é de 6 metros, mas quando estão nas sombras, sua velocidade é dobrada para 12 metros. Eles não precisam de comida ou água e são imunes à condição Cansado. Para um descanso longo, um constructo de sigilo precisa de apenas 2 horas de inatividade nas sombras, enquanto seu descanso curto funciona de maneira padrão. São resistentes ao dano de sombra e imunes ao dano de veneno e à condição Envenenado. São vulneráveis aos danos sagrado e de fogo.

                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography className="bigBoxTextEquipsHeader">Regalias:</Typography>


                        <Typography className="bigBoxTextEquips"><strong>Programação de Emergência:</strong><br />

                            Quando os pontos de vida do constructo caírem para 10 ou menos, ele receberá pontos de vida temporários do mesmo valor que seus pontos de magia máxima. Esses pontos de vida duram por 2 rodadas. Isso acontece uma vez por descanso longo.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Constructo da Natureza:</strong><br />

                            Esse constructo pode substituir suas partes de metal por partes de madeira. Ao fazer isso ele se torna resistente à dano de impacto e perfurante. Contudo, fica vulnerável a dano de fogo.

                        </Typography>

                        <Typography className="bigBoxTextEquips"><strong>Um Sobrecarga Elemental:</strong><br />

                            Após gastar ⅓ de seus pontos de magia ou estâmina  em um mesmo turno, o próximo ataque do constructo causará dano dobrado. Sendo a segunda parte do dano do mesmo elemento do seu espírito elemental.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong> Porta Gente (2)</strong><br />

                            O constructo com essa Regalia é desmontado e remontado para ficar do tamanho grande. Um constructo desse tamanho consegue armazenar dentro de si uma criatura média voluntária ou menor como sua reação em combate.

                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Aumento do valor da Habilidade:</strong><br /> Aumenta qualquer uma Habilidade que não seja de combate em +2 <br />
                            Aumenta qualquer uma Habilidade que não seja de combate, força, destreza ou agilidade em +2
                        </Typography>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function EspecieSpecialOptions() {
        const [tab, setTab] = useState(0);

        const handleChange = (event, newValue) => {
            setTab(newValue);
        };
        const mutacoes = [
            {
                nome: 'Pele Escamosa',
                beneficio:
                    'A pele do personagem se torna grossa e escamosa, fornecendo uma defesa natural a cortes e arranhões. A base do valor de defesa para o personagem sem armadura é de 10 ao invés de 7.',
            },
            {
                nome: 'Olhos Multifacetados',
                beneficio:
                    'Os olhos do personagem se multiplicam e adquirem uma aparência insectóide, concedendo visão ampliada e a capacidade de enxergar no escuro. Visão no escuro, e meia luz, com alcance de 27 metros e bônus de +2 em testes de percepção que envolvam visão.',
            },
            {
                nome: 'Boca Abissal',
                beneficio:
                    'A boca do personagem se expande, revelando uma mandíbula cheia de dentes afiados, permitindo ataques mordedores poderosos. Recebe uma arma natural com dano perfurante 4 + valor de força. Recebe +2 em testes de atletismo para agarrar um alvo com os dentes.',
            },
            {
                nome: 'Membros Desproporcionais',
                beneficio:
                    'Os membros do personagem se alongam ou encurtam, concedendo versatilidade. Aumentam o alcance de ameaça em 1,5 metros ou reduz a criatura em um tamanho na escala, com um mínimo de minúsculo.',
            },
            {
                nome: 'Cauda Serpentina',
                beneficio:
                    'Uma cauda serpentina cresce na parte inferior do corpo do personagem, permitindo uma maior capacidade de equilíbrio e agilidade em movimentos. O personagem ganha um bônus de +5 em testes de acrobacia para se equilibrar e consegue usar sua cauda para se segurar em beiradas, galhos e outros que possam ser enrolados por ela, deixando assim suas mãos livres.',
            },
            {
                nome: 'Garras Retráteis',
                beneficio:
                    'O personagem desenvolve garras afiadas em suas mãos ou pés, fornecendo ataques mais letais e a habilidade de escalar superfícies verticais. Recebe uma arma natural com dano cortante 3 + valor de destreza. O personagem tem a capacidade de escalar superfícies verticais sem custo extra de movimento e sem necessidade de ferramentas extras.',
            },
            {
                nome: 'Chifres Torcidos',
                beneficio:
                    'Chifres retorcidos e sinuosos crescem na cabeça do personagem, conferindo maior resistência física e a capacidade de empurrar objetos pesados. O personagem recebe +2 em testes de atletismo para se manter em pé ou derrubar um alvo. Recebe uma arma natural com dano de impacto 3 + valor de força.',
            },
            {
                nome: 'Exoesqueleto Ósseo',
                beneficio:
                    'O corpo do personagem é envolvido por um exoesqueleto ósseo, tornando-o mais resistente a cortes. Se torna resistente ao dano cortante, porém se torna vulnerável ao dano de impacto. O exoesqueleto também aumenta a base do valor de defesa de 7 para 10.',
            },
            {
                nome: 'Pernas de Aranha',
                beneficio:
                    'O personagem desenvolve pernas extras semelhantes às de uma aranha, permitindo maior mobilidade e a habilidade de escalar paredes. Pode escalar sem gastar movimento extra e ganha um bônus de 1.5 metros no valor de velocidade. Ganha um bônus de +5 em testes de atletismo para agarrar e para não ser derrubado.',
            },
            {
                nome: 'Braços Tentaculares',
                beneficio:
                    'Braços adicionais em forma de tentáculos crescem no corpo do personagem, fornecendo uma vantagem de alcance em combate e a habilidade de agarrar objetos a distância. Recebe 1.5 metros a mais em seu alcance de ameaça e +2 em testes de atletismo para agarrar outra criatura.',
            },
        ];
        return (
            <Box sx={{ width: "100%", p: 2 }}>
                <Paper className="bigBoxTextClasses" sx={{ p: 2, height: '750px', overflowY: 'scroll' }}>
                    <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Regalias obrigatórias alternativas</Typography>
                    <Tabs value={tab} onChange={handleChange} centered>
                        <Tab label="Descrição" className="tabs" />
                        <Tab label="Psíquico" className="tabs" />
                        <Tab label="Vampiro / Wight / Draugr" className="tabs" />
                        <Tab label="Mutante" className="tabs" />
                    </Tabs>

                    <TabPanel value={tab} index={0}>

                        <Typography className="bigBoxTextClasses" sx={{ width: "90%", height: '400px', overflowY: 'scroll', padding: 2 }}>
                            Aqui o jogador pode encontrar opções para personalizar ainda mais seus personagens. A seguir temos várias opções que podem substituir a Regalia obrigatória de uma espécie. Assim sendo, como um exemplo,  o personagem pode ser humano e começar com uma das opções abaixo ao invés das que estão inicialmente disponíveis para ele. <br />
                            O jogador que escolher ser um Psíquico, Vampiro ou Mutante deve gastar 2 pontos de Regalia ao invés de 1 ponto na Regalia inicial de espécie.
                            Ao escolher uma das opções abaixo é proibido escolher uma das outras. Após trocar a regalia inicial de classe, adicione as outras opções que sobraram da lista de escolhas para regalias de sua espécie original.<br />

                        </Typography>

                    </TabPanel>

                    <TabPanel value={tab} index={1}>
                        <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Psíquico</Typography>
                        <Typography className="bigBoxTextEquipsHeader">Escolha um dos seguintes poderes psíquicos para começar:</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Telecinese:</strong><br />
                            o personagem tem a habilidade de mover objetos com a mente. O personagem consegue mover até um objeto de até 5 quilos que esteja em um alcance de até 30 metros de distância. O movimento não é veloz e não pode realizar ataques com armas com essa habilidade. Além disso, 3 vezes ao dia o personagem pode usar a sua reação para empurrar, 3 metros para a direção  a sua escolha, uma criatura que se aproxime  dele em uma distância de 3 metros.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Telepatia:</strong><br />
                            o personagem pode ler os pensamentos e se comunicar mentalmente com outras pessoas. O personagem consegue manter conversas telepáticas com criaturas que a possa entender em até 27 metros de distância. Além disso, o jogador pode escolher tentar ler a mente, com 70% chance de sucesso, de alguém que possa ver em até 18 metros de distância. O jogador com sucesso em sua tentativa  consegue ler os pensamentos superficiais do alvo, como o que ele está pensando no exato momento, contra a sua vontade.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong> Precognição:</strong><br />
                            o personagem tem vislumbres do futuro, podendo ter flashes de eventos que ainda estão por acontecer. O jogador pode escolher passar em um teste de habilidade, desviar de um ataque certeiro ou acertar um ataque uma vez por dia, pois ele já sabia que aquilo ia acontecer e como.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>Controle Mental:</strong><br />
                            O personagem pode influenciar suavemente a mente dos outros, fazendo sugestões. O jogador ganha +2 em todos os rolamentos da aba social e uma vez por dia pode transformar esse  bônus em um +10.
                        </Typography>
                    </TabPanel>

                    <TabPanel value={tab} index={2}>
                        <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Vampiro / Wight / Draugr</Typography>
                        <Typography className="bigBoxTextEquipsHeader">Ao escolher ser um morto vivo, o personagem não pode ser curado por milagres. Escolha um dos seguintes poderes de mortos vivos para começar com (A habilidade Drenagem de Vida pode ser escolhido por qualquer tipo de morto vivo):</Typography>

                        <Typography className="bigBoxTextEquips">
                            <strong>Drenagem de Vida:</strong><br />
                            o personagem pode sugar a energia vital de outras criaturas para se fortalecer. O jogador pode escolher realizar um ataque de combate corpo a corpo e sugar a vitalidade de um alvo, causando 1d8 de dano necrótico e o curando em 5, ou realizar uma versão mais fraca à distância, causando apenas 1d4 de dano necrótico e curando em 3, com alcance de 9m. Essa habilidade pode ser utilizada até 3 vezes por descanso longo.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong>  Transformação Noturna:</strong><br />
                            o personagem ganha poderes especiais durante a noite, como aumento de força, velocidade ou poderes sombrios.
                            Um personagem morto vivo recebe 1,5 de bônus de velocidade movimento a noite.
                            Sua capacidade de carga aumenta, como se fosse um tamanho maior na tabela, durante a noite.
                            O personagem consegue escalar paredes sem a necessidade de testes ou redução de velocidade e ganha +3 em testes de furtividade à noite.
                        </Typography>
                        <Typography className="bigBoxTextEquips"><strong> Hipnose:</strong><br />
                            O personagem pode hipnotizar suas vítimas com seu olhar ou voz, exercendo influência sobre elas.o personagem consegue utilizar as magias Hipnose e Voz de Comando uma vez cada por dia e sem custo de mana.
                        </Typography>
                    </TabPanel>
                    <TabPanel value={tab} index={3}>
                        <Typography variant="h5" className="boxTextTitle" sx={{ my: 2, mx: 3 }}>Mutante</Typography>
                        <Typography className="bigBoxTextEquipsHeader">Uma criatura que sofreu de alguma forma uma exposição a um efeito que mudou permanentemente sua aparência e fisionomia é considerada um mutante.<br />
                            O mutante tem uma penalidade de -2 em todos os testes da aba social, exceto intimidação, sempre que que tiver a mutação visível. Todos sabem que o personagem possui mutações, a não ser que o personagem a mantenha contida dentro de roupas, máscaras e afins. Ao escolher ser um mutante é necessário escolher apenas uma das opções abaixo:
                        </Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><strong>Mutação Física</strong></TableCell>
                                    <TableCell><strong>Benefício</strong></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {mutacoes.map((mutacao, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{mutacao.nome}</TableCell>
                                        <TableCell>{mutacao.beneficio}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TabPanel>
                </Paper>
            </Box >
        );
    }
    function TabPanel({ children, value, index }) {
        return (
            <div role="tabpanel" hidden={value !== index}>
                {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
            </div>
        );
    }

    return (
        <Box sx={{ minHeight: '700px', width: '100%' }} >
            <Box sx={{ width: "80%", mx: 'auto', my: 4 }}>

                <EspecieHumano />
                <EspecieElfo />
                <EspecieAnao />
                <EspecieFeerico />
                <EspecieDraconiano />
                <EspecieMeioElfo />
                <EspecieMeioDemonio />
                <EspecieMeioCelestial />
                <EspecieMeioGenio />
                <EspecieMeioTroll />
                <EspecieBestial />
                <EspecieHalfling />
                <EspecieTroll />
                <EspecieConstructo />
                <EspecieSpecialOptions />
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default EspeciesPage;
