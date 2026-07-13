[]
/* =====================================
   CAREER AI 3.5
   MEDIA ENGINE
===================================== */


function createMediaSystem(){

return {

fans:80,

press:70,

socialMood:"positivo",

news:[]

};

}





// Generar noticia

function generateNews(type,data){


let news=[];


switch(type){



case "win":


news=[

`🔥 ${data.club} consigue una victoria importante.`,

`Los aficionados celebran el trabajo del entrenador.`,

`La prensa destaca el buen momento del equipo.`

];

break;



case "loss":


news=[

`🚨 Crisis en ${data.club} tras una derrota.`,

`La prensa cuestiona las decisiones del entrenador.`,

`La afición exige una reacción inmediata.`

];

break;



case "transfer":


news=[

`💰 Rumor: ${data.player} podría abandonar el club.`,

`Grandes equipos siguen a la estrella.`,

`El mercado empieza a moverse.`

];

break;



case "bench":


news=[

`👀 Sorpresa: ${data.player} queda fuera del once titular.`,

`Los periodistas preguntan por la decisión.`,

`El vestuario observa la situación.`

];

break;



default:


news=[

`📰 Nuevo día en ${data.club}.`

];



}


return news[
Math.floor(Math.random()*news.length)
];


}





// Reacción de aficionados

function fanReaction(action,media){



switch(action){



case "win":


media.fans+=5;

media.press+=3;


break;




case "loss":


media.fans-=8;

media.press-=5;


break;




case "sell_star":


media.fans-=10;


break;




case "young_player":


media.fans+=4;


break;



}



if(media.fans>100)
media.fans=100;


if(media.fans<0)
media.fans=0;



return media;

}





// Preguntas de rueda de prensa

function pressConference(event){


let questions=[


"¿Por qué tomó esta decisión?",

"¿Cree que el equipo está preparado?",

"Los aficionados están preocupados. ¿Qué responde?",

"¿Seguirá este jugador en el club?"

];


return questions[
Math.floor(Math.random()*questions.length)
];


}
