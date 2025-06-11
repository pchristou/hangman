import { createRoot } from 'react-dom/client'
import { JSX } from 'react'
import './index.css'
import AssemblyEndGame from './6-assembly-endgame/App.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
        <AssemblyEndGame />
)
