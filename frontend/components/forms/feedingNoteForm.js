import Routes from '/frontend/utils/Routes.js';
import cleanInput from '/frontend/utils/cleanInput.js';
import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';
import showError from '/frontend/utils/showError.js';

import { deleteFeedingEvent } from '/frontend/server/feeding/deleteFeedingEvent.js';
import { addFeedingEvent } from '/frontend/server/feeding/createFeedingEvent.js';
import { editFeedingEvent } from '/frontend/server/feeding/updateFeedingEvent.js';


export default function FeedingNoteForm({ feedingNote = INITIAL_FEEDING_NOTE, add = false }) {
  const { id, date_time, note } = feedingNote;

  const childId = new URLSearchParams(window.location.search).get('childId');

  const saveData = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const feedingInput = Object.fromEntries(formData);
    feedingInput.childId = childId;

    const data = add ? await addFeedingEvent(cleanInput(feedingInput)) : await editFeedingEvent(id, feedingInput);
    if (!data.success) {
      showError(data.message);
      return;
    }
    
    window.location.href = Routes.children.feedingCalendar.path(childId);
  }

  const deleteData = async (e) => {
    e?.preventDefault();

    const data = await deleteFeedingEvent(id);
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
      <label for="hour">Data si ora</label>
      <input type="datetime-local" name="date_time" id="date_time" value="${date_time}" class="bg-yellow-200 w-full" />
    </div>
    
    <div class="flex column justify-center w-full">
      <label for="info">Informatii despre masa</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Adauga aici masa ..."
        class="bg-yellow-200 h-20"
      >
        ${note}
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