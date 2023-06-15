import { deleteFriendInteraction } from '/frontend/server/friendInteraction/deleteFriendInteraction.js';

import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';
import showError from '/frontend/utils/showError.js';
import Routes from '/frontend/utils/Routes.js';

export default function ActivityForm({ childId, activity = INITIAL_ACTIVITY, onSave }) {
  const { id, date, title, note, friendId } = activity;

  const saveActivity = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    await onSave(formData);
  }

  const removeActivity = async (e) => {
    e?.preventDefault();

    const data = await deleteFriendInteraction(id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.friendships.friend.path(childId, friendId);
  };

  const form = document.createElement('form');
  form.className = 'mt-9 w-25';

  form.innerHTML = `
    <div class="flex column justify-center w-full">
      <label for="date">Data</label>
      <input
        id="date"
        type="date"
        name="date"
        value="${date}"
        class="bg-yellow-200 w-full"
      />
    </div>

    <div class="flex column justify-center w-full">
      <label for="title">Titlu</label>
      <input
        id="title"
        type="text"
        name="title"
        value="${title}"
        placeholder="Titlu"
        class="bg-yellow-200"
      />
    </div>
    
    <div class="flex column justify-center w-full">
      <label for="note">Descriere</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Descriere ..."
        class="bg-yellow-200 h-20"
      >
        ${note}
      </textarea>
    </div>

    <button class="principal mt-3" type="submit">Submit</button>
    <button class="secondary my-2" type="button">Remove activity</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveActivity);
  form.querySelector('button[type="button"]').addEventListener('click', removeActivity);

  return form;
}