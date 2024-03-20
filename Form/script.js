document.getElementById('registrationForm').addEventListener('submit', function(event) {
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var errorMessage = document.getElementById('error-message');
  
    if (username === '' || email === '' || password === '') {
      event.preventDefault();
      errorMessage.textContent = 'Please fill out all fields.';
    }
  });
  