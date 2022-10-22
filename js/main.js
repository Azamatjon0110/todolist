const elForm = document.querySelector(".form-js");
const elInput = elForm.querySelector(".input-js");
const elList = document.querySelector(".list-unstyled");

const array = [];

const renderArr = function(arr, element){
  element.innerHTML = "";
  arr.forEach(obj => {

    const item = document.createElement("li");
    item.classList.add("d-flex");
    item.classList.add("justify-content-between");
    item.classList.add("align-items-center");
    item.classList.add("me-3");
    item.classList.add("mb-3");
    item.classList.add("py-4");
    item.classList.add("px-2");
    item.classList.add("rounded-3");
    item.classList.add("bg-primary");
    item.classList.add("bg-opacity-50");
    item.dataset.id = obj.id;

    const elCount = document.createElement("span");
    elCount.classList.add("d-inline-block");
    elCount.classList.add("me-1", "me-md-2");
    elCount.textContent = obj.id ;

    const checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.classList.add("mt-0");
    checkBox.classList.add("me-2", "me-md-2");
    checkBox.setAttribute("type", "checkbox");

    const desc = document.createElement("p");
    desc.classList.add("mb-0");
    desc.classList.add("desc");
    desc.textContent = obj.elText;

    const btnDelete = document.createElement("button");
    btnDelete.classList.add("list-item");
    btnDelete.classList.add("btn");
    btnDelete.classList.add("btn-danger");
    btnDelete.classList.add("me-2");
    btnDelete.dataset.id = obj.id;
    btnDelete.textContent = "Delate";

    const addBtn = document.createElement("button");
    addBtn.classList.add("add-btn");
    addBtn.classList.add("add");
    addBtn.classList.add("btn");
    addBtn.classList.add("btn-success");
    addBtn.textContent = "Edite";


    const btnBox = document.createElement("div");
    btnBox.appendChild(btnDelete);
    btnBox.appendChild(addBtn);

    const elBox = document.createElement("div");
    elBox.classList.add("d-flex", "align-items-center")
    elBox.appendChild(elCount);
    elBox.appendChild(checkBox);
    elBox.appendChild(desc);

    item.appendChild(elBox);
    item.appendChild(btnBox);
    element.appendChild(item);

  });
}

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  array.push({
    id: array[array.length - 1]?.id + 1 || 1,
    elText: elInput.value,
    isComplete: false,
  })

  elForm.reset();
  renderArr(array, elList);
  console.log(array);

});

elList.addEventListener("click", function(evt){
  if (evt.target.matches(".list-item")){
    const deleteBtn = Number(evt.target.dataset.id);
    const index = array.findIndex((todo) => todo.id === deleteBtn);
    console.log(deleteBtn, index);
    array.splice(index, 1);
    console.log(array);
    renderArr(array, elList)
  }


})
