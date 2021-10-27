const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 150; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
    promises.push(fetch(url).then(response => response.json()));
  }

  Promise.all(promises).then(resaults => {
    const pokemon = resaults.map(resault => ({
      name: resault.name,
      id: resault.id,
      image: resault.sprites.front_default,
      type: resault.types.map(type => type.type.name).join(', '),
    }));
    displayPokemon(pokemon);
  });
};
function displayPokemon(pokemon) {
  const pokemonHtmlString = pokemon
    .map(
      poke =>
        `<li class="card">
             <img class="card__image" src="${poke.image}"/>
             <h2 class= "card__title">${poke.id}.${poke.name}</h2>
             <p class="card__subtitle">Type: ${poke.type}</p>
        </li>`
    )
    .join('');
  pokedex.innerHTML = pokemonHtmlString;
}
fetchPokemon();
