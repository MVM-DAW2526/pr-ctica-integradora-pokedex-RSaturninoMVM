document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.filter-dropdown');
    const chevron = boton.querySelector('img');
    const menu = document.createElement('div');
    
    menu.id = 'filtrodespegable';
    menu.className = 'filtro-despegable';
    menu.innerHTML = 
        `<div class="opcion">Ver todos</div>
        <div class="opcion">Fuego</div>
        <div class="opcion">Agua</div>
        <div class="opcion">Planta</div>
        <div class="opcion">Electrico</div>
        <div class="opcion">Bicho</div>
        <div class="opcion">Roca</div>
        <div class="opcion">Tierra</div>
        <div class="opcion">Dragon</div>
        <div class="opcion">Normal</div>
        <div class="opcion">Veneno</div>
        <div class="opcion">Fantasma</div>
        <div class="opcion">Psiquico</div>
        <div class="opcion">Volador</div>
        <div class="opcion">Hielo</div>
        <div class="opcion">Lucha</div>`;

    document.querySelector('.filter-section').appendChild(menu);

    boton.addEventListener('click', () => {
        menu.classList.toggle('mostrar');
        chevron.style.transform = menu.classList.contains('mostrar') ? 'rotate(180deg)' : 'rotate(0deg)';
    });

    const opciones = menu.querySelectorAll('.opcion');

    opciones.forEach(opcion => {
        opcion.addEventListener('click', () => {
            const seleccion = opcion.textContent.trim();
            const tipoBuscado = traductor[seleccion];
            const cartas = document.querySelectorAll('.pokemon-card');

            cartas.forEach(carta => {
                const tiposCarta = carta.dataset.tipos || "";
                if (seleccion === "Ver todos" || tiposCarta.includes(tipoBuscado)) {
                    carta.style.display = 'flex';
                } else {
                    carta.style.display = 'none';
                }
            });

            menu.classList.remove('mostrar');
            chevron.style.transform = 'rotate(0deg)';
        });
    });

    cargarPokemons();
});

async function cargarPokemons() {
    const grid = document.getElementById('mainPkmGrid');
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        const datos = await respuesta.json();

        for (let pkm of datos.results) {
            const resDetalle = await fetch(pkm.url);
            const detalle = await resDetalle.json();
            const card = document.createElement('div');
            
            card.classList.add('pokemon-card');
            card.dataset.tipos = detalle.types.map(t => t.type.name).join(' '); 

            const nombreMayuscula = pkm.name.charAt(0).toUpperCase() + pkm.name.slice(1);
            card.innerHTML = `
                <img src="${detalle.sprites.front_default}" alt="${pkm.name}">
                <p style="font-family: 'Trebuchet MS'; font-weight: bold;">${nombreMayuscula}</p>
            `;
            grid.appendChild(card);
        }
    } catch (error) {
        console.error(error);
    }
}

const searchInput = document.getElementById('pkmSearchInput');
searchInput.addEventListener('input', (e) => {
    const textoUsuario = e.target.value.toLowerCase();
    const todasLasCartas = document.querySelectorAll('.pokemon-card');

    todasLasCartas.forEach(carta => {
        const nombrePokemon = carta.querySelector('p').textContent.toLowerCase();
        carta.style.display = nombrePokemon.includes(textoUsuario) ? 'flex' : 'none';
    });
});