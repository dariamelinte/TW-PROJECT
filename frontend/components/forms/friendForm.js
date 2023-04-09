import Routes from "/frontend/utils/Routes.js";
import { friendshipTypes } from "/frontend/utils/selectsOptions.js";
import { INITIAL_CHILD } from '/frontend/utils/initialValues.js';

export default function FriendForm({ friend = INITIAL_CHILD, howTheyMet = "", friendshipLevel = "" }) {
  const { lastName, firstName, mother, father, dateOfBirth } = friend;
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
    console.log("howTheyMet: ", formData.get("howTheyMet"));
    console.log("friendshipLevel: ", formData.get("friendshipLevel"));
  
    window.location.href = Routes.children.friendships.path(childId);
  }


  const friendshipOptions = Object.entries(friendshipTypes).map(([key, value]) => (
    `<option value="${key}" selected=${friendshipLevel === key}>${value}</option>`
  ))


  const form = document.createElement('form');
  form.className = 'mt-9';

  console.log(lastName, firstName)

  form.innerHTML = `
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="lastName">Nume</label>
        <input type="text" name="lastName" id="lastName" value="${lastName}" class="bg-yellow-200" />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="firstName">Prenume</label>
        <input type="text" name="firstName" id="firstName" value="${firstName}" class="bg-yellow-200" />
      </div>
    </div>
  
    <div class="flex w-full items-center flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="mother">Mama</label>
        <input type="text" name="mother" id="mother" value="${mother}" class="bg-yellow-200" />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="father">Tata</label>
        <input type="text" name="father" id="father" value="${father}" class="bg-yellow-200" />
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
          value="${dateOfBirth}"
          class="bg-yellow-200"
        />
      </div>

      <div class="flex flex-1 column justify-center">
        <label for="howTheyMet">Cum se cunosc</label>
        <input type="text" name="howTheyMet" id="howTheyMet" value="${howTheyMet}" class="bg-yellow-200" />
      </div>
    </div>

    <div class="flex flex-1 column justify-center w-full">
      <label for="friendshipLevel">Nivel de prietenie</label>
      <select class="bg-yellow-200 rounded p-1" name="friendshipLevel" id="friendshipLevel">
        <option value="friendshipLevel" selected disabled>Nivel de prietenie</option>
        ${friendshipOptions.join("")}
      </select> 
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}