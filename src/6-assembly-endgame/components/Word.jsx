import { clsx } from 'clsx';

export default function Word({ word, gameIsLost, guessedLetters }) {

    const letters = word.map((letter, i) => {
        const letterStyle = clsx('letter', { reveal: gameIsLost && !guessedLetters.includes(letter) })
        return <span key={i} className={letterStyle}>
            {letter}
        </span>
        }
    )

    return (
        <>
        <section className='word' >
            {letters}
        </section>
        <section
            className='sr-only'
            aria-live='polite'
            role='status'
        >
            <p>Current word: {word.map(letter =>
                letter === "" ? "blank" : letter)}</p>
        </section>
            </>
    )
}
