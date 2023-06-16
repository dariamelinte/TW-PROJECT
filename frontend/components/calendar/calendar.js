import Day from "./day.js";

export default function Calendar({ week, entryType, onClick }) {
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
    
    let mondayEvents = [];
    let tuesdayEvents = [];
    let wednesdayEvents = [];
    let thursdayEvents = [];
    let fridayEvents = [];
    let saturdayEvents = [];
    let sundayEvents = [];

    console.log(week);
    
    week.forEach((event) => {
      console.log(event);

      const { date_time } = event;
      console.log(date_time);

      const date_time_split = date_time.split('\'');
      console.log(date_time_split[0]);

      const date = new Date(date_time_split[0]);
      console.log(date);

      const day = date.toString().split(' ');
      console.log(day[0]);

      if ( day[0] === "Sun" ) {
        sundayEvents.push(event);
      } else if ( day[0] === "Mon" ){
        mondayEvents.push(event);
      } else if ( day[0] === "Tue" ){
        tuesdayEvents.push(event);
      } else if ( day[0] === "Wed" ){
        wednesdayEvents.push(event);
      } else if ( day[0] === "Thu" ){
        thursdayEvents.push(event);
      } else if ( day[0] === "Fri" ){
        fridayEvents.push(event);
      } else if ( day[0] === "Sat" ){
        saturdayEvents.push(event);
      }
    });

    
    let weekDay = "monday";
    let entries = mondayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));

    weekDay = "tuesday";
    entries = [];
    entries = tuesdayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));

    weekDay = "wednesday";
    entries.length = 0;
    entries = wednesdayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    
    weekDay = "thursday";
    entries.length = 0;
    entries = thursdayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    
    weekDay = "friday";
    entries.length = 0;
    entries = fridayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    
    weekDay = "saturday";
    entries.length = 0;
    entries = saturdayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    
    weekDay = "sunday";
    entries.length = 0;
    entries = sundayEvents;
    daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));

    // Object.entries(week).forEach(([weekDay, entries]) => {
    //   daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    // });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }