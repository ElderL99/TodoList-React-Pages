import { useState } from "react";

function App() {
  const [data, setTodos] = useState([]);
  const [value, setValue] = useState("");

  function saveTodo() {
    if (!value.trim()) return;
    setTodos([...data, value.trim()]);
    setValue("");
  }
  function onKeyDown(e) {
    if (e.key === "Enter") {
      saveTodo();
    }
  }
  function removeToDo(indexToDelete) {
    const filterToDos = data.filter((_, index) => {
      return index !== indexToDelete;
    });

    setTodos(filterToDos);
  }

  return (
    <main className="flex flex-col gap-4">
      <div className="w-full bg-teal-500 text-black font-bold text-center">
        Todo App
      </div>
      <header className="w-full max-w-md flex flex-row justify-center items-center gap-2 mx-auto">
        <input
          type="text"
          className="bg-black text-white border border-white/50 rounded p-2 w-full"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          onKeyDown={onKeyDown}
        />
        <button
          onClick={saveTodo}
          className="bg-teal-500 text-black font-bold rounded p-2 size-10"
        >
          +
        </button>
      </header>
      <section className="flex flex-col w-full max-w-md  mx-auto gap-2">
        {data.map((todo, index) => {
          return (
            <article
              className="w-full border border-white/50 rounded p-2 grid grid-cols-[1fr_3rem]"
              key={index}
            >
              <span>{todo}</span>
              <span
                onClick={() => {
                  removeToDo(index);
                }}
                className="text-red-800 text-right cursor-pointer "
              >
                ❌
              </span>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default App;
