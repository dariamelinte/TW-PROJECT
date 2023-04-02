import RegisterForm from "../components/registerForm.js";

document.body.appendChild(RegisterForm());

function register(e){
  e.preventDefault();

  const data = {
    firstName: document.querySelector('#firstName').value,
    lastName: document.querySelector('#lastName').value,
    dateOfBirth: document.querySelector('#dateOfBirth').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
    confirmPassword: document.querySelector('#confirmPassword').value
  }

  // TODO: Send data to backend
  console.log(data);
}

document.querySelector('form').addEventListener('submit', register);