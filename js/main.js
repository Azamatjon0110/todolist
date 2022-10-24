const elForm = document.querySelector(".form-js");
const elInput = elForm.querySelector(".input-js");
const elList = document.querySelector(".list-unstyled");
const elBtn = document.querySelector(".form-submit");
const elAllComplete = document.querySelector(".all-complete");
const elComplete = document.querySelector(".complete");
const elUncomplete = document.querySelector(".uncomplete");

const array = [];

const renderArr = function(arr, element){
  element.innerHTML = "";
  let allComplete = 0;
  let complete = 0;
  let unComplete = 0;

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



    const desc = document.createElement("p");
    desc.classList.add("mb-0");
    desc.classList.add("desc");
    desc.textContent = obj.elText;

    const checkBox = document.createElement("input");
    checkBox.classList.add("form-check-input");
    checkBox.classList.add("mt-0");
    checkBox.dataset.id = obj.id;
    checkBox.classList.add("me-2", "me-md-2");
    checkBox.setAttribute("type", "checkbox");

    if (obj.isComplete){
      checkBox.checked = true;
      desc.style.textDecoration = "line-through";
      complete++;
    }else{
      unComplete++;
    }

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
    addBtn.dataset.id = obj.id;
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
    allComplete++;
  });
  elAllComplete.textContent = allComplete;
  elComplete.textContent = complete;
  elUncomplete.textContent = unComplete;
};

const formTypes = {
  Save: "save",
  Edit: "edit",
};

let formType = formTypes.Save;
let editingID = null;

elForm.addEventListener("submit", function(evt){
  evt.preventDefault();

  if (formType === formTypes.Save){
    array.push({
      id: array[array.length - 1]?.id + 1 || 1,
      elText: elInput.value,
      isComplete: false,
    })
    renderArr(array, elList);
    elForm.reset();
  };

  if (formType === formTypes.Edit){
    const obj = {
      id : editingID,
      elText : elInput.value,
      isComplete: false,
    };
    const editingFoundIndex = array.findIndex(function(todo){
      return todo.id === obj.id;
    });
    array.splice(editingFoundIndex, 1, obj);
    renderArr(array, elList);
    elForm.reset();
  }

  renderArr(array, elList);
  elForm.reset();

});

elList.addEventListener("click", function(evt){
  if (evt.target.matches(".list-item")){
    const deleteBtn = Number(evt.target.dataset.id);
    const index = array.findIndex(function(todo) {
      return todo.id === deleteBtn;
    });
    console.log(deleteBtn, index);
    array.splice(index, 1);
    console.log(array);
    renderArr(array, elList)
  };
  if (evt.target.matches(".add-btn")){
    const editeBtn = Number(evt.target.dataset.id);
    const index = array.find(function(todo) {
      return todo.id === editeBtn;
    });
    elInput.value = index.elText;
    elBtn.textContent = "Edit";
    editingID = index.id;
    formType = formTypes.Edit;
  };

  if (evt.target.matches(".form-check-input")){
    console.log(evt.target);
    const checkBoxId = Number(evt.target.dataset.id);
    const indexCheckBox = array.find(function(todo) {
      return todo.id === checkBoxId;
    });
    if(!indexCheckBox.isComplete){
      indexCheckBox.isComplete = true;
    }else{
      indexCheckBox.isComplete = false;
    }
    renderArr(array, elList);

  }

})
