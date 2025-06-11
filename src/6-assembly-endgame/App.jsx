import Header from './components/Header.jsx';

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
    return (
        <div className='assemblyEndGame'>
            <Header />
        </div>
    )
}
