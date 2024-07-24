document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('login-form');
    var errorMessage = document.getElementById('error-message');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); 

        var username = document.getElementById('username').value;
        var password = document.getElementById('password').value;

        if (username.trim() === '' || password.trim() === '') {
            errorMessage.textContent = 'Por favor, completa todos los campos.';
        } else {
            var userData = {
                username: username,
                password: password
            };

            localStorage.setItem('userData', JSON.stringify(userData));

            alert('¡Registro exitoso para usuario: ' + username);

        
            errorMessage.textContent = '';

        }
    });
});