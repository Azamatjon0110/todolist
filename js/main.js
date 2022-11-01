const elForm = document.querySelector(".form-js");
const elInput = elForm.querySelector(".input-js");
const elList = document.querySelector(".list-unstyled");
const elBtn = document.querySelector(".form-submit");
const elAllComplete = document.querySelector(".all-complete");
const elComplete = document.querySelector(".complete");
const elUncomplete = document.querySelector(".uncomplete");
const elTemplate = document.querySelector(".temp-movie").content;

// const array = [];
const elTemplateFragment = document.createDocumentFragment()

const renderArr = function(arr, element){
  element.innerHTML = "";
  elAllComplete.textContent = arr.length;
  const completeArray = arr.filter(function(item){
    return item.isComplete ;
  })
  elComplete.textContent = completeArray.length;
  const uncompleteArray = arr.filter(function(item){
    return item.isComplete == false;
  })
  elUncomplete.textContent = uncompleteArray.length

  arr.forEach(obj => {
    const templateItem = elTemplate.cloneNode(true);
    templateItem.querySelector(".list-item").dataset.id = obj.id;
    templateItem.querySelector(".count-number").dataset.id = obj.id;
    templateItem.querySelector(".desc").textContent = obj.elText;
    templateItem.querySelector(".form-check-input").dataset.id = obj.id;

    if (obj.isComplete){
      templateItem.querySelector(".form-check-input").checked = true;
      templateItem.querySelector(".desc").style.textDecoration = "line-through";
    }

    templateItem.querySelector(".delete-btn").dataset.id = obj.id;
    templateItem.querySelector(".edit-btn").dataset.id = obj.id;

    element.appendChild(templateItem);
  });

};

const localArray = JSON.parse(window.localStorage.getItem("todosList"));
const array = localArray || [];
renderArr(array,elList);
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
    window.localStorage.setItem("todosList", JSON.stringify(array));
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
    elBtn.textContent = "Check";
    window.localStorage.setItem("todosList", JSON.stringify(array));
    renderArr(array, elList);
  }
  renderArr(array, elList);
});

elList.addEventListener("click", function(evt){
  if (evt.target.matches(".delete-btn")){
    const deleteBtn = Number(evt.target.dataset.id);
    const index = array.findIndex(function(todo) {
      return todo.id === deleteBtn;
    });
    array.splice(index, 1);
    renderArr(array, elList);
    window.localStorage.setItem("todosList", JSON.stringify(array));
    editingID = index.id;
    formType = formTypes.Save;
  };
  if (evt.target.matches(".edit-btn")){
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
    indexCheckBox.isComplete = !indexCheckBox.isComplete;
    window.localStorage.setItem("todosList", JSON.stringify(array));
    renderArr(array, elList);

  }
})
