import Day from "./day.js";
import Entry from "./entry.js";

export default function Calendar({ week, entryType, onClick }) {
    const calendar = document.createElement('div');
    calendar.className = "w-full bg-purple-400 m-6 p-3 rounded shadow-small center column";

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); 
    let yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;

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
    applyButton.className = "ml-3 mr-3 bg-yellow-200 rounded p-1";
    applyButton.textContent = "Aplica";

    const timePeriod = document.createElement('div');
    timePeriod.className = "w-full p-3 rounded flex-wrap center row";
    timePeriod.setAttribute("style", "max-width: 670px");
    timePeriod.appendChild(startDateContainer);
    timePeriod.appendChild(endDateContainer);
    timePeriod.appendChild(applyButton);
    timePeriod.appendChild(Entry({ entryType, add: true, onClick }));

    calendar.appendChild(timePeriod);
    
    
    let inputStart;
    let inputEnd;
    let startDate;
    let endDate;

    setTimeout(() => {      
      document.getElementById("start-date").addEventListener("change", function() {
        inputStart = this.value;
        inputEndDate.setAttribute('min', inputStart);
        startDate = new Date(inputStart);
      });
      document.getElementById('end-date').addEventListener("change", function() {
        inputEnd = this.value;
        inputStartDate.setAttribute('max', inputEnd);
        endDate = new Date(inputEnd);
      });
    
    }, "1000");
      

    
    const daysContainer = document.createElement('div');
    daysContainer.className = "w-full flex justify-evenly flex-wrap";
    
    applyButton.addEventListener('click', () => {
      daysContainer.innerHTML = "";
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
        const stringDate = d.toString();
        window[stringDate] = [];
      }
      week.forEach((event) => {
        let dateOfEvent;
        if (entryType === "food") {
          const { date_time } = event;
    
          const date_time_split = date_time.split('T');

          dateOfEvent = new Date(date_time_split[0]);
        } else {
          const { date } = event;
          dateOfEvent = new Date(date);
        }

        if ( dateOfEvent >= startDate && dateOfEvent <= endDate){
          window[dateOfEvent].push(event);
        }
  
      });
      for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {

        daysContainer.appendChild(Day({ 'dayOfEvent': d, 'entries': window[d], entryType, onClick }));
      }
    });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }