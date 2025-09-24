import { useEffect, useState } from "react";

export default function Pokemon({ name }) {
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((response) => response.json())
      .then((jsonResponse) => setPokemon(jsonResponse))
      .catch((error) => {
        console.error(`fetch pokemon error ${error}`);
      });
  }, [name]); // se vuelve a ejecutar si cambia el name

  console.log("soy Pokemon.jsx");
  if (!pokemon) {
    return <p>Cargando {name}...</p>;
  }

  return (
    <article className="bg-white text-white p-4 rounded-xl shadow-lg w-auto">
      <img
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
        alt={name}
        className="w-32 mx-auto "
      />
      <h2 className="text-xl font-bold text-[#ff1c1c]">{name}</h2>
      <button className="mt-2 px-4 py-2 bg-[#ffcc00] text-black rounded">
        Ver detalles
      </button>
    </article>
  );
}
