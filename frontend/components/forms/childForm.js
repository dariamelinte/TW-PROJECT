import Routes from '/frontend/utils/Routes.js';
import { genderTypes } from '/frontend/utils/selectsOptions.js';
import cleanInput from '/frontend/utils/cleanInput.js';

import { addChild } from '/frontend/server/addChild.js';
import { editChild } from '/frontend/server/editChild.js';
import { deleteChild } from '/frontend/server/deleteChild.js';

const showError = (message) => {
  const error = document.getElementById("error");
  error.innerHTML = message;
  error.className = "bg-red-500 text-white centered-text rounded shadow-small p-2 mt-3";
};

export default function ChildForm({ child = {}, add = false }) {
  const saveChild = async (e) => {
    e?.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const childInput = Object.fromEntries(formData);

    if (add) {
      // TODO: get family Id from cookie
      childInput.familyId = "1";
  
      const data = await addChild(cleanInput(childInput));
      if (!data.success) {
        showError(data.message);
        return;
      }

      window.location.href = Routes.root;
    } else {
      childInput.id = child.id;
      const data = await editChild(childInput);
      if (!data.success) {
        showError(data.message);
        return;
      }

      window.location.href = Routes.child.path(child.id);
    }
  };

  const removeChild = async (e) => {
    e?.preventDefault();
    console.log("hello")
    const data = await deleteChild(child.id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.root;
  };

  const {
    lastName,
    firstName,
    dateOfBirth,
    gender = 'gender',
    nationality,
    weight,
    height
  } = child;

  const genderOptions = Object.entries(genderTypes).map(([key, value]) => {
    if (gender === key) {
      return `<option value="${key}" selected=${gender === key}>${value}</option>`;
    }

    return `<option value="${key}">${value}</option>`;
  });

  const form = document.createElement('form');
  form.className = 'mt-9 w-20';

  form.innerHTML = `
    <div class="flex flex-1 w-full column justify-center">
      <label for="lastName">Nume</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        placeholder="Nume"
        value="${lastName}"
        class="bg-yellow-200"
      />
    </div>

    <div class="flex flex-1 w-full column justify-center">
      <label for="firstName">Prenume</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        placeholder="Prenume"
        value="${firstName}"
        class="bg-yellow-200"
      />
    </div>
  
    <div class="flex flex-1 w-full column justify-center">
      <label for="dateOfBirth">Data de Nastere</label>
      <input
        id="dateOfBirth"
        type="date"
        name="dateOfBirth"
        value=${dateOfBirth}
        placeholder="Data de Nastere"
        class="bg-yellow-200"
      />
    </div>

    <div class="flex flex-1 w-full column justify-center">
      <label for="gender">gender</label>
      <select class="bg-yellow-200 rounded p-1" name="gender" id="gender">
          <option value="gender" selected=${'gender' === gender} disabled>Gen</option>
          ${genderOptions.join('')}
      </select> 
    </div>
    <div class="flex flex-1 w-full column justify-center">
      <label for="nationality">Nationalitate</label>
      <input
        id="nationality"
        type="text"
        name="nationality"
        placeholder="Nationalitate" 
        value="${nationality || ""}"
        class="bg-yellow-200"
      />
    </div>

    <div class="flex flex-1 w-full items-center justify-between flex-wrap">
      <div class="flex column justify-center">
        <label for="weight">W</label>
        <input
          id="weight"
          type="number"
          name="weight"
          placeholder="Greutate" 
          value="${weight}"
          class="bg-yellow-200 w-8"
        />
      </div>
      <div class="flex column justify-center">
        <label for="height">H</label>
        <input
          id="height"
          type="number"
          name="height"
          placeholder="Inaltime" 
          value="${height}"
          class="bg-yellow-200 w-8"
        />
      </div>
    </div>
    <button class="principal mt-3" type="submit">Submit</button>
    <button class="secondary my-2" type="button">Remove child</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveChild);
  form.querySelector('button[type="button"]').addEventListener('click', removeChild);

  return form;
}
