import Header from '../components/header.js';
import LoginForm from '../components/loginForm.js';

document.body.appendChild(Header());
document.body.appendChild(LoginForm());

function login(e){
  e.preventDefault();
  console.log('login');
}

const loginForm = document.querySelector('form');
loginForm.addEventListener('submit', login);  