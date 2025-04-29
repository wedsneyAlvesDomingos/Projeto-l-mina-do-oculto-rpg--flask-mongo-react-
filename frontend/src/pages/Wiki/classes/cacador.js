import cacador from "../../../assets/images/caçador.png";
import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Tab, Tabs, Accordion, AccordionSummary, AccordionDetails, List, ListItem } from '@mui/material';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./classes.css";

const CacadorPage = () => {
    const SkillAccordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="estebanText" >{skill.descricao}</Typography>
                <List>
                    {skill.detalhes.map((detalhe, index) => (
                        <ListItem className="estebanText" key={index}>{detalhe}</ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
    const PerkAccordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {skill.descricao && <Typography className="estebanText" >{skill.descricao}</Typography>}

                {/* Renderizando bônus se existirem */}
                {skill.bônus && (
                    <List>
                        <ListItem><Typography className="estebanText" ><strong>Bônus de Habilidades:</strong></Typography></ListItem>
                        {skill.bônus.map((bonus, index) => (
                            <ListItem className="estebanText" key={index}>
                                {bonus.tipo} : {bonus.valor}
                            </ListItem>
                        ))}
                    </List>
                )}

                {/* Renderizando manobras se existirem */}
                {skill.manobras && (
                    <List>
                        {skill.manobras.map((manobra, index) => (
                            <ListItem key={index}>
                                <Typography className="estebanText" variant="body1"> <strong>{manobra.nome} </strong>: {manobra.descricao}</Typography>
                            </ListItem>
                        ))}
                    </List>
                )}
            </AccordionDetails>
        </Accordion>
    );

    const HabilidadeDeClasseAcordion = ({ skill }) => (
        <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography className="estebanText" variant="h6">{skill.nome}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography className="estebanText" >{skill.descricao}</Typography>
                <List>
                    {skill.habilidades.map((habilidade, index) => (
                        <ListItem key={index}>
                            <Typography className="estebanText" variant="body1"><strong>{habilidade.nome}:</strong> {habilidade.descricao}</Typography>
                            {habilidade.condicao && (
                                <Typography className="estebanText" variant="body2" color="textSecondary">
                                    <em>{habilidade.condicao}</em>
                                </Typography>
                            )}
                        </ListItem>
                    ))}
                </List>
            </AccordionDetails>
        </Accordion>
    );
    const especializacao = {
        "titulo": "CAÇADOR",
        "img": cacador,
        "descricao": "O Caçador da classe Lâmina do Oculto é um mestre em sobrevivência e rastreamento, capaz de transformar o ambiente ao seu favor. Ele vê o mundo de forma única, decifrando rastros, lendo o vento e detectando sinais invisíveis para a maioria. Sua percepção aguçada o torna tanto um perseguidor implacável quanto um protetor vigilante de seus aliados, antecipando emboscadas e armadilhas.Ao seu lado, há sempre um companheiro animal leal, uma criatura treinada que se torna uma extensão do próprio Caçador. Juntos, eles operam em perfeita sincronia, protegendo um ao outro e atacando como uma unidade coesa. Essa ligação é tão profunda que o Caçador pode até compartilhar os sentidos de seu companheiro, tornando-se quase impossível de ser surpreendido.Sua adaptabilidade impressiona. Ele prospera em qualquer ambiente — florestas densas, desertos escaldantes ou montanhas geladas — resistindo a condições extremas sem perder eficácia. Ele é um explorador incansável, capaz de suportar fome, sede e temperaturas letais graças à sua resistência física e mental sobre-humanas.No combate, o Caçador não depende de força bruta, mas de velocidade e precisão. Ele ataca rápido e letalmente, aproveitando cada erro do oponente. Seu companheiro animal complementa esses ataques, desorientando e derrubando alvos com coordenação impecável. Além disso, o Caçador controla o campo de batalha com maestria, restringindo o movimento de inimigos e incapacitando-os sem matá-los quando necessário — ideal para capturar alvos ou impedir fugas.À distância, sua destreza é lendária. Ele dispara flechas com precisão cirúrgica, atingindo alvos mesmo atrás de cobertura. Quando cercado, ele pode liberar uma tempestade de golpes, transformando-se em um turbilhão de lâminas e fúria.Há um lado quase místico no Caçador. Ele pode marcar um alvo de forma sobrenatural, rastreando-o mesmo se este se esconder ou ficar invisível. Essa marca transforma a caçada em algo inevitável — o Caçador sempre encontra sua presa e cada ataque contra ela é mais mortal.Mais que guerreiro ou rastreador, o Caçador é um símbolo de equilíbrio entre civilização e natureza. Ele entende e respeita as leis selvagens do mundo, domando até mesmo criaturas lendárias como dragões. Ele não busca destruição, mas parceria e compreensão. Seu papel na sociedade varia: pode ser o guardião de uma vila remota, um explorador destemido ou um assassino furtivo, eliminando alvos importantes sem ser notado. Sua versatilidade e independência fazem dele um sobrevivente nato. Em essência, o Caçador é definido por sua mentalidade: um predador paciente, um sobrevivente resiliente e um aliado leal. Ele não teme o mundo cruel — ele se adapta e prospera. Onde quer que vá, deixa sua marca de equilíbrio e perseverança, lembrando a todos que, mesmo na escuridão, seus olhos atentos observam, esperando o momento certo para agir.",
        "atributos": "Cada Regalia comprada na especialização Caçador(a) fornece:\n- 5 Pontos de Vida\n- 4 Pontos de Estâmina\n- 1 Ponto em Magia",
        "regaliaObrigatoria": {
          "descricao": "Ao escolher esta especialização, o personagem recebe os seguintes atributos :",
          "pontos": {
            "atributos": {
              "quantidade": 2,
              "opcoes": ["Força", "Agilidade", "Destreza"]
            },
            "combate": {
              "quantidade": 1,
              "opcoes": ["Combate corpo a corpo", "Combate à distância"]
            },
            "habilidades": {
              "quantidade": 2,
              "opcoes": ["Percepção", "Sobrevivência", "Armadilha", "Natureza", "Rastreamento"]
            },
            "proficiências": ["Capacidade de Adestrar Animais"]
          },
          "habilidade": [{
            "nome": " Adestrar Animais",
            "tipo": "Passiva",
            "descricao": "Cada animal adestrado tem um valor de dificuldade para ser treinado. Esse valor é de 10 ou metade do  valor dos pontos de vida da criatura, arredondado para cima, o que for maior. O teste feito deve ser de Lidar com Animais e o caçador ganha um bônus igual a metade do seu nível de personagem neste rolamento, arredondado para cima.\n A criatura adestrada é considerada um companheiro animal e tem seu turno ao mesmo tempo que o caçador. Esse companheiro pode agir alternadamente com o caçador dentro deste turno. \n O caçador consegue tratar ferimentos e  tem, em  todos os testes de medicina, um bônus de +5 ao cuidar de seu companheiro animal. \n Seu companheiro animal pode fazer um turno de vigia de duas horas sozinho em um acampamento. \n O companheiro animal ganha um  bônus em seus pontos de vida igual a duas vezes o nível do caçador. Ou seja, os pontos de vida ficha da criatura somados ao nível do caçador multiplicado por dois. O caçador pode ter um número de animais adestrados igual o seu valor em Lidar com animais",
          }]
        },
        "regalias": [
          {
            "nome": "Ataque Veloz",
            "tipo": "Ação livre",
            "descricao": "O Caçador(a) pode realizar um ataque a mais quando tomar uma ação de atacar. Apenas uma vez por ação.",
            "custoEstamina": 1,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Concentração",
            "tipo": "Ação livre",
            "descricao": "O Caçador(a) aumenta o seu acerto em 2 pontos durante 10 rodadas.",
            "custoEstamina": 6,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {
              "passivo": "Aumento de acerto em 2 pontos."
            },
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Ataque de Oportunidade",
            "tipo": "Reação",
            "descricao": "O Caçador(a) pode realizar um ataque de oportunidade quando outra criatura que possa ver sair da sua área de ameaça, ou atacar um aliado dentro do seu alcance.",
            "custoEstamina": 2,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Trabalho em Equipe",
            "tipo": "Ação livre",
            "descricao": "O Caçador(a) ao realizar um ataque pode comandar o seu Companheiro Animal para atacar em conjunto sem gastar uma ação do companheiro animal.",
            "custoEstamina": 6,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {
              "ativo": "Ao sofrer um ataque, tanto o caçador quanto o Companheiro Animal podem, como uma reação, solicitar auxílio um do outro. Ao receber auxílio, o caçador e o Companheiro recebem um aumento no Valor de Defesa em 2 pontos. O caçador deve estar a até 3 metros de distância de seu companheiro para realizar essa ajuda e vice-versa."
            },
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Conexão Primitiva",
            "tipo": "Ação",
            "descricao": "O Caçador(a) e seu companheiro animal criam uma conexão que compartilham seus sentidos, permitindo que um possa usar os sentidos do outro. O caçador consegue ver e ouvir pelos sentidos de seu companheiro e pelos próprios ao mesmo tempo.",
            "custoEstamina": 1,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {
              "ativo": "Compartilhar sentidos com o companheiro animal."
            },
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Corpo Adaptativo",
            "tipo": "Passiva",
            "descricao": "O Caçador(a) consegue se adaptar a qualquer ambiente em que é possível a vida de humanóides. O caçador e seu companheiro animal não se perdem em ambientes naturais e podem ficar até um mês sem comida e até 10 dias sem água.",
            "custoEstamina": 4,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {
              "passivo": "Adaptação a ambientes naturais e resistência ao dano de fogo ou gelo."
            },
            "modificadores": {
              "ativo": "Resistência ao dano de fogo ou gelo, reduzindo-o pela metade."
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Instinto Caçador",
            "tipo": "Passiva",
            "descricao": "O Caçador(a) utiliza de pistas em um ambiente para perseguir uma criatura que tenha passado por ali. Ao perseguir uma criatura através de pistas, como cheiro ou pegadas, ele ganha vantagem em testes de Rastreamento e Percepção.",
            "custoEstamina": 1,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {
              "passivo": "Vantagem em testes de Rastreamento e Percepção."
            },
            "modificadores": {
              "ativo": "O Caçador(a) marca uma criatura que possa ver. Enquanto esta criatura estiver marcada, o caçador sabe onde ela está mesmo se estiver invisível."
            },
            "bonus": {
              "danoExtra": "1d6 de dano extra do tipo do ataque em cada ataque realizado."
            },
            "interacoes": {}
          },
          {
            "nome": "Debilitar",
            "tipo": "Ação livre",
            "descricao": "O Caçador(a) pode optar por debilitar um inimigo quando realizar um ataque. Reduzindo seu movimento pela metade.",
            "custoEstamina": 2,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {
              "efeitoExtra": "Reduzindo o movimento do alvo a zero ao gastar mais 2 pontos de estâmina adicionais."
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Olho de Águia",
            "tipo": "Ação livre",
            "descricao": "O Caçador(a) ao realizar um ataque a distância pode ignorar até meia cobertura.",
            "custoEstamina": 1,
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {
              "bonusPenetracao": "Ignora até 3/4 de cobertura ao custo de 1 ponto de estâmina adicional."
            },
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Chuva de Ataques",
            "tipo": "Ação",
            "descricao": "O Caçador(a) pode atacar, repetidamente, em um cone de 60° de abertura, 1.5 m de altura e distância de 27m. Atingindo todas as criaturas na área (incluindo aliados)",
            "custoEstamina": 2,
            "chanceDeSucesso": "",
            "dano": "(dano da arma + atributo) + 1d10 pontos de dano adicional para cada 1,5 m quadrado de área que a criatura ocupa.",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Expurgo",
            "tipo": "Ação (2 Ações)",
            "descricao": "O Caçador(a) gira com golpes rápidos, acertando todas as criaturas que escolher em seu alcance de ameaça.",
            "custoEstamina": 5,
            "chanceDeSucesso": "",
            "dano": "(dano da arma + atributo) + 1d10 pontos de dano adicional em cada criatura em alcance.",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Adestrar Dragão",
            "tipo": "Passiva",
            "descricao": "O personagem pode adestrar dragões e transformá-los em seu Companheiro.",
            "custoEstamina": "",
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {},
            "interacoes": {}
          },
          {
            "nome": "Recuperar Fôlego Maior",
            "tipo": "Ação (2 Ações)",
            "descricao": "O personagem pode gastar duas ações para recuperar 3d8 pontos de vida e 6 pontos de estâmina.",
            "custoEstamina": "",
            "chanceDeSucesso": "",
            "dano": "",
            "requisito": "",
            "efeitos": {},
            "modificadores": {},
            "bonus": {
              "vidaTemporaria": "3d8 pontos de vida"
            },
            "interacoes": {}
          }
        ]
  
  
      }
    return (
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 4 }}>
        <Box sx={{ width: "80%", mx: "auto" }}>
          {/* Título e Descrição */}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
            <img src={especializacao.img} style={{ width: "30%", height: '30%' }} alt="Imagem do Combatente" />
            <Box sx={{ width: "60%", display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Typography className="boxTextTitle" variant="h3" gutterBottom>
                {especializacao.titulo}
              </Typography>
              <Typography className="bigBoxTextClasses" paragraph sx={{ textAlign: 'justify' }}>
                {especializacao.descricao}
              </Typography>
            </Box>
          </Box>

          {/* Atributos */}
          <Typography variant="body1" sx={{ textAlign: 'justify', mb: 3 }}>
            {especializacao.atributos}
          </Typography>
          <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
            Regalia Obrigatória
          </Typography>
          {especializacao.regaliaObrigatoria && (
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-regaliaObrigatoria-content" id="panel-regaliaObrigatoria-header">
                <Typography>Atributos e Bonus</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{especializacao.regaliaObrigatoria.descricao}</Typography>

                {/* Atributos */}
                {especializacao.regaliaObrigatoria.pontos.atributos && (
                  <>
                    <Typography><strong>Atributos:</strong></Typography>
                    <ul>
                      <li key={especializacao.regaliaObrigatoria.pontos.atributos.quantidade}>{especializacao.regaliaObrigatoria.pontos.atributos.quantidade} Pontos em um dos seguintes:</li>
                      {especializacao.regaliaObrigatoria.pontos.atributos.opcoes.map((atributo, index) => (
                        <li key={index}>{atributo}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Combate */}
                {especializacao.regaliaObrigatoria.pontos.combate && (
                  <>
                    <Typography><strong>Combate:</strong></Typography>
                    <ul>
                      <li key={especializacao.regaliaObrigatoria.pontos.combate.quantidade}>{especializacao.regaliaObrigatoria.pontos.combate.quantidade} Pontos em um dos seguintes:</li>
                      {especializacao.regaliaObrigatoria.pontos.combate.opcoes.map((opcao, index) => (
                        <li key={index}>{opcao}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Habilidades */}
                {especializacao.regaliaObrigatoria.pontos.habilidades && (
                  <>
                    <Typography><strong>Habilidades:</strong></Typography>
                    <ul>
                      <li key={especializacao.regaliaObrigatoria.pontos.habilidades.quantidade}>{especializacao.regaliaObrigatoria.pontos.habilidades.quantidade} Pontos em todos os seguintes:</li>
                      {especializacao.regaliaObrigatoria.pontos.habilidades.opcoes.map((habilidade, index) => (
                        <li key={index}>{habilidade}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Proficiências */}
                {especializacao.regaliaObrigatoria.pontos.proficiências && (
                  <>
                    <Typography><strong>Proficiências:</strong></Typography>
                    <ul>
                      {especializacao.regaliaObrigatoria.pontos.proficiências.map((proficiencia, index) => (
                        <li key={index}>{proficiencia}</li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Outras Proficiencias */}
                {especializacao.regaliaObrigatoria.outrasProficiencias && (
                  <>
                    <Typography><strong>Outras Proficiências:</strong></Typography>
                    <ul>
                      {especializacao.regaliaObrigatoria.outrasProficiencias.map((proficiencia, index) => (
                        <li key={index}>{proficiencia}</li>
                      ))}
                    </ul>
                  </>
                )}
              </AccordionDetails>
            </Accordion>
          )}

          {/* Accordion para Habilidades */}
          <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
            Habilidade de Classe
          </Typography>
          {especializacao.regaliaObrigatoria.habilidade.map((habilidade, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
                <Typography>{habilidade.nome} </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>Tipo: {habilidade.tipo}</Typography>
                <Typography>{habilidade.descricao}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}

          {/* Regalias */}
          <Typography variant="h4" className="boxTextTitle" sx={{ my: 3 }}>
            Regalias
          </Typography>
          {especializacao.regalias.map((regalia, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls={`panel-regalia${index}-content`} id={`panel-regalia${index}-header`}>
                <Typography>{regalia.nome} ({regalia.tipo})</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{regalia.descricao}</Typography>
                {regalia.prerequisito && (
                  <Typography><strong>Pré-Requisito:</strong> {regalia.prerequisito}</Typography>
                )}

                {regalia.chanceDeSucesso && (
                  <Typography><strong>Chance de Sucesso:</strong> {regalia.chanceDeSucesso}</Typography>
                )}


                {regalia.bonus && regalia.bonus.vidaTemporaria && (
                  <Typography><strong>Bônus de Vida Temporária:</strong> {regalia.bonus.vidaTemporaria}</Typography>
                )}

                {regalia.tempoConstrucao && (
                  <Typography><strong>Tempo de contrução:</strong> {regalia.tempoConstrucao}</Typography>
                )}

                {regalia.duracao && (
                  <Typography><strong>Duração:</strong> {regalia.duracao}</Typography>
                )}
                {regalia.requisito && (
                  <Typography><strong>Requisito:</strong> {regalia.requisito}</Typography>
                )}

                {regalia.efeitos && regalia.efeitos.ativo && (
                  <Typography><strong>Ativo:</strong> {regalia.efeitos.ativo}</Typography>
                )}
                {regalia.efeitos && regalia.efeitos.duracao && (
                  <Typography><strong>Duração:</strong> {regalia.efeitos.duracao}</Typography>
                )}

                {regalia.efeitos && regalia.efeitos.passivo && (
                  <Typography><strong>Passivo:</strong> {regalia.efeitos.passivo}</Typography>
                )}

                {regalia.dano && (
                  <Typography><strong>Dano:</strong> {regalia.dano}</Typography>
                )}

                {regalia.modificadores && (
                  <>
                    {regalia.modificadores.bonusSucesso && (
                      <Typography><strong>Bonus Sucesso:</strong> {regalia.modificadores.bonusSucesso}</Typography>
                    )}
                    {regalia.modificadores.usoExtra && (
                      <Typography><strong>Uso Extra:</strong> {regalia.modificadores.usoExtra}</Typography>
                    )}
                    {regalia.modificadores.duracaoExtra && (
                      <Typography><strong>Duração Extra:</strong> {regalia.modificadores.duracaoExtra}</Typography>
                    )}
                    {regalia.modificadores.bonusLideranca && (
                      <Typography><strong>Bonus Liderança:</strong> {regalia.modificadores.bonusLideranca}</Typography>
                    )}
                  </>
                )}

                {regalia.interacoes && regalia.interacoes.comFortaleza && (
                  <Typography><strong>Interação com Fortaleza:</strong> {regalia.interacoes.comFortaleza}</Typography>
                )}

                {regalia.custoEstamina && (
                  <Typography><strong>Custo de Estâmina:</strong> {regalia.custoEstamina}</Typography>
                )}
                {regalia.custoMagia && (
                  <Typography><strong>Custo de Magia:</strong> {regalia.custoMagia}</Typography>
                )}

              </AccordionDetails>
            </Accordion>
          ))}

        </Box>
      </Box>
    );
}

export default CacadorPage;