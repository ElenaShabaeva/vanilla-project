export function dateEventCard() {
    const eventCard = document.querySelector("#js-event-card");
    const dateContainer = eventCard.querySelector(".event-card__time");
    const date = eventCard.querySelector(".event-card__time-text");
    
    const eventDate = new Date("2025-03-22T00:00:00.000Z");

    function calculateDaysUntilEvent() {
        const today = new Date();
        const diffTime = eventDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
    }

    const daysUntilEvent = calculateDaysUntilEvent();
    if (daysUntilEvent > 0){
        date.textContent = `Через ${daysUntilEvent} дней`;
        if (daysUntilEvent <= 3){
            date.textContent = `Через ${daysUntilEvent} дня`;
            dateContainer.classList.add("event-card__time--red")
        }
    }
    if (daysUntilEvent === 0){
        date.textContent = "Сегодня";
        dateContainer.classList.add("event-card__time--today")
    }
    if (daysUntilEvent < 0){
        const dateSvg = eventCard.querySelector(".event-card__time-icon")
        dateSvg.style.display = "none";
        date.textContent = "Завершено"
        dateContainer.classList.add("event-card__time--complete")
    }
}
