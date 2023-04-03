export default function RegisterForm() {
  const form = document.createElement('form');

  const register = ((event) => {
    event.preventDefault();

    const form = document.querySelector('form');
    const formData = new FormData(form);

    //TODO: send the data to the server
    console.log(formData.get('email'));
    console.log(formData.get('password'));
    console.log(formData.get('firstName'));
    console.log(formData.get('lastName'));
    console.log(formData.get('dateOfBirth'));
  ;;}).toString().replace('(event) => {', '').replace(';;}', '');

  form.innerHTML = `
    <div class="flex row justify-center">
      <div class="flex column justify-center mr-2">
        <div class="flex column justify-center">
          <label for="email">Email</label>
          <input type="email" name="email" id="email" placeholder="Email" />
        </div>
        
        <div class="flex column justify-center">
          <label for="password">Password</label>
          <input name="password" id="password" placeholder="Password" type="password" />
        </div>

        <div class="flex column justify-center">
          <label for="password">Confirm password</label>
          <input name="password" id="confirmPassword" placeholder="Confirm password" type="password" />
        </div>
      </div>

      <div class="flex column justify-center ml-2">
        <div class="flex column justify-center">
          <label for="firstName">First name</label>
          <input type="text" name="firstName" id="firstName" placeholder="First name" />
        </div>

        <div class="flex column justify-center">
          <label for="lastName">Last name</label>
          <input type="text" name="lastName" id="lastName" placeholder="Last name" />
        </div>

        <div class="flex column justify-center">
          <label for="dateOfBirth">Birth Date</label>
          <input type="date" name="dateOfBirth" id="dateOfBirth" placeholder="Birth Date" />
        </div>
      </div>
    </div>

    <a class="mt-2" href="/login">Already have an account?</a>

    <button class="mt-3" onclick="${register}">Register</button>
    `;
  return form;
}