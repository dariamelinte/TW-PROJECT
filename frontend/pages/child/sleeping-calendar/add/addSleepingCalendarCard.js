import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_SLEEPING_NOTE } from '/frontend/utils/initialValues.js';

const { title } = Routes.children.sleepingCalendar.add;

document.body.appendChild(Header(title));
document.body.appendChild(SleepingNoteForm({ sleepingNote: INITIAL_SLEEPING_NOTE, add: true }));