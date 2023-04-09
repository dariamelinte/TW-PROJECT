import { INITIAL_MEDICAL_ENTRY } from '/frontend/utils/initialValues.js';

import { severityTypes } from '/frontend/utils/selectsOptions.js';

export default function MedicalEntryForm({ medicalEntry = INITIAL_MEDICAL_ENTRY, onSave }) {
  const { date, title, severity, description } = medicalEntry;

  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("date: ", formData.get("date"));
    console.log("title: ", formData.get("title"));
    console.log("severity: ", formData.get("severity"));
    console.log("description: ", formData.get("description"));

    onSave();
  }

  const severityOptions = Object.entries(severityTypes).map(([key, value]) => (
    `<option value="${key}" selected=${severity === key}>${value}</option>`
  ))

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
          <option value="severity" selected=${"severity" === severity} disabled>Severitate</option>
          ${severityOptions.join("")}
      </select> 
    </div>
    
    <div class="flex column justify-center w-full">
      <label for="description">Descriere</label>
      <textarea 
        name="description" 
        id="description"
        placeholder="Descriere ..."
        class="bg-yellow-200 h-20"
      >
        ${description}
      </textarea>
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}