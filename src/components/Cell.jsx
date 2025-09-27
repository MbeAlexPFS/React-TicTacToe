function Cell({ symbole = 0, value, onClick }) {
  let show = " ";
  if (symbole === 1) show = "O";
  else if (symbole === 2) show = "X";

  return (
    <div
      className="text-amber-500 font-bold flex justify-center items-center fs-1 rounded-xs bg-gray-600 w-20 h-20 hover:bg-gray-500 hover:shadow-2xl hover:transition-colors"
      onClick={symbole ? null : () => onClick(value)}
    >
      {show}
    </div>
  );
}

export default Cell;
