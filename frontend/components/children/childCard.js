export default function ChildCard({ iconPath, name, add }) {
  const childCard = document.createElement('button');
  childCard.onclick = () => {
    if (add) {
      console.log("add new child");
      return;
    }

    console.log("view child");
  };

  childCard.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column';

  childCard.innerHTML = add ? `
    <img class="large square mb-3" src="${iconPath}/img/plus-symbol.png" alt="add child" />

    <h1 class="text-purple-900">Adauga copil</h1>
  ` : `
    <img class="xl square mb-2" src="${iconPath}/img/children.png" alt="logo" />

    ${name ? `<h1 class="text-purple-900">${name}</h1>` : null}
  `;
  
  return childCard;
}