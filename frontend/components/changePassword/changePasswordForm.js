import { showError, showMessage } from '/frontend/utils/showMessages.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { parseJwt } from '/frontend/utils/jwt.js';

import { changePassword } from '/frontend/server/myProfile/changePassword.js';

export default function ChangePasswordForm() {
    const { id: userId } = parseJwt(getCookie(COOKIE_NAME)) || {};
    const changePasswordForm = document.createElement('form');
  
    const onSave = async (event) => {
      event.preventDefault();
  
      const form = document.querySelector('form');
      const formData = new FormData(form);
      const changePasswordInput = Object.fromEntries(formData);

      const data = await changePassword(userId, changePasswordInput);

      if (!data.success) {
        showError(data.message);
      } else {
        showMessage("Parola actualizata cu succes.");
      }
    };
  
    changePasswordForm.className="rounded";
    changePasswordForm.innerHTML = `
      <div class="flex column justify-center">
        <div class="flex column justify-center">
          <label for="password">Parola actuala</label>
          <input name="password" id="password" placeholder="Parola actuala" type="password" />
        </div>

        <div class="flex column justify-center">
          <label for="newPassword">Noua parola</label>
          <input
            id="newPassword"
            name="newPassword"
            placeholder="Noua parola"
            type="password"
          />
        </div>
      </div>
      <button class="principal mt-3" type="submit">Salveaza</button>
      <div id="error"></div>
      <div id="message"></div>
    `;

    changePasswordForm.querySelector('button[type="submit"]').addEventListener('click', onSave);
    return changePasswordForm;
  }