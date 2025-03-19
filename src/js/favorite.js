export function addFavorite() {
    const favorite = document.querySelector("#js-favorite");
    favorite.addEventListener("click", () => {
        favorite.classList.toggle("btn__square-icon--active");
    });
}
