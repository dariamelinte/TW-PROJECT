export default function myAccountForm() {
    const myAccountForm = document.createElement('form');
  
    const edit = ((event) => {
      event.preventDefault();
  
      const form = document.querySelector('form');
      const formData = new FormData(form);
  
      //TODO: send the data to the server
      console.log(formData.get('firstName'));
      console.log(formData.get('lastName'));
      console.log(formData.get('email'));
      console.log(formData.get('dateOfBirth'));
      console.log(formData.get('gender'));
      console.log(formData.get('nationalitate'));
    ;;}).toString().replace('(event) => {', '').replace(';;}', '');
  
    myAccountForm.className="rounded";
    myAccountForm.innerHTML = `
      <div class="flex row justify-center">
        <div class="flex column justify-center mr-2">
            <div class="flex column justify-center">
                <label for="firstName">First name</label>
                <input type="text" name="firstName" id="firstName" placeholder="First name" />
            </div>

            <div class="flex column justify-center">
                <label for="lastName">Last name</label>
                <input type="text" name="lastName" id="lastName" placeholder="Last name" />
            </div>
  
            <div class="flex column justify-center">
                <label for="email">Email</label>
                <input type="email" name="email" id="email" placeholder="Email" />
            </div>
        </div>
  
        <div class="flex column justify-center ml-2">
          <div class="flex column justify-center">
              <label for="dateOfBirth">Birth Date</label>
              <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Birth Date" />
          </div>
  
          <div class="flex column justify-center">
            <label for="gender">Gen</label>
            <select class="bg-white rounded pb-2 pt-2 px-1" name="gender" id="gender">
                <option value="gender" selected disabled>Gen</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="nonBinary">Non-Binary</option>
                <option value="preferNotToSay">Prefer not to say</option>
            </select> 
          </div>
  
          <div class="flex column justify-center pt-3">
            <label for="nationalitate">Nationalitate</label>
            <input type="text" name="nationalitate" id="nationalitate" placeholder="Nationalitate" />
          </div>
        </div>
      </div>
  
      <button class="mt-3" onclick="${edit}">Save</button>
      `;
    return myAccountForm;
  }