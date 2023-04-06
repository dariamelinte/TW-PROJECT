import Routes from "../utils/Routes.js";

export default function Header(title, iconPath) {
  const header = document.createElement('nav');
  header.className = 'flex w-full justify-between items-center bg-purple-700 pl-6 pr-6 pt-2 pb-2 shadow-small';

  iconPath = iconPath || '../../../../assets';

  header.innerHTML = `
    <div class="w-5 h-5 bg-yellow-200 rounded-xl">
      <a class="w-full h-full" href="/" >
        <img src="${iconPath}/img/logo.png" alt="logo" />

      </a>
    </div>
    
    ${title ? `<h1 class="text-2xl text-white">${title}</h1>` : ''}
    
    <div class="flex" id='right_side_header'>
        <a class="w-3 h-3 bg-yellow-200 rounded-xl p-1 mr-3" href="/" >
          <img src="${iconPath}/img/user.png" alt="logo" />
        </a>
        <button class="w-5 h-3 bg-yellow-200 rounded-xl p-1 ml-2 light-bold-text">Log Out</button>
    </div>
  `;
  
  const logoutButton = header.querySelector('button');
  logoutButton.addEventListener('click', () => {
    window.location.href = Routes.login.path();
  }); 

  return header;
}