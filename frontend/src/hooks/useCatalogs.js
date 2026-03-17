/**
 * useCatalogs.js
 * Hook que carrega todos os catálogos do backend v2 em uma única chamada
 * e os expõe para os componentes.
 *
 * Estratégia de fallback: se a API v2 não estiver disponível, o hook
 * retorna dados vazios (nunca quebra o app). Os dados estáticos locais
 * continuam sendo usados nos cálculos de regras (não são substituídos).
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { fetchAllCatalogs, fetchSpecies, fetchRegalias } from '../services/apiV2';

const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutos

// Cache em memória (sobrevive re-renders, resetado no refresh)
let _cachedCatalogs = null;
let _cacheTimestamp = 0;

export default function useCatalogs() {
    const [catalogs, setCatalogs] = useState(() => _cachedCatalogs);
    const [loading, setLoading] = useState(!_cachedCatalogs);
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);

    const loadCatalogs = useCallback(async () => {
        // Usar cache se ainda válido
        if (_cachedCatalogs && Date.now() - _cacheTimestamp < CACHE_DURATION_MS) {
            setCatalogs(_cachedCatalogs);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const data = await fetchAllCatalogs();
            _cachedCatalogs = data;
            _cacheTimestamp = Date.now();
            if (mountedRef.current) {
                setCatalogs(data);
            }
        } catch (err) {
            console.warn('[useCatalogs] Falha ao carregar catálogos do backend v2:', err.message);
            if (mountedRef.current) {
                setError(err.message);
            }
        } finally {
            if (mountedRef.current) {
                setLoading(false);
            }
        }
    }, []);

    useEffect(() => {
        mountedRef.current = true;
        loadCatalogs();
        return () => { mountedRef.current = false; };
    }, [loadCatalogs]);

    // Invalidar cache e recarregar
    const refresh = useCallback(() => {
        _cachedCatalogs = null;
        _cacheTimestamp = 0;
        loadCatalogs();
    }, [loadCatalogs]);

    // ── Helpers de acesso por slug ────────────────────────────────────────────

    /**
     * Retorna dados de espécie pelo slug.
     * @param {string} slug
     */
    const getSpecies = useCallback((slug) => {
        const list = catalogs?.species || catalogs?.especies || [];
        return list.find(e => e.slug === slug) || null;
    }, [catalogs]);

    /**
     * Retorna regalias de aprendiz (tipo='aprendiz').
     */
    const getRegaliaDeAprendiz = useCallback(() => {
        const list = catalogs?.regalias || [];
        return list.filter(r => r.tipo === 'aprendiz');
    }, [catalogs]);

    /**
     * Retorna dados de uma regalia pelo slug ou id.
     * @param {string|number} slugOrId
     */
    const getRegalia = useCallback((slugOrId) => {
        const list = catalogs?.regalias || [];
        return list.find(r => r.slug === slugOrId || r.id === slugOrId) || null;
    }, [catalogs]);

    /**
     * Retorna dados de uma condição pelo slug.
     * @param {string} slug
     */
    const getCondition = useCallback((slug) => {
        const list = catalogs?.conditions || catalogs?.condicoes || [];
        return list.find(c => c.slug === slug) || null;
    }, [catalogs]);

    /**
     * Retorna dados de uma skill pelo slug ou nome.
     * @param {string} slugOrNome
     */
    const getSkill = useCallback((slugOrNome) => {
        const list = catalogs?.skills || catalogs?.habilidades || [];
        return list.find(s => s.slug === slugOrNome || s.nome === slugOrNome) || null;
    }, [catalogs]);

    /**
     * Retorna lista de espécies para uso em selects (valor=slug, label=nome).
     */
    const getSpeciesForSelect = useCallback(() => {
        const list = catalogs?.species || catalogs?.especies || [];
        return list.map(e => ({ value: e.slug, label: e.nome }));
    }, [catalogs]);

    return {
        catalogs,
        loading,
        error,
        refresh,
        // Helpers
        getSpecies,
        getRegaliaDeAprendiz,
        getRegalia,
        getCondition,
        getSkill,
        getSpeciesForSelect,
        // Listas diretamente
        species:      catalogs?.species || catalogs?.especies || [],
        skills:       catalogs?.skills || catalogs?.habilidades || [],
        conditions:   catalogs?.conditions || catalogs?.condicoes || [],
        regalias:     catalogs?.regalias || [],
        classes:      catalogs?.classes || [],
        abilities:    catalogs?.abilities || [],
        arvores:      catalogs?.arvores || [],
        profissoes:   catalogs?.profissoes || [],
        items:        catalogs?.items || [],
    };
}
