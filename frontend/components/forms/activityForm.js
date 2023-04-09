import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';

export default function ActivityForm({ activity = INITIAL_ACTIVITY, onSave }) {
  const { date, title, description } = activity;

  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("date: ", formData.get("date"));
    console.log("title: ", formData.get("title"));
    console.log("description: ", formData.get("description"));

    onSave();
  }

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