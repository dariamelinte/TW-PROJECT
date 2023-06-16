import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";
import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import { getFeedingEvents } from '/frontend/server/feeding/getFeedingEvents.js';


const { title, add: addRoute, card: cardRoute } = Routes.children.feedingCalendar;

//if child param present => user on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
//const feedings = await getFeedingEvents(childId);
const feedings = [
  {
    childId: "0cbb7893-ad2d-4c8c-9349-dc877ee9c449",
    date_time: "2023-06-12'T'21:03:34.245'Z'",
    note: "lapte cu gris cu dulceata de visine",
    id: "1"
  },
  {
    childId: "0cbb7893-ad2d-4c8c-9349-dc877ee9c449",
    date_time: "2023-06-13'T'09:03:34.245'Z'",
    note: "banana",
    id: "2"
  },
  {
    childId: "0cbb7893-ad2d-4c8c-9349-dc877ee9c449",
    date_time: "2023-06-13'T'14:03:34.245'Z'",
    note: "supica cu paine",
    id: "3"
  }
  
];

const onClickCell = async (id, add) => {
  if (add) {
    window.location.href = addRoute(childId);
  } else {
    window.location.href = cardRoute(childId, id);
  }
}

document.body.appendChild(Header(title));

document.body.appendChild(Calendar({
  week: feedings,
  entryType: entryTypes.food,
  onClick: onClickCell
}));