const clubs={

"Real Madrid":{
president:"Florentino Pérez",
budget:180000000
},

"FC Barcelona":{
president:"Joan Laporta",
budget:120000000
},

"Manchester City":{
president:"Sheikh Mansour",
budget:200000000
}

};


const select=document.getElementById("clubSelect");


document
.getElementById("startBtn")
.onclick=function(){


let club=select.value;


let data=clubs[club];


document
.getElementById("setup")
.style.display="none";


document
.getElementById("career")
.classList.remove("hidden");


document
.getElementById("clubName")
.innerHTML=club;


document
.getElementById("president")
.innerHTML=data.president;


document
.getElementById("budget")
.innerHTML="€"+data.budget.toLocaleString();


};



document
.getElementById("eventBtn")
.onclick=function(){


let events=[

"El delantero estrella está enfadado por no jugar.",

"El presidente pide ganar el próximo partido.",

"La prensa habla de una crisis.",

"Un joven pide más minutos."

];


let random=
events[Math.floor(Math.random()*events.length)];


let div=document.createElement("div");

div.className="event";

div.innerHTML=random;


document
.getElementById("events")
.prepend(div);


};
