import Routes from "/frontend/utils/Routes.js";

export default function AddFriendForm() {
  const childId = new URLSearchParams(window.location.search).get('childId');

  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("lastName: ", formData.get("lastName"));
    console.log("firstName: ", formData.get("firstName"));
    console.log("mother: ", formData.get("mother"));
    console.log("father: ", formData.get("father"));
    console.log("dateOfBirth: ", formData.get("dateOfBirth"));
    console.log("friendshipLevel: ", formData.get("friendshipLevel"));
  
    window.location.href = Routes.children.friendships.path(childId);
  }

  const form = document.createElement('form');
  form.className = 'mt-9';

  form.innerHTML = `
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="lastName">Nume</label>
        <input type="text" name="lastName" id="lastName" class="bg-yellow-200" />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="firstName">Prenume</label>
        <input type="text" name="firstName" id="firstName" class="bg-yellow-200" />
      </div>
    </div>
  
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="mother">Mama</label>
        <input type="text" name="mother" id="mother" class="bg-yellow-200" />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="father">Tata</label>
        <input type="text" name="father" id="father" class="bg-yellow-200" />
      </div>
    </div>
    
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="dateOfBirth">Data de Nastere</label>
        <input
          id="dateOfBirth"
          type="date"
          name="dateOfBirth"
          placeholder="Data de Nastere"
          class="bg-yellow-200"
        />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="howTheyMet">Cum se cunosc</label>
        <input type="text" name="howTheyMet" id="howTheyMet" class="bg-yellow-200" />
      </div>
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="friendshipLevel">Nivel de prietenie</label>
      <select class="bg-yellow-200 rounded p-1" name="friendshipLevel" id="friendshipLevel">
        <option value="friendshipLevel" selected disabled>Nivel de prietenie</option>
        <option value="enemy">Dusman</option>
        <option value="relative">Cunostinta</option>
        <option value="friends">Prieteni</option>
        <option value="closeFriends">Prieteni apropiati</option>
        <option value="bestFriends">Cei mai buni prieteni</option>
      </select> 
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}