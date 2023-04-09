import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";

import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import mock_week_sleep from './__mock__week-sleep.json' assert { type: "json" };

const { title, add: { path: addPath}, card: { path: cardPath } } = Routes.children.sleepingCalendar;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
  
const onClickCell = (id, add) => {
  if (add) {
    window.location.href = addPath(childId);
  } else {
    window.location.href = cardPath(childId, id);
  }
}

document.body.appendChild(Header(title));

document.body.appendChild(Calendar({
  week: mock_week_sleep,
  entryType: entryTypes.sleep,
  onClick: onClickCell
}));

