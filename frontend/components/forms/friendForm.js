import Routes from '/frontend/utils/Routes.js';
import cleanInput from '/frontend/utils/cleanInput.js';
import { INITIAL_FRIEND } from '/frontend/utils/initialValues.js';
import { friendshipTypes } from '/frontend/utils/selectsOptions.js';
import { showError } from '/frontend/utils/showMessages.js';

import { addFriend } from '/frontend/api/friend/addFriend.js';
import { editFriend } from '/frontend/api/friend/editFriend.js';
import { deleteFriend } from '/frontend/api/friend/deleteFriend.js';

export default function FriendForm({ friend = INITIAL_FRIEND, add = false }) {
  const {
    id,
    lastName,
    firstName,
    dateOfBirth,
    parentContact,
    parentName,
    howTheyMet,
    relationship
  } = friend;
  const childId = new URLSearchParams(window.location.search).get('childId');

  const saveFriend = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const friendInput = Object.fromEntries(formData);
    friendInput.childId = childId;

    const data = add ? await addFriend(cleanInput(friendInput)) : await editFriend(id, friendInput);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.friendships.friend.path(childId, data.result.id);
  };

  const removeFriend = async (e) => {
    e?.preventDefault();

    const data = await deleteFriend(id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.friendships.path(childId);
  };

  const friendshipOptions = Object.entries(friendshipTypes).map(([key, value]) => {
    if (relationship === key) {
      return `<option value="${key}" selected>${value}</option>`;
    }

    return `<option value="${key}">${value}</option>`;
  });

  const form = document.createElement('form');
  form.className = 'mt-9';

  form.innerHTML = `
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="lastName">Nume</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value="${lastName}"
          placeholder="Nume"
          class="bg-yellow-200"
        />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="firstName">Prenume</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value="${firstName}"
          placeholder="Prenume"
          class="bg-yellow-200"
        />
      </div>
    </div>
  
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="parentName">Nume parinte</label>
        <input
          id="parentName"
          type="text"
          name="parentName"
          value="${parentName}"
          placeholder="Nume parinte"
          class="bg-yellow-200"
        />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="parentContact">Contact parinte</label>
        <input
          id="parentContact"
          type="text"
          name="parentContact"
          value="${parentContact}"
          placeholder="Contact parinte"
          class="bg-yellow-200"
        />
      </div>
    </div>
    
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="dateOfBirth">Data de Nastere</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          placeholder="Data de Nastere"
          value="${dateOfBirth}"
          class="bg-yellow-200"
        />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="howTheyMet">Cum se cunosc</label>
        <input
          id="howTheyMet"
          type="text"
          name="howTheyMet"
          placeholder="Cum se cunosc"
          value="${howTheyMet}"
          class="bg-yellow-200"
        />
      </div>
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="relationship">Nivel de prietenie</label>
      <select class="bg-yellow-200 rounded p-1" name="relationship" id="relationship">
        <option value="relationship" disabled>Nivel de prietenie</option>
        ${friendshipOptions.join('')}
      </select> 
    </div>

    <button class="principal mt-3" type="submit">Submit</button>
    <button class="secondary my-2" type="button">Remove friend</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveFriend);
  form.querySelector('button[type="button"]').addEventListener('click', removeFriend);

  return form;
}
