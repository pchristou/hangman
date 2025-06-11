import {clsx } from 'clsx';

export default function Keyboard({ currentWord, guess, guessedLetters }) {

    const alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(65 + n).toUpperCase());
    const buttons = alphabet.map((char) => {

        const isGuessed = guessedLetters.includes(char);
        const correctGuess = isGuessed && currentWord.includes(char);
        const incorrectGuess = isGuessed && !currentWord.includes(char);
        let style = clsx({ right: correctGuess, wrong: incorrectGuess });

        return <button onClick={() => guess(char.toUpperCase())} key={char} className={style}>{char}</button>
    });

    return (
        <section>
            <div className="keyboard">
                { buttons }
            </div>
        </section>
    )
}
