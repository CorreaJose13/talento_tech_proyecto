const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const closeModal = function () {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
};


overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
        closeModal();
    }
});

const openModal = function () {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
};