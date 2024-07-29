document.addEventListener('DOMContentLoaded', () => {
    const eventForm = document.getElementById('eventForm');
    const taskForm = document.getElementById('taskForm');
    const eventList = document.getElementById('eventList');
    const taskList = document.getElementById('taskList');

    eventForm.addEventListener('submit', addEvent);
    taskForm.addEventListener('submit', addTask);

    function addEvent(e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;

        const event = { title };
        createEventElement(event);
        saveToLocalStorage('events', event);

        eventForm.reset();
    }

    function addTask(e) {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;

        const task = { title };
        createTaskElement(task);
        saveToLocalStorage('tasks', task);

        taskForm.reset();
    }

    function createEventElement(event) {
        const li = document.createElement('li');
        li.textContent = event.title;
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('edit-btn');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(buttonContainer);

        editBtn.addEventListener('click', () => editEvent(event, li));
        deleteBtn.addEventListener('click', () => deleteEvent(event, li));

        eventList.appendChild(li);
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.textContent = task.title;
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Editar';
        editBtn.classList.add('edit-btn');
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.classList.add('delete-btn');
        buttonContainer.appendChild(editBtn);
        buttonContainer.appendChild(deleteBtn);
        li.appendChild(buttonContainer);

        editBtn.addEventListener('click', () => editTask(task, li));
        deleteBtn.addEventListener('click', () => deleteTask(task, li));

        taskList.appendChild(li);
    }

    function editEvent(event, li) {
        const newTitle = prompt('Nuevo título del evento:', event.title);
        if (newTitle) {
            event.title = newTitle;
            li.firstChild.textContent = event.title;
            updateLocalStorage('events', event);
        }
    }

    function editTask(task, li) {
        const newTitle = prompt('Nuevo título de la tarea:', task.title);
        if (newTitle) {
            task.title = newTitle;
            li.firstChild.textContent = task.title;
            updateLocalStorage('tasks', task);
        }
    }

    function deleteEvent(event, li) {
        li.remove();
        removeFromLocalStorage('events', event);
    }

    function deleteTask(task, li) {
        li.remove();
        removeFromLocalStorage('tasks', task);
    }

    function saveToLocalStorage(key, item) {
        let items = localStorage.getItem(key);
        if (items) {
            items = JSON.parse(items);
        } else {
            items = [];
        }
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function updateLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.map(i => (i.title === item.title) ? item : i);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function removeFromLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.filter(i => i.title !== item.title);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function loadFromLocalStorage() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        events.forEach(event => createEventElement(event));
        tasks.forEach(task => createTaskElement(task));
    }
     

    eventForm.addEventListener('submit', addEvent);
    taskForm.addEventListener('submit', addTask);

    function addEvent(e) {
        e.preventDefault();
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;

        const event = { title, date, time };
        createEventElement(event);
        saveToLocalStorage('events', event);

        eventForm.reset();
    }

    function addTask(e) {
        e.preventDefault();
        const title = document.getElementById('taskTitle').value;

        const task = { title };
        createTaskElement(task);
        saveToLocalStorage('tasks', task);

        taskForm.reset();
    }

    function createEventElement(event) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="event-details">
                <strong>${event.title}</strong>
                <p>Fecha: ${event.date}</p>
                <p>Hora: ${event.time}</p>
            </div>
            <div class="button-container">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => editEvent(event, li));
        deleteBtn.addEventListener('click', () => deleteEvent(event, li));

        eventList.appendChild(li);
    }

    function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong>
            </div>
            <div class="button-container">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');

        editBtn.addEventListener('click', () => editTask(task, li));
        deleteBtn.addEventListener('click', () => deleteTask(task, li));

        taskList.appendChild(li);
    }

    function editEvent(event, li) {
        const newTitle = prompt('Nuevo título del evento:', event.title);
        const newDate = prompt('Nueva fecha del evento (YYYY-MM-DD):', event.date);
        const newTime = prompt('Nueva hora del evento (HH:MM):', event.time);
        if (newTitle && newDate && newTime) {
            event.title = newTitle;
            event.date = newDate;
            event.time = newTime;
            li.querySelector('.event-details').innerHTML = `
                <strong>${event.title}</strong>
                <p>Fecha: ${event.date}</p>
                <p>Hora: ${event.time}</p>
            `;
            updateLocalStorage('events', event);
        }
    }

    function editTask(task, li) {
        const newTitle = prompt('Nuevo título de la tarea:', task.title);
        if (newTitle) {
            task.title = newTitle;
            li.querySelector('.task-details').innerHTML = `<strong>${task.title}</strong>`;
            updateLocalStorage('tasks', task);
        }
    }

    function deleteEvent(event, li) {
        li.remove();
        removeFromLocalStorage('events', event);
    }

    function deleteTask(task, li) {
        li.remove();
        removeFromLocalStorage('tasks', task);
    }

    function saveToLocalStorage(key, item) {
        let items = localStorage.getItem(key);
        if (items) {
            items = JSON.parse(items);
        } else {
            items = [];
        }
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function updateLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.map(i => (i.title === item.title && i.date === item.date && i.time === item.time) ? item : i);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function removeFromLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.filter(i => i.title !== item.title || i.date !== item.date || i.time !== item.time);
        localStorage.setItem(key, JSON.stringify(items));
    }

    function loadFromLocalStorage() {
        const events = JSON.parse(localStorage.getItem('events')) || [];
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        events.forEach(event => createEventElement(event));
        tasks.forEach(task => createTaskElement(task));
    }

 
    loadFromLocalStorage();

});
