import { register } from "../../server/auth/register.js"
import Routes from "../../utils/Routes.js";
import showError from "../../utils/showError.js";

export default function RegisterForm() {
  const form = document.createElement('form');

  const onRegister = async (event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const registerInput = Object.fromEntries(formData);

    if (registerInput.password !== registerInput.confirmPassword) {
      showError("Passwords don't match.");
      return;
    }

    const data = await register(registerInput);

    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.login.path();
  }

  form.innerHTML = `
    <div class="flex column justify-center">
      <div class="flex column justify-center">
        <label for="email">Email</label>
        <input type="email" name="email" id="email" placeholder="Email" />
      </div>
        
      <div class="flex column justify-center">
        <label for="password">Parola</label>
        <input name="password" id="password" placeholder="Parola" type="password" />
      </div>

      <div class="flex column justify-center">
        <label for="confirmPassword">Confirmare parola</label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          placeholder="Confirmare parola"
          type="password"
        />
      </div>

      <div class="flex row justify-center">
        <div class="flex column justify-center mr-2">
          <label for="lastName">Nume</label>
          <input type="text" name="lastName" id="lastName" placeholder="Nume" />
        </div>

        <div class="flex column justify-center">
          <label for="firstName">Prenume</label>
          <input type="text" name="firstName" id="firstName" placeholder="Prenume" />
        </div>
      </div>

      <div class="flex row justify-center">
        <div class="flex flex-1 column justify-center mr-2">
          <label for="dateOfBirth">Data de nastere</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Data de nastere" />
        </div>

        <div class="flex column justify-center">
          <label for="nationality">Nationalitate</label>
          <input type="text" name="nationality" id="nationality" placeholder="Nationalitate" />
        </div>
      </div>
    </div>

    <a class="mt-2" href="${Routes.login.path()}">Ai deja cont?</a>

    <button class="principal mt-3" type="submit">Register</button>
    <div id="error"></div>
  `;

  form.querySelector('button').addEventListener('click', onRegister);

  return form;
}