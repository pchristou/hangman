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
 *  * - Fix a11y issues
 *  * - Make the new game button work
 *  * - Choose a random word from a list of words
 *  * - Confetti drop when the user wins
 *  */
export default function App() {

    // State
    const [currentWord, setCurrentWord] = useState('react'.toUpperCase());
    const [guessedLetters, setGuessedLetters] = useState([]);

    // Derived
    const lastGuessIncorrect = guessedLetters.length > 0 && !currentWord.includes(guessedLetters[guessedLetters.length - 1]);
    const word = currentWord.split('').map(char => guessedLetters.includes(char) ? char : '')
    const wrongGuessCount = guessedLetters.reduce((acc, curr) => !currentWord.includes(curr) ? acc + 1 : acc, 0);
    const gameIsLost = wrongGuessCount === (languages.length - 1);
    const gameIsWon = currentWord.split('').every(char => guessedLetters.includes(char));

    const guessLetter = (guess) => {
        gameInProgress() && setGuessedLetters((prevLetters) => prevLetters.includes(guess) ? [...prevLetters] : [...prevLetters, guess]);
    }

    function restart() {
        setGuessedLetters([]);
    }

    function gameInProgress() {
        return (!gameIsLost && !gameIsWon);
    }

    return (
        <div className='assembly-end-game'>
            <div className='center'>
                <Header/>
                <StatusBar won={gameIsWon} lost={gameIsLost} isLastGuessIncorrect={lastGuessIncorrect} language={wrongGuessCount >= 1 && languages[wrongGuessCount-1].name} />
                <LanguageBar wrongGuessCount={wrongGuessCount}/>
                <Word word={word}/>
                <Keyboard currentWord={currentWord} guess={guessLetter} guessedLetters={guessedLetters} />
                { !gameInProgress() && <button className="new-game" onClick={restart}>New Game</button> }
            </div>
        </div>
    )
}
