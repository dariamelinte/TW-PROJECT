import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";

import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import mock_week_sleep from './__mock__week-sleep.json' assert { type: "json" };

const { title } = Routes.children.sleepingCalendar;

document.body.appendChild(Header(title));

document.body.appendChild(Calendar({ week: mock_week_sleep, entryType: entryTypes.sleep }));