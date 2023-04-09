import { INITIAL_SLEEPING_NOTE } from '/frontend/utils/initialValues.js';

import { sleepPeriodTypes, sleepTypes } from '/frontend/utils/selectsOptions.js';

export default function SleepingNoteForm({ sleepingNote = INITIAL_SLEEPING_NOTE, onSave }) {
  const { hours = [], sleepPeriod, sleepType } = sleepingNote;
  const [firstHour, secondHour] = hours;

  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("hour: ", formData.get("hour"));
    console.log("sleepPeriod: ", formData.get("sleepPeriod"));
    console.log("sleepType: ", formData.get("sleepType"));

    onSave();
  }

  const sleepPeriodOptions = Object.entries(sleepPeriodTypes).map(([key, value]) => (
    `<option value="${key}" selected=${sleepPeriod === key}>${value}</option>`
  ))

  const sleepTypeOptions = Object.entries(sleepTypes).map(([key, value]) => (
    `<option value="${key}" selected=${sleepType === key}>${value}</option>`
  ))

  const form = document.createElement('form');
  form.className = 'mt-9 w-25';

  form.innerHTML = `
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="firstHour">Ora de inceput</label>
        <input type="time" name="firstHour" id="firstHour" value="${firstHour}" class="bg-yellow-200 w-full" />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="secondHour">Ora de final</label>
        <input type="time" name="secondHour" id="secondHour" value="${secondHour}" class="bg-yellow-200 w-full" />
      </div>
    </div>
    
    <div class="flex flex-1 column justify-center w-full">
      <label for="sleepPeriod">Severitate</label>
      <select class="bg-yellow-200 rounded p-1" name="sleepPeriod" id="sleepPeriod">
          <option value="sleepPeriod" selected=${"sleepPeriod" === sleepPeriod} disabled>Perioada de somn</option>
          ${sleepPeriodOptions.join("")}
      </select> 
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="sleepType">Tipul de somn</label>
      <select class="bg-yellow-200 rounded p-1" name="sleepType" id="sleepType">
          <option value="sleepType" selected=${"sleepType" === sleepType} disabled>Tipul de somn avut</option>
          ${sleepTypeOptions.join("")}
      </select> 
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}