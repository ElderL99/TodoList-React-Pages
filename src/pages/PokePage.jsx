import { useState, useEffect } from "react";
import Pokemon from "../components/Pokemon.jsx";

export function PokePage() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=201")
      .then((response) => response.json())
      .then((jsonResponse) => setPokemons(jsonResponse.results))
      .catch((error) => {
        console.error(`Fetch pokemon error ${error}`);
      });
  }, []);

  return (
    <div className="">
      <header className="">este es el header</header>
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 p-4 gap-4">
          {pokemons.map((pokemon) => (
            <Pokemon key={pokemon.name} name={pokemon.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
