import Routes from '../../utils/Routes.js';

export default function ChildCard({ firstName, add, id, onClick }) {
  const childCard = document.createElement('button');
  childCard.onclick = () => onClick(id, add);

  childCard.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column';

  childCard.innerHTML = add ? `
    <img class="large square mb-3" src="/frontend/assets/img/plus-symbol.png" alt="add child" />

    <h1 class="text-purple-900">Adauga copil</h1>
  ` : `
    <img class="xl square mb-2" src="/frontend/assets/img/children.png" alt="logo" />

    ${firstName ? `<h1 class="text-purple-900">${firstName}</h1>` : null}
  `;
  
  return childCard;
}