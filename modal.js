const favoritoAbrir = document.getElementById('boton-favorito');
const favoritoCerrar = document.getElementById('favoritoCerrar');

const contenedorModal = document.getElementsByClassName('modal-contenedor')[0]
const modalFavorito= document.getElementsByClassName('modal-favorito')[0]

// Eventos para modal de favoritos

favoritoAbrir.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
favoritoCerrar.addEventListener('click', ()=> {
    contenedorModal.classList.toggle('modal-active')
})
modalFavorito.addEventListener('click',(e)=>{
    e.stopPropagation()
})
contenedorModal.addEventListener('click', ()=>{
    favoritoCerrar.click()
})