// Espera a que el contenido del DOM esté completamente cargado antes de ejecutar el script.
document.addEventListener("DOMContentLoaded", function () {
    // Obtiene el formulario de inicio de sesión y el mensaje de error del DOM.
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Crea un array vacío en el almacenamiento local si no existe ya.
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }

    // Añade un listener al evento 'submit' del formulario.
    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Previene el envío del formulario.

        // Obtiene los valores de los campos de correo electrónico y contraseña.
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Carga los usuarios desde el almacenamiento local.
        let users = JSON.parse(localStorage.getItem("users")); 
        
        // Busca un usuario que coincida con el correo electrónico y la contraseña ingresados.
        const user = users.find(user => user.email === email && user.password === password);

        // Si se encuentra un usuario coincidente, se muestra un mensaje de éxito y se redirige a otra página.
        if (user) {
            alert("Inicio de Sesión correcto");
            window.location.href = 'PAGINA.HTML'; // Redirige a 'PAGINA.HTML'.
        } else {
            // Si no se encuentra un usuario coincidente, se muestra un mensaje de error.
            alert("Email o contraseña incorrectos");
            errorMessage.textContent = "Email o contraseña incorrectos"; // Muestra el mensaje de error en el elemento.
        }

        // Resetea el formulario después de manejar el envío.
        form.reset();
    });
});

