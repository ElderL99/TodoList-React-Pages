import { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon.jsx";
import { GetPokemonList } from "../api/apiPokemon.js";

export function PokePage() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    GetPokemonList(200)
      .then((pokemonListResponse) => setPokemons(pokemonListResponse))
      .catch((error) => {
        console.error(`Fetch pokemon error ${error}`);
      });
  }, []);

  console.log("soy el main de pokeapi");

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-100 to-yellow-100">
      <section className="p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#ef5350]">
          Pokémon List
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
