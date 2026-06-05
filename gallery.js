const gallery = document.getElementById("gallery");

if (
  gallery &&
  typeof PRODUCT_FOLDER !== "undefined" &&
  typeof IMAGE_COUNT !== "undefined"
) {
  for (let i = 2; i <= IMAGE_COUNT; i++) {
    const num = String(i).padStart(2, "0");
    const img = document.createElement("img");

    img.src = `../images/${PRODUCT_FOLDER}/${num}.jpg`;

    img.onerror = () => {
      img.src = `../images/${PRODUCT_FOLDER}/${num}.png`;
      img.onerror = () => img.remove();
    };

    gallery.appendChild(img);
  }
}
