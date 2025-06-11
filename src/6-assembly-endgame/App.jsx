import Header from './components/Header.jsx';
import { StatusBar } from './components/StatusBar.jsx';
import LanguageBar from './components/LanguageBar.jsx';
import Word from './components/Word.jsx';
import { useCallback, useEffect, useRef, useState } from 'react';
import Keyboard from './components/Keyboard.jsx';
import { languages } from './data/languages.js';
import Confetti from 'react-confetti';
import { getWords } from './data/api.js';

/**
 *  * Backlog:
 *  * - Fix a11y issues
 *  */
export default function App() {

    // State
    const [currentWord, setCurrentWord] = useState(() => null);
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [lastKeyStroke, setLastKeyStroke] = useState(() => '');

    // Refs
    // The ref allows us to avoid rebinding the keyPressCb event handler every time guessedLetters changes = better performance
    const guessedLettersRef = useRef(guessedLetters);

    // Derived
    const wrongGuessCount = guessedLetters.reduce((acc, curr) => !currentWord?.includes(curr) ? acc + 1 : acc, 0);
    const gameIsLost = wrongGuessCount === (languages.length - 1);
    const gameIsWon = currentWord?.split('').every(char => guessedLetters.includes(char));
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1];
    const lastGuessIncorrect = lastGuessedLetter && !currentWord?.includes(lastGuessedLetter);
    const word = currentWord?.split('').map(char => (gameIsLost || guessedLetters.includes(char)) ? char : '')
    const guessesRemaining = (languages.length - 1) - wrongGuessCount;
    const alphabet = [...Array(26).keys()].map((n) => String.fromCharCode(97 + n));
    const gameInProgress = !gameIsLost && !gameIsWon;

    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    useEffect(() => {
        getWords(randomLetter).then(w => {
            const word = w[0].word.replace('-', '')
            setCurrentWord(prevCurrentWord => { return word });
        });
    }, []);

    useEffect(() => {
        guessedLettersRef.current = guessedLetters;
    }, [guessedLetters]);

    const guessLetter = (guess) => {
        setGuessedLetters((prevLetters) => prevLetters.includes(guess) ? prevLetters : [...prevLetters, guess]);
    }

    const restart = () => {
        setLastKeyStroke('');
        setGuessedLetters([]);

        getWords(randomLetter).then(w => {
            setCurrentWord(_ => {
                return w[Math.floor(Math.random() * w.length)].word.replace('-', ''); // e.g. well-being becomes wellbeing
            });
        });
    }


    const keyPressCb = useCallback((event) => {
        const keyPress = event.key.toLowerCase();

        if(!guessedLettersRef.current.includes(keyPress)) {
            setLastKeyStroke(keyPress);
        }
    }, []);

    if(!gameInProgress && lastKeyStroke === 'enter') {
        restart();
    }

    if(alphabet.includes(lastKeyStroke) && gameInProgress) {
        if(!guessedLetters.includes(lastKeyStroke)) {
            guessLetter(lastKeyStroke);
        }
    }

    useEffect(() => {
        document.addEventListener('keypress', keyPressCb);
        return () => document.removeEventListener('keypress', keyPressCb);
    }, []);

    return currentWord && (
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
                    isGameInProgress={gameInProgress}
                    won={gameIsWon}
                    lost={gameIsLost}
                    isLastGuessIncorrect={lastGuessIncorrect}
                    language={wrongGuessCount >= 1 && languages[wrongGuessCount - 1]?.name}/>
                <LanguageBar wrongGuessCount={wrongGuessCount}/>
                <Word word={word} gameIsLost={gameIsLost} guessedLetters={guessedLetters} />
                <Keyboard alphabet={alphabet} gameInProgress={gameInProgress} currentWord={currentWord} guess={guessLetter}
                          guessedLetters={guessedLetters}/>
                {!gameInProgress && <button className="new-game" onClick={() => restart()}>{'New Game <Enter>'}</button>}
                {gameIsWon && <Confetti recycle={false}
                                        numberOfPieces={1000}/>}
            </div>
        </div>
    )
}
