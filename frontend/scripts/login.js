import LoginForm from "../components/loginForm.js";

document.body.appendChild(LoginForm());

function login(e){
  e.preventDefault();

  const data = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value
  }

  // TODO: Send data to backend
  console.log(data);
}

document.querySelector('form').addEventListener('submit', login);