/**
 * api.js — Capa d'accés a la PokéAPI.
 * Aquest és l'ÚNIC fitxer que fa crides fetch.
 * Implementa les funcions; la resta de mòduls les importaran.
 */

const BASE_URL = 'https://pokeapi.co/api/v2';

/**
 * Retorna la llista dels primers 151 Pokémon.
 * Endpoint: GET /pokemon?limit=151
 * @returns {Promise<Array<{name: string, url: string}>>}
 */
async function fetchPokemonList() {
    // TODO
}

/**
 * Retorna les dades completes d'un Pokémon.
 * Endpoint: GET /pokemon/{idOrName}
 * @param {string|number} idOrName
 * @returns {Promise<Object>}
 */
async function fetchPokemon(idOrName) {
    // TODO
}

/**
 * Retorna les dades d'espècie (inclou URL cadena evolutiva).
 * Endpoint: GET /pokemon-species/{id}
 * @param {number} id
 * @returns {Promise<Object>}
 */
async function fetchSpecies(id) {
    // TODO
}

/**
 * Retorna la cadena evolutiva donada la seva URL completa.
 * @param {string} url
 * @returns {Promise<Object>}
 */
async function fetchEvolutionChain(url) {
    // TODO
}