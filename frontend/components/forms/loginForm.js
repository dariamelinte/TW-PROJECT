import { login } from '../../api/auth/login.js';
import { COOKIE_NAME } from '../../utils/constants.js';
import Routes from '../../utils/Routes.js';
import { showError } from '/frontend/utils/showMessages.js';

export default function LoginForm() {
  const form = document.createElement('form');
  form.className = 'w-20';

  const onLogin = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const loginInput = Object.fromEntries(formData);

    const data = await login(loginInput);

    if (!data.success) {
      showError(data.message);
      return;
    }

    document.cookie = `${COOKIE_NAME}=${data.result.jwt}; path=/;`;
    window.location.href = Routes.home.path();
  };

  form.innerHTML = `
      <div class="flex column w-full justify-center">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>
      
      <div class="flex column w-full justify-center">
        <label for="password">Parola</label>
        <input name="password" id="password" placeholder="Parola" type="password" />
      </div>

      <a class="mt-2" href="${Routes.register.path()}">Inregistreaza-te</a>
      <a href="${Routes.forgotPassword.path()}">Parola uitata?</a>

      <button class="principal mt-3" type="submit">Login</button>
      <div id="error"></div>
    `;

  form.querySelector('button').addEventListener('click', onLogin);

  return form;
}
