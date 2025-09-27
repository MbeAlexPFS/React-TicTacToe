import { useState } from "react";
import Cell from "./Cell";
import History from "./History";

function Board() {
  function calculate(turnsData) {
    const win_lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let line of win_lines) {
      const set1 = new Set(turnsData[0]);
      const win1 = line.every((num) => set1.has(num));
      const set2 = new Set(turnsData[1]);
      const win2 = line.every((num) => set2.has(num));
      if (win1 || win2) {
        return win1 ? 0 : win2 ? 1 : "draw";
      }
    }
    return "draw";
  }

  function play(id) {
    setTurns((prev) => {
      const copy = prev.map((arr) => [...arr]);
      copy[playing].push(id);

      const winner = calculate(copy);
      const totalMoves = copy[0].length + copy[1].length;

      if (winner !== "draw") {
        setMsg(["O", "X"][winner] + " a gagné !");
        setActive(false);
      } else if (totalMoves === 9) {
        setMsg("Match nul");
        setActive(false);
      } else {
        setMsg("Tour de " + ["O", "X"][playing === 0 ? 1 : 0]);
        setPlaying(playing === 0 ? 1 : 0);
      }

      return copy;
    });
  }

  function load(data) {
    if (data) {
      setTurns(data);
      setActive(true);
      const last_index = data[0].length > data[1].length ? 0 : 1;
      setMsg("Tour de " + ["X", "O"][last_index]);
      setPlaying([1, 0][last_index]);
    }
  }

  const [turns, setTurns] = useState([[], []]);

  const [msg, setMsg] = useState("tour de O");
  const [playing, setPlaying] = useState(0);
  const [active, setActive] = useState(true);

  let cell_id = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="flex gap-4 items-center">
      <div className="text-center">
        <h1 className="m-5 text-5xl">{msg}</h1>
        <div
          className={`grid grid-cols-3 gap-4 transition duration-700 ${
            active ? "" : "disabled-cell"
          }`}
        >
          {cell_id.map((id) => (
            <Cell
              symbole={
                turns[0].includes(id) ? 1 : turns[1].includes(id) ? 2 : null
              }
              key={id}
              value={id}
              onClick={play}
            />
          ))}
        </div>
      </div>
      <History list={turns} onClick={load} />
    </div>
  );
}

export default Board;
