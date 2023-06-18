export default function FoodEntry({ entry = {}, add, onClick }) {
  const { id, date_time, note } = entry;

  let date_time_split = "";
  let time = "";

  if (!add) {
    date_time_split = date_time.split('T');
    time = date_time_split[1].slice(0,5);
  }

  const entryComponent = document.createElement('button');
  entryComponent.onclick = () => onClick(id, add);

  entryComponent.className = 'bg-yellow-200 p-3 m-1 w-full rounded-xl shadow-small center column';

  entryComponent.innerHTML = add ? `
    <img class="small square" src="/frontend/assets/img/plus-symbol.png" alt="add feed" />
  ` : `
    <p class="text-purple-500">${time}</p>
    <h2 class="text-yellow-500">${note}</h2>
  `;
  
  return entryComponent;
}