/* =====================================
   CAREER AI 3.3
   PRESIDENT ENGINE
===================================== */


function createPresident(clubData){


return {

name:clubData.president,


trust:75,


pressure:getPressure(clubData.budget),


objectives:createObjectives(clubData),


history:[]

};


}





function getPressure(budget){


if(budget>=170000000)
return "EXTREMA";


if(budget>=100000000)
return "ALTA";


return "MEDIA";


}





function createObjectives(club){


let objectives=[];



if(club.budget>=170000000){

objectives.push(
"Ganar la Champions League"
);

objectives.push(
"Competir por la liga"
);

}



else if(club.budget>=100000000){

objectives.push(
"Clasificar a Champions"
);

objectives.push(
"Mejorar la plantilla"
);

}



else{

objectives.push(
"Construir un proyecto"
);

objectives.push(
"Desarrollar jóvenes"
);

}



return objectives;

}





// El presidente evalúa resultados

function presidentMatchReaction(president,result){


if(result==="win"){

president.trust+=5;


return {

message:
"Buen trabajo. El club está satisfecho.",

effect:
"+5 confianza"

};

}




if(result==="draw"){


president.trust-=2;


return {

message:
"El empate no era el resultado esperado.",

effect:
"-2 confianza"

};

}




if(result==="loss"){


president.trust-=8;


return {

message:
"La directiva está preocupada por los resultados.",

effect:
"-8 confianza"

};

}


}





// Decisiones importantes


function presidentDecision(type,data){


let response={};



switch(type){



case "bench_star":


if(data.player.personality.ego>80){


response.message=
`${data.player.name} está molesto por perder protagonismo.`;


response.effect=
"Vestuario -10";


}

else{


response.message=
`${data.player.name} acepta la decisión.`;


response.effect=
"Sin consecuencias";


}


break;





case "sell_player":


response.message=
`La directiva analizará la venta de ${data.player.name}.`;


response.effect=
"Finanzas aumentan";


break;





case "young_player":


response.message=
`La directiva valora la apuesta por la cantera.`;


response.effect=
"+Reputación";


break;



default:


response.message=
"La directiva está revisando la situación.";

}



return response;


}
