// variables
const formulario = document.querySelector('#formulario');
const listaTweet = document.querySelector('#lista-tweets');
let tweets = [];

// event listener
eventListeners();

function eventListeners() {
    //cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento ya esta listo
    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);
        crearHTML();
    })
}


// funciones
function agregarTweet(e) {
    e.preventDefault();
    
    const tweet = document.querySelector('#tweet').value;
    // validacion

    if (tweet === '') {
        mostrarError('un mensaje no puede ir vacio');
        return;
    }

    //mostrar tweets
    const tweetobj = {
        id: Date.now(),
        tweet: tweet
    }
    tweets = [...tweets,tweetobj];

    //crear html
    crearHTML();

    //reiniciar el formulario
    formulario.reset();

}

function mostrarError(error) {
    const mensajeError = document.createElement('P');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // insertar en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() =>{
        mensajeError.remove();
    },3000);
}

function crearHTML() {
    limpiarHTML();
    if (tweets.length > 0) {
        tweets.forEach((tweet) =>{
            // agregar boton
            const btnEliminar = document.createElement('A');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            //añadir la funcion de eliminar
            btnEliminar.onclick = () =>{
                boorarTweet(tweet.id);
            }

            //crear HTML
            const li = document.createElement('LI');
            //añadir tweet
            li.innerText = tweet.tweet;

            //asignar boton
            li.appendChild(btnEliminar);
            //inserta al html
           
            listaTweet.appendChild(li);
        });
    }

    sincronizarStorage();
}

//limpiar html
function limpiarHTML() {
    while (listaTweet.firstChild) {
        listaTweet.removeChild(listaTweet.firstChild);
    }
}

//agrega los tweet a storage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// elimina un tweets
function boorarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id);
    console.log(tweets);
    crearHTML();
}