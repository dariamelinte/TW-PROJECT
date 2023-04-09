import Header from '/frontend/components/header.js';
import Calendar from "/frontend/components/calendar/calendar.js";


import Routes from '/frontend/utils/Routes.js';
import { entryTypes } from "/frontend/utils/selectsOptions.js";

import mock_week_feeding from './__mock__week-feeding.json' assert { type: "json" };

const { title } = Routes.children.feedingCalendar;

document.body.appendChild(Header(title));

document.body.appendChild(Calendar({ week: mock_week_feeding, entryType: entryTypes.food }));