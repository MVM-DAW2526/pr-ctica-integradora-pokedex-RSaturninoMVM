document.addEventListener('DOMContentLoaded', () => {
    const boton = document.querySelector('.filter-dropdown');
    const chevron = boton.querySelector('img');
    const filterSection = document.querySelector('.filter-section');
    
    const menu = document.createElement('div');
    menu.id = 'filtrodespegable';
    menu.className = 'filtro-despegable';

    const listaTipos = [
        "Ver todos", "Fuego", "Agua", "Planta", "Electrico", "Bicho", 
        "Roca", "Tierra", "Dragon", "Normal", "Veneno", "Fantasma", 
        "Psiquico", "Volador", "Hielo", "Lucha"
    ];
    const tiposTraduccion = {
        "Fuego": "fire", "Agua": "water", "Planta": "grass", "Electrico": "electric",
        "Bicho": "bug", "Roca": "rock", "Tierra": "ground", "Dragon": "dragon",
        "Normal": "normal", "Veneno": "poison", "Fantasma": "ghost",
        "Psiquico": "psychic", "Volador": "flying", "Hielo": "ice", "Lucha": "fighting"
    };

    
    listaTipos.forEach(tipo => {
        const opcion = document.createElement('div');
        opcion.className = 'opcion';
        opcion.textContent = tipo;
        
        opcion.addEventListener('click', () => {
            const seleccion = opcion.textContent.trim();
            const tipoBuscado = tiposTraduccion[seleccion];
            const cartas = document.querySelectorAll('.pokemon-card');

            cartas.forEach(carta => {
                const tiposCarta = carta.dataset.tipos;
                const coincide = seleccion === "Ver todos" || tiposCarta.includes(tipoBuscado);
                carta.style.display = coincide ? 'flex' : 'none';
            });
        });
        menu.appendChild(opcion);
    });
    filterSection.appendChild(menu);

    boton.addEventListener('click', () => {
        const abrete = menu.classList.toggle('mostrar');
    });
    cargarPokemons();
});

async function cargarPokemons() {
    const grid = document.getElementById('mainPkmGrid');
    
    try {
        const respuesta = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');

        const datos = await respuesta.json();

        const promesasDetalles = datos.results.map(pkm => fetch(pkm.url).then(res => res.json()));
        const detallesPokemons = await Promise.all(promesasDetalles);

        detallesPokemons.forEach(detalle => {
            const card = document.createElement('div');
            card.className = 'pokemon-card';
            card.dataset.tipos = detalle.types.map(t => t.type.name).join(' ');

            const img = document.createElement('img');
            img.src = detalle.sprites.front_default;
            img.alt = detalle.name;

            const p = document.createElement('p');
            p.style.fontFamily = "'Trebuchet MS'";
            p.style.fontWeight = 'bold';
            
            const nombre = detalle.name;
            p.textContent = nombre.charAt(0).toUpperCase() + nombre.slice(1);

            card.appendChild(img);
            card.appendChild(p);
            grid.appendChild(card);
        });

    } catch (error) {
    }
}

const searchInput = document.getElementById('pkmSearchInput');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const textoUsuario = e.target.value.toLowerCase();
        const todasLasCartas = document.querySelectorAll('.pokemon-card');

        todasLasCartas.forEach(carta => {
            const parrafo = carta.querySelector('p');
            if (parrafo) {
                const nombrePokemon = parrafo.textContent.toLowerCase();
                carta.style.display = nombrePokemon.includes(textoUsuario) ? 'flex' : 'none';
            }
        });
    });
}