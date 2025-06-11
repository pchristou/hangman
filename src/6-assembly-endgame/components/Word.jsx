export default function Word({ word }) {

    const letters = word.map((letter, i) =>
        <span key={i} className='letter'>
            {letter}
        </span>
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
