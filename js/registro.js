document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("login-form");
    const errorMessage = document.getElementById("error-message");

    //crea un array vacio
    const users = JSON.parse(localStorage.getItem("users")) || []; 

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email.trim() === "" || password.trim() === "") {
            errorMessage.textContent = "Por favor, completa todos los campos.";
            return;
        }

        const userExists = users.some(function (user) {
            return user.email === email;
        });

        if (userExists) {
            errorMessage.textContent = "El correo ya está registrado.";
            return;
        }

        const userData = {
            email: email,
            password: password
        };
        users.push(userData);

        localStorage.setItem("users", JSON.stringify(users));

        alert("¡Registro exitoso para usuario: " + "!");

        window.location.href = 'login.html'

        errorMessage.textContent = "";
        form.reset();


    });
})





document.getElementById('menu-toggle').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
});
