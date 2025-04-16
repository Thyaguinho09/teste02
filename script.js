document.addEventListener('DOMContentLoaded', () => {
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const themeSwitch = document.getElementById('themeSwitch');

  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

  if (darkMode) {
    document.body.classList.add('dark');
    themeSwitch.checked = true;
  }

  function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
      const li = document.createElement('li');
      li.textContent = task.text;
      if (task.completed) li.classList.add('completed');
      li.addEventListener('click', () => toggleTask(index));

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '🗑️';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        deleteTask(index);
      });

      li.appendChild(deleteBtn);
      taskList.appendChild(li);
    });
  }

  function addTask() {
    const text = taskInput.value.trim();
    if (text) {
      tasks.push({ text, completed: false });
      saveTasks();
      renderTasks();
      taskInput.value = '';
    }
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }

  function toggleTheme() {
    document.body.classList.toggle('dark');
    localStorage.setItem('darkMode', JSON.stringify(document.body.classList.contains('dark')));
  }

  addTaskBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keydown', (e) => e.key === 'Enter' && addTask());
  themeSwitch.addEventListener('change', toggleTheme);

  renderTasks();
});
