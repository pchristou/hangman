export default function Keyboard({ guess }) {

    const alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(65 + n));
    const buttons = alphabet.map((char) => <button onClick={() => guess(char)} key={char} className='key'>{char}</button>);

    return (
        <section>
            <div className="keyboard">
                { buttons }
            </div>
        </section>
    )
}
