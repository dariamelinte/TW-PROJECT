import Routes from "../utils/Routes.js";
import { COOKIE_NAME } from "../utils/constants.js";

export default function Header(title) {
  const header = document.createElement('nav');
  header.className = 'flex w-full justify-between items-center bg-purple-700 pl-6 pr-6 pt-2 pb-2 shadow-small';

  header.innerHTML = `
    <div class="w-5 h-5 bg-yellow-200 rounded-xl">
      <a class="w-full h-full" href="${Routes.root}" >
        <img src="/frontend/assets/img/logo.png" alt="logo" />

      </a>
    </div>
    
    ${title ? `<h2 class="text-2xl text-white">${title}</h2>` : ''}
    
    <div class="flex" id='right_side_header'>
        <a class="w-3 h-3 bg-yellow-200 rounded-xl p-1 mr-3" href="${Routes.myAccount.path()}" >
          <img src="/frontend/assets/img/user.png" alt="logo" />
        </a>
        <button class="w-5 h-3 bg-yellow-200 rounded-xl p-1 ml-2 light-bold-text">Log Out</button>
    </div>
  `;
  
  const logoutButton = header.querySelector('button');
  logoutButton.addEventListener('click', () => {
    // Make the cookie invalid
    document.cookie = `${COOKIE_NAME}=; path=/;`;
    window.location.href = Routes.login.path();
  }); 

  return header;
}