import Routes from '../../utils/Routes.js';

export default function MultiMediaResourceForm() {
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

    const file = formData.get('file');
    console.log(file.name);
    
    window.location.href = Routes.children.multimediaResources.path(childId);
  }

  form.innerHTML = `
    <div class="flex column justify-center w-25">
      <label for="date">Data</label>
      <input type="date" name="date" id="date" class="bg-yellow-200 w-full" />
    </div>
    
    <div class="flex column justify-center w-25">
      <label for="file">Fișier</label>
      <input type="file" name="file" id="file" class="p-2 bg-yellow-200 w-full" accept="image/png, image/jpeg" />
    </div>

    <div class="flex column justify-center w-25">
      <label for="note">Notiță</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Descriere..." 
        class="bg-yellow-200 h-20 w-full"></textarea>
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  const fileInput = form.querySelector('#file');
  fileInput.onchange = () => {
    const file = fileInput.files[0];
    const filePreview = document.createElement('img');
    filePreview.src = URL.createObjectURL(file);
    filePreview.className = 'w-full h-15 img-cover rounded-xl';
    filePreview.onclick = () => {
      filePreview.parentNode.replaceChild(fileInput, filePreview);      
      fileInput.value = '';
    };


    fileInput.parentNode.replaceChild(filePreview, fileInput);
  };

  form.querySelector('button').onclick = saveData;

  return form;
}