export default function Word({ word }) {

    const letters = word.split('').map((letter, i) =>
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
