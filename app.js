const PIN="SHDW2026";
const $=id=>document.getElementById(id);
let db={members:[],requests:[],news:[],mvp:{}};

window.addEventListener("load",async()=>{
 setTimeout(()=>$("splash").classList.add("hide"),800);
 await load();
 render();
});
$("menuBtn").onclick=()=>$("menu").classList.toggle("show");
document.querySelectorAll("#menu a").forEach(a=>a.onclick=()=>$("menu").classList.remove("show"));

async function load(){
 const r=await fetch("data.json?x="+Date.now());
 db=await r.json();
 db.members=JSON.parse(localStorage.getItem("shdw_members")||JSON.stringify(db.members));
 db.requests=JSON.parse(localStorage.getItem("shdw_requests")||"[]");
 db.news=JSON.parse(localStorage.getItem("shdw_news")||JSON.stringify(db.news));
 db.mvp=JSON.parse(localStorage.getItem("shdw_mvp")||JSON.stringify(db.mvp));
}

function save(){
 localStorage.setItem("shdw_members",JSON.stringify(db.members));
 localStorage.setItem("shdw_requests",JSON.stringify(db.requests));
 localStorage.setItem("shdw_news",JSON.stringify(db.news));
 localStorage.setItem("shdw_mvp",JSON.stringify(db.mvp));
 render();
}

function render(){
 $("stMembers").textContent=db.members.length;
 $("membersList").innerHTML=db.members.map(m=>`<div class="member"><div class="avatar">${m.avatar||"🎮"}</div><h3>${m.gamertag}</h3><p>${m.rank}<br>${m.region}<br>Discord: ${m.discord||"No agregado"}</p></div>`).join("");
 $("mvpBox").innerHTML=`<strong>${db.mvp.name}</strong><p>${db.mvp.region}</p><p>${db.mvp.reason}</p>`;
 $("newsList").innerHTML=db.news.map(n=>`<div class="news"><h3>${n.title}</h3><p>${n.body}</p></div>`).join("");
 renderRequests();
}

$("applyForm").onsubmit=e=>{
 e.preventDefault();
 const entry=Object.fromEntries(new FormData(e.target).entries());
 entry.date=new Date().toLocaleString();
 db.requests.push(entry); save(); e.target.reset(); $("applyMsg").classList.remove("hidden");
};

$("unlock").onclick=()=>{
 if($("pin").value===PIN){$("admin").classList.remove("hidden");$("loginBox").classList.add("hidden"); renderRequests();}
 else alert("PIN incorrecto");
};

$("addMember").onclick=()=>{
 db.members.push({gamertag:$("mGamertag").value||"Nuevo miembro", rank:$("mRank").value||"Recruit", region:$("mRegion").value||"Global", discord:$("mDiscord").value||"", avatar:"🎮"});
 save();
};
$("saveMvp").onclick=()=>{
 db.mvp={name:$("mvpName").value||"Por definir",region:$("mvpRegion").value||"Global",reason:$("mvpReason").value||"Seleccionado por SCORPIONBZ"};
 save();
};
$("addNews").onclick=()=>{
 db.news.unshift({title:$("newsTitle").value||"Anuncio SHDW", body:$("newsBody").value||"Nuevo anuncio oficial."});
 save();
};

function renderRequests(){
 const box=$("requestsList"); if(!box) return;
 box.innerHTML=db.requests.length?db.requests.map((r,i)=>`<div class="request"><h3>${r.gamertag}</h3><p>${r.email}<br>${r.region} · ${r.platform} · K/D ${r.kd}</p><button onclick="acceptReq(${i})" class="gold">Aceptar</button> <button onclick="rejectReq(${i})" class="dark">Rechazar</button></div>`).join(""):"<p class='muted'>Sin solicitudes por ahora.</p>";
}
window.acceptReq=i=>{const r=db.requests.splice(i,1)[0];db.members.push({gamertag:r.gamertag,rank:"Recruit",region:r.region,discord:r.discord,avatar:"🔰"});save();}
window.rejectReq=i=>{db.requests.splice(i,1);save();}

if("serviceWorker" in navigator) navigator.serviceWorker.register("service-worker.js");
