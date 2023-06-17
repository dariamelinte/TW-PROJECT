import { weekTypes } from "/frontend/utils/selectsOptions.js";

import Entry from "./entry.js";

export default function Day({ weekDay, entries, entryType, onClick }) {
    const day = document.createElement('div');
    day.className = "mx-3 my-6 w-20 rounded-xl";

    const dayName = document.createElement('div');
    dayName.className = "bg-purple-200 rounded-xl m-1 p-1 w-full";
    dayName.innerHTML = `
      <h4 class="text-purple-900 centered-text light-bold-text">${weekTypes[weekDay]}</h4>
    `;

    day.appendChild(dayName);

    
    entries.forEach(entry => {
      day.appendChild(Entry({ entryType, entry, onClick }))
    });
  
    day.appendChild(Entry({ entryType, add: true, onClick }))
    
    return day;
  }