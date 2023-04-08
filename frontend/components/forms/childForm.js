import Routes from "/frontend/utils/Routes.js";

export default function ChildForm({ child = {}, add = false }) {
  const saveData = (e) => {
    console.log(e);

    if (add) {
      window.location.href = Routes.root;
    } else {
      window.location.href = Routes.child.path(child.id);
    }
  }

  console.log(child);

  const { lastName, firstName, dateOfBirth, sex = "sex", nationality, weight, height } = child;

  const form = document.createElement('form');
  form.className = 'mt-9';

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

      <div class="flex flex-1 column justify-center ">
        <label for="sex">Sex</label>
        <select class="bg-yellow-200 rounded p-1" name="sex" id="sex">
            <option value="sex" selected=${"sex" === sex} disabled>Sex</option>
            <option value="male" selected=${"male" === sex}>Male</option>
            <option value="female" selected=${"female" === sex}>Female</option>
            <option value="nonBinary" selected=${"nonBinary" === sex}>Non-Binary</option>
            <option value="preferNotToSay" selected=${"preferNotToSay" === sex}>Prefer not to say</option>
        </select> 
      </div>
    </div>

    <div class="flex items-center w-full flex-wrap">
      <div class="flex flex-1 column justify-center pr-6">
        <label for="nationality">Nationalitate</label>
        <input type="text" name="nationality" id="nationality" value="${nationality}" class="bg-yellow-200" />
      </div>

      <div class="flex flex-1 items-center justify-between flex-wrap">
        <div class="flex column justify-center">
          <label for="weight">W</label>
          <input type="text" name="weight" id="weight" value="${weight}" class="bg-yellow-200 w-5" />
        </div>
        <div class="flex column justify-center">
          <label for="height">H</label>
          <input type="text" name="height" id="height" value="${height}" class="bg-yellow-200 w-5" />
        </div>
      </div>
    </div>

    <button class="mt-3" type="button">Submit</button>
  `;

  form.querySelector('button').addEventListener('click', saveData);

  return form;
}