import Day from "./day.js";


export default function Calendar({ week, entryType, onClick }) {
    const calendar = document.createElement('div');
    calendar.className = "w-full bg-purple-400 m-6 p-3 rounded shadow-small center column";

    const timePeriod = document.createElement('h1');
    timePeriod.className = "mb-2";
    timePeriod.innerText = '3 aprilie - 9 aprilie';
    calendar.appendChild(timePeriod);

    const daysContainer = document.createElement('div');
    daysContainer.className = "w-full flex justify-evenly flex-wrap";
  
    Object.entries(week).forEach(([weekDay, entries]) => {
      daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }