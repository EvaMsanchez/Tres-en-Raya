import { WINNER_COMBOS } from "../constants.js"

// Comprobamos si hay ganador
export const checkWinnerFrom = (boardToCheck) => {
    // Revisamos todas las combinaciones ganadoras para ver si X u O ganó
    for (const combo of WINNER_COMBOS)
    {
    const[a, b, c] = combo

    if ( boardToCheck[a] && boardToCheck[a]==boardToCheck[b] && boardToCheck[a]==boardToCheck[c])
    {
        return boardToCheck[a] 
    }
    }

    // Si no hay ganador
    return null
}


export const checkEndGame = (newBoard) => {
    // Se revisa si no hay empate, para ello no debe haber espacios vacíos en el tablero
    return newBoard.every((square) => square != null)
}