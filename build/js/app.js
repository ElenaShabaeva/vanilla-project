(()=>{"use strict";!function(){const e=document.querySelector("#js-favorite");e.addEventListener("click",(()=>{e.classList.toggle("btn__square-icon--active")}))}(),function(){const e=document.querySelector("#js-tab");e.addEventListener("click",(()=>{e.classList.toggle("tab--active")}))}(),document.querySelectorAll(".accordion__details").forEach((e=>{e.addEventListener("toggle",(function(){const t=e.parentElement;e.open?t.classList.add("accordion--active"):t.classList.remove("accordion--active")}))})),function(){const e=document.querySelector("#js-event-card"),t=e.querySelector(".event-card__time"),c=e.querySelector(".event-card__time-text"),n=new Date("2025-03-22T00:00:00.000Z"),o=function(){const e=new Date,t=n-e;return Math.ceil(t/864e5)}();o>0&&(c.textContent=`Через ${o} дней`,o<=3&&(c.textContent=`Через ${o} дня`,t.classList.add("event-card__time--red"))),0===o&&(c.textContent="Сегодня",t.classList.add("event-card__time--today")),o<0&&(e.querySelector(".event-card__time-icon").style.display="none",c.textContent="Завершено",t.classList.add("event-card__time--complete"))}()})();