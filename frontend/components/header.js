export default function Header(title) {
  const header = document.createElement('header');
  header.classList.add('header');

  header.innerHTML = `
    <nav class="flex w-full justify-between items-center bg-purple-700 pl-6 pr-6 pt-2 pb-2">
      <div class="w-5 h-5 bg-yellow-200 rounded-xl">
        <a class="w-full h-full" href="/" >
          <img src="../assets/logo.png" alt="logo" />
        </a>
      </div>

      ${title ? `<h1 class="text-2xl text-white">${title}</h1>` : ''}

      <div class="flex">
          <a class="w-3 h-3 bg-yellow-200 rounded-xl p-1 mr-3" href="/" >
            <img src="../assets/img/user.png" alt="logo" />
          </a>
          <button class="w-5 h-3 bg-yellow-200 rounded-xl p-1 ml-2 light-bold-text">
            Log Out
          </button>
      </div>
    </nav>
  `;
  
  return header;
}