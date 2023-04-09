import Header from "../../../components/header.js";
import Calendar from "../../../components/calendar/calendar.js";

import dummy_events_luni from './__dummy__events__luni.json' assert { type: "json" };
import dummy_events_marti from './__dummy__events__marti.json' assert { type: "json" };
import dummy_events_miercuri from './__dummy__events__miercuri.json' assert { type: "json" };
import dummy_events_joi from './__dummy__events__joi.json' assert { type: "json" };
import dummy_events_vineri from './__dummy__events__vineri.json' assert { type: "json" };
import dummy_events_sambata from './__dummy__events__sambata.json' assert { type: "json" };
import dummy_events_duminica from './__dummy__events__duminica.json' assert { type: "json" };

const iconPath = '../../../assets';

document.body.appendChild(Header({ iconPath , titlu: "Calendarul somnului"}));
document.body.appendChild(Calendar({ iconPath , luni: dummy_children_luni , marti: dummy_children_marti , miercuri: dummy_children_miercuri , joi: dummy_children_joi , vineri: dummy_children_vineri , sambata: dummy_children_sambata , duminica: dummy_children_duminica}));