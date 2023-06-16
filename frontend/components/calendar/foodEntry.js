export default function FoodEntry({ entry = {}, add, onClick }) {
  const { id, hour, note } = entry;

  const entryComponent = document.createElement('button');
  entryComponent.onclick = () => onClick(id, add);

  entryComponent.className = 'bg-yellow-200 p-3 m-1 w-full rounded-xl shadow-small center column';

  entryComponent.innerHTML = add ? `
    <img class="small square" src="/frontend/assets/img/plus-symbol.png" alt="add feed" />
  ` : `
    <p class="text-purple-500">${hour}</p>
    <h2 class="text-yellow-500">${note}</h2>
  `;
  
  return entryComponent;
}