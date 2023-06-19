import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import { getSleepingEvents, getSleepingEventsRSS } from '/frontend/api/sleeping/getSleepingEvents.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';
import RSSButton from '../../../components/rssButton.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { title, add: addRoute, card: cardRoute } = Routes.children.sleepingCalendar;

//if child param present => user on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
const sleepings = await getSleepingEvents(childId);
  
const onClickCell = async (id, add) => {
  if (add) {
    window.location.href = addRoute.path(childId);
  } else {
    window.location.href = cardRoute.path(childId, id);
  }
}

document.body.appendChild(Header(title));

document.body.appendChild(RSSButton(() => getSleepingEventsRSS(childId)));

document.body.appendChild(Calendar({
  week: sleepings,
  entryType: entryTypes.sleep,
  onClick: onClickCell
}));

