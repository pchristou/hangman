import Header from './components/Header.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import LanguageBar from './components/LanguageBar.jsx';
import Word from './components/Word.jsx';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard.jsx';

/**
 * Project planning:
 *
 * Questions to ask yourself before writing any code:
 *
 * - What are the main containers of elements I need
 *   in this app?
 *
 * Main/App - to hold everything together
 * Header (title and description of game)
 * Banner
 * Pill - each programming language
 * Guess the letters (Letter Tile)
 * Key stroke (Keyboard Tile)
 *
 * - What values will need to be saved in state vs.
 *   what values can be derived from the state?
 *
 * programmingLanguages (guesses). Based on the length of this, gives us how many lives we have (derived)
 * gameState - empty (no banner), started, won, lost, derived state
 * letters attempted (based on this, can get the difference to determine how many lefts we have left)
 * pill - livesGone = 2, then first 2 will have skull vibes
 * keyboard tile - default, correct, incorrect
 *
 * - How will the user interact with the app? What
 *   events do I need to handle?
 *
 * Button on click
 * Each letter being strokes
 *
 */
export default function App() {

    const [currentWord, setCurrentWord] = useState('react'.toUpperCase());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [gameState, setGameState] = useState(null);

    const guessLetter = (char) => setGuessedLetters((prevLetters) => prevLetters.includes(char) ? [...prevLetters] : [...prevLetters, char]);

    const word = currentWord.split('').map(char => guessedLetters.includes(char) ? char : '')

    const wrongGuessCount = guessedLetters.reduce((acc, curr) => !currentWord.includes(curr) ? acc + 1 : acc, 0);

    if(wrongGuessCount === 8 && gameState !== 'lost') {
        setGameState('lost');
    }

    if(currentWord.split('').every(char => guessedLetters.includes(char)) && gameState !== 'won') {
        setGameState('won');
    }

    return (
        <div className='assembly-end-game'>
            <div className='center'>
                <Header/>
                <StatusBar gameState={gameState}/>
                <LanguageBar wrongGuessCount={wrongGuessCount}/>
                <Word word={word}/>
                <Keyboard currentWord={currentWord} guess={guessLetter} guessedLetters={guessedLetters} />
                <button className="new-game">New Game</button>
            </div>
        </div>
    )
}
