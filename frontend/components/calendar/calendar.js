import Day from "./day.js";


export default function Calendar({ feedings, entryType, onClick }) {
    const calendar = document.createElement('div');
    calendar.className = "w-full bg-purple-400 m-6 p-3 rounded shadow-small center column";

    const timePeriod = document.createElement('h1');
    timePeriod.className = "mb-2";

    Date.prototype.GetFirstDayOfWeek = function () {
      return ( new Date(this.setDate(this.getDate() - this.getDay() + (this.getDay() == 0 ? -6 : 1) )));
    };
    Date.prototype.GetLastDayOfWeek = function () {
      return ( new Date(this.setDate(this.getDate() - this.getDay() + 7 )));
    };
    const today = new Date;
    const firstDay = today.GetFirstDayOfWeek().toString().split(' ');
    const lastDay = today.GetLastDayOfWeek().toString().split(' ');

    timePeriod.textContent = 'Luni ' + firstDay[2] + ' - Duminica ' + lastDay[2];
    calendar.appendChild(timePeriod);

    const daysContainer = document.createElement('div');
    daysContainer.className = "w-full flex justify-evenly flex-wrap";
  
    Object.entries(feedings).forEach(([weekDay, entries]) => {
      daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }