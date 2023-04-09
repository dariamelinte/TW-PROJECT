import { sleepTypes } from "/frontend/utils/selectsOptions.js";

export default function SleepEntry({ entry = {}, add, onClick }) {
  const { id, hours = [], info, sleepType } = entry;
  const [startHour, endHour] = hours;

  const entryComponent = document.createElement('button');
  entryComponent.onclick = () => onClick(id, add);

  entryComponent.className = 'bg-yellow-200 p-3 m-1 w-full rounded-xl shadow-small center column';

  entryComponent.innerHTML = add ? `
    <img class="small square" src="/frontend/assets/img/plus-symbol.png" alt="add sleep" />
  ` : `
    <p class="text-purple-500">${startHour} - ${endHour}</p>
    <h2 class="text-yellow-500">${info}</h2>
    <p class="text-purple-700">${sleepTypes[sleepType]}</p>
  `;
  
  return entryComponent;
}