import { useEffect, useState } from "react";
import { getPokemonByName } from "../api/apiPokemon";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export default function Pokemon({ name }) {
  const navigate =
    useNavigate(); /* esto ayuda para no hacer de  nuevo peticiones inecesarias */
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    getPokemonByName(name)
      .then((pokemonJson) => setPokemon(pokemonJson))
      .catch((error) => {
        console.error(`fetch pokemon error ${error}`);
      });
  }, [name]);

  console.log("soy Pokemon.jsx");
  if (!pokemon) {
    return <p>Cargando {name}...</p>;
  }

  return (
    <article className="bg-white rounded-xl shadow-md p-4 text-center hover:scale-[1.03] transition-transform duration-300 w-full max-w-xs">
      <img
        src={pokemon.sprites?.other?.["official-artwork"]?.front_default}
        alt={name}
        className="w-32 h-32 mx-auto object-contain drop-shadow-md"
      />
      <h2 className="text-xl font-bold text-[#ef5350] capitalize mt-2">
        {name}
      </h2>

      <button
        onClick={() => navigate(`/pokemon/${name}`)}
        className="mt-4 px-4 py-2 bg-[#ffcc00] text-black font-semibold rounded hover:bg-yellow-300 transition-colors"
      >
        Ver detalles
      </button>
    </article>
  );
}
