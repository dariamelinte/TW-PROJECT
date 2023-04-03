export default function LoginForm() {
  const form = document.createElement('form');

  const login = ((event) => {
    event.preventDefault();

    
    const form = document.querySelector('form');
    const formData = new FormData(form);
    
    //TODO: send the data to the server
    console.log(formData.get('email'));
    console.log(formData.get('password'));
  ;;}).toString().replace('(event) => {', '').replace(';;}', '');


  form.innerHTML = `
    <div class="flex column justify-center">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
    </div>
    
    <div class="flex column justify-center">
      <label for="password">Password</label>
      <input name="password" id="password" placeholder="Password" type="password" />
    </div>

    <a class="mt-2" href="/register">Add your family</a>
    <a href="/forgot-password">Forgot password?</a>

    <button class="mt-3" onclick="${login}">Login</button>
    `;
  return form;
}