import { INITIAL_MEDICAL_ENTRY } from '/frontend/utils/initialValues.js';
import { severityTypes } from '/frontend/utils/selectsOptions.js';
import { showError } from '/frontend/utils/showMessages.js';
import Routes from '/frontend/utils/Routes.js';

import { deleteMedicalEvent } from '/frontend/server/medicalEvent/deleteMedicalEvent.js';

export default function MedicalEntryForm({ medicalEntry = INITIAL_MEDICAL_ENTRY, onSave }) {
  const { id, childId, date, title, severity, note } = medicalEntry;

  const saveEvent = async (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    await onSave(formData);
  }

  const removeEvent = async (e) => {
    e?.preventDefault();

    const data = await deleteMedicalEvent(id);
    if (!data.success) {
      showError(data.message);
      return;
    }

    window.location.href = Routes.children.medicalHistory.path(childId);
  };

  const severityOptions = Object.entries(severityTypes).map(([key, value]) => {
    if (severity === key) {
      return `<option value="${key}" selected>${value}</option>`;
    }

    return `<option value="${key}">${value}</option>`;
  });

  const form = document.createElement('form');
  form.className = 'mt-9 w-25';

  form.innerHTML = `
    <div class="flex column justify-center w-full">
      <label for="date">Data</label>
      <input type="date" name="date" id="date" value="${date}" class="bg-yellow-200 w-full" />
    </div>

    <div class="flex column justify-center w-full">
      <label for="title">Titlu</label>
      <input type="text" name="title" id="title" value="${title}" class="bg-yellow-200" />
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="severity">Severitate</label>
      <select class="bg-yellow-200 rounded p-1" name="severity" id="severity">
        <option value="severity">Severitate</option>
        ${severityOptions.join("")}
      </select> 
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
    <button class="secondary my-2" type="button">Remove event</button>
    <div id="error"></div>
  `;

  form.querySelector('button[type="submit"]').addEventListener('click', saveEvent);
  form.querySelector('button[type="button"]').addEventListener('click', removeEvent);
  return form;
}