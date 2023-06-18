import Routes from '/frontend/utils/Routes.js';
import cleanInput from '/frontend/utils/cleanInput.js';
import { INITIAL_SLEEPING_NOTE } from '/frontend/utils/initialValues.js';
import showError from '/frontend/utils/showError.js';

import { deleteSleepingEvent } from '/frontend/server/sleeping/deleteSleepingEvent.js';
import { addSleepingEvent } from '/frontend/server/sleeping/createSleepingEvent.js';
import { editSleepingEvent } from '/frontend/server/sleeping/updateSleepingEvent.js';

import { sleepTypes } from '/frontend/utils/selectsOptions.js';

export default function SleepingNoteForm({ sleepingNote = INITIAL_SLEEPING_NOTE,  add = false }) {
  const { id, date, start_time, end_time, sleepType, note } = sleepingNote;

  const childId = new URLSearchParams(window.location.search).get('childId');

  const saveData = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const sleepingInput = Object.fromEntries(formData);
    sleepingInput.childId = childId;

    const data = add ? await addSleepingEvent(cleanInput(sleepingInput)) : await editSleepingEvent(id, sleepingInput);
    if (!data.success) {
      showError(data.message);
      return;
    }
    
    window.location.href = Routes.children.sleepingCalendar.path(childId);
  };

  const deleteData = async (e) => {
    e?.preventDefault();

    const data = await deleteSleepingEvent(id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.sleepingCalendar.path(childId);
  };

  const sleepTypeOptions = Object.entries(sleepTypes).map(([key, value]) => {
    if (sleepType === key) {
      return `<option value="${key}" selected>${value}</option>`;
    }
    
    return `<option value="${key}">${value}</option>`;
  }
  );

  const form = document.createElement('form');
  form.className = 'mt-9 w-25';

  form.innerHTML = `
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="date">Data:</label>
        <input type="date" name="date" id="date" value="${date}" class="bg-yellow-200 w-full" />
      </div>

      <div class="flex w-full flex-wrap">
        <div class="flex flex-1 column justify-center mr-2">
          <label for="start_time">Ora de inceput:</label>
          <input type="time" name="start_time" id="start_time" value="${start_time}" class="bg-yellow-200 w-full" />
        </div>

        <div class="flex flex-1 column justify-center mr-2">
          <label for="end_time">Ora de final</label>
          <input type="time" name="end_time" id="end_time" value="${end_time}" class="bg-yellow-200 w-full" />
        </div>
      </div>
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="sleepType">Tipul de somn</label>
      <select class="bg-yellow-200 rounded p-1" name="sleepType" id="sleepType">
          <option value="sleepType" disabled>Tipul de somn avut</option>
          ${sleepTypeOptions.join("")}
      </select> 
    </div>

    <div class="flex column justify-center w-full">
      <label for="info">Informatii despre somn</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Adauga aici detalii ..."
        class="bg-yellow-200 h-20"
      >
        ${note}
      </textarea>
    </div>


    <button class="principal mt-3" type="submit">Submit</button>
    <button class="secondary my-2" type="button">Delete sleep</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveData);
  form.querySelector('button[type="button"]').addEventListener('click', deleteData);

  return form;
}