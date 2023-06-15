import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";
import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import { getFeedingEvents } from '/frontend/server/feeding/getFeedingEvents.js';


const { title, add: addRoute, card: cardRoute } = Routes.children.feedingCalendar;
  
document.body.appendChild(Header(title));

//if child param present => user on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
const feedings = await getFeedingEvents(childId);

const onClickCell = (id, add) => {
  if (add) {
    window.location.href = addRoute(childId);
  } else {
    window.location.href = cardRoute(childId, id);
  }
}

document.body.appendChild(Calendar({
  week: feedings,
  entryType: entryTypes.food,
  onClick: onClickCell
}));