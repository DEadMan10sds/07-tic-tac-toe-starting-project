import { useState } from "react";

export default function Player({ name, changeName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  function handleClickEditName() {
    setIsEditing((editing) => !editing);
    if (isEditing) changeName(symbol, playerName);
  }

  function handleSavePlayerName(event) {
    setPlayerName(() => event.target.value);
  }

  let playerNameHTML = <span className="player-name">{playerName}</span>;
  if (isEditing)
    playerNameHTML = (
      <input
        type="text"
        required
        defaultValue={playerName}
        onChange={handleSavePlayerName}
      />
    );

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerNameHTML}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleClickEditName}>
        {isEditing ? "Save" : "Edit"}
      </button>
    </li>
  );
}
