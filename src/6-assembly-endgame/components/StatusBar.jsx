import { getFarewellText } from '../utils/utils.js';

export function StatusBar({ gameState, isLastGuessIncorrect, language }) {

    let status = null;

    if(isLastGuessIncorrect) {
        status = <div className="status-bar status-bar-incorrect">
            <span>{getFarewellText(language)}</span>
        </div>;
    } else {

        switch (gameState) {
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
    }

    return (
        <section className='status-bar'>
            {status}
        </section>
    )
}
