console.log("APP JS CARGADO");


function startCareer(){

alert("FUNCIONA EL BOTON");


document.getElementById("setup").style.display="none";

document.getElementById("career").classList.remove("hidden");


document.getElementById("clubName").innerHTML =
document.getElementById("clubSelect").value;


document.getElementById("president").innerHTML =
"Presidente de prueba";


document.getElementById("budget").innerHTML =
"€100.000.000";

}
