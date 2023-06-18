import { sleepTypes } from "/frontend/utils/selectsOptions.js";

export default function SleepEntry({ entry = {}, add, onClick }) {
  const { id, date, start_time, end_time, sleepType, note } = entry;

  const entryComponent = document.createElement('button');
  entryComponent.onclick = () => onClick(id, add);

  entryComponent.className = 'bg-yellow-200 p-3 m-1 w-full rounded-xl shadow-small center column';

  entryComponent.innerHTML = add ? `
    <img class="small square" src="/frontend/assets/img/plus-symbol.png" alt="add sleep" />
  ` : `
    <p class="text-purple-500">${start_time} - ${end_time}</p>
    <p class="text-purple-700">${sleepTypes[sleepType]}</p>
    <h2 class="text-yellow-500">${note}</h2>
  `;
  
  return entryComponent;
}