// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {
    // Obtiene los formularios y listas de eventos y tareas del DOM.
    const eventForm = document.getElementById('eventForm');
    const taskForm = document.getElementById('taskForm');
    const eventList = document.getElementById('eventList');
    const taskList = document.getElementById('taskList');

    // Añade un listener al evento 'submit' para cada formulario.
    eventForm.addEventListener('submit', addEvent);
    taskForm.addEventListener('submit', addTask);

    // Función para agregar un nuevo evento.
    function addEvent(e) {
        e.preventDefault();  // Previene el envío del formulario.
        const title = document.getElementById('eventTitle').value;
        const date = document.getElementById('eventDate').value;
        const time = document.getElementById('eventTime').value;

        const event = { title, date, time };  // Crea un objeto de evento.
        createEventElement(event);  // Crea y añade el elemento del evento a la lista.
        saveToLocalStorage('events', event);  // Guarda el evento en el almacenamiento local.

        eventForm.reset();  // Resetea el formulario.
    }

    // Función para agregar una nueva tarea.
    function addTask(e) {
        e.preventDefault();  // Previene el envío del formulario.
        const title = document.getElementById('taskTitle').value;
        const difficulty = document.getElementById('taskDifficulty').value;

        const task = { title, difficulty };  // Crea un objeto de tarea.
        createTaskElement(task);  // Crea y añade el elemento de la tarea a la lista.
        saveToLocalStorage('tasks', task);  // Guarda la tarea en el almacenamiento local.

        taskForm.reset();  // Resetea el formulario.
    }

    // Función para crear un elemento de evento en el DOM.
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

        // Añade listeners a los botones de editar y eliminar.
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        editBtn.addEventListener('click', () => editEvent(event, li));
        deleteBtn.addEventListener('click', () => deleteEvent(event, li));

        // Añade el elemento a la lista de eventos.
        eventList.appendChild(li);
    }

    // Función para crear un elemento de tarea en el DOM.
    function createTaskElement(task) {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="task-details">
                <strong>${task.title}</strong>
                <p>Dificultad: ${task.difficulty}</p>
            </div>
            <div class="button-container">
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            </div>
        `;

        // Añade listeners a los botones de editar y eliminar.
        const editBtn = li.querySelector('.edit-btn');
        const deleteBtn = li.querySelector('.delete-btn');
        editBtn.addEventListener('click', () => editTask(task, li));
        deleteBtn.addEventListener('click', () => deleteTask(task, li));

        // Añade el elemento a la lista de tareas.
        taskList.appendChild(li);
    }

    // Función para editar un evento.
    function editEvent(event, li) {
        // Solicita al usuario que ingrese nuevos valores.
        const newTitle = prompt('Nuevo título del evento:', event.title);
        const newDate = prompt('Nueva fecha del evento (YYYY-MM-DD):', event.date);
        const newTime = prompt('Nueva hora del evento (HH:MM):', event.time);
        if (newTitle && newDate && newTime) {
            // Actualiza el objeto de evento y su representación en el DOM.
            event.title = newTitle;
            event.date = newDate;
            event.time = newTime;
            li.querySelector('.event-details').innerHTML = `
                <strong>${event.title}</strong>
                <p>Fecha: ${event.date}</p>
                <p>Hora: ${event.time}</p>
            `;
            updateLocalStorage('events', event);  // Actualiza el evento en el almacenamiento local.
        }
    }

    // Función para editar una tarea.
    function editTask(task, li) {
        // Solicita al usuario que ingrese nuevos valores.
        const newTitle = prompt('Nuevo título de la tarea:', task.title);
        const newDifficulty = prompt('Nueva dificultad de la tarea:', task.difficulty);
        if (newTitle && newDifficulty) {
            // Actualiza el objeto de tarea y su representación en el DOM.
            task.title = newTitle;
            task.difficulty = newDifficulty;
            li.querySelector('.task-details').innerHTML = `
                <strong>${task.title}</strong>
                <p>Dificultad: ${task.difficulty}</p>
            `;
            updateLocalStorage('tasks', task);  // Actualiza la tarea en el almacenamiento local.
        }
    }

    // Función para eliminar un evento.
    function deleteEvent(event, li) {
        li.remove();  // Elimina el elemento del DOM.
        removeFromLocalStorage('events', event);  // Elimina el evento del almacenamiento local.
    }

    // Función para eliminar una tarea.
    function deleteTask(task, li) {
        li.remove();  // Elimina el elemento del DOM.
        removeFromLocalStorage('tasks', task);  // Elimina la tarea del almacenamiento local.
    }

    // Función para guardar un objeto en el almacenamiento local.
    function saveToLocalStorage(key, item) {
        let items = localStorage.getItem(key);
        if (items) {
            items = JSON.parse(items);  // Parsea los items existentes.
        } else {
            items = [];  // Si no hay items, crea un array vacío.
        }
        items.push(item);  // Añade el nuevo item.
        localStorage.setItem(key, JSON.stringify(items));  // Guarda los items actualizados.
    }

    // Función para actualizar un objeto en el almacenamiento local.
    function updateLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.map(i => (i.title === item.title && i.difficulty === item.difficulty) ? item : i);  // Actualiza el item específico.
        localStorage.setItem(key, JSON.stringify(items));  // Guarda los items actualizados.
    }

    // Función para eliminar un objeto del almacenamiento local.
    function removeFromLocalStorage(key, item) {
        let items = JSON.parse(localStorage.getItem(key));
        items = items.filter(i => i.title !== item.title || i.difficulty !== item.difficulty);  // Filtra y elimina el item específico.
        localStorage.setItem(key, JSON.stringify(items));  // Guarda los items actualizados.
    }

    // Función para cargar eventos y tareas desde el almacenamiento local al iniciar.
    function loadFromLocalStorage() {
        const events = JSON.parse(localStorage.getItem('events')) || [];  // Carga los eventos desde el almacenamiento local.
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];  // Carga las tareas desde el almacenamiento local.

        // Crea elementos DOM para cada evento y tarea cargados.
        events.forEach(event => createEventElement(event));
        tasks.forEach(task => createTaskElement(task));
    }

    loadFromLocalStorage();  // Carga los eventos y tareas al cargar la página.
});
