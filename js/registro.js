// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el formulario de inicio de sesión y el mensaje de error del DOM.
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Crea un array vacío si no hay usuarios guardados en el almacenamiento local,
    // o carga los usuarios existentes desde el almacenamiento local.
    const users = JSON.parse(localStorage.getItem("users")) || []; 

    // Añade un listener al evento 'submit' del formulario.
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Previene el envío del formulario.

        // Obtiene los valores de los campos de correo electrónico y contraseña.
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Verifica si los campos de correo electrónico o contraseña están vacíos.
        if (email.trim() === "" || password.trim() === "") {
            errorMessage.textContent = "Por favor, completa todos los campos.";  // Muestra un mensaje de error.
            return;  // Sale de la función si algún campo está vacío.
        }

        // Comprueba si el correo electrónico ya está registrado.
        const userExists = users.some(function (user) {
            return user.email === email;
        });

        // Si el correo electrónico ya está registrado, muestra un mensaje de error.
        if (userExists) {
            errorMessage.textContent = "El correo ya está registrado.";
            return;  // Sale de la función si el correo ya está registrado.
        }

        // Crea un objeto de usuario con los datos ingresados.
        const userData = {
            email: email,
            password: password
        };
        // Añade el nuevo usuario al array de usuarios.
        users.push(userData);

        // Guarda el array de usuarios actualizado en el almacenamiento local.
        localStorage.setItem("users", JSON.stringify(users));

        // Muestra un mensaje de éxito al usuario y redirige a la página de inicio de sesión.
        alert("¡Registro exitoso para usuario: " + email + "!");  // Muestra el correo registrado en el mensaje de alerta.

        // Redirige a la página de inicio de sesión.
        window.location.href = 'login.html';

        // Limpia el mensaje de error y resetea el formulario.
        errorMessage.textContent = "";
        form.reset();
    });

    // Obtiene el botón de alternancia del menú y añade un listener para manejar el evento 'click'.
    document.getElementById('menu-toggle').addEventListener('click', function() {
        // Obtiene la lista de enlaces de navegación.
        const navLinks = document.querySelector('.nav-links');
        // Alterna la clase 'active' en la lista de enlaces de navegación.
        navLinks.classList.toggle('active');
    });
});
