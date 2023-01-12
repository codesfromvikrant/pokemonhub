const cardContainer = document.getElementById('card-container')
const cardCount = 200
const cardColors = {
  fire: '#FDDFDF',
  grass: '#DEFDE0',
  electric: '#FCF7DE',
  water: '#DEF3FD',
  ground: '#f4e7da',
  rock: '#d5d5d4',
  fairy: '#fceaff',
  poison: '#98d7a5',
  bug: '#f8d5a3',
  dragon: '#97b3e6',
  psychic: '#eaeda1',
  flying: '#F5F5F5',
  fighting: '#E6E0D4',
  normal: '#F5F5F5'
}

const types = Object.keys(cardColors);

const fetchPokemonData = async () => {
  for (let i = 1; i <= cardCount; i++) {
    await getPokemonData(i)
  }
}

const getPokemonData = async (id) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
  const data = await res.json()
  createPokemonCards(data)
}

const createPokemonCards = (pokemon) => {
  const pokeEl = document.createElement('div')
  pokeEl.classList.add('pokemon')

  const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
  const pokemonTypes = pokemon.types.map(el => el.type.name)
  const colorindex = pokemonTypes[0];
  const color = cardColors[colorindex];
  pokeEl.style.backgroundColor = color;

  const cardHTML = `
   <center class="img-container">
        <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png" class="w-26 bg-white rounded-full p-4" alt="${name}">
    </center>
    <div class="info">
    <div class="flex justify-center items-center gap-4 pt-4 pb-2">
        <span class="number bg-gray-50 text-sm text-gray-700 font-bold py-1 px-2 rounded-2xl">#${pokemon.id}</span>
        <h3 class="name text-gray-700 font-bold text-lg">${name}</h3>
    </div>
        <div className="">
        <div class="text-sm font-semibold text-gray-600 capitalize">Type: <span>${colorindex}</span> </div>
        <div class="text-sm font-semibold text-gray-600">Height : <span>${pokemon.height}</span> feet</div>
        <div class="text-sm font-semibold text-gray-600">Weight : <span>${pokemon.weight}</span> Kg.</div>
        <div class="text-sm font-semibold text-gray-600">Battle Fought : <span>${pokemon.base_experience}</span></div>
        </div>
    </div>
  `

  pokeEl.innerHTML = cardHTML
  cardContainer.appendChild(pokeEl)
}

fetchPokemonData()