/*====================================
    CAREER AI 2.0 - CORE SYSTEM
====================================*/

/*==============================
    BASE DE CLUBS
==============================*/

const CLUB_DATABASE = {
"Real Madrid": { budget: 180000000, pressure: "high", president: "Florentino Pérez", style: "galactico" },
"FC Barcelona": { budget: 120000000, pressure: "high", president: "Joan Laporta", style: "academy" },
"Manchester City": { budget: 200000000, pressure: "medium", president: "Sheikh Mansour", style: "winning" },
"Manchester United": { budget: 150000000, pressure: "high", president: "INEOS Board", style: "rebuild" },
"PSG": { budget: 170000000, pressure: "high", president: "Nasser Al-Khelaifi", style: "stars" },
"Bayern Munich": { budget: 140000000, pressure: "medium", president: "Herbert Hainer", style: "stable" },
"Juventus": { budget: 90000000, pressure: "medium", president: "Board", style: "rebuild" }
};

/*==============================
    CLUB DATA
==============================*/

function getClubData(team){
return CLUB_DATABASE[team] || {
budget: 50000000,
pressure: "medium",
president: "Directiva",
style: "normal"
};
}

/*==============================
    LOAD TEAM
==============================*/

let savedTeam = localStorage.getItem("career-team") || "Real Madrid";
let clubData = getClubData(savedTeam);

/*==============================
    CAREER STATE
==============================*/

let CareerAI = {
team: savedTeam,
budget: clubData.budget,
president: clubData.president,
pressure: clubData.pressure,
morale: 75,
fans: 80,
boardTrust: 70
};

/*==============================
    LOAD GAME (FIXED SAFE MERGE)
==============================*/

function loadGame(){
let data = localStorage.getItem("career-ai-data");
if(data){
CareerAI = { ...CareerAI, ...JSON.parse(data) };
}
}

/*==============================
    SAVE GAME
==============================*/

function saveGame(){
localStorage.setItem("career-ai-data", JSON.stringify(CareerAI));
}

/*==============================
    OBJECTIVE
==============================*/

function getObjective(){

if(CareerAI.budget > 150000000) return "Ganar la liga o Champions";
if(CareerAI.budget > 90000000) return "Clasificar a Champions";

return "Evitar descenso y construir proyecto";
}

/*==============================
    PRESIDENT MESSAGE
==============================*/

function getPresidentMessage(){
return `${CareerAI.president}:

Objetivo: ${getObjective()}
Presupuesto: €${CareerAI.budget}

Exigimos resultados.`;
}

/*==============================
    PRESIDENT REACTION
==============================*/

function presidentReaction(result){

if(result === "win"){
CareerAI.boardTrust += 5;
CareerAI.fans += 4;
CareerAI.budget += 2000000;
}

if(result === "draw"){
CareerAI.boardTrust -= 2;
CareerAI.fans -= 1;
}

if(result === "loss"){
CareerAI.boardTrust -= 10;
CareerAI.fans -= 8;
CareerAI.budget -= 3000000;
}

saveGame();

return result === "win"
? "El presidente está satisfecho."
: result === "draw"
? "El presidente esperaba más."
: "El presidente está muy molesto.";
}

/*====================================
    PARTIDOS IA
====================================*/

const MATCH_FIXTURES = [
"Real Madrid vs Barcelona",
"Manchester City vs Liverpool",
"PSG vs Bayern Munich",
"Juventus vs AC Milan",
"Arsenal vs Chelsea",
"Inter Miami vs LA Galaxy"
];

let currentMatch = null;

/*==============================
    MATCH GENERATOR
==============================*/

function generateMatch(){
currentMatch = MATCH_FIXTURES[Math.floor(Math.random()*MATCH_FIXTURES.length)];
return currentMatch;
}

/*==============================
    WIN CHANCE
==============================*/

function calculateWinChance(){

let base = 50;

if(CareerAI.budget > 150000000) base += 15;
if(CareerAI.budget < 80000000) base -= 15;

base += (CareerAI.morale - 50) / 5;
base += (CareerAI.boardTrust - 50) / 10;

if(base > 85) base = 85;
if(base < 10) base = 10;

return base;
}

/*==============================
    PLAY MATCH (FIXED SAFE FLOW)
==============================*/

function playMatch(){

if(!currentMatch) generateMatch();

let winChance = calculateWinChance();
let random = Math.random() * 100;

let result =
random < winChance ? "win" :
random < winChance + 20 ? "draw" : "loss";

let reaction = presidentReaction(result);

// morale update
if(result === "win") CareerAI.morale += 5;
if(result === "loss") CareerAI.morale -= 7;

saveGame();

return {
match: currentMatch,
result,
reaction,
winChance: winChance.toFixed(1)
};
}

/*==============================
    NEXT MATCH
==============================*/

function nextMatch(){
return generateMatch();
}

/*==============================
    MATCH BUTTON HANDLER
==============================*/

function handleMatch(){

let match = nextMatch();
let result = playMatch();

console.log(
`⚽ ${match}
RESULTADO: ${result.result.toUpperCase()}
PROBABILIDAD: ${result.winChance}%
${result.reaction}`
);

alert(
`⚽ ${match}

Resultado: ${result.result.toUpperCase()}
Probabilidad: ${result.winChance}%

${result.reaction}`
);
}

/*==============================
    INIT
==============================*/

window.onload = () => {
loadGame();
saveGame();
console.log("Career AI iniciado:", CareerAI);
};
