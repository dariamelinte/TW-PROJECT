import { forgotPassword } from '/frontend/server/auth/forgotPassword.js';
import Routes from '/frontend/utils/Routes.js';
import { showError, showMessage } from '/frontend/utils/showMessages.js';

export default function ForgotPasswordForm() {
  const form = document.createElement('form');
  form.className = "w-20";

  const onForgotPassword = async (event) => {
    event.preventDefault();
    const form = document.querySelector('form');
    const formData = new FormData(form);
    const forgotPasswordInput = Object.fromEntries(formData);

    const data = await forgotPassword(forgotPasswordInput);

    if (!data.success) {
      showError(data.message);
      return;
    } else {
      showMessage("Un email cu noua parola a fost trimis.");
    }
  }

  form.innerHTML = `
    <div class="flex column justify-center w-full">
      <label for="email" id="email_label">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
    </div>


    <button class="principal mt-3" type="submit">Trimitere</button>
    <a class="mt-2" href="${Routes.login.path()}">Ai deja cont?</a>
    <div id="error"></div>
    <div id="message"></div>
  `;

  form.querySelector('button').addEventListener('click', onForgotPassword);

  return form;
}

