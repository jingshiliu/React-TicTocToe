import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./style.css"


function Cell({ state, cellId, tictoctoe }) {
  const [cellState, setCellState] = useState(state)

  return (
    <div className="cell" onClick={ e => {
      if (cellState === '' && tictoctoe.winningMessage === '') {
        let tempCellState = tictoctoe.getTurn()
        setCellState(tempCellState)
        tictoctoe.changeTurn()
        tictoctoe.updateBoard(cellId, tempCellState)
        tictoctoe.checkWinner(cellId, tempCellState)
      }
    }}>
      {cellState}
    </div>
  )
}

function TicTocToe() {
  const [turn, setTurn] = useState('x');
  const [board, setBoard] = useState(Array(9).fill(''));
  const [winningMessage, setWinningMessage] = useState('');

  const changeTurn = () => {
    if (turn === 'o')
      setTurn('x')
    else
      setTurn('o')
  }
  const getTurn = () => {
    return turn
  }

  const updateBoard = (cellId, cellState)=>{
    let tempBoard = [...board]
    tempBoard[cellId] = cellState
    setBoard(tempBoard)
    console.log(tempBoard)
    return tempBoard
  }

  const checkWinner = (cellId, cellState) => {
    console.log(1)
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
    console.log(board)
    for (let index of combinations.horizontal.at([Math.floor[cellId / 3]])){
      if (board[index] !== cellState)
        return false
    }
      

    for (let index of combinations.vertical.at([cellId % 3]))
      if (board[index] !== cellState)
        return false

    if (cellId % 2 === 0) {
      if (cellId in combinations.diagonal.at(0))
        for (let index of combinations.diagonal.at(0)) {
          if (board[index] !== cellState)
            return false
        }
      if (cellId in combinations.diagonal.at(1))
        for (let index of combinations.diagonal.at(1)) {
          if (board[index] !== cellState)
            return false
        }
    }

    // work on this function
    setWinningMessage(`${cellState} wins the game`)
  }

  return (
    <div id="tictoctoe">
      <h1>Tic Toc Toe</h1>
      <h2>{winningMessage}</h2>
      <div id="gameBoard">
        {
          board.map((cell, index) =>
            <Cell state={cell} cellId={index} key={index} tictoctoe={{ getTurn, changeTurn, winningMessage, checkWinner, updateBoard }} />
          )
        }
      </div>

    </div>
  )
}
const rootHtmlElement = document.querySelector('#root')
const root = ReactDOM.createRoot(rootHtmlElement)
root.render(<TicTocToe />)