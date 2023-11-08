import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winnning-combinations";
import GameOver from "./components/GameOver";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function getWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquare &&
      firstSquare === secondSquare &&
      firstSquare === thirdSquare
    )
      winner = players[firstSquare];
  }

  return winner;
}

function changePlayer(gameTurns) {
  let currentPlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") currentPlayer = "O";

  return currentPlayer;
}

function App() {
  const [players, setPlayers] = useState({ x: "Player 1", o: "Player 1" });
  const [gameTurns, setGameTurns] = useState([]);
  const currentPlayer = changePlayer(gameTurns);
  let gameBoard = [...initialGameBoard.map((arr) => [...arr])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  const winner = getWinner(gameBoard, players);

  function handleClickSquare(row, col) {
    setGameTurns((prevTurns) => {
      const currentPlayer = changePlayer(prevTurns);

      const newTurns = [
        { player: currentPlayer, square: { row, col } },
        ...prevTurns,
      ];
      return newTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerName(symbol, newName) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name={players.x}
            changeName={handlePlayerName}
            symbol="X"
            isActive={currentPlayer === "X"}
          />
          <Player
            name={players.o}
            changeName={handlePlayerName}
            symbol="O"
            isActive={currentPlayer === "O"}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onClickSquare={handleClickSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
