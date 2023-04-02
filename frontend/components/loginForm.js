export default function LoginForm(data) {
  const form = document.createElement('form');
  
  form.innerHTML = `
    <div class="flex column justify-center">
      <label for="email">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
    </div>
    
    <div class="flex column justify-center">
      <label for="password">Password</label>
      <input name="password" id="password" placeholder="Password" />
    </div>

    <a class="mt-2" href="/register">Add your family</a>
    <a href="/forgot-password">Forgot password?</a>

    <button class="mt-3" type="submit">Login</button>
    `;
  return form;
}