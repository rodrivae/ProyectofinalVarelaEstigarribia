document.getElementById("btn_abrir").addEventListener("click", abrir_cerrar_menu);
let side_menu = document.getElementById("menu_side");
let btn_abrir = document.getElementById("btn_abrir");
let body = document.getElementById("body");


function abrir_cerrar_menu(){
    body.classList.toggle("body_mover");
    side_menu.classList.toggle("menu_side_mover");
}

//if (window.innerWidth < 760){
  //  body.classList.add("body_menu");
  //  side_menu.classList.add("menu_side_mover");
//}

//window.addEventListener("resize" , function) 
