import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getPokemonByName } from "../api/apiPokemon";
import { typeColorMap, typeBadgeMap } from "../styles/pokemonStyles.js";

export default function PokemonDetail() {
  const [pokemon, setPokemon] = useState({});
  const [evolutions, setEvolutions] = useState([]);
  const { name } = useParams();

  useEffect(() => {
    getPokemonByName(name)
      .then((pokemonResponse) => setPokemon(pokemonResponse))
      .catch((error) => {
        console.error(`[get pokemon by name]: ${error}`);
      });
  }, [name]);

  /* peticion para las formas  */

  useEffect(() => {
    if (pokemon.id) {
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon.id}/`)
        .then((res) => res.json())
        .then((speciesData) => fetch(speciesData.evolution_chain.url))
        .then((res) => res.json())
        .then((evoData) => {
          function getEvolutions(chain) {
            let evoList = [];
            if (chain?.species) evoList.push(chain.species.name);
            if (chain.evolves_to?.length > 0) {
              chain.evolves_to.forEach((evo) => {
                evoList = evoList.concat(getEvolutions(evo));
              });
            }
            return evoList;
          }

          const names = getEvolutions(evoData.chain);

          return Promise.all(
            names.map((name) =>
              fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                .then((res) => res.json())
                .then((poke) => ({
                  name: poke.name,
                  image: poke.sprites.other["official-artwork"].front_default,
                }))
            )
          );
        })
        .then((evoData) => setEvolutions(evoData))
        .catch((err) => console.error("[get evolutions]:", err));
    }
  }, [pokemon]);

  if (!pokemon.name) {
    return (
      <main className="w-screen h-screen flex items-center justify-center font-bold text-red-500">
        POKEMON NOT FOUND
      </main>
    );
  }

  const mainType = pokemon.types?.[0]?.type?.name;
  const borderColor = typeColorMap[mainType] || "border-gray-400";

  function getAbilityStyle(isHidden) {
    return isHidden
      ? "bg-gray-300 text-gray-700"
      : "bg-green-200 text-green-800";
  }

  return (
    <main className="grid grid-cols-1 md:grid-cols-[1fr_2fr] lg:grid-cols-2 place-items-center min-h-screen px-4 gap-8 lg:gap-0 bg-gradient-to-br from-blue-100 to-yellow-100">
      <Link to="/pokemon" className="absolute left-4 top-4">
        <button className="text-2xl p-3 rounded-full bg-white shadow-lg hover:bg-gray-100 transition-all">
          🔙
        </button>
      </Link>

      {/* Columna Izquierda: Imagen */}
      <section className="flex flex-col items-center gap-5">
        <img
          src={pokemon.sprites?.other["official-artwork"]?.front_default}
          alt={pokemon.name}
          className="w-86 h-auto object-contain drop-shadow-2xl"
        />
        <h1 className="text-3xl font-bold capitalize">{pokemon.name}</h1>
      </section>

      <section
        className={`flex flex-col items-start gap-6 text-lg 
              bg-white border-4 ${borderColor} 
              rounded-xl shadow-lg p-6 max-w-md w-full 
              transition-all duration-300 hover:scale-[1.02]`}
      >
        {/* Stats principales */}
        <div className="grid grid-cols-2 gap-6 w-full">
          {/* ID y Base Exp */}
          <div className="flex flex-col gap-3">
            <span className="text-3xl font-extrabold text-gray-800">
              #{pokemon.id}
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              ⚡ Base Exp:{" "}
              <span className="text-green-600 font-semibold">
                {pokemon.base_experience}
              </span>
            </span>
          </div>

          {/* Height y Weight */}
          <div className="flex flex-col gap-3">
            <span className="flex items-center gap-2 text-gray-700">
              📏 Height:{" "}
              <span className="text-blue-600 font-semibold">
                {pokemon.height} m
              </span>
            </span>
            <span className="flex items-center gap-2 text-gray-700">
              ⚖️ Weight:{" "}
              <span className="text-amber-600 font-semibold">
                {pokemon.weight} kg
              </span>
            </span>
          </div>
        </div>

        {/* Tipos */}
        <h2 className="text-xl font-semibold">Type:</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.types?.map((type) => {
            const style =
              typeBadgeMap[type?.type?.name] || "bg-gray-200 text-gray-800";
            return (
              <span
                key={type.slot}
                className={`px-3 py-1 rounded-full text-sm font-medium ${style}`}
              >
                {type.type.name}
              </span>
            );
          })}
        </div>

        {/* Habilidades */}
        <h2 className="text-xl font-semibold">Abilities:</h2>
        <div className="flex flex-wrap gap-2">
          {pokemon.abilities?.map(({ ability, is_hidden }) => (
            <span
              key={ability.name}
              className={`px-3 py-1 rounded-full text-sm font-medium ${getAbilityStyle(
                is_hidden
              )}`}
            >
              {ability.name}
              {is_hidden && " (Hidden)"}
            </span>
          ))}
        </div>
      </section>

      <section className="md:col-start-1 md:col-end-4 lg:col-start-1 lg:col-end-3 w-full mt-6 p-4">
        <h2 className="text-xl  text-center font-semibold mb-2">Evolutions:</h2>
        <div className=" grid grid-cols-3 ">
          {evolutions.map((evo) => (
            <div key={evo.name} className="flex flex-col items-center">
              <Link to={`/pokemon/${evo.name}`}>
                <img
                  src={evo.image}
                  alt={evo.name}
                  className="size-56 object-contain"
                />
              </Link>

              <span className="capitalize mt-2">{evo.name}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
