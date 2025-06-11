import { clsx } from 'clsx';
import { getFarewellText } from '../utils/utils.js';

export function StatusBar({ isGameInProgress, won, lost, isLastGuessIncorrect, language }) {

    const gameClasses = clsx('status-bar', {
        'status-bar-incorrect': isLastGuessIncorrect,
        'status-bar-won': won,
        'status-bar-lost': lost,
    })

    function renderText() {
        if(isLastGuessIncorrect && isGameInProgress) {
            return <span>{getFarewellText(language)}</span>;
        }

        if(won) {
            return <>
                <span>You win!</span>
                <span>Well done! 🎉</span>
            </>
        } else if(lost) {
            return <>
                <span>Game over!</span>
                <span>You lose! Better start learning Assembly 😭</span>
            </>
        }
    }

    return (
        <section className='status-bar' aria-live='polite' role='status'>
            <div className={gameClasses}>
                {renderText()}
            </div>
        </section>
    )
}
