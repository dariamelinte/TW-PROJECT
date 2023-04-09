import { INITIAL_FEEDING_NOTE } from '/frontend/utils/initialValues.js';

export default function FeedingNoteForm({ feedingNote = INITIAL_FEEDING_NOTE, onSave }) {
  const { hour, info } = feedingNote;

  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("date: ", formData.get("date"));
    console.log("description: ", formData.get("description"));

    onSave();
  }

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

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}