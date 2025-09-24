import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

function AppRHF() {
  const [todos, setTodos] = useState([]);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }, // error.text.message "es el error del input que se registro con ese nombre "Text"
  } = useForm();

  function saveTodo(todoText) {
    if (!todoText) return;
    setTodos([...todos, todoText]);
  }

  function removeToDo(indexToDelete) {
    const filterToDos = todos.filter((_, index) => {
      return index !== indexToDelete;
    });

    setTodos(filterToDos);
  }

  function onSubmit(data) {
    saveTodo(data.text);
    reset();
  }

  return (
    <main className="flex flex-col gap-4">
      <div
        className={clsx("w-full bg-teal-500 text-black font-bold text-center")}
      >
        Todo App
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md flex flex-row justify-center items-center gap-2 mx-auto"
      >
        <input
          type="text"
          className={clsx(
            "bg-black text-white border border-white/50 rounded p-2 w-full",
            {
              "bg-red-500/10 border border-red-500 ": errors.text,
            }
          )}
          {...register("text", {
            required: {
              value: true,
              message: "No puedes agregar tareas en Blaco",
            },
            minLength: {
              value: 3,
              message: "La tares debe tener al menos tres caracteres",
            },
          })}
        />

        <button className="bg-teal-500 text-black font-bold rounded p-2 size-10">
          +
        </button>
      </form>
      {errors.text && (
        <div className="flex justify-center items-center">
          <span className="text-red-500 text-sm">{errors.text.message}</span>
        </div>
      )}
      <section className="flex flex-col w-full max-w-md  mx-auto gap-2">
        {todos.map((todo, index) => {
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

export default AppRHF;
