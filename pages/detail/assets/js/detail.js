const pokeId = new URLSearchParams(window.location.search).get('id');
const urlInfos = `https://pokeapi.co/api/v2/pokemon/${pokeId}`;
const pokeImg = (document.querySelector(
  '#icon'
).href = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png`);

function primeiraLetraMaiuscula(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const pokeList = document.querySelector('.corpoHtml');
const titulo = document.querySelector('.titulo');

async function getPokemon() {
    const response = await fetch(urlInfos);
    const data = await response.json();

    const nome = data.name;
    titulo.innerHTML = primeiraLetraMaiuscula(nome);
    const id = data.id;
    const exp = data.base_experience;
    var altura = data.height;
    altura = altura/10;
    var peso = data.weight;
    peso = peso/10;
    var habilidades = data.abilities
    .map(function (e) {
        return primeiraLetraMaiuscula(e.ability.name);
    }).join(", ");
    const types_poke = data.types 
    .map(function (e) {
        return primeiraLetraMaiuscula(e.type.name)
    })
    const stats = data.stats
    .map(function (e) {
        return e.base_stat
    })

    console.log(nome);
    pokeList.innerHTML = pokemonDetailsList(nome, exp, altura, peso, habilidades, types_poke, stats, id);
    console.log(nome);
}

function pokemonDetailsList(nome, exp, altura, peso, habilidades, types_poke, stats, id) {
    return `
    <section class="content ${types_poke[0]}">
        <div>
            <a href="/">
                <img class="seta" src="https://icones.pro/wp-content/uploads/2021/06/icone-fleche-gauche-noir.png">
            </a>
        <div class="parte_de_cima">
            <div class="nome_id">
                <h1 class="nome">${nome}</h1>
                <span class="id">#${id}</span>
            </div>
            <div class="detail">
                <ol class="types">
                        ${types_poke
                        .map((type) => `<li class="type ${type}">${type}</li>`)
                        .join('')}
                </ol>
            </div>
            <img class="poke_image" src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokeId}.png"
                    alt="${nome}">
        </div>
        <div class="parte_de_baixo">
            <span class="info">DETALHES</span>
            <hr size="10" width="99.5%">
            <li class='detailsList subir'>
                <span>Experiência base: ${exp}</span>
            </li>
            <li class='detailsList'>
                <span>Altura: ${altura.toString().replace(".", ",")} m</span>
            </li>
            <li class='detailsList'>
                <span>Peso: ${peso.toString().replace(".", ",")} Kg</span>
            </li>
            <li class='detailsList'>
                <span>Habilidades: ${habilidades}</span>
            </li>
            <li class='detailsList'>
                <span>HP: ${stats[0]}</span>
            </li>
            <li class='detailsList'>
                <span>Ataque: ${stats[1]}</span>
            </li>
            <li class='detailsList'>
                <span>Defesa: ${stats[2]}</span>
            </li>
            <li class='detailsList'>
                <span>Ataque Especial: ${stats[3]}</span>
            </li>
            <li class='detailsList'>
                <span>Defesa Especial: ${stats[4]}</span>
            </li>
            <li class='detailsList descer'>
                <span>Velocidade: ${stats[5]}</span>
            </li>
        </div>
    </section>
    `;
}

getPokemon();