export function navToggle() {
    const root = document.documentElement;
    const navBtn = document.querySelector("#js-header-toggle");
    
    navBtn.addEventListener("click", () => {
        root.classList.toggle("show-nav")
    })
}