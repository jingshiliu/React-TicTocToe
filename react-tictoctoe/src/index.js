import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css"


function Cell({ state, cellId, tictoctoe }) {
  return (
    <div className="cell" onClick={ e => {
      if (state === '' && tictoctoe.winningMessage === '') {
        tictoctoe.updateBoard(cellId)
      }
    }}>
      {state}
    </div>
  )
}

function TicTocToe() {
  const [turn, setTurn] = useState('x');
  const [winningMessage, setWinningMessage] = useState('');
  const [board, setBoard ]= useState(Array(9).fill(''));
  const [scoreHistory, setScoreHistory] = useState([0, 0])

  const restartGame = ()=>{
    setBoard(Array(9).fill(''))
    setWinningMessage('')
  }

  const updateScore = ()=>{
    if(getTurn() === 'o')
      setScoreHistory([scoreHistory[0], scoreHistory[1]+1])
    else
      setScoreHistory([scoreHistory[0]+1, scoreHistory[1]])
  }
  const changeTurn = () => {
    if (turn === 'o')
      setTurn('x')
    else
      setTurn('o')
  }
  const getTurn = () => {
    return turn
  }

  const updateBoard = (cellId)=>{
    let updatedBoard = [...board]
    updatedBoard[cellId] = getTurn()
    changeTurn()
    setBoard(updatedBoard)

    checkWinner(cellId, updatedBoard)
  }

  const checkWinner = (cellId, updatedBoard) => {
    const combinations = {
      horizontal: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      vertical: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonal: [
        [0, 4, 8],
        [2, 4, 6]
      ]
    }
    for(let combination in combinations){
      for(let row of combinations[combination]){
        if(row.includes(cellId)){
          if(updatedBoard[row[0]] === updatedBoard[row[1]] && updatedBoard[row[1]] === updatedBoard[row[2]]){
            setWinningMessage(`${updatedBoard[row[0]]} wins the game`)
            updateScore()
            break;
          }
        }
      }
    }
  }

  return (
    <div id="tictoctoe">
      <h1>Tic Toc Toe</h1>
      <h3>X   vs    O  </h3>
      <h3>{scoreHistory[0]} vs {scoreHistory[1]}</h3>
      <div id="gameBoard">
        {
          board.map((cell, index) =>
            <Cell state={cell} cellId={index} key={index} tictoctoe={{winningMessage, updateBoard}} />
          )
        }
      </div>
      <button onClick={restartGame}>New Game</button>
      <h2>{winningMessage}</h2>
    </div>
  )
}
const rootHtmlElement = document.querySelector('#root')
const root = ReactDOM.createRoot(rootHtmlElement)
root.render(<TicTocToe />)
