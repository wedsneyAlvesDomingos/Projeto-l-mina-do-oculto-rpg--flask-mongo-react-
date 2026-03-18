/**
 * Arquivo de re-exportação de todas as constantes centralizadas
 * do sistema Lâmina do Oculto RPG
 * 
 * Uso:
 * import { profissoes, especies, antecedentes } from '../data/constants';
 * import { getProfissao, getEspecie } from '../data/constants';
 */

// ============================================================================
// HABILIDADES
// ============================================================================
export {
    // Grupos de habilidades
    habilidadesFisico,
    habilidadesExploracao,
    habilidadesConhecimento,
    habilidadesArcana,
    habilidadesSocial,
    // Objetos combinados
    gruposHabilidades,
    todasHabilidades,
    habilidadesIniciais,
    // Cores
    CORES_CATEGORIAS,
    // Funções auxiliares
    getHabilidade,
    getHabilidadeDescricao,
    getHabilidadeDescricaoCompleta,
    getHabilidadesPorCategoria,
    getMarcosHabilidade,
    marcoAtingido,
    getMarcosAtingidos,
    // Funções de cálculo
    calcularPontosDeVida,
    calcularCapacidadeDeCarga,
    calcularEstamina,
    calcularIniciativa,
    calcularBonusVelocidade,
    calcularPontosDeMagia,
    calcularTempoRespiracao,
    calcularCuraKitMedico,
    calcularAtributosDerivados,
    // Funções de cálculo — Fase 2 (HAB-001)
    calcularBonusHabilidade,
    TABELA_XP_POR_NIVEL,
    calcularNivel,
    calcularPontosRegaliaTotal,
    // Validação de distribuição — Fase 4 (HAB-002)
    PONTOS_HABILIDADE_NIVEL_1,
    PONTOS_PROFICIENCIA_EXTRA,
    MAX_PONTOS_POR_HABILIDADE,
    GRUPOS_NIVEL_1,
    GRUPO_EXTRA_NIVEL,
    calcularCustoHabilidade,
    calcularCustoDistribuicaoTotal,
    validarDistribuicaoHabilidades,
} from './habilidades';

// ============================================================================
// PROFICIÊNCIAS
// ============================================================================
export {
    // Proficiências individuais
    armasEArmadurasProf,
    conducaoDeVeiculosTerrestresProf,
    conducaoDeVeiculosAquaticosProf,
    conducaoExoticaProf,
    kitDeArrombamentoProf,
    armasDeFogoProf,
    linguasAntigasProf,
    arqueologiaProf,
    liderancaProf,
    armasExoticasProf,
    esgrimaProf,
    arcoBestaProf,
    disfarceProf,
    ataquesEmAreaProf,
    combateAntiConjuradoresProf,
    // Array combinado
    proficiencias,
    // Objeto inicial para forms
    proficienciasIniciais,
    // Funções auxiliares
    getProficiencia,
    getProficienciaNivel,
    // Funções de engine — Fase 2 (PRO-001)
    getEfeitosProficiencia,
    possuiProficiencia,
    getDesbloqueiosCumulativos,
} from './proficiencias';

// ============================================================================
// CONDIÇÕES
// ============================================================================
export {
    // Cores por categoria
    CORES_CONDICOES,
    // Objeto principal
    condicoesDisponiveis,
    // Array
    condicoesArray,
    // Categorias
    categoriasCondicoes,
    // Funções auxiliares
    getCondicao,
    getCondicoesPorCategoria,
    getCondicaoParaNivel,
    getCondicaoResumo,
    getCondicoesComFlag,
    getCondicoesComDanoRecorrente,
    isCondicaoIncapacitante,
    resolverCondicoesImplicitas,
    calcularModificadoresCondicoes,
    // Funções de engine — Fase 2 (CON-002/003)
    aplicarCondicao,
    removerCondicao,
    processarEfeitosDeRodada,
    processarTesteDeMorte,
} from './condicoes';

// ============================================================================
// PROFISSÕES
// ============================================================================
export {
    // Profissões individuais
    ferreiro,
    criminoso,
    mercador,
    explorador,
    academico,
    herbalista,
    alfaiate,
    artista,
    joalheiro,
    inventor,
    carpinteiro,
    arcanista,
    cozinheiro,
    soldadoDeAluguel,
    // Array combinado
    profissoes,
    // Dados do Herbalista (poções e venenos)
    pocoesHerbalista,
    venenosAnimais,
    venenosPlantas,
    venenosMonstros,
    // Funções auxiliares
    getProfissao,
    getProfissoesPorAmbiente,
    getProfissoesComRendimento,
    getTodasPocoes,
    getTodosVenenos,
    getPocao,
    getPocoesPorTipo,
} from './profissoes';

// ============================================================================
// ESPÉCIES/RAÇAS
// ============================================================================
export {
    // Espécies individuais
    humano,
    elfo,
    anao,
    feerico,
    draconiano,
    meioElfo,
    meioDemonio,
    meioCelestial,
    meioGenio,
    meioTroll,
    bestial,
    halfling,
    troll,
    constructo,
    // Objetos combinados
    especies,
    racas, // alias para compatibilidade
    especiesMap, // para characterSheet
    // Funções auxiliares
    getTodasEspecies,
    getEspecie,
    getSubraca,
    getSubracas,
    getTotalSubracas,
    getEspeciesParaSelect,
    getEstatisticasEspecie,
} from './especies';

// ============================================================================
// ANTECEDENTES
// ============================================================================
export {
    // Array principal
    antecedentes,
    // Funções auxiliares
    getTodosAntecedentes,
    getAntecedente,
    getAntecedentesComHabilidade,
    getAntecedentesParaSelect,
    calcularBonusAntecedente,
    // Funções de engine — Fase 2 (ANT-002)
    aplicarAntecedente,
} from './antecedentes';

// ============================================================================
// REGALIAS
// ============================================================================
export {
    // Regalias de Aprendiz
    regaliasDeAprendiz,
    // Regalias Opcionais (variantes de espécie)
    regaliasOpcionais,
    // Classes Primárias e Especializações
    classesPrimarias,
    especializacoes,
    // Tabela de pontos por nível
    pontosRegaliaPorNivel,
    // Funções auxiliares — Aprendiz
    getRegaliaAprendiz,
    getRegaliaAprendizPorNome,
    getRegaliasAprendizParaSelect,
    // Funções auxiliares — Opcionais
    getRegaliaOpcional,
    getOpcaoRegalia,
    getMutacoes,
    getTiposRegaliasOpcionais,
    // Funções auxiliares — Classes Primárias e Especializações
    getClassePrimaria,
    getEspecializacao,
    getClassesPrimariasParaSelect,
    getEspecializacoesParaSelect,
    getEspecializacoesDisponiveis,
    getArvoreRegalia,
    getRegaliaAvulsa,
    getRegaliaAvulsaEsp,
    // Funções de resolução de regalias
    aplicarRegaliaAprendiz,
    aplicarRegaliaOpcional,
    validarPreRequisitosRegalia,
} from './regalias';

// ============================================================================
// EQUIPAMENTOS
// ============================================================================
export {
    // Armaduras
    armadurasPesadas,
    armadurasMedidas,
    armadurasLeves,
    // Escudos
    escudos,
    // Armas
    armasSimples,
    armasMarciais,
    armasExoticas,
    // Outros equipamentos
    equipamentosViagem,
    municoes,
    equipamentoGeral,
    montarias,
    kits,
    // Objeto combinado
    equipamentos,
    categories, // alias para compatibilidade
    // Funções auxiliares
    getCategorias,
    getEquipamentosPorCategoria,
    getEquipamento,
    getTodasArmas,
    getTodasArmaduras,
    getEquipamentosPorPreco,
    getEquipamentosParaSelect,
    calcularCargaTotal,
    getArmasPorTipoDano,
    getArmadurasPorDefesa,
    getPesoItem,
    enriquecerComPeso,
    getArmasPorCategoriaProf,
    getArmasComPropriedade,
    getArmasComEfeitosEspeciais,
    getArmadurasPorCategoriaProf,
    // Funções de engine — Fase 2 (EQP-003)
    calcularDefesaComEquipamento,
    calcularDanoArma,
    // Materiais & Durabilidade — Fase 4 (EQP-004)
    MATERIAIS_METAL,
    MATERIAIS_MADEIRA,
    DURABILIDADE_TIERS,
    armasImprovisadas,
    LIMIARES_DESGASTE_ARMA,
    LIMIARES_DESGASTE_ARMADURA,
    calcularPrecoMaterial,
    itemInquebravel,
    calcularDesgasteArma,
    calcularDesgasteArmadura,
    calcularDurabilidadeImprovisada,
    getArmaImprovisada,
} from './equipamentos';

// ============================================================================
// CLASSES AVANÇADAS (catálogo de progressão)
// ============================================================================
export {
    // Tabela de classes aprendiz
    classesAprendiz,
    // Mapeamento classe → especializações
    classeEspecializacaoMap,
    // Resumos descritivos
    resumoClassesPrimarias,
    resumoEspecializacoes,
    // Mecânica de Pontos de Feitiçaria
    pontosFeiticaria,
    // Funções de consulta
    getEspecializacoesParaClasse,
    verificarRequisitoEspecializacao,
    getProgressaoCompleta,
    calcularBonusClassePrimaria,
    calcularBonusEspecializacao,
    getEspecializacoesMistas,
    getEspecializacoesPuras,
    getOpcoesProgressaoParaSelect,
    determinarClasseAtual,
} from './classesAvancadas';

// ============================================================================
// REGRAS DO SISTEMA
// ============================================================================
export {
    // Constantes fundamentais de combate
    DURACAO_RODADA_SEGUNDOS,
    ACOES_POR_TURNO,
    CAMPO_VISAO_GRAUS,
    DISTANCIA_VISAO_LUZ_COMPLETA,
    ALCANCE_AMEACA_PADRAO,
    ALCANCE_AMEACA_HASTE,
    ALCANCE_AMEACA_MAXIMO,
    // Sistema de Iniciativa
    calcularBonusIniciativa,
    rolarIniciativa,
    ordenarPorIniciativa,
    // Sistema de Defesa
    BONUS_DEFESA_AGILIDADE,
    calcularBonusDefesaAgilidade,
    calcularDefesaTotal,
    // Sistema de Velocidade
    BONUS_VELOCIDADE_AGILIDADE,
    PENALIDADE_VELOCIDADE_ARMADURA_PESADA,
    calcularVelocidadeMovimento,
    // Sistema de Acerto
    calcularResultadoAtaque,
    calcularDanoFinal,
    // Sistema Elemental
    INTERACOES_ELEMENTAIS,
    calcularDanoElemental,
    // Dano de Queda
    TABELA_DANO_QUEDA,
    calcularDanoQueda,
    // Sistema de Cobertura
    TIPOS_COBERTURA,
    calcularBonusCobertura,
    // Sistema de Ações
    CATEGORIAS_ACOES,
    ACOES,
    getAcoesPorCategoria,
    getAcoesPadrao,
    getAcoesMovimento,
    getReacoes,
    getAcoesLivres,
    // Combate Montado
    podeMontarCriatura,
    calcularDCMontariaNaoTreinada,
    // Vantagem e Desvantagem
    calcularVantagemDesvantagem,
    rolarComVantagemDesvantagem,
    // Sistema de Dinheiro
    MOEDAS,
    TAXA_CONVERSAO,
    cobreParaMoedas,
    moedasParaCobre,
    formatarMoedas,
    realizarTransacao,
    // Bônus e Penalidades
    FONTES_BONUS,
    calcularBonusTotal,
    calcularPenalidadeTotal,
    calcularBonusPenalidadeOpcional,
    // Itens Mágicos
    LIMITES_ITENS_MAGICOS,
    verificarLimiteItensMagicos,
    getLimitesComArcanatec,
    // Vulnerabilidade e Resistência
    TIPOS_DANO,
    calcularDanoComModificadores,
    // Armadilhas
    testeEvitarArmadilha,
    testeDetectarArmadilha,
    calcularDanoArmadilha,
    // Rituais
    CHANCE_FALHA_RITUAL,
    realizarRitual,
    // Luz e Visão
    NIVEIS_LUZ,
    HABILIDADES_AFETADAS_LUZ,
    calcularPenalidadeLuz,
    // Descanso
    INTERVALO_DESCANSO_CURTO,
    INTERVALO_DESCANSO_LONGO,
    DURACAO_DESCANSO_CURTO,
    DURACAO_DESCANSO_LONGO,
    calcularDescansosCurto,
    calcularDescansoLongo,
    verificarPodeDescansar,
    calcularCansacoPorFaltaDeDescanso,
    REQUISITOS_DESCANSO,
    verificarRequisitosDescansoLongo,
    // Cansaço & Descanso completo — Fase 4 (RUL-004)
    NIVEIS_CANSACO,
    getPenalidadesCansaco,
    processarDescanso,
    // Sistema de Tamanho
    TAMANHOS,
    CAPACIDADE_CARGA,
    MODIFICADORES_ARMA_TAMANHO,
    determinarTamanho,
    calcularCapacidadeCarga,
    calcularCargaAtual,
    verificarStatusCarga,
    calcularDanoArmaPorTamanho,
    calcularCustoArmaAdaptada,
    getInformacoesCarga,
    // Motor de resolução — Fase 2 (RUL-002)
    resolverAcaoCompleta,
    resolverTesteHabilidade,
} from './regras';
