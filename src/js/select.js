export function chooseSelect(){
  const select = document.querySelector("#js-select");
  const selectMenu = document.querySelector("#js-select-menu");
  const selectTitle = document.querySelector(".select__title");
  const selectItems = document.querySelectorAll(".check");
  const selectCaption = document.querySelector(".select__caption");
  
  select.addEventListener("click", () => {
    select.classList.toggle("select__top--active");
    
    selectMenu.classList.toggle("select__menu--active")
    selectCaption.classList.toggle("select__caption--none");
  })

  selectItems.forEach(item => {
    item.addEventListener("change", () => {
      item.classList.toggle("item");

      let checked = document.querySelectorAll(".check input[type='checkbox']:checked");
      
      if(checked && checked.length > 0){
            if(checked.length == 1){
              const itemText = item.querySelector(".check__input");
              selectTitle.textContent = itemText.value;
            }
            else if (checked.length > 1 && checked.length < 5){
              selectTitle.textContent = `Выбрано ${checked.length} варианта`
            }
            else if(checked.length == selectItems.length){
              selectTitle.textContent = `Выбраны все варианты`
            }
          }
    })
  })
}