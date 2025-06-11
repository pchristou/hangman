import {clsx } from 'clsx';

export default function Keyboard({ currentWord, guess, guessedLetters }) {

    const alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(65 + n).toLowerCase());
    const buttons = alphabet.map((char) => {

        const defaultState = !guessedLetters.includes(char);
        const correctGuess = guessedLetters.some(letter => currentWord.includes(letter) && char === letter);
        const incorrectGuess = !guessedLetters.some(letter => currentWord.includes(letter) && char === letter);

        let style = defaultState ? clsx({ key: true }) : clsx({ key: true, right: correctGuess, wrong: incorrectGuess });

        return <button onClick={() => guess(char.toLowerCase())} key={char} className={style}>{char}</button>
    });

    return (
        <section>
            <div className="keyboard">
                { buttons }
            </div>
        </section>
    )
}
