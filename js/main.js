const playground = document.getElementById("playground");
const input = document.getElementById("input");

const list = [];

input.onkeyup = (event) => {
  if (event.key === "Enter") {
    add();
  }
};

function add() {
  if (input.value) {
    list.push(input.value);
    updateUI();
    input.value = "";
  } else {
    alert("Fill input!");
  }
  input.focus();
}

function deleteItem(index) {
  list.splice(index, 1);
  updateUI();
}

function updateUI() {
  playground.innerHTML = "";
  list.forEach((item, index) => {
    const newItem = `
    <div class="flex items-center justify-between rounded-full px-5">
      <li class="text-secondary text-3xl font-semibold cursor-pointer">${item}</li>
      <button class="text-xl leading-5 text-red font-bold text-red-600" onclick="deleteItem(${index})"><img src="./images/delete.svg"></button>
    </div>
    `;
    playground.innerHTML += newItem;
  });
}

function clearList() {
  playground.innerHTML = "";
  list.length = 0;
  document.getElementById("clearButton").style.display = "none";
}