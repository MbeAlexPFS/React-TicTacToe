import { useState, useEffect } from "react";

function arraysAreEqual(arr1, arr2) {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
}

function History({ list, onClick }) {
  const [history, setHistory] = useState([[[], []]]);

  useEffect(() => {
    if (arraysAreEqual(list, [[], []])) {
      sessionStorage.setItem("history", JSON.stringify([]));
    } else {
      let session_history = JSON.parse(sessionStorage.getItem("history")) || [];
      if (!arraysAreEqual(session_history[session_history.length - 1], list)) {
        session_history.push(list);
        sessionStorage.setItem("history", JSON.stringify(session_history));
        setHistory([...session_history]);
      }
    }
  }, [list]);

  return (
    <div className="grid grid-cols-3 justify-center gap-3 bg-neutral-500 p-5 rounded-xs">
      <div
        className="p-3 h-fit rounded-xs bg-gray-700 text-white hover:transition hover:duration-300 hover:bg-gray-500"
        onClick={() => onClick(history[0])}
      >
        Début de jeu
      </div>

      {history.map((step, index) =>
        index > 0 ? (
          index === history.length - 1 ? (
            <div
              key={index}
              className="p-3 h-fit rounded-xs bg-gray-700 text-white hover:transition hover:duration-300 hover:bg-gray-500"
            >
              Fin de jeu
            </div>
          ) : (
            <div
              key={index}
              className="p-3 h-fit rounded-xs bg-gray-700 text-white hover:transition hover:duration-300 hover:bg-gray-500"
              onClick={() => {
                onClick(step);
                sessionStorage.setItem(
                  "history",
                  JSON.stringify(history.slice(0, index))
                );
              }}
            >
              Étape {index}
            </div>
          )
        ) : null
      )}
    </div>
  );
}

export default History;
