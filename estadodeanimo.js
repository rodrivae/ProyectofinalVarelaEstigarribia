
let favoritoDeRecetas = [];

let stockRecetas =[]

const contenedorrecetas = document.getElementById('contenedor-recetas');
const contenedorFavorito = document.getElementById('favorito-contenedor');
const botonTerminar = document.getElementById('terminar')

const contadorFavorito = document.getElementById('contadorFavorito');


const selecCategoria = document.getElementById('selecCategoria')

//filtro de recetas
selecCategoria.addEventListener('change',()=>{
    console.log(selecCategoria.value)
    if(selecCategoria.value == 'all'){
        mostrarRecetas(stockRecetas)
    }else{
        mostrarRecetas(stockRecetas.filter(el => el.subcategoria == selecCategoria.value))
        console.log(stockRecetas.filter(el => el.subcategoria == selecCategoria.value))
    }
})

// se agrega mediante ajax metodo get de manera asincronica

 $.getJSON('estadodeanimoreceta.json', function (data) {
    console.log(data)
    data.forEach(elemento => stockRecetas.push(elemento))

    mostrarRecetas(stockRecetas)

   })




function mostrarRecetas(array){
   $('#contenedor-recetas').empty();
    for (const receta of array) {
        let div = document.createElement('div');
        div.classList.add('receta');
        div.innerHTML += `<div class="card">
                            <div class="card-image">
                                <img src=${receta.img}>
                                
                                
                            </div>
                            <div class="card-content">
                            <span class="card-title" style:"color:green;">${receta.nombre}</span>
                                <p>${receta.desc}</p>
                                <p>Subcategoria: ${receta.subcategoria}</p>
                                <a id="boton${receta.id}" class="btn btn-primary m-2">Agregar a favoritos</a>
                            </div>
                        </div> `
        contenedorrecetas.appendChild(div);
        
        let boton = document.getElementById(`boton${receta.id}`)

        boton.addEventListener('click', ()=>{
            agregarAFavorito(receta.id)
        })
    }
    
}
// funcion para agregar a favoritos elementos

function agregarAFavorito(id) {
    let repetido = favoritoDeRecetas.find(prodR => prodR.id == id);
    if(repetido){
       
    }else{
        let recetaAgregar = stockRecetas.find(prod => prod.id == id);

        favoritoDeRecetas.push(recetaAgregar);

        

        recetaAgregar.cantidad = 1;
       
        actualizarFavorito()
        let div = document.createElement('div')
        div.classList.add('recetaEnFavorito')
        div.innerHTML = `<img src=${recetaAgregar.img} width="30px">
                        <p>${recetaAgregar.nombre}</p>
                        <p id="cantidad${recetaAgregar.id}"></p>
                        <p>Subcategoria: ${recetaAgregar.subcategoria}</p>
                        <button id="eliminar${recetaAgregar.id}" class="boton-eliminar"><i class="fas fa-trash-alt"></i></button>`
        contenedorFavorito.appendChild(div)
        
        


        let botonEliminar = document.getElementById(`eliminar${recetaAgregar.id}`)

        botonEliminar.addEventListener('click', ()=>{
            botonEliminar.parentElement.remove()
            favoritoDeRecetas = favoritoDeRecetas.filter(prodE => prodE.id != recetaAgregar.id)
            localStorage.setItem('Favorito',JSON.stringify(favoritoDeRecetas))
            actualizarFavoritos()
        }) 
    }
     localStorage.setItem('Favorito',JSON.stringify(favoritoDeRecetas))
}


function recuperar() {
    let recuperar = JSON.parse(localStorage.getItem('Favorito'))
    if(recuperar){
        recuperar.forEach(el => {
            agregarAFavorito(el.id)
        });
    }
}


function  actualizarFavorito (){
    contadorFavorito.innerText = favoritoDeRecetas.reduce((acc, el)=> acc + el.cantidad, 0);
   
}

botonTerminar.innerHTML= `<button id="finalizar" class="btn btn-primary">Vaciar Favoritos</button>`

//se agrega ajax metodo post

$('#finalizar').on('click',()=>{
    $.post("https://jsonplaceholder.typicode.com/posts",JSON.stringify(favoritoDeRecetas), function (data, estado) {
        console.log(data,estado);
        if(estado){
            $('#favorito-contenedor').empty('')
            $('#favorito-contenedor').append('<p>Su lista de favorito ha sido vaciada correctamente</p>')

            favoritoDeRecetas= []
            localStorage.clear()
            actualizarFavorito()
        }

      } )
})
