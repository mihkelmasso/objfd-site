const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 60);

  document.querySelectorAll("[data-speed]").forEach((el) => {
    const speed = parseFloat(el.dataset.speed);
    const scale = parseFloat(el.dataset.scale || 1);
    const x = parseFloat(el.dataset.x || 0);
    const y = window.scrollY * speed;
    el.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  });
});
