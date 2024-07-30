document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    // Crea un array vacío si no existe en localStorage
    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify([]));
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        let users = JSON.parse(localStorage.getItem("users")); 
        
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            alert("Inicio de Sesión correcto");
            window.location.href = 'PAGINA.HTML'; // Corregido 'indow' a 'window'
        } else {
            alert("Email o contraseña incorrectos");
            errorMessage.textContent = "Email o contraseña incorrectos"; // Muestra mensaje de error en el elemento
        }

        form.reset();
    });
});
