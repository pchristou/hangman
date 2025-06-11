import { clsx } from 'clsx';

export default function Word({ word, gameIsLost, currentWord }) {

    const letters = word.map((letter, i) => {
        const letterStyle = clsx('letter', { reveal: gameIsLost && letter === "" })
        return <span key={i} className={letterStyle}>
            {getLetter(letter, i)}
        </span>
        }
    )

    function getLetter(letter, index) {
        return !gameIsLost
            ? letter
            : letter === ""
                ? currentWord[index]
                : letter
    }

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
