import { languages } from '../data/languages.js';
import { clsx } from 'clsx';

export default function LanguageBar({ wrongGuessCount }) {
    const pills = languages.map(((language, i) => {
        return <div key={language.name} className={clsx({lost: i < wrongGuessCount})} style={{backgroundColor: language.backgroundColor, color: language.color}}>
            { language.name }
        </div>
    }));

    return (
        <section className='language-bar-wrapper'>
            <div className='pills'>
                { pills }
            </div>
        </section>
    )
}
