/**
 * apiV2.js
 * Camada de serviço para todos os endpoints da API v2 do backend.
 * Mantém compatibilidade com os endpoints v1 que ainda são usados.
 */

const BASE = process.env.REACT_APP_LISTEN_ADDRESS;

// =============================================================================
// HELPERS
// =============================================================================

async function apiFetch(url, options = {}) {
    const response = await fetch(url, {
        headers: { 'Content-Type': 'application/json', ...options.headers },
        ...options,
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        const message = data.error || data.erro || data.message || `Erro HTTP ${response.status}`;
        throw Object.assign(new Error(message), { status: response.status, data });
    }
    return data;
}

// =============================================================================
// CATÁLOGOS — GET /api/v2/catalogs/*
// =============================================================================

/**
 * Busca todos os catálogos em uma única chamada.
 * @returns {Promise<{skills, proficiencias, species, conditions, items, abilities, classes, regalias, arvores, profissoes}>}
 */
export async function fetchAllCatalogs() {
    return apiFetch(`${BASE}/api/v2/catalogs`);
}

/**
 * Busca habilidades (skills) do catálogo.
 * @param {string} [categoria] - Filtro de categoria opcional
 */
export async function fetchSkills(categoria) {
    const params = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/skills${params}`);
}

/**
 * Busca espécies do catálogo.
 * @param {boolean} [includeSubespecies=true] - Incluir subespecies
 */
export async function fetchSpecies(includeSubespecies = true) {
    return apiFetch(`${BASE}/api/v2/catalogs/species?subespecies=${includeSubespecies}`);
}

/**
 * Busca condições do catálogo.
 * @param {string} [categoria] - Filtro de categoria opcional
 */
export async function fetchConditions(categoria) {
    const params = categoria ? `?categoria=${encodeURIComponent(categoria)}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/conditions${params}`);
}

/**
 * Busca itens do catálogo.
 * @param {string} [categoria]
 * @param {string} [subcategoria]
 */
export async function fetchItems(categoria, subcategoria) {
    const params = new URLSearchParams();
    if (categoria) params.set('categoria', categoria);
    if (subcategoria) params.set('subcategoria', subcategoria);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/items${qs}`);
}

/**
 * Busca abilities (habilidades de classe) do catálogo.
 * @param {string} [tipo]
 */
export async function fetchAbilities(tipo) {
    const params = tipo ? `?tipo=${encodeURIComponent(tipo)}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/abilities${params}`);
}

/**
 * Busca classes do catálogo.
 * @param {string} [tipo] - Ex: 'primaria', 'aprendiz'
 */
export async function fetchClasses(tipo) {
    const params = tipo ? `?tipo=${encodeURIComponent(tipo)}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/classes${params}`);
}

/**
 * Busca regalias do catálogo.
 * @param {string} [tipo] - Ex: 'aprendiz', 'especie', 'classe'
 * @param {string} [classeSlug]
 */
export async function fetchRegalias(tipo, classeSlug) {
    const params = new URLSearchParams();
    if (tipo) params.set('tipo', tipo);
    if (classeSlug) params.set('classe', classeSlug);
    const qs = params.toString() ? `?${params.toString()}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/regalias${qs}`);
}

/**
 * Busca árvores de regalias do catálogo.
 * @param {string} [classeSlug]
 */
export async function fetchArvores(classeSlug) {
    const params = classeSlug ? `?classe=${encodeURIComponent(classeSlug)}` : '';
    return apiFetch(`${BASE}/api/v2/catalogs/arvores${params}`);
}

/**
 * Busca profissões do catálogo.
 */
export async function fetchProfissoes() {
    return apiFetch(`${BASE}/api/v2/catalogs/profissoes`);
}

// =============================================================================
// PERSONAGENS — ficha calculada
// =============================================================================

/**
 * Retorna a ficha completa com todos os derivados calculados pelo backend.
 * @param {number} personagemId
 */
export async function fetchFicha(personagemId) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/ficha`);
}

// =============================================================================
// PERSONAGENS — ações v2
// =============================================================================

/**
 * Aplica uma condição ao personagem.
 * @param {number} personagemId
 * @param {string} condicaoSlug - slug da condição (ex: "queimando_1")
 * @param {object} options
 * @param {number} [options.duracaoTurnos]
 * @param {string} [options.fonte]
 * @param {number} [options.userId]
 */
export async function aplicarCondicaoV2(personagemId, condicaoSlug, { duracaoTurnos, fonte, userId } = {}) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/condicoes`, {
        method: 'POST',
        body: JSON.stringify({
            condicao_slug: condicaoSlug,
            duracao_turnos: duracaoTurnos,
            fonte: fonte,
            user_id: userId || 0,
        }),
    });
}

/**
 * Remove uma condição ativa do personagem.
 * @param {number} personagemId
 * @param {string} condicaoSlug
 * @param {number} [userId]
 */
export async function removerCondicaoV2(personagemId, condicaoSlug, userId = 0) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/condicoes/${encodeURIComponent(condicaoSlug)}`, {
        method: 'DELETE',
        body: JSON.stringify({ user_id: userId }),
    });
}

/**
 * Realiza um descanso pelo backend v2.
 * @param {number} personagemId
 * @param {'curto'|'longo'|'pleno'} tipo
 * @param {number} [userId]
 */
export async function realizarDescansoV2(personagemId, tipo, userId = 0) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/descanso`, {
        method: 'POST',
        body: JSON.stringify({ tipo, user_id: userId }),
    });
}

/**
 * Compra uma regalia para o personagem.
 * @param {number} personagemId
 * @param {string} regaliaSlug
 * @param {number} [userId]
 */
export async function comprarRegaliaV2(personagemId, regaliaSlug, userId = 0) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/regalias`, {
        method: 'POST',
        body: JSON.stringify({ regalia_slug: regaliaSlug, user_id: userId }),
    });
}

/**
 * Usa uma ability do personagem.
 * @param {number} personagemId
 * @param {string} abilitySlug
 * @param {number} [userId]
 * @param {object} [contexto]
 */
export async function usarAbilityV2(personagemId, abilitySlug, userId = 0, contexto = {}) {
    return apiFetch(`${BASE}/api/v2/personagens/${personagemId}/abilities/${encodeURIComponent(abilitySlug)}/usar`, {
        method: 'POST',
        body: JSON.stringify({ user_id: userId, contexto }),
    });
}
