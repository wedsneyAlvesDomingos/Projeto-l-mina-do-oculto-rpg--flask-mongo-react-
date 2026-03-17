/**
 * useRegalias.js
 * Hook para gerenciar compra de regalias de personagens existentes via API v2.
 * Usado na ficha do personagem para comprar regalias de classe/especialização.
 */
import { useState, useCallback } from 'react';
import { comprarRegaliaV2 } from '../services/apiV2';

export default function useRegalias({ personagemId, userId, onSuccess, onError } = {}) {
    const [comprando, setComprando] = useState(false);
    const [ultimaCompra, setUltimaCompra] = useState(null);

    /**
     * Compra uma regalia pelo slug.
     * @param {string} regaliaSlug
     * @returns {Promise<{ok: boolean, message?: string}>}
     */
    const comprarRegalia = useCallback(async (regaliaSlug) => {
        if (!personagemId) {
            console.error('[useRegalias] personagemId não definido');
            return { ok: false };
        }
        setComprando(true);
        try {
            const resultado = await comprarRegaliaV2(personagemId, regaliaSlug, userId || 0);
            setUltimaCompra({ slug: regaliaSlug, timestamp: Date.now() });
            if (onSuccess) onSuccess(resultado);
            return { ok: true, resultado };
        } catch (err) {
            console.error('[useRegalias] Erro ao comprar regalia:', err.message);
            if (onError) onError(err.message);
            return { ok: false, erro: err.message };
        } finally {
            setComprando(false);
        }
    }, [personagemId, userId, onSuccess, onError]);

    return { comprarRegalia, comprando, ultimaCompra };
}
