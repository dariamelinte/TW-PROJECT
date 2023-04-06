import Routes from '../../utils/Routes.js';

export default function ForgotPasswordForm() {
  const form = document.createElement('form');

  function submit(event) {
    event.preventDefault();
    const form = document.querySelector('form');

    document.getElementById('email_label').remove();
    document.getElementById('email').remove();
    document.getElementById('send').remove();

    const message = document.createElement('p');
    message.innerText = 'Check your email for a link to reset your password.';
    form.appendChild(message);

    const button = document.createElement('button');
    button.classList.add('mt-3');
    button.innerText = 'Login';
    button.onclick = (e) => {
      e.preventDefault();
      window.location.href = Routes.login.path();
    };
    form.appendChild(button); 
  }

  form.innerHTML = `
    <div class="flex column justify-center">
      <label for="email" id="email_label">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
    </div>

    <button id="send" class="mt-3">Send</button>
  `;

  form.querySelector('button').addEventListener('click', submit);

  return form;
}

