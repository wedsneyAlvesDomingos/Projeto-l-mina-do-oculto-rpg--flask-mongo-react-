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

// =============================================================================
// PERSONAGENS — CRUD v1
// =============================================================================

/**
 * Lista todos os personagens de um usuário.
 * @param {number} userId
 */
export async function fetchPersonagens(userId) {
    return apiFetch(`${BASE}/personagens/${userId}`);
}

/**
 * Cria um novo personagem para o usuário.
 * @param {number} userId
 * @param {object} data - Payload completo do personagem
 */
export async function criarPersonagem(userId, data) {
    return apiFetch(`${BASE}/users/${userId}/personagens`, {
        method: 'POST',
        body: JSON.stringify(data),
    });
}

/**
 * Atualiza um personagem existente (PUT completo).
 * @param {number} personagemId
 * @param {object} data - Dados atualizados do personagem
 */
export async function atualizarPersonagem(personagemId, data) {
    return apiFetch(`${BASE}/personagens/${personagemId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

/**
 * Deleta um personagem.
 * @param {number} personagemId
 */
export async function deletarPersonagem(personagemId) {
    return apiFetch(`${BASE}/personagens/${personagemId}`, { method: 'DELETE' });
}

// =============================================================================
// USUÁRIOS — perfil v1
// =============================================================================

/**
 * Busca dados públicos de um usuário (nome, email, avatar).
 * @param {number} userId
 */
export async function fetchUsuario(userId) {
    return apiFetch(`${BASE}/users/${userId}`);
}

/**
 * Atualiza dados do perfil do usuário (avatar, nome, etc.).
 * @param {number} userId
 * @param {object} data - Campos a atualizar
 */
export async function atualizarUsuario(userId, data) {
    return apiFetch(`${BASE}/users/${userId}`, {
        method: 'PUT',
        body: JSON.stringify(data),
    });
}

/**
 * Altera a senha do usuário.
 * @param {number} userId
 * @param {string} currentPassword
 * @param {string} newPassword
 */
export async function atualizarSenha(userId, currentPassword, newPassword) {
    return apiFetch(`${BASE}/users/${userId}/password`, {
        method: 'PUT',
        body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
    });
}

// =============================================================================
// SNAPSHOTS DE EVOLUÇÃO — Pontos de restauração por nível
// =============================================================================

/**
 * Lista todos os snapshots de evolução de um personagem.
 * @param {number} personagemId
 * @returns {Promise<Array<{id, character_id, nivel, created_at}>>}
 */
export async function listarSnapshots(personagemId) {
    return apiFetch(`${BASE}/personagens/${personagemId}/snapshots`);
}

/**
 * Cria um snapshot manual para o nível indicado.
 * @param {number} personagemId
 * @param {number} nivel
 */
export async function criarSnapshotManual(personagemId, nivel) {
    return apiFetch(`${BASE}/personagens/${personagemId}/snapshots`, {
        method: 'POST',
        body: JSON.stringify({ nivel }),
    });
}

/**
 * Restaura o personagem ao estado pré-evolução do nível indicado.
 * Reverte tudo que foi feito a partir daquele nível.
 * @param {number} personagemId
 * @param {number} nivel - O nível a partir do qual reverter (ex: 3 = voltar ao estado pré-nível 3)
 * @param {number} [userId]
 */
export async function restaurarSnapshot(personagemId, nivel, userId = 0) {
    return apiFetch(`${BASE}/personagens/${personagemId}/snapshots/${nivel}/restaurar`, {
        method: 'POST',
        body: JSON.stringify({ user_id: userId }),
    });
}
