import Header from './components/Header.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import LanguageBar from './components/LanguageBar.jsx';
import Word from './components/Word.jsx';
import { useEffect, useState } from 'react';
import Keyboard from './components/Keyboard.jsx';
import { languages } from './data/languages.js';
import Confetti from 'react-confetti';
import { getRandomWord } from './utils/utils.js';

/**
 *  * Backlog:
 *  * - Fix a11y issues
 *  */
export default function App() {

    // State
    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);

    // Derived
    const wrongGuessCount = guessedLetters.reduce((acc, curr) => !currentWord.includes(curr) ? acc + 1 : acc, 0);
    const gameIsLost = wrongGuessCount === (languages.length - 1);
    const gameIsWon = currentWord.split('').every(char => guessedLetters.includes(char));
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const lastGuessIncorrect = lastGuessedLetter && !currentWord.includes(lastGuessedLetter);
    const word = currentWord.split('').map(char => (gameIsLost || guessedLetters.includes(char)) ? char : '')
    const guessesRemaining = (languages.length - 1) - wrongGuessCount;

    document.addEventListener('keypress', keyPressCb);

    useEffect(() => {
        return () => document.removeEventListener('keypress', keyPressCb);
    });

    const guessLetter = (guess) => {
        setGuessedLetters((prevLetters) => prevLetters.includes(guess) ? prevLetters : [...prevLetters, guess]);
    }

    const alphabet = () => {
        return [...Array(26).keys()].map((n) => String.fromCharCode(97 + n));
    }

    function keyPressCb(event) {

        const keyPress = event.key;

        if(!gameInProgress()) {
            if(keyPress === 'enter') {
                restart();
            }
        }

        if(alphabet().includes(keyPress)) {
            // prevent duplicates
            if(!guessedLetters.includes(keyPress)) {
                guessLetter(event.key);
            }
        }
    }

    function restart() {
        setGuessedLetters([]);
        setCurrentWord(getRandomWord());
    }

    function gameInProgress() {
        return (!gameIsLost && !gameIsWon);
    }

    return (
        <div className='assembly-end-game'>
            <div className='center'>

                <section
                    className='sr-only'
                    aria-live='polite'
                    role='status'
                >
                    <p>{
                        lastGuessIncorrect
                        ? `Wrong, ${guessedLetters[guessedLetters.length - 1]} is not there`
                        : `Correct, ${guessedLetters[guessedLetters.length - 1]} is there`
                    }

                        {`${guessesRemaining} lives remaining`}

                    </p>
                </section>

                <Header/>
                <StatusBar
                    isGameInProgress={gameInProgress()}
                    won={gameIsWon}
                    lost={gameIsLost}
                    isLastGuessIncorrect={lastGuessIncorrect}
                    language={wrongGuessCount >= 1 && languages[wrongGuessCount - 1].name}/>
                <LanguageBar wrongGuessCount={wrongGuessCount}/>
                <Word word={word} gameIsLost={gameIsLost} guessedLetters={guessedLetters} />
                <Keyboard alphabet={alphabet()} gameInProgress={gameInProgress} currentWord={currentWord} guess={guessLetter}
                          guessedLetters={guessedLetters}/>
                {!gameInProgress() && <button className="new-game" onClick={restart}>{'New Game <Enter>'}</button>}
                {gameIsWon && <Confetti recycle={false}
                                        numberOfPieces={1000}/>}
            </div>
        </div>
    )
}
