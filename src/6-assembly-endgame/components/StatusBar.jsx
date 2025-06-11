import { getFarewellText } from '../utils/utils.js';

export function StatusBar({ won, lost, isLastGuessIncorrect, language }) {

    let status = null;

    if(isLastGuessIncorrect) {
        status = <div className="status-bar status-bar-incorrect">
            <span>{getFarewellText(language)}</span>
        </div>;
    } else {
        if(won) {
            status = <div className="status-bar status-bar-won">
                <span className="title">You win!</span>
                <span>Well done! 🎉</span>
            </div>;
        } else if(lost) {
            status = <div className="status-bar status-bar-lost">
                <span className="title">Game over!</span>
                <span>You lose! Better start learning Assembly 😭</span>
            </div>;
        }
    }

    return (
        <section className='status-bar'>
            {status}
        </section>
    )
}
