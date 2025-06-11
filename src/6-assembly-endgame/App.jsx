import Header from './components/Header.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import LanguageBar from './components/LanguageBar.jsx';
import Word from './components/Word.jsx';
import { useState } from 'react';
import Keyboard from './components/Keyboard.jsx';
import { languages } from './data/languages.js';

/**
 *  * Backlog:
 *  *
 *  * - Farewell messages in status section
 *  * - Fix a11y issues
 *  * - Make the new game button work
 *  * - Choose a random word from a list of words
 *  * - Confetti drop when the user wins
 *  */
export default function App() {

    const [currentWord, setCurrentWord] = useState('react'.toUpperCase());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [gameState, setGameState] = useState(null);

    const guessLetter = (guess) => {
        // no previous guess and currentWord does not include
        const incorrectGuess = !guessedLetters.includes(guess) && !currentWord.includes(guess);
        incorrectGuess ? setGameState('incorrect') : setGameState(null);

        !['lost', 'won'].includes(gameState) && setGuessedLetters((prevLetters) => prevLetters.includes(guess) ? [...prevLetters] : [...prevLetters, guess]);
    }

    const word = currentWord.split('').map(char => guessedLetters.includes(char) ? char : '')

    const wrongGuessCount = guessedLetters.reduce((acc, curr) => !currentWord.includes(curr) ? acc + 1 : acc, 0);

    if(wrongGuessCount === (languages.length - 1) && gameState !== 'lost') {
        setGameState('lost');
    }

    if(currentWord.split('').every(char => guessedLetters.includes(char)) && gameState !== 'won') {
        setGameState('won');
    }

    function restart() {
        setGuessedLetters([]);
        setGameState(null);
    }

    return (
        <div className='assembly-end-game'>
            <div className='center'>
                <Header/>
                <StatusBar gameState={gameState} language={languages[wrongGuessCount-1].name} />
                <LanguageBar wrongGuessCount={wrongGuessCount}/>
                <Word word={word}/>
                <Keyboard currentWord={currentWord} guess={guessLetter} guessedLetters={guessedLetters} />
                { ['lost', 'won'].includes(gameState) && <button className="new-game" onClick={restart}>New Game</button> }
            </div>
        </div>
    )
}
