import Routes from "/frontend/utils/Routes.js";
import { genderTypes } from "/frontend/utils/selectsOptions.js";

export default function ChildForm({ child = {}, add = false }) {
  const saveData = (e) => {
    e.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log("lastName: ", formData.get("lastName"));
    console.log("firstName: ", formData.get("firstName"));
    console.log("dateOfBirth: ", formData.get("dateOfBirth"));
    console.log("gender: ", formData.get("gender"));
    console.log("nationality: ", formData.get("nationality"));
    console.log("weight: ", formData.get("weight"));
    console.log("height: ", formData.get("height"));

    if (add) {
      window.location.href = Routes.root;
    } else {
      window.location.href = Routes.child.path(child.id);
    }
  }

  const { lastName, firstName, dateOfBirth, gender = "gender", nationality, weight, height } = child;

  const genderOptions = Object.entries(genderTypes).map(([key, value]) => (
    `<option value="${key}" selected=${gender === key}>${value}</option>`
  ))


  const form = document.createElement('form');
  form.className = 'mt-9 w-20';

  form.innerHTML = `
    <div class="flex flex-1 w-full column justify-center">
      <label for="lastName">Nume</label>
      <input type="text" name="lastName" id="lastName" value="${lastName}" class="bg-yellow-200" />
    </div>

    <div class="flex flex-1 w-full column justify-center">
      <label for="firstName">Prenume</label>
      <input type="text" name="firstName" id="firstName" value="${firstName}" class="bg-yellow-200" />
    </div>
  
    <div class="flex flex-1 w-full column justify-center">
      <label for="dateOfBirth">Data de Nastere</label>
      <input
        id="dateOfBirth"
        type="date"
        name="dateOfBirth"
        value=${dateOfBirth}
        placeholder="Data de Nastere"
        class="bg-yellow-200"
      />
    </div>

    <div class="flex flex-1 w-full column justify-center">
      <label for="gender">gender</label>
      <select class="bg-yellow-200 rounded p-1" name="gender" id="gender">
          <option value="gender" selected=${"gender" === gender} disabled>Gen</option>
          ${genderOptions.join("")}
      </select> 
    </div>
    <div class="flex flex-1 w-full column justify-center">
      <label for="nationality">Nationalitate</label>
      <input type="text" name="nationality" id="nationality" value="${nationality}" class="bg-yellow-200" />
    </div>

    <div class="flex flex-1 w-full items-center justify-between flex-wrap">
      <div class="flex column justify-center">
        <label for="weight">W</label>
        <input type="text" name="weight" id="weight" value="${weight}" class="bg-yellow-200 w-8" />
      </div>
      <div class="flex column justify-center">
        <label for="height">H</label>
        <input type="text" name="height" id="height" value="${height}" class="bg-yellow-200 w-8" />
      </div>
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}