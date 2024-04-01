document.addEventListener("DOMContentLoaded", function() {
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Event listener for adding a task
    addTaskBtn.addEventListener('click', addTask);

    // Function to load tasks from local storage
    function loadTasks() {
        const tasks = getTasks();
        tasks.forEach(task => addTaskToList(task));
    }

    // Function to save tasks to local storage
    function saveTasks(tasks) {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to get tasks from local storage
    function getTasks() {
        return JSON.parse(localStorage.getItem('tasks')) || [];
    }

    // Function to add a new task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        const tasks = getTasks();
        tasks.push(task);
        saveTasks(tasks);
        addTaskToList(task);
        taskInput.value = '';
    }

    // Function to add task to the list
    function addTaskToList(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <input type="checkbox" onchange="toggleTask(${task.id})" ${task.completed ? 'checked' : ''}>
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <button onclick="editTask(${task.id})">Edit</button>
            <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(li);
    }

    // Function to toggle task completion
    function toggleTask(id) {
        const tasks = getTasks();
        const index = tasks.findIndex(task => task.id === id);
        tasks[index].completed = !tasks[index].completed;
        saveTasks(tasks);
    }

    // Function to edit a task
    function editTask(id) {
        const tasks = getTasks();
        const index = tasks.findIndex(task => task.id === id);
        const newText = prompt('Edit Task', tasks[index].text);
        if (newText === null || newText.trim() === '') return;
        tasks[index].text = newText.trim();
        saveTasks(tasks);
        renderTasks();
    }

    // Function to delete a task
    function deleteTask(id) {
        const tasks = getTasks().filter(task => task.id !== id);
        saveTasks(tasks);
        renderTasks();
    }

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = '';
        loadTasks();
    }
});
