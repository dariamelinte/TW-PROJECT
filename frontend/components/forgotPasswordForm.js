export default function ForgotPasswordForm() {
  const form = document.createElement('form');

  const submit = ((event) => {
    event.preventDefault();
    const form = document.querySelector('form');

    //remove the label and input and button
    document.getElementById('email_label').remove();
    document.getElementById('email').remove();
    document.getElementById('send').remove();

    //add the message
    const message = document.createElement('p');
    message.innerText = 'Check your email for a link to reset your password.';
    form.appendChild(message);

    const button = document.createElement('button');
    button.classList.add('mt-3');
    button.innerText = 'Login';
    button.onclick = () => {
      window.location.href = '/login';
    };
    form.appendChild(button);
    
  ;;}).toString().replace('(event) => {', '').replace(';;}', '');

  form.innerHTML = `
    <div class="flex column justify-center">
      <label for="email" id="email_label">Email</label>
      <input type="email" name="email" id="email" placeholder="Email" />
    </div>
    
    <button class="mt-3" onclick="${submit}" id="send">Send</button>
  `;
  return form;
}