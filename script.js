const header = document.querySelector("header");
const floatingItems = document.querySelectorAll(".tile");

function updateMotion(){
  const scroll = window.scrollY;

  header.classList.toggle("scrolled", scroll > 60);

  floatingItems.forEach((item, index) => {
    const baseSpeed = parseFloat(item.dataset.speed || 0.04);
    const baseScale = parseFloat(item.dataset.scale || 1);
    const phase = index * 0.9;

    let depth = 1;

    if(index % 3 === 0) depth = 1.65;      // foreground
    if(index % 3 === 1) depth = 1.00;      // middle
    if(index % 3 === 2) depth = 0.55;      // background

    let x = 0;
    let y = scroll * baseSpeed * depth;

    if(index % 5 === 0){
      x = Math.sin(scroll * 0.002 + phase) * 150 * depth;
      y += Math.cos(scroll * 0.0016 + phase) * 55 * depth;
    }

    if(index % 5 === 1){
      x = -Math.sin(scroll * 0.0018 + phase) * 130 * depth;
      y += Math.sin(scroll * 0.0022 + phase) * 75 * depth;
    }

    if(index % 5 === 2){
      x = Math.cos(scroll * 0.002 + phase) * 95 * depth;
      y += Math.sin(scroll * 0.0014 + phase) * 125 * depth;
    }

    if(index % 5 === 3){
      x = Math.sin(scroll * 0.0015 + phase) * 190 * depth;
      y += Math.cos(scroll * 0.002 + phase) * 85 * depth;
    }

    if(index % 5 === 4){
      x = -Math.cos(scroll * 0.0017 + phase) * 115 * depth;
      y += Math.sin(scroll * 0.0019 + phase) * 105 * depth;
    }

    const scale = baseScale + Math.sin(scroll * 0.0015 + phase) * 0.08 * depth;
    const rotate = Math.sin(scroll * 0.001 + phase) * 1.1 * depth;

    item.style.transform =
      `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
  });
}

window.addEventListener("scroll", updateMotion, { passive:true });
window.addEventListener("load", updateMotion);
