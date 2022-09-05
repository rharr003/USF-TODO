const form = document.querySelector("form");
const toDoSection = document.querySelector("#list ul");

let toDoList = [];
if (localStorage.toDoList) {
  toDoList = JSON.parse(localStorage.toDoList);
  toDoList.forEach(function (value) {
    const html = `<li id='${value.id}'>${value.text}<button>x</button></li>`;
    toDoSection.insertAdjacentHTML("beforeend", html);
  });
}

function updateStorage() {
  localStorage.toDoList = JSON.stringify(toDoList);
}

let index = checkID();

form.addEventListener("submit", function (e) {
  e.preventDefault();
  if (form.task.value === "") return;
  const html = `<li id='${index}'>${form.task.value}<button>x</button</li>`;
  toDoList.push({ text: form.task.value, id: index });
  toDoSection.insertAdjacentHTML("beforeend", html);
  index++;
  updateStorage();
  form.reset();
});

toDoSection.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("complete");
  } else if (e.target.tagName === "BUTTON") {
    index--;
    const id = Number(e.target.parentElement.id);
    toDoList = toDoList.filter((value) => value.id !== id);
    updateStorage();
    e.target.parentElement.remove();
  }
});

//ensures that the index used for ID is unique. So that localStorage can be updated accurately.
function checkID() {
  let index = 0;
  toDoList.forEach(function (value) {
    if (value.id > index) {
      index = value.id;
    }
  });
  return index + 1;
}
