(()=>{"use strict";!function(){const e=document.querySelector("#js-favorite");e.addEventListener("click",(()=>{e.classList.toggle("btn__square-icon--active")}))}(),function(){const e=document.querySelector("#js-tab");e.addEventListener("click",(()=>{e.classList.toggle("tab--active")}))}(),document.querySelectorAll(".accordion__details").forEach((e=>{e.addEventListener("toggle",(function(){const t=e.parentElement;e.open?t.classList.add("accordion--active"):t.classList.remove("accordion--active")}))}))})();