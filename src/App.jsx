import { useState } from "react"
import confetti from "canvas-confetti"

import { Square } from "./components/Square.jsx"
import { TURNS } from "./constants.js"
import { checkWinnerFrom, checkEndGame } from "./logic/board.js"
import { WinnerModal } from "./components/WinnerModal.jsx"


function App() 
{
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn] = useState(TURNS.X)

  // null: no hay ganador ni empate, false: hay un empate
  const [winner, setWinner] = useState(null)


  // Resetear el juego
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  // Actualizar el tablero
  const updateBoard = (index) => {
    // No actualizamos la posición si ya tiene algo y no está vacía, o también si hay ganador
    if (board[index] || winner) return

    // Actualizar el tablero
    const newBoard = [...board] // copia de board
    newBoard[index] = turn
    setBoard(newBoard)

    // Cambiar el turno
    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // Revisar si hay ganador
    const newWinner = checkWinnerFrom(newBoard)
    if (newWinner)
    {
      confetti()
      setWinner(newWinner)
    }
    else if (checkEndGame(newBoard))
    {
      setWinner(false) // Empate
    }
      
  }

  return (
    <main className="board">
      <h1>Tres en Raya</h1>
      <button onClick={ resetGame }>Reset del juego</button>
      <section className="game">
        {
          board.map((square, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {square}
              </Square>
            ) 
          })
        }
      </section>

      <section className="turn">
        <Square isSelected={turn == TURNS.X}>     
          {TURNS.X}
        </Square>
        <Square isSelected={turn == TURNS.O}>     
          {TURNS.O}
        </Square>
      </section>

      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
