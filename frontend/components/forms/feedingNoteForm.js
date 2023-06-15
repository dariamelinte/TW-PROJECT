import { deleteFeedingEvent } from '/frontend/server/feeding/deleteFeedingEvent.js';

import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';
import showError from '/frontend/utils/showError.js';
import Routes from '/frontend/utils/Routes.js';

export default function FeedingNoteForm({ childId, feedingNote = INITIAL_FEEDING_NOTE, onSave }) {
  const { id, hour, info } = feedingNote;

  const saveData = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //send the data to the server
    await onSave(formData);

    // console.log("date: ", formData.get("date"));
    // console.log("description: ", formData.get("description"));
  }

  const deleteData = async (e) => {
    e?.preventDefault();

    const data = await deleteFeedingEvent(childId, id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.feedingCalendar.path(childId);
  };

  const form = document.createElement('form');
  form.className = 'mt-9 w-25';

  form.innerHTML = `
    <div class="flex column justify-center w-full">
      <label for="hour">Ora</label>
      <input type="time" name="hour" id="hour" value="${hour}" class="bg-yellow-200 w-full" />
    </div>
    
    <div class="flex column justify-center w-full">
      <label for="info">Informatii despre masa</label>
      <textarea 
        name="info" 
        id="info"
        placeholder="Adauga aici masa ..."
        class="bg-yellow-200 h-20"
      >
        ${info}
      </textarea>
    </div>

    <button class="principal mt-3" type="submit">Submit</button>
    <button class="secondary my-2" type="button">Delete meal</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveData);
  form.querySelector('button[type="button"]').addEventListener('click', deleteData);

  return form;
}