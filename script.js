const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
    menuButton.textContent = isOpen ? "✕" : "☰";
  });
  nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Ouvrir le menu");
    menuButton.textContent = "☰";
  }));
}
(() => {
  const images = [...document.querySelectorAll("main img")];
  if (!images.length) return;
  const viewer = document.createElement("div");
  viewer.className = "image-lightbox";
  viewer.setAttribute("role", "dialog");
  viewer.setAttribute("aria-modal", "true");
  viewer.setAttribute("aria-label", "Aperçu agrandi de la capture");
  viewer.innerHTML = '<button class="image-lightbox__close" type="button" aria-label="Fermer l’aperçu">×</button><img alt=""><p class="image-lightbox__hint">Échap ou clic en dehors de l’image pour fermer</p>';
  document.body.appendChild(viewer);
  const enlarged = viewer.querySelector("img");
  const close = viewer.querySelector("button");
  let previous = null;
  function closeViewer() {
    viewer.classList.remove("is-open");
    document.body.style.overflow = "";
    enlarged.removeAttribute("src");
    if (previous) previous.focus();
  }
  function openViewer(img) {
    previous = img;
    enlarged.src = img.currentSrc || img.src;
    enlarged.alt = img.alt || "Capture agrandie";
    viewer.classList.add("is-open");
    document.body.style.overflow = "hidden";
    close.focus();
  }
  images.forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", img.alt ? "Agrandir : " + img.alt : "Agrandir la capture");
    img.addEventListener("click", () => openViewer(img));
    img.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openViewer(img); }
    });
  });
  close.addEventListener("click", closeViewer);
  viewer.addEventListener("click", (event) => { if (event.target === viewer || event.target === enlarged) closeViewer(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape" && viewer.classList.contains("is-open")) closeViewer(); });
})();