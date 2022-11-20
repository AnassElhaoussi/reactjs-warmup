import { useState, useRef, useEffect } from 'react'
import './App.css'
import { WrapperStyle, squareStyle, rowStyle } from './style'

function App() {
  const guessesCount = useRef(0)
  const maxNumOfGuesses = 2
  const [grid, setGrid] = useState([
    [0,1,1,3,1],
    [1,0,1,0,3],
    [0,0,1,2,2],
  ])
  const revealedArray = new Array(grid.length)
  .fill("").map(() =>  new Array(grid[0].length)
  .fill(false))
  const [revealedGrid, setRevealedGrid] = useState(revealedArray)
  const [guesses, setGuesses] = useState([])

  useEffect(() => {
    const checkCorrectGuesses = guesses
    .every((val, i, arr) => val.el === arr[0].el)
    if(maxNumOfGuesses === guessesCount.current) {
      setTimeout(() => {
        setRevealedGrid(revealedArray)
        guessesCount.current = 0
        if(checkCorrectGuesses) {
          alert('you won')
          setGrid(
            grid.map((row) => row
            .filter(item => guesses.map(({el, rowId, colId}) => {
              return item !== grid[rowId][colId]
            })).map((square) => square))
          )

          console.log(grid)
        }
        setGuesses([])
      }, 2000)
    }
  })

  
  const revealGridItem = (rowId, colId) => {
    const newRevealedGrid = [...revealedGrid]
    const newGuess = [...guesses, {
       el: grid[rowId][colId],
       rowId,
       colId
    }]
    if(guessesCount.current < maxNumOfGuesses) {
      newRevealedGrid[rowId][colId] = true
      setRevealedGrid(newRevealedGrid)
      guessesCount.current++
      setGuesses(newGuess)
    }
  }

  return (
    <div style={WrapperStyle}>
      {grid.map((row, rowId) => {
        return (
          <div style={rowStyle}>
            {row.map((squareNumber, colId) => {
              return (
                <div style={squareStyle}
                onClick={() => revealGridItem(rowId, colId)}
                >
                  <span style={{fontSize: '2rem'}}>
                    {revealedGrid[rowId][colId] && squareNumber}
                  </span>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

export default App
