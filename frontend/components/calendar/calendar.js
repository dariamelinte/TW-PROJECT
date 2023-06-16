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
    
    // let mondayEvents = [];
    // let tuesdayEvents = [];
    // let wednesdayEvents = [];
    // let thursdayEvents = [];
    // let fridayEvents = [];
    // let saturdayEvents = [];
    // let sundayEvents = [];

    // console.log(week);
    // Object.entries(week).forEach(([event]) => {
    //   const { date_time } = event;
    //   const date_time_split = date_time.toString().split('\'');
    //   const weekDay = date_time_split[0].getDay();

    //   switch(weekDay){
    //     case "0":
    //       sundayEvents.push(event);
    //     case "1":
    //       mondayEvents.push(event);
    //     case "2":
    //       tuesdayEvents.push(event);
    //     case "3":
    //       wednesdayEvents.push(event);
    //     case "4":
    //       thursdayEvents.push(event);
    //     case "5":
    //       fridayEvents.push(event);
    //     case "6":
    //       saturdayEvents.push(event);
    //   }
    // });

    // let dayOfWeek = "monday";
    // daysContainer.appendChild(Day({ dayOfWeek, mondayEvents, entryType, onClick }));

    // dayOfWeek = "tuesday";
    // daysContainer.appendChild(Day({ dayOfWeek, tuesdayEvents, entryType, onClick }));

    // dayOfWeek = "wednesday";
    // daysContainer.appendChild(Day({ dayOfWeek, wednesdayEvents, entryType, onClick }));
    
    // dayOfWeek = "thursday";
    // daysContainer.appendChild(Day({ dayOfWeek, thursdayEvents, entryType, onClick }));
    
    // dayOfWeek = "friday";
    // daysContainer.appendChild(Day({ dayOfWeek, fridayEvents, entryType, onClick }));
    
    // dayOfWeek = "saturday";
    // daysContainer.appendChild(Day({ dayOfWeek, saturdayEvents, entryType, onClick }));
    
    // dayOfWeek = "sunday";
    // daysContainer.appendChild(Day({ dayOfWeek, sundayEvents, entryType, onClick }));

    Object.entries(week).forEach(([weekDay, entries]) => {
      daysContainer.appendChild(Day({ weekDay, entries, entryType, onClick }));
    });

    calendar.appendChild(daysContainer);
  
    return calendar;
  }