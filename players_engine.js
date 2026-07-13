/* =====================================
   CAREER AI 3.2
   PLAYER ENGINE
===================================== */


function createPlayerProfile(player){

return {

name: player.name,

position: player.position,

overall: player.overall,

potential: player.potential,

age: player.age,


// Estado del jugador

morale:80,

confidence:75,

relationship:70,


// Situación deportiva

minutes:0,

starts:0,

goals:0,

assists:0,


// Contrato

contractYears:3,


// Personalidad

personality:getPersonality(player.role)

};

}




function getPersonality(role){


switch(role){


case "Estrella":

return {

ego:90,

patience:40,

leadership:80

};


case "Promesa":

return {

ego:30,

patience:90,

leadership:40

};


case "Titular":

return {

ego:60,

patience:60,

leadership:60

};


default:

return {

ego:50,

patience:50,

leadership:50

};


}


}





// Cuando un jugador no juega

function playerNotPlaying(player){


player.morale -=5;


if(player.personality.ego>80){

return `${player.name} está molesto por no ser titular.`;

}


return `${player.name} acepta esperar su oportunidad.`;

}





// Cuando juega

function playerPlayed(player){


player.minutes +=90;

player.confidence +=3;

player.morale +=2;


return `${player.name} está satisfecho con sus minutos.`;

}





// Conflictos

function generatePlayerIssue(player){


let issues=[


`${player.name} quiere renovar su contrato.`,

`${player.name} cree que merece más minutos.`,

`${player.name} está recibiendo ofertas de otros clubes.`,

`${player.name} está contento con el proyecto.`

];


return issues[
Math.floor(Math.random()*issues.length)
];


}
