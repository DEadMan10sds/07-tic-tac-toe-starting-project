export default function GameOver({ winner = null, onRestart }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      <p>{winner ? `${winner} won!` : "Its a draw"} </p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
