import { languages } from '../data/languages.js';

export default function LanguageBar() {
    const pills = languages.map(language => {
        return <div key={language.name} style={{backgroundColor: language.backgroundColor, color: language.color}}>
            { language.name }
        </div>
    })

    return (
        <div className='language-bar-wrapper'>
            <div className='pills'>
                { pills }
            </div>
        </div>
    )
}
