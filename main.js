const fullDay = document.getElementById('full-day')
const hourEl = document.getElementById('hour')
const minuteEl = document.getElementById('minute')
const secondEl = document.getElementById('second')
const form = document.getElementById("form");
const listGroupTodo = document.getElementById("list-group-todo");

//  time
function getTime() {
  const now = new Date()
  const date = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
  const month = now.getMonth() < 10 ? '0' + (now.getMonth() + 1) : now.getMonth()
  const year = now.getFullYear()

  const hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
  const minute = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
  const second = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Avgust",
    "September",
    "October",
    "November",
    "December"
  ]

  const monthTitle = now.getMonth()
  fullDay.textContent = `${date} ${months[monthTitle]}, ${year}`
  hourEl.textContent = `${hour}`
  minuteEl.textContent = `${minute}`
  secondEl.textContent = `${second}`

  return `${hour}:${minute}, ${date}.${month}.${year}`;

}
setInterval(getTime, 10)

// status
let status = "all"

// check
let todos = JSON.parse(localStorage.getItem("list")) ? JSON.parse(localStorage.getItem("list")) : [];
// set to localStorage
function setTodos() {
  localStorage.setItem("list", JSON.stringify(todos))
}

if (todos.length) updateDOM();


// Show error function
function showMessage(where, message) {
  document.getElementById(`${where}`).textContent = message
  document.getElementById("message-create").style.color = ("red")

  setTimeout(() => {
    document.getElementById(`${where}`).textContent = ""
  }, 2500)
}

// Add
const add = (event) => {
  event.preventDefault();
  let todoText = form['input'].value.trim();
  if (todoText.length) {
    todos.unshift({
      title: todoText,
      isCompleted: false,
      status: "all", // "all" | "removed" | "new" | "done"
    });
    setTodos();
    updateDOM();
    event.target.input.value = "";
  } else {
    showMessage('message-create', 'Please, Enter some text...')
  }


};

// Status

// function filterData() {
//   if (status === "new") {
//     return list.filter((e) => e.status === "new");
//   } else if (status === "removed") {
//     return list.filter((e) => e.status === "removed");
//   } else if (status === "done") {
//     return list.filter((e) => e.status === "done");
//   }
// }

// Removed page
// function removedDOM() {
//   const deletedList = filterData();
//   listGroupTodo.innerHTML = "";
//   deletedList.forEach((el, index) => {
//     listGroupTodo.innerHTML += `

//     `;
//   });
// }

// Completed
function complete(index) {
  todos[index].isCompleted = !todos[index].isCompleted;
  setTodos();
  updateDOM();
}
// Delete-Task
function deleteTask(index) {
  todos.splice(index, 1);
  setTodos();
  updateDOM();
}
// Clear-Tasks
function clearTasks() {
  listGroupTodo.innerHTML = "";
}

// Update-Dom
function updateDOM() {
  const todos = JSON.parse(localStorage.getItem("list"))
  listGroupTodo.innerHTML = "";
  todos.forEach((el, index) => {
    listGroupTodo.innerHTML += `
          <div
          class="py-3 flex items-center justify-between relative after:absolute after:right-6 after:left-[51px] after:h-px after:bg-blue after:bottom-0">
          <div class="flex items-center gap-2 ">
              <span onclick="complete(${index})" class="cursor-pointer transition-color duration-300 ${el.isCompleted ? "icon-checked text-orange" : "icon-checkbox text-gray-100"} text-[64px] text-orange"></span>
            <h2 class="text-3.5xl font-normal ${
              el.isCompleted ? "text-gray-200 line-through" : "text-dark"
            }">
                ${el.title}
            </h2>
          </div>
          <button class="group flex items-center gap-4"  onclick="deleteTask(${index})">
              <span class="icon-trash text-[32px] text-red opacity-30 hover:opacity-100 duration-300"></span>
          </button>

          </div>
          `;
  });
}


// Tab
function controlBtns(statusName) {
  status = statusName;
  let x = document.getElementsByClassName("plan");
  for (let i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(status).style.display = "block";

}

controlBtns(status)