import Routes from '../../utils/Routes.js';

export default function FeedingNoteForm() {
  const form = document.createElement('form');
  form.className = 'mt-9';

  function saveData(event) {
    
    event.preventDefault();

    const childId = new URLSearchParams(window.location.search).get('childId');

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log(formData.get('date'));
    console.log(formData.get('note'));

    window.location.href = Routes.children.feedingCalendar.path(childId);
  }

  form.innerHTML = `
    <div class="flex column justify-center w-full">
      <label for="date">Data</label>
      <input type="date" name="date" id="date" class="bg-yellow-200 w-full" />
    </div>
    
    <div class="flex column justify-center">
      <label for="note">Notiță</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Adaugă aici masa..." 
        class="bg-yellow-200 w-30 h-20"></textarea>
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}