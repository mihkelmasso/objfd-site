const header = document.querySelector("header");
const floatingItems = document.querySelectorAll(".tile");

function updateMotion(){
  const scroll = window.scrollY;

  header.classList.toggle("scrolled", scroll > 60);

  floatingItems.forEach((item, index) => {
    const baseSpeed = parseFloat(item.dataset.speed || 0.04);
    const baseScale = parseFloat(item.dataset.scale || 1);
    const phase = index * 0.9;

    let x = 0;
    let y = scroll * baseSpeed;

    if(index % 5 === 0){
      x = Math.sin(scroll * 0.002 + phase) * 140;
      y += Math.cos(scroll * 0.0016 + phase) * 50;
    }

    if(index % 5 === 1){
      x = -Math.sin(scroll * 0.0018 + phase) * 120;
      y += Math.sin(scroll * 0.0022 + phase) * 70;
    }

    if(index % 5 === 2){
      x = Math.cos(scroll * 0.002 + phase) * 90;
      y += Math.sin(scroll * 0.0014 + phase) * 120;
    }

    if(index % 5 === 3){
      x = Math.sin(scroll * 0.0015 + phase) * 180;
      y += Math.cos(scroll * 0.002 + phase) * 80;
    }

    if(index % 5 === 4){
      x = -Math.cos(scroll * 0.0017 + phase) * 110;
      y += Math.sin(scroll * 0.0019 + phase) * 100;
    }

    const scale = baseScale + Math.sin(scroll * 0.0015 + phase) * 0.08;
    const rotate = Math.sin(scroll * 0.001 + phase) * 1.2;

    item.style.transform =
      `translate3d(${x}px, ${y}px, 0) scale(${scale}) rotate(${rotate}deg)`;
  });
}

window.addEventListener("scroll", updateMotion, { passive:true });
window.addEventListener("load", updateMotion);
