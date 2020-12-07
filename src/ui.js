export const modFox = function modFox(state) {
  document.querySelector(".fox").className = `fox fox-${state}`;
};
export const modScene = function modScene(state) {
  document.querySelector(".game").className = `game ${state}`;
};
export const togglePoopBag = function togglePoopBag(show) {
  document.querySelector(".poop-bag").classList.toggle("hidden", !show);
};
export const writeModal = function writeModal(text = "") {
  document.querySelector(
    ".modal"
  ).innerHTML = `<div class="modal-inner">${text}</div>`;
};
export const toggleMonsters = () => {
  document.querySelectorAll(".monster").forEach(item => item.classList.toggle("hidden"))
};
export const toggleAttention = () => {
  document.querySelector(".attention").classList.toggle("hidden")
};

export const hideAttackStuff = () => {
  document.querySelectorAll(".monster").forEach(item => item.classList.add("hidden"))
  document.querySelector(".attention").classList.add("hidden")

}
