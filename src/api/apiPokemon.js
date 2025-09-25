const POKEAPI_URL = "https://pokeapi.co/api/v2/pokemon";

export async function GetPokemonList(limit = 50) {
  const response = await fetch(`${POKEAPI_URL}?limit=${limit}`);
  const responseJson = await response.json();
  return responseJson.results;
}

export async function getPokemonByName(name) {
  const response = await fetch(`${POKEAPI_URL}/${name}`);
  const responseJson = await response.json();

  return responseJson;
}
