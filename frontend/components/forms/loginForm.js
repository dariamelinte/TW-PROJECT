import Routes from "../../utils/Routes.js";

export default function LoginForm() {
  const form = document.createElement('form');
  form.className = "w-20"

  function login(event) {
    event.preventDefault();

    
    const form = document.querySelector('form');
    const formData = new FormData(form);
    
    //TODO: send the data to the server
    console.log(formData.get('email'));
    console.log(formData.get('password'));

    window.location.href = Routes.home.path();
  }

  form.innerHTML = `
      <div class="flex column w-full justify-center">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>
      
      <div class="flex column w-full justify-center">
        <label for="password">Password</label>
        <input name="password" id="password" placeholder="Password" type="password" />
      </div>

      <a class="mt-2" href="${Routes.register.path()}">Add your family</a>
      <a href="${Routes.forgotPassword.path()}">Forgot password?</a>

      <button id="login" class="mt-3">Login</button>
    `;

    form.querySelector('button').addEventListener('click', login);

  return form;
}