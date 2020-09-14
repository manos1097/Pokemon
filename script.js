// Get all nessecary HTML elements references
const btn = document.getElementById('search');
const input = document.getElementById('input');
const nameElem = document.getElementById('name');
const imageElem = document.getElementById('pokemon-image');
const pokemonIdElem = document.getElementById('pokeId');
const typeElem = document.getElementById('type');
const movesElem = document.getElementById('moves');
const evolBtnElem = document.getElementById('evolution-btn');
const evolutionModal = document.getElementById('evolutionModal');
const prevEvolutionImage = document.getElementById('prevEvolutionImage');
const prevEvolutionName = document.getElementById('prevEvolutionName');
const prevEvolutionInfo = document.getElementById('prevEvolutionInfo');
const pokemonInfo = document.getElementById('pokemon-info');

// Initialize global variable to share current pokemon id
// between showData() and getPreviousEvolution()
let currentPokemonId = "";

btn.addEventListener('click', () => {
    // the Pokemon API accepts only full lowercase names
    // and remove whitespaces left and right
    const inputVal = input.value.toLowerCase().trim();

    if (inputVal !== '') {
        fetch("https://pokeapi.co/api/v2/pokemon/" + inputVal)
            .then(response => response.json())
            .then(data => showData(data))
            .catch(err => console.error(err));
    }else {
        alert('Please input a pokemon name or ID');
    }
});

evolBtnElem.addEventListener('click', getPrevEvolution);

function showData(pokemon) {
    // Object destructuring
    const { id, moves, name, sprites, types } = pokemon;
    
    // Hide previous evolution text
    prevEvolutionInfo.classList.add('hide');
    pokemonInfo.classList.remove('hide');

    // Remove hide class from moves div in order to be seen
    movesElem.classList.remove('hide');

    // Set id to global variable in order for previous evolution fetch to access it
    currentPokemonId = id;

    // Remove the previous pokemon moves if user clicks again search button
    movesElem.innerHTML = '';

    // Set pokemon element view values
    nameElem.textContent = name;
    imageElem.src = sprites.other['official-artwork'].front_default;
    pokemonIdElem.textContent = '#' + id;
    typeElem.textContent = types[0].type.name;

    // If Ditto get only 1 move because he has only 1
    if (id === 132) {
        let node = document.createElement("P");
        let textnode = document.createTextNode(moves[0].move.name);  
        node.appendChild(textnode);
        movesElem.appendChild(node);
    }else {
        for (let i = 0; i < 5; i++) {
            let node = document.createElement("P"); // create empty paragraph element
            let textnode = document.createTextNode(moves[i].move.name); // create text to add it to the empty paragraph
            node.appendChild(textnode); // append the text inside the empty paragraph
            movesElem.appendChild(node); // append the full paragraph that contains text into the div with id moves
        }
    }
}

function getPrevEvolution() {
    if (currentPokemonId !== '' && input.value.toLowerCase().trim() !== '') {
        fetch("https://pokeapi.co/api/v2/pokemon-species/" + currentPokemonId)
            .then(response => response.json())
            .then(speciesData => {
                if (speciesData.evolves_from_species === null) {
                    prevEvolutionTitle.textContent = 'Previous Evolution:';
                    prevEvolutionName.textContent = 'There is no previous evolution';
                    prevEvolutionInfo.classList.remove('hide');
                    pokemonInfo.classList.add('hide');
                    movesElem.classList.add('hide');
                    prevEvolutionImage.classList.add('hide');
                }else {
                    fetch("https://pokeapi.co/api/v2/pokemon/" + speciesData.evolves_from_species.name)
                        .then(response => response.json())
                        .then(pokemonData => {
                            pokemonInfo.classList.add('hide');
                            movesElem.classList.add('hide');
                            prevEvolutionInfo.classList.remove('hide');
                            prevEvolutionImage.src = pokemonData.sprites.other['official-artwork'].front_default;
                            prevEvolutionName.textContent = speciesData.evolves_from_species.name;
                            prevEvolutionTitle.textContent = 'Previous Evolution:';
                            prevEvolutionImage.classList.remove('hide');
                        })
                        .catch(err => console.error(err));
                }
            })
            .catch(err => console.error(err));
    }else {
        alert('Please search for a Pokemon first');
    }
}