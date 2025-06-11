import {clsx } from 'clsx';

export default function Keyboard({ alphabet, currentWord, gameInProgress, guess, guessedLetters }) {

    const buttons = alphabet.map((char) => {

        const isGuessed = guessedLetters.includes(char);
        const correctGuess = isGuessed && currentWord.includes(char);
        const incorrectGuess = isGuessed && !currentWord.includes(char);
        let style = clsx({ right: correctGuess, wrong: incorrectGuess });

        return <button
            aria-label={`Letter ${char}`}
            aria-disabled={!gameInProgress}
            disabled={!gameInProgress()}
            onClick={() => guess(char)}
            key={char}
            className={style}>
            {char.toUpperCase()}
        </button>
    });

    return (
        <section>
            <div className="keyboard">
                { buttons }
            </div>
        </section>
    )
}
