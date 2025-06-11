export default function Word({ word }) {

    const letters = word.map((letter, i) =>
        <span key={i} className='letter'>
            {letter}
        </span>
    )

    return (
        <section className='word'>
        {letters}
        </section>
    )
}
