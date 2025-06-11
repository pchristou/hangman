export default function Keyboard() {

    const alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(65 + n));
    const buttons = alphabet.map((char) => <button key={char} className='key'>{char}</button>);

    return (
        <section>
            <div className="keyboard">
                { buttons }
            </div>
        </section>
    )
}
