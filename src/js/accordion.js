export function toggleAccordion() {
    const accordions = document.querySelectorAll(".accordion__details");
    accordions.forEach(item => {
        item.addEventListener("toggle", function() {
            const parent = item.parentElement;
            if (item.open) {
                parent.classList.add("accordion--active")
            } else {
                parent.classList.remove("accordion--active")
            }
        })
    });
}