let deferredPrompt;
const installBtn = document.getElementById("installBtn");
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

window.addEventListener("load", () => {
  setTimeout(() => document.getElementById("splash").classList.add("hide"), 900);
});

menuBtn.addEventListener("click", () => mobileMenu.classList.toggle("show"));
mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => mobileMenu.classList.remove("show")));

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  installBtn.classList.remove("hidden");
});

installBtn.addEventListener("click", async () => {
  if (!deferredPrompt) {
    alert("En Chrome: toca los 3 puntos y elige 'Agregar a pantalla principal'.");
    return;
  }
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  installBtn.classList.add("hidden");
});

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
