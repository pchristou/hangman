import { Difficulty, HARD_THRESHOLD } from '../const.js';

export function getRandomWord(wordList, difficulty) {
    // logic for difficulty
    const words = difficulty === Difficulty.NORMAL ? wordList : getDifficultWords(wordList);
    return words[Math.floor(Math.random() * words.length)].word.replace('-', '');
}

function getDifficultWords(wordList) {
    return wordList.filter(wordEntry => {
        const frequency = wordEntry.tags[0].replace('f:', '');
        return frequency < HARD_THRESHOLD;
    })
}

export function getFarewellText(language) {
    const options = [
        `Farewell, ${language}`,
        `Adios, ${language}`,
        `R.I.P., ${language}`,
        `We'll miss you, ${language}`,
        `Oh no, not ${language}!`,
        `${language} bites the dust`,
        `Gone but not forgotten, ${language}`,
        `The end of ${language} as we know it`,
        `Off into the sunset, ${language}`,
        `${language}, it's been real`,
        `${language}, your watch has ended`,
        `${language} has left the building`
    ];

    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}
