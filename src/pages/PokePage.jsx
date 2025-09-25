import { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon.jsx";
import { GetPokemonList } from "../api/apiPokemon.js";

export function PokePage() {
  const [pokemons, setPokemons] = useState([]);
  const [finePokemon, setFinePokemon] = useState("");

  useEffect(() => {
    GetPokemonList(40)
      .then((pokemonListResponse) => setPokemons(pokemonListResponse))
      .catch((error) => {
        console.error(`Fetch pokemon error ${error}`);
      });
  }, []);

  const filterByName = pokemons.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(finePokemon.toLowerCase());
  });

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-100 to-yellow-100">
      <div className="flex justify-center items-center p-8">
        <input
          value={pokemons.name}
          type="text"
          placeholder="Search your pokemon"
          className="w-full md:w-[50%] border border-red-400 rounded-full placeholder:text-center placeholder:text-blue-500 p-2 "
          onChange={(e) => {
            setFinePokemon(e.target.value);
          }}
        />
      </div>
      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#ef5350]">
          Pokémon List
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filterByName.map((pokemon) => (
            <Pokemon key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
