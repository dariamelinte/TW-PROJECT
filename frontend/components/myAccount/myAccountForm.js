import { genderTypes } from '/frontend/utils/selectsOptions.js';
import { showError, showMessage } from '/frontend/utils/showMessages.js';
import Routes from '/frontend/utils/Routes.js';

import { updateMyProfile } from '/frontend/server/my-profile/updateMyProfile.js';

export default function MyAccountForm({ account = {} }) {
    const { id, firstName, lastName, email, dateOfBirth, gender, nationality } = account;
    const myAccountForm = document.createElement('form');
  
    const onSave = async (event) => {
      event.preventDefault();
  
      const form = document.querySelector('form');
      const formData = new FormData(form);
      const myAccountInput = Object.fromEntries(formData);

      const data = await updateMyProfile(id, myAccountInput);

      if (!data.success) {
        showError(data.message);
      } else {
        showMessage("Contul a fost actualizat.");
      }
    };

    const genderOptions = Object.entries(genderTypes).map(([key, value]) => {
      if (gender === key) {
        return `<option value="${key}" selected>${value}</option>`;
      }
  
      return `<option value="${key}">${value}</option>`;
    });
  
    myAccountForm.className="rounded";
    myAccountForm.innerHTML = `
      <div class="flex row justify-center">
        <div class="flex column justify-center mr-2">
            <div class="flex column justify-center">
                <label for="firstName">Prenume</label>
                <input 
                  type="text" 
                  name="firstName" 
                  id="firstName" 
                  placeholder="Prenume"
                  value=${firstName}
                />
            </div>

            <div class="flex column justify-center">
                <label for="lastName">Nume</label>
                <input 
                  type="text" 
                  name="lastName" 
                  id="lastName" 
                  placeholder="Nume"
                  value=${lastName}
                />
            </div>
  
            <div class="flex column justify-center">
                <label for="email">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="Email"
                  value=${email}
                  disabled
                />
            </div>
        </div>
  
        <div class="flex column justify-center ml-2">
          <div class="flex column justify-center">
              <label for="dateOfBirth">Data de nastere</label>
              <input 
                type="date" 
                name="dateOfBirth" 
                id="dateOfBirth" 
                placeholder="Data de nastere"
                value=${dateOfBirth}
              />
          </div>
  
          <div class="flex column justify-center">
            <label for="gender">Gen</label>
            <select class="rounded pb-2 pt-2 px-1" name="gender" id="gender">
                <option value="gender">Gen</option>
                ${genderOptions.join('')}
            </select> 
          </div>
  
          <div class="flex column justify-center">
            <label for="nationalitate">Nationalitate</label>
            <input 
              type="text" 
              name="nationalitate" i
              d="nationalitate" 
              placeholder="Nationalitate"
              value=${nationality}
            />
          </div>
        </div>
      </div>
  
      <button class="principal mt-3" type="submit">Salveaza</button>
      <a href=${Routes.myAccount.changePassword.path()} class="mt-3">Schimba parola</button>
      <div id="error"></div>
      <div id="message"></div>
    `;

    myAccountForm.querySelector('button[type="submit"]').addEventListener('click', onSave);
    return myAccountForm;
  }