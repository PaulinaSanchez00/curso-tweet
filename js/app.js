//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

//Event Listeners
eventListeners();

//Funciones
function eventListeners() {
    //Cuando el usuario agrefa un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);
    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        crearHTML();
    })
};

function agregarTweet(e) {
    e.preventDefault();
    
    //Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    //validacion
    if(tweet === ''){
        mostrarError('Un mensaje no puede ir vacio');
        return; // Evita que se ejecuten mas lineas de codigo
    }

    const tweetObj = {
        id: Date.now(),
        // tweer: tweet,
        //Esto es lo mismo, como se llaman igual solo se pone 1
        tweet,
    }

    //Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];
    
    //Una vez agregado vamos a crear el HTML
    crearHTML();

    //Reiniciar el formulario
    formulario.reset();
};

//Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el Contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //Remover el mensaje de error a los 3 seg
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
};

//Muestra el listado de tweets
function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            //Agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';
            //Añadir la funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            //Crear el HTML
            const li = document.createElement('li');
            //añadir el texto
            li.innerText = tweet.tweet;
            //Asignarl el boton
            li.appendChild(btnEliminar);
            //insertarlo en el HTML
            listaTweets.appendChild(li);
        });
    };

    sincronizarStorage();
};

//Agrega los Tweets actuales a LocalStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
};

//Eliminar un tweet
function borrarTweet(id) {
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
};

//limpiar el HTML
function limpiarHTML() {
    while(listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    };
};