import { showError } from '/frontend/utils/showMessages.js';
import Routes from '/frontend/utils/Routes.js';
import { readFileAsBinary, handleFile } from '/frontend/utils/files.js';

export default function MultiMediaResourceForm() {
  const form = document.createElement('form');
  let fileToBeStored = null;
  form.className = 'mt-9';

  const saveData = async (event) => {
    
    event.preventDefault();

    const childId = new URLSearchParams(window.location.search).get('childId');

    const form = document.querySelector('form');
    const formData = new FormData(form);
    const multimediaInput = Object.fromEntries(formData);

    if (!fileToBeStored) {
      showError("Please select a file.");
      return;
    }

    const binaryFile = await handleFile(fileToBeStored);

    if (!binaryFile) {
      showError("Cannot read file properly.");
      return;
    }

    console.log(binaryFile);
    
    // window.location.href = Routes.children.multimediaResources.path(childId);
  }

  const deleteData = () => {
    console.log("hello")
  }

  form.innerHTML = `
    <div class="flex column justify-center w-25">
      <label for="date">Data</label>
      <input
        type="date"
        name="date"
        id="date"
        class="bg-yellow-200 w-full"
      />
    </div>
    
    <div class="flex column justify-center w-25 mt-2">
      <label for="path">Fișier</label>
      <input
        type="file"
        name="path"
        id="path"
        class="p-2
        bg-yellow-200
        w-full"
        accept="image/png, image/jpeg"
      />
    </div>

    <div class="flex column justify-center w-25 mt-2">
      <label for="note">Notiță</label>
      <textarea 
        name="note" 
        id="note"
        placeholder="Descriere..." 
        class="bg-yellow-200 h-20 w-full"
      ></textarea>
    </div>

    <button class="principal mt-3" type="submit">Salveaza</button>
    <button class="secondary my-2" type="button">Sterge resursa</button>
    <div id="error"></div>
  `;

  const fileInput = form.querySelector('#path');
  fileInput.onchange = () => {
    const file = fileInput.files[0];
    fileToBeStored = file;
    const filePreview = document.createElement('img');
    filePreview.src = URL.createObjectURL(file);
    filePreview.className = 'w-full h-15 img-cover rounded-xl';
    filePreview.onclick = () => {
      filePreview.parentNode.replaceChild(fileInput, filePreview);      
      fileInput.value = '';
    };


    fileInput.parentNode.replaceChild(filePreview, fileInput);
  };

  form.querySelector('button[type="submit"]').addEventListener('click', saveData);
  form.querySelector('button[type="button"]').addEventListener('click', deleteData);

  return form;
}