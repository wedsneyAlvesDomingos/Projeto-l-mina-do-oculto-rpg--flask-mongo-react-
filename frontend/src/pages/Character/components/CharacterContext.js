import React, { createContext, useContext, useState, useCallback, useMemo, useRef, useEffect } from 'react';

// Contexto para compartilhar estado do personagem entre componentes
const CharacterContext = createContext(null);

export const useCharacter = () => {
    const context = useContext(CharacterContext);
    if (!context) {
        throw new Error('useCharacter must be used within a CharacterProvider');
    }
    return context;
};

export const CharacterProvider = ({ children, characterId, baseUrl, userId }) => {
    const [character, setCharacter] = useState(null);
    const [originalCharacter, setOriginalCharacter] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState('');

    // Estados para sistema de vantagem/desvantagem
    const [vantagens, setVantagens] = useState(0);
    const [desvantagens, setDesvantagens] = useState(0);
    
    // Estados para sistema de luz
    const [nivelLuz, setNivelLuz] = useState('completa');
    
    // Estados para sistema de dinheiro (modal de conversão)
    const [dinheiroModalOpen, setDinheiroModalOpen] = useState(false);
    const [moedas, setMoedas] = useState({ platina: 0, ouro: 0, prata: 0, cobre: 0 });
    
    // Estados para sistema de descanso
    const [descansoModalOpen, setDescansoModalOpen] = useState(false);
    
    // Estados para itens equipados
    const [armasEquipadas, setArmasEquipadas] = useState([null, null]);
    const [armaduraEquipada, setArmaduraEquipada] = useState(null);
    const [escudoEquipado, setEscudoEquipado] = useState(null);
    
    // Estados para rolagem de dados customizada
    const [dadoSelecionado, setDadoSelecionado] = useState(20);
    const [quantidadeDados, setQuantidadeDados] = useState(1);
    const [diceRolling, setDiceRolling] = useState(false);
    const [diceHistory, setDiceHistory] = useState([]);

    // Ref para o input de arquivo de imagem
    const fileInputRef = useRef(null);

    // Funções para upload de imagem
    const processFile = useCallback((file) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setCharacter(prev => prev ? { ...prev, image: reader.result } : prev);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleImageDrop = useCallback((e) => {
        e.preventDefault();
        processFile(e.dataTransfer.files[0]);
    }, [processFile]);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
    }, []);

    const handleImageButtonClick = useCallback(() => {
        fileInputRef.current?.click();
    }, []);

    const handleImageFileChange = useCallback((e) => {
        processFile(e.target.files?.[0]);
    }, [processFile]);

    // Carregar personagem
    useEffect(() => {
        const loadCharacter = async () => {
            if (!characterId || !userId) {
                setErro('ID de personagem ou usuário não encontrado');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${baseUrl}/users/${userId}/personagens`);
                if (!response.ok) throw new Error('Erro ao buscar personagens');
                
                const personagens = await response.json();
                const personagem = personagens.find(p => p.id === characterId);
                
                if (!personagem) {
                    setErro('Personagem não encontrado');
                    setLoading(false);
                    return;
                }

                // Converter dinheiro antigo para novo sistema de moedas
                if (personagem.dinheiro !== undefined && !personagem.moedas) {
                    const dinheiroValor = parseFloat(personagem.dinheiro) || 0;
                    personagem.moedas = {
                        platina: 0,
                        ouro: Math.floor(dinheiroValor),
                        prata: Math.floor((dinheiroValor % 1) * 10),
                        cobre: 0
                    };
                }

                setCharacter(personagem);
                setOriginalCharacter(JSON.parse(JSON.stringify(personagem)));
                
                // Carregar itens equipados do banco
                if (personagem.armas_equipadas) {
                    setArmasEquipadas(personagem.armas_equipadas);
                }
                if (personagem.armadura_equipada) {
                    setArmaduraEquipada(personagem.armadura_equipada);
                }
                if (personagem.escudo_equipado) {
                    setEscudoEquipado(personagem.escudo_equipado);
                }
                
                // Carregar histórico de rolagens
                if (personagem.historico_rolagens) {
                    setDiceHistory(personagem.historico_rolagens);
                }
                
                setLoading(false);
            } catch (error) {
                console.error('Erro ao carregar personagem:', error);
                setErro('Erro ao carregar personagem');
                setLoading(false);
            }
        };

        loadCharacter();
    }, [characterId, userId, baseUrl]);

    // Função para atualizar campo do personagem
    const updateField = useCallback((field, value) => {
        setCharacter(prev => {
            if (!prev) return prev;
            
            // Suporta campos aninhados como 'antecedente.nome'
            const fields = field.split('.');
            if (fields.length === 1) {
                return { ...prev, [field]: value };
            }
            
            const newChar = { ...prev };
            let current = newChar;
            for (let i = 0; i < fields.length - 1; i++) {
                current[fields[i]] = { ...current[fields[i]] };
                current = current[fields[i]];
            }
            current[fields[fields.length - 1]] = value;
            return newChar;
        });
    }, []);

    // Função para salvar personagem
    const saveCharacter = useCallback(async () => {
        if (!character) return;
        
        try {
            const response = await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(character),
            });
            
            if (!response.ok) throw new Error('Erro ao salvar');
            
            setOriginalCharacter(JSON.parse(JSON.stringify(character)));
            setEditMode(false);
            setSnackbar({ open: true, message: 'Personagem salvo com sucesso!', severity: 'success' });
        } catch (error) {
            console.error('Erro ao salvar:', error);
            setSnackbar({ open: true, message: 'Erro ao salvar personagem', severity: 'error' });
        }
    }, [character, baseUrl]);

    // Função para cancelar edição
    const cancelEdit = useCallback(() => {
        setCharacter(JSON.parse(JSON.stringify(originalCharacter)));
        setEditMode(false);
    }, [originalCharacter]);

    // Funções de equipar itens
    const equiparArma = useCallback(async (arma, slot) => {
        const novasArmas = [...armasEquipadas];
        novasArmas[slot] = arma;
        setArmasEquipadas(novasArmas);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armas_equipadas: novasArmas }),
            });
            setCharacter(prev => ({ ...prev, armas_equipadas: novasArmas }));
        } catch (error) {
            console.error('Erro ao salvar arma equipada:', error);
        }
    }, [armasEquipadas, character, baseUrl]);

    const equiparArmadura = useCallback(async (armadura) => {
        setArmaduraEquipada(armadura);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armadura_equipada: armadura }),
            });
            setCharacter(prev => ({ ...prev, armadura_equipada: armadura }));
        } catch (error) {
            console.error('Erro ao salvar armadura equipada:', error);
        }
    }, [character, baseUrl]);

    const desequiparArmadura = useCallback(async () => {
        setArmaduraEquipada(null);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, armadura_equipada: null }),
            });
            setCharacter(prev => ({ ...prev, armadura_equipada: null }));
        } catch (error) {
            console.error('Erro ao desequipar armadura:', error);
        }
    }, [character, baseUrl]);

    const equiparEscudo = useCallback(async (escudo) => {
        setEscudoEquipado(escudo);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, escudo_equipado: escudo }),
            });
            setCharacter(prev => ({ ...prev, escudo_equipado: escudo }));
        } catch (error) {
            console.error('Erro ao salvar escudo equipado:', error);
        }
    }, [character, baseUrl]);

    const desequiparEscudo = useCallback(async () => {
        setEscudoEquipado(null);
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, escudo_equipado: null }),
            });
            setCharacter(prev => ({ ...prev, escudo_equipado: null }));
        } catch (error) {
            console.error('Erro ao desequipar escudo:', error);
        }
    }, [character, baseUrl]);

    // Função para atualizar moedas
    const atualizarMoeda = useCallback(async (tipo, valor) => {
        const novasMoedas = {
            ...character.moedas,
            [tipo]: parseInt(valor) || 0
        };
        
        setCharacter(prev => ({ ...prev, moedas: novasMoedas }));
        
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, moedas: novasMoedas }),
            });
        } catch (error) {
            console.error('Erro ao atualizar moedas:', error);
        }
    }, [character, baseUrl]);

    // Função para salvar histórico de rolagens
    const salvarHistoricoRolagens = useCallback(async (novoHistorico) => {
        try {
            await fetch(`${baseUrl}/personagens/${character.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...character, historico_rolagens: novoHistorico }),
            });
        } catch (error) {
            console.error('Erro ao salvar histórico de rolagens:', error);
        }
    }, [character, baseUrl]);

    // Função para rolar dados
    const rollDice = useCallback((sides, quantity = 1, bonus = 0, description = '') => {
        if (diceRolling) return;
        
        setDiceRolling(true);
        
        setTimeout(() => {
            const rolls = [];
            let total = 0;
            
            for (let i = 0; i < quantity; i++) {
                const roll = Math.floor(Math.random() * sides) + 1;
                rolls.push(roll);
                total += roll;
            }
            
            total += bonus;
            
            const resultado = {
                id: Date.now(),
                dados: `${quantity}d${sides}${bonus >= 0 ? '+' : ''}${bonus !== 0 ? bonus : ''}`,
                rolls,
                bonus,
                total,
                descricao: description,
                timestamp: new Date().toLocaleTimeString(),
                critico: sides === 20 && rolls.includes(20),
                falhaCritica: sides === 20 && rolls.includes(1)
            };
            
            const novoHistorico = [resultado, ...diceHistory].slice(0, 50);
            setDiceHistory(novoHistorico);
            salvarHistoricoRolagens(novoHistorico);
            setDiceRolling(false);
            
            setSnackbar({
                open: true,
                message: `🎲 ${description || resultado.dados}: ${rolls.join(' + ')}${bonus !== 0 ? ` + ${bonus}` : ''} = ${total}${resultado.critico ? ' 🎯 CRÍTICO!' : ''}${resultado.falhaCritica ? ' ❌ FALHA CRÍTICA!' : ''}`,
                severity: resultado.critico ? 'success' : resultado.falhaCritica ? 'error' : 'info'
            });
        }, 300);
    }, [diceRolling, diceHistory, salvarHistoricoRolagens]);

    // Estilos compartilhados
    const sectionStyle = useMemo(() => ({
        borderRadius: 2,
        backgroundColor: 'var(--surface-paper)',
        border: '1px solid var(--text-muted)'
    const cardHeaderStyle = useMemo(() => ({
        background: 'linear-gradient(135deg, #40150A 0%, #5B1F0F 50%, #7B3311 100%)',
        color: 'white',
        py: 1.5,
        '& .MuiTypography-root': {
            fontWeight: 'bold'
        }
    }), []);

    const value = useMemo(() => ({
        // Estado
        character,
        setCharacter,
        originalCharacter,
        editMode,
        setEditMode,
        activeTab,
        setActiveTab,
        snackbar,
        setSnackbar,
        loading,
        erro,
        baseUrl,
        userId,
        
        // Vantagens/Desvantagens
        vantagens,
        setVantagens,
        desvantagens,
        setDesvantagens,
        
        // Luz
        nivelLuz,
        setNivelLuz,
        
        // Modais
        dinheiroModalOpen,
        setDinheiroModalOpen,
        descansoModalOpen,
        setDescansoModalOpen,
        
        // Moedas
        moedas,
        setMoedas,
        atualizarMoeda,
        
        // Equipamentos
        armasEquipadas,
        setArmasEquipadas,
        armaduraEquipada,
        setArmaduraEquipada,
        escudoEquipado,
        setEscudoEquipado,
        equiparArma,
        equiparArmadura,
        desequiparArmadura,
        equiparEscudo,
        desequiparEscudo,
        
        // Dados
        dadoSelecionado,
        setDadoSelecionado,
        quantidadeDados,
        setQuantidadeDados,
        diceRolling,
        diceHistory,
        setDiceHistory,
        rollDice,
        salvarHistoricoRolagens,
        
        // Imagem
        fileInputRef,
        handleImageDrop,
        handleDragOver,
        handleImageButtonClick,
        handleImageFileChange,
        
        // Funções
        updateField,
        saveCharacter,
        cancelEdit,
        
        // Estilos
        sectionStyle,
        cardHeaderStyle,
    }), [
        character, originalCharacter, editMode, activeTab, snackbar, loading, erro, baseUrl, userId,
        vantagens, desvantagens, nivelLuz,
        dinheiroModalOpen, descansoModalOpen,
        moedas, atualizarMoeda,
        armasEquipadas, armaduraEquipada, escudoEquipado,
        equiparArma, equiparArmadura, desequiparArmadura, equiparEscudo, desequiparEscudo,
        dadoSelecionado, quantidadeDados, diceRolling, diceHistory, rollDice, salvarHistoricoRolagens,
        handleImageDrop, handleDragOver, handleImageButtonClick, handleImageFileChange,
        updateField, saveCharacter, cancelEdit,
        sectionStyle, cardHeaderStyle
    ]);

    return (
        <CharacterContext.Provider value={value}>
            {children}
        </CharacterContext.Provider>
    );
};

export default CharacterContext;
