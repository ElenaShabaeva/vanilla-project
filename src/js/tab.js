export function clickTab() {
    const tab = document.querySelector("#js-tab");
    tab.addEventListener("click", () => {
        tab.classList.toggle("tab--active");
    });
}
