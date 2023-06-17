import Day from "./day.js";

export default function Calendar({ week, entryType, onClick }) {
    const calendar = document.createElement('div');
    calendar.className = "w-full bg-purple-400 m-6 p-3 rounded shadow-small center column";

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);

    const inputStartDate = document.createElement('input');
    inputStartDate.setAttribute('type', 'date');
    inputStartDate.setAttribute('id', 'start-date');
    inputStartDate.setAttribute('max', today);
    inputStartDate.setAttribute('value', '');
    inputStartDate.className = "ml-3 bg-yellow-200 rounded p-1";

    const inputEndDate = document.createElement('input');
    inputEndDate.setAttribute('type', 'date');
    inputEndDate.setAttribute('id', 'end-date');
    inputEndDate.setAttribute('max', today);
    inputEndDate.setAttribute('value', '');
    inputEndDate.className = "ml-3 bg-yellow-200 rounded p-1";

    const startDateContainer = document.createElement('div');
    startDateContainer.className = "m-3 row";
    const start = document.createElement('h2');
    start.className = "center";
    start.textContent = 'De la:';
    startDateContainer.appendChild(start);
    startDateContainer.appendChild(inputStartDate);

    const endDateContainer = document.createElement('div');
    endDateContainer.className = "m-3 row";
    const end = document.createElement('h2');
    end.className = "center";
    end.textContent = 'Pana la:';
    endDateContainer.appendChild(end);
    endDateContainer.appendChild(inputEndDate);

    const applyButton = document.createElement('button');
    applyButton.className = "ml-3 bg-yellow-200 rounded p-1";
    applyButton.textContent = "Aplica";

    const newMeal = document.createElement('button');
    newMeal.className = "ml-3 bg-yellow-200 rounded p-1";
    newMeal.textContent = "Masa noua";
    newMeal.onclick = () => onClick(true);

    const timePeriod = document.createElement('div');
    timePeriod.className = "w-full p-3 rounded flex-wrap center row";
    timePeriod.appendChild(startDateContainer);
    timePeriod.appendChild(endDateContainer);
    timePeriod.appendChild(applyButton);

    calendar.appendChild(timePeriod);
    calendar.appendChild(newMeal);

    console.log(week);
    
    let inputStart;
    let inputEnd;
    let startDate;
    let endDate;
    window.addEventListener("DOMContentLoaded", (event) => {
      document.getElementById('start-date').addEventListener("change", function() {
        inputStart = this.value;
        inputEndDate.setAttribute('min', inputStart);
        startDate = new Date(inputStart);
        console.log("START");
        console.log(inputStart); //e.g. 2015-11-13
      });
      document.getElementById('end-date').addEventListener("change", function() {
        inputEnd = this.value;
        inputStartDate.setAttribute('max', inputEnd);
        endDate = new Date(inputEnd);
        console.log("END");
        console.log(inputEnd); //e.g. 2015-11-13
      });
    });

    
    const daysContainer = document.createElement('div');
    daysContainer.className = "w-full flex justify-evenly flex-wrap";
    
    applyButton.addEventListener('click', () => {
      daysContainer.innerHTML = "";
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        console.log(new Date(d));
        const stringDate = d.toString();
        console.log(stringDate);
        window[stringDate] = [];
      }
      week.forEach((event) => {
        console.log(event);
  
        const { date_time } = event;
        console.log(date_time);
  
        const date_time_split = date_time.split('T');
        console.log(date_time_split[0]);

        let dateOfEvent = new Date(date_time_split[0]);
        console.log(dateOfEvent);

        if ( dateOfEvent >= startDate && dateOfEvent <= endDate){
          console.log("yas queen");
          window[dateOfEvent].push(event);
        }
  
      });
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        console.log(window[d]);

        daysContainer.appendChild(Day({ 'dayOfEvent': d, 'entries': window[d], entryType, onClick }));
      }
    });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }