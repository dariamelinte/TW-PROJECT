import Event from "./event.js";
import Coloana from "./coloana.js";

const iconPath = '../../assets';

export default function Calendar({iconPath , feed , luni , marti , miercuri , joi , vineri , sambata , duminica }) {
    const calendar = document.createElement('div');
    calendar.className = "center flex-wrap mx-9 my-6 bg-purple-400";

    const week = document.createElement('h1');
    week.innerText = '3 aprilie - 9 aprilie';
    calendar.appendChild(week);

    calendar.body.appendChild(Coloana({ iconPath, day: "Luni" , luni , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Marti" , marti , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Miercuri" , miercuri , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Joi" , joi , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Vineri" , vineri , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Sambata" , sambata , feed}));
    calendar.body.appendChild(Coloana({ iconPath, day: "Duminica" , duminica , feed}));

  
    return calendar;
  }