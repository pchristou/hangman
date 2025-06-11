export function StatusBar({ gameState }) {

    let status = null;

    switch (gameState) {
        case 'incorrect':
            status = <div className="status-bar status-bar-incorrect">
                <span>“Farewell HTML & CSS” 🫡</span>
            </div>;
            break;
        case 'won':
            status = <div className="status-bar status-bar-won">
                <span className="title">You win!</span>
                <span>Well done! 🎉</span>
            </div>;
            break;
        case 'lost':
            status = <div className="status-bar status-bar-lost">
                <span className="title">Game over!</span>
                <span>You lose! Better start learning Assembly 😭</span>
            </div>;
            break;
        default:
            status = null;
    }

    return (
        <section className='status-bar'>
            {status}
        </section>
    )
}
