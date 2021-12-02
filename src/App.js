import { useState } from 'react'
import { getNextBestMove } from './util';
import './App.css';

function App() {
  const [board, setBoard] = useState([[' ', ' ', ' '], [' ', ' ', ' '], [' ', ' ', ' ']])
  const [winner, setWinner] = useState(null)
  const [highlight, setHighlight] = useState('')

  const play = (row, col) => {
    if (board[row][col] === ' ' && winner === null) {
      const tmpBoard = []
      for (let i = 0; i < board.length; i++) {
        tmpBoard.push([...board[i]])
      }
      tmpBoard[row][col] = 1

      let winner = getWinner(tmpBoard)
      if (winner !== null) {
        setBoard(tmpBoard)
        setWinner(winner)
      } else {
        const nextBestMove = getNextBestMove(tmpBoard)
        tmpBoard[nextBestMove.row][nextBestMove.col] = 2
        setBoard(tmpBoard)

        winner = getWinner(tmpBoard)
        if (winner !== null) {
          highlightWinningCells(tmpBoard)
          setWinner(winner)
        }
      }

    }
  }

  const getWinner = (board) => {
    let rows = [0, 0, 0]
    let cols = [0, 0, 0]
    let mainDiag = 0
    let offDiag = 0
    let numFilled = 0

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== ' ') {
          numFilled += 1
          const plusOrMinus = board[i][j] === 1 ? 1 : -1
          rows[i] += plusOrMinus
          cols[j] += plusOrMinus
          if (i === j) mainDiag += plusOrMinus
          if (i === (2 - j)) offDiag += plusOrMinus
        }
      }
    }

    if (
      rows.some(val => val === 3) ||
      cols.some(val => val === 3) ||
      mainDiag === 3 ||
      offDiag === 3
    ) {
      return 1
    } else if (
      rows.some(val => val === -3) ||
      cols.some(val => val === -3) || 
      mainDiag === -3 ||
      offDiag === -3
    ) {
      return -1
    } else if (numFilled === 9) {
      return 0
    } else {
      return null
    }

  }

  const highlightWinningCells = (board) => {
    console.log(`highlightWinningCells()`)
    let rows = [0, 0, 0]
    let cols = [0, 0, 0]
    let mainDiag = 0
    let offDiag = 0

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
        if (board[i][j] !== ' ') {
          const plusOrMinus = board[i][j] === 1 ? 1 : -1
          rows[i] += plusOrMinus
          cols[j] += plusOrMinus
          if (i === j) mainDiag += plusOrMinus
          if (i === (2 - j)) offDiag += plusOrMinus
        }
      }
    }

    if (rows.some(val => val === -3)) {
      setHighlight(`row${rows.findIndex(val => val === -3)}`)
    } else if (cols.some(val => val === -3)) {
      setHighlight(`col${cols.findIndex(val => val === -3)}`)
    } else if (mainDiag === -3) {
      setHighlight(`mainDiag`)
    } else if (offDiag === -3) {
      setHighlight(`offDiag`)
    }
  }

  const getHighlightStyle = (i, j) => {
    if (highlight.substring(0, 3) === 'row') {
      return i === Number(highlight.charAt(3))
    } else if (highlight.substring(0, 3) === 'col') {
      return j === Number(highlight.charAt(3))
    } else if (highlight === 'mainDiag') {
      return i === j
    } else if (highlight === 'offDiag') {
      return i === (2 - j)
    } else {
      return false
    }
  }

  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <div className="board">
        <table>
          <tbody>
            {board.map((row, i) => (
              <tr key={`row${i}`}>
              {row.map((cell, j) => (
                <td 
                style={{
                  backgroundColor: highlight !== '' && getHighlightStyle(i, j) ? 'gray' : null,
                  color: highlight !== '' && getHighlightStyle(i, j) ? 'white' : null,
                }}
                className="cell" key={`col${j}`} onClick={() => {
                  play(i, j)
                }}>
                  {cell === 1 ? 'X' : cell === 2 ? 'O' : ' '}
                </td>
              ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {winner === 1 && <h2>You win!</h2>}
      {winner === -1 && <h2>You lose!</h2>}
      {winner === 0 && <h2>Tie!</h2>}
      {winner !== null && <button onClick={() => window.location.reload()}>Play again</button>}
    </div>
  );
}

export default App;
