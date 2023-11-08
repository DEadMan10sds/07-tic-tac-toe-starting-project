export default function GameBoard({ onClickSquare, board }) {
  /*const [gameBoard, setGameBoard] = useState(initialGameBoard);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedBoard = [...prevGameBoard.map((row) => [...row])];
      if (!updatedBoard[rowIndex][colIndex])
        updatedBoard[rowIndex][colIndex] = activePlayerSymbol;
      return updatedBoard;
    });
    onClickSquare();
  }*/

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((space, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      onClick={() => onClickSquare(rowIndex, colIndex)}
                      disabled={space}
                    >
                      {space}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
