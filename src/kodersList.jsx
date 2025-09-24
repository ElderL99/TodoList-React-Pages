import { useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";

export function KodersList() {
  const [koders, setKoders] = useState([]);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function removeKoder(indexToDelete) {
    const filterKoders = koders.filter((_, index) => {
      return index !== indexToDelete;
    });

    setKoders(filterKoders);
  }

  function onSubmit(data) {
    setKoders([...koders, data]);
    console.log(data);
    reset();
  }

  return (
    <main className="lg:grid lg:grid-cols-[2fr_4fr] gap-4 h-40  ">
      <section className="w-full p-10 flex flex-col gap-4 justify-center items-center">
        <h1 className="text-green-700 text-lg font-bold">Koder Form</h1>
        <form
          className="flex flex-col  w-full gap-4 justify-center items-center "
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col justify-center items-center gap-4 text-black">
            <label htmlFor="" className="text-white">
              FirstName
            </label>
            <input
              type="text"
              {...register("firstName", {
                required: {
                  value: true,
                  message: "No puedes dejar este espacio en Blanco",
                },
                minLength: {
                  value: 3,
                  message: "El nombre debe tener al menos tres caracteres",
                },
              })}
            />

            {errors.firstName && (
              <div className="flex justify-center items-center">
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-4 text-black ">
            <label htmlFor="" className="text-white">
              LastName
            </label>
            <input
              type="text"
              {...register("lastName", {
                required: {
                  value: true,
                  message: "No puedes dejar este espacio en Blanco",
                },
                minLength: {
                  value: 3,
                  message: "El apellido debe tener al menos tres caracteres",
                },
              })}
            />

            {errors.lastName && (
              <div className="flex justify-center items-center">
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-4 text-black ">
            <label htmlFor="" className="text-white">
              Github
            </label>
            <input
              type="text"
              {...register("github", {
                required: {
                  value: true,
                  message: "No puedes agregar una URL en Blanco",
                },
                pattern: {
                  value:
                    /^https:\/\/github\.com\/(?!-)([a-zA-Z0-9-]{1,39})(?<!-)$/,
                  message:
                    "Debe ser un URL válido de GitHub (ej. https://github.com/usuario)",
                },
              })}
            />

            {errors.github && (
              <div className="flex justify-center items-center">
                <span className="text-red-500 text-sm">
                  {errors.github.message}
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center items-center gap-4 text-black">
            <label htmlFor="" className="text-white">
              Image URl
            </label>
            <input
              type="text"
              {...register("image", {
                required: {
                  value: true,
                  message: "No puedes dejar este espacio en Blanco",
                },
              })}
            />

            {errors.image && (
              <div className="flex justify-center items-center">
                <span className="text-red-500 text-sm">
                  {errors.image.message}
                </span>
              </div>
            )}
          </div>

          <button className="size-10 bg-green-500 rounded w-[50%]">Add</button>
        </form>
      </section>
      <section className="flex flex-col items-center p-10 h-40 gap-4 w-full">
        {koders.map((koder, index) => {
          return (
            <article
              key={index}
              className="grid grid-cols-3 border px-4 rounded-full items-center w-[500px] bg-teal-800"
            >
              <div>
                <img
                  src={koder.image}
                  alt={koder.firstName}
                  className="w-20 h-20 rounded-full"
                />
              </div>
              <div className="flex flex-col gap-1 p-2 items-center justify-center ">
                <span className="font-bold text-black">{koder.firstName}</span>
                <span>{koder.lastName}</span>
                <a
                  href={koder.github}
                  target="_blank"
                  className="text-green-500 underline"
                >
                  GitHub
                </a>
              </div>
              <button
                onClick={() => removeKoder(index)}
                className="text-red-500 font-bold"
              >
                ❌
              </button>
            </article>
          );
        })}
      </section>
    </main>
  );
}
