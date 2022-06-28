let menu = document.querySelector(".menu");
let aside = document.querySelector("aside");
let modalToggle = document.querySelector("#modalToggle");
let modalOverlay = document.querySelector(".modal-overlay");
let close = document.querySelector(".close");

menu.addEventListener("click", () => {
  aside.classList.toggle("show");
});

modalToggle.addEventListener("click", (event) => {
  event.preventDefault();
  modalOverlay.classList.toggle("show");
});

close.addEventListener("click", () => {
  modalOverlay.classList.toggle("show");
});
