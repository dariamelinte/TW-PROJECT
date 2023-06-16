import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";
import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import { getFeedingEvents } from '/frontend/server/feeding/getFeedingEvents.js';


const { title, add: addRoute, card: cardRoute } = Routes.children.feedingCalendar;

//if child param present => user on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
const feedings = await getFeedingEvents(childId);

// console.log("check 2");
// console.log(childId);
// console.log(feedings);
// console.log("check 3");

const onClickCell = (id, add) => {
  if (add) {
    window.location.href = addRoute(childId);
  } else {
    window.location.href = cardRoute(childId, id);
  }
}

document.body.appendChild(Header(title));

document.body.appendChild(Calendar({
  feedings: feedings,
  entryType: entryTypes.food,
  onClick: onClickCell
}));