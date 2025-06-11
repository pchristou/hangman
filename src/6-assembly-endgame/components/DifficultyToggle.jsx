import { Difficulty } from '../const.js';

export default function DifficultyToggle({ difficulty, setDifficulty }) {
    return (
        <div className='difficulty-toggle'>
            <span>Normal</span>
            <label className="toggle">
                <input
                    type="checkbox"
                    id="btnToggle"
                    name="btnToggle"
                    checked={difficulty === Difficulty.HARD}
                    onChange={(e) => setDifficulty(e.target.checked ? Difficulty.HARD : Difficulty.NORMAL)}
                />
                <span className="slider"></span>
            </label>
            <span>Hard</span>
        </div>
    )
}
