// VARIABLES //
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');


// EVENTOS //
document.addEventListener('DOMContentLoaded', () => {
    
    formulario.addEventListener('submit', validarBusqueda);
})


// FUNCIONES //
function validarBusqueda(e){

    e.preventDefault();

    const busqueda = document.querySelector('#busqueda').value;

    if(busqueda === ''){
        mostrarAlerta('Completar el campo de busqueda');
        return;
    }

    consultarAPI(busqueda);
}

function consultarAPI(busqueda){
    const githubUrl = `https://jobs.github.com/positions.json?search=${busqueda}`;
    const url = `https://api.allorigins.win/get?url=${encodeURIComponent(githubUrl)}`; // Se genera xq la API tiene una Key protegida

    axios.get(url) // Reemplaza a 'fetch'
        .then( respuesta => mostrarVacante(JSON.parse(respuesta.data.contents))) // Datos que brinda la API (respuestan en el servidor) / JSON.parse: Permite vert los datos en formato JSON
}

function mostrarVacante(vacantes){
    // LimpiarHTML
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }

    if(vacantes.length > 0){

        resultado.classList.add('grid');

        vacantes.forEach(vacante => {
            const{company, title, type, url, location} = vacante;
            resultado.innerHTML += `
            <div class="shadow bg-white p-6 rounded">
                <h2 class="text-2xl font-light mb-4">${title}</h2>
                <p class="font-bold uppercase">Compañia:  <span class="font-light normal-case">${company} </span></p>
                <p class="font-bold uppercase">Tipo de Contrato:   <span class="font-light normal-case">${type} </span></p>
                <p class="font-bold uppercase">Ubicación:   <span class="font-light normal-case">${location} </span></p>
                <a class="bg-teal-500 max-w-lg mx-auto mt-3 rounded p-2 block uppercase font-xl font-bold text-white text-center" target="_blank" href="${url}">Ver Vacante</a>
            </div>
            `;
        });
    }else{
        const sinResultados = document.createElement('p');
        sinResultados.classList.add('text-center', 'mt-10', 'text-gray-600', 'w-full')
        resultado.classList.remove('grid');
        sinResultados.textContent = 'No hay vacantes, intenta con otros terminos de busqueda'; 
        resultado.appendChild(sinResultados);
    }

}

function mostrarAlerta(mensaje){
    const alerta = document.querySelector('.alerta');

    if(!alerta){
        const alertaDiv = document.createElement('p');
        alertaDiv.classList.add('alerta', 'bg-gray-100', 'p-3', 'mt-3', 'text-center');
        alertaDiv.innerHTML = `${mensaje}`;
        formulario.appendChild(alertaDiv);

        setTimeout(() => {
            alertaDiv.remove();
        }, 3000);    
    }

}



