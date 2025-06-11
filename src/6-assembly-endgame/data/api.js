import { stripPrefix } from '../utils/utils.js';

const prefix = 'https://api.datamuse.com/words?';

/**
 * Get our word list
 * @param randLetter
 * @returns {Promise<any>}
 */
export function getWords (randLetter) {
    return fetch(`${prefix}sp=${randLetter}*???&md=f`)
    .then(response => response.json())
    .then(data => {
        return data;
    })
    .catch(error => {
        console.error('Error fetching from Datamuse:', error);
        return error;
    });
}

/**
 * Take the first definition by default
 * @param word
 * @returns {Promise<* | string>}
 */
export function getDefinitionFor(word) {
    return fetch(`${prefix}sp=${word}&md=d&max=1`)
    .then(response => response.json())
    .then(data => {
        return data[0]?.defs ? stripPrefix(data[0].defs[0]) : `How embarrassing, we don't have a definition for ${word} yet`;
    })
    .catch(error => {
        console.error('Error fetching definition from Datamuse:', error);
        return 'error';
    });
}

