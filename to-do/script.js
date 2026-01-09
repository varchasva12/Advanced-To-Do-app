let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const search = document.getElementById("search");
const counter = document.getElementById("counter");
const themeBtn = document.getElementById("themeBtn");

renderTasks();

// Add task
function addTask() {
  if (taskInput.value === "") return;
  tasks.push({ text: taskInput.value, done: false });
  taskInput.value = "";
  save();
}

// Render tasks
function renderTasks() {
  taskList.innerHTML = "";

  let filtered = tasks.filter(t =>
    (filter === "all") ||
    (filter === "completed" && t.done) ||
    (filter === "pending" && !t.done)
  );

  filtered = filtered.filter(t =>
    t.text.toLowerCase().includes(search.value.toLowerCase())
  );

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.done) li.classList.add("completed");

    li.innerHTML = `
      <span onclick="toggleDone(${index})">${task.text}</span>
      <div class="actions">
        <span onclick="editTask(${index})">✏️</span>
        <span onclick="deleteTask(${index})">❌</span>
      </div>
    `;
    taskList.appendChild(li);
  });

  counter.innerText = `${tasks.length} Tasks`;
}

// Toggle done
function toggleDone(i) {
  tasks[i].done = !tasks[i].done;
  save();
}

// Delete
function deleteTask(i) {
  tasks.splice(i, 1);
  save();
}

// Edit
function editTask(i) {
  const newText = prompt("Edit task:", tasks[i].text);
  if (newText) tasks[i].text = newText;
  save();
}

// Filter
function filterTasks(type) {
  filter = type;
  renderTasks();
}

// Search
search.addEventListener("input", renderTasks);

// Save
function save() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Enter key
taskInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addTask();
});

// Theme
themeBtn.onclick = () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark"));
};

if (localStorage.getItem("theme") === "true") {
  document.body.classList.add("dark");
}
