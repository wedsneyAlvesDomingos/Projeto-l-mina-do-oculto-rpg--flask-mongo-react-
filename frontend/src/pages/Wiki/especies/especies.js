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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
            <Box sx={{ width: "100%", padding: "1rem" }}>
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
                        <Typography className="bigBoxTextEquips"><strong>Bafo de Dragão:</strong><br /> Escolha um dos 3 elementos naturais (fogo, gelo e raio) para ser o elemento de sua arma de sopro. Em um cone de 6 metros de comprimento e 60° de abertura em frente ao draconiano é expelido 2d10 de dano do elemento selecionado. Custa 1 ação e só pode ser feito 2 vezes a cada descanso curto.
                        </Typography>

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
            </Box>

            <Box sx={{ background: '#40150A', p: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', width: '100%' }}>
                <Typography sx={{ color: '#fff', fontSize: '10px' }}>© 2024 Lâmina do oculto. All rights reserved.</Typography>
            </Box>
        </Box>
    );
};

export default EspeciesPage;
