const header = document.querySelector("header");
const floatingItems = document.querySelectorAll(".tile");
const cursor = document.querySelector(".cursor");

/* HEADER + FLOATING GALLERY */
function updateMotion() {
  const scroll = window.scrollY;

  if (header) {
    header.classList.toggle("scrolled", scroll > 60);
  }

  floatingItems.forEach((item, index) => {
    const baseSpeed = parseFloat(item.dataset.speed || 0.04);
    const baseScale = parseFloat(item.dataset.scale || 1);
    const phase = index * 0.9;

    let depth = 1;

    if (index % 3 === 0) depth = 1.65;
    if (index % 3 === 1) depth = 1.0;
    if (index % 3 === 2) depth = 0.55;

    let x = 0;
    let y = scroll * baseSpeed * depth;

    if (index % 5 === 0) {
      x = Math.sin(scroll * 0.002 + phase) * 150 * depth;
      y += Math.cos(scroll * 0.0016 + phase) * 55 * depth;
    }

    if (index % 5 === 1) {
      x = -Math.sin(scroll * 0.0018 + phase) * 130 * depth;
      y += Math.sin(scroll * 0.0022 + phase) * 75 * depth;
    }

    if (index % 5 === 2) {
      x = Math.cos(scroll * 0.002 + phase) * 95 * depth;
      y += Math.sin(scroll * 0.0014 + phase) * 125 * depth;
    }

    if (index % 5 === 3) {
      x = Math.sin(scroll * 0.0015 + phase) * 190 * depth;
      y += Math.cos(scroll * 0.002 + phase) * 85 * depth;
    }

    if (index % 5 === 4) {
      x = -Math.cos(scroll * 0.0017 + phase) * 115 * depth;
      y += Math.sin(scroll * 0.0019 + phase) * 105 * depth;
    }

    const scale =
      baseScale + Math.sin(scroll * 0.0015 + phase) * 0.08 * depth;

    const rotate =
      Math.sin(scroll * 0.001 + phase) * 1.1 * depth;

    item.style.transform =
      `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
  });
}

window.addEventListener("scroll", updateMotion, { passive: true });
window.addEventListener("load", updateMotion);


/* INERTIA DONUT CURSOR */
if (cursor && window.matchMedia("(pointer:fine)").matches) {
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;

  let cursorX = mouseX;
  let cursorY = mouseY;

  let prevX = cursorX;
  let prevY = cursorY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.classList.remove("hidden");
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * 0.075;
    cursorY += (mouseY - cursorY) * 0.075;

    const dx = cursorX - prevX;
    const dy = cursorY - prevY;
    const speed = Math.sqrt(dx * dx + dy * dy);

    const stretch = Math.min(speed * 0.22, 22);

    cursor.style.left = cursorX + "px";
    cursor.style.top = cursorY + "px";

    cursor.style.transform =
      `translate(-50%, -50%) scale(${1 + stretch / 100}, ${1 - stretch / 320})`;

    prevX = cursorX;
    prevY = cursorY;

    requestAnimationFrame(animateCursor);
  }

  animateCursor();

  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("hover");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("hover");
    });
  });

  document.querySelectorAll(".tile.product").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.remove("hover");
      cursor.classList.add("product");
    });

    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("product");
    });
  });

  document.addEventListener("mouseleave", () => {
    cursor.classList.add("hidden");
  });

  document.addEventListener("mouseenter", () => {
    cursor.classList.remove("hidden");
  });
}
