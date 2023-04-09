import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';

const { add, path } = Routes.children.sleepingCalendar;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 

document.body.appendChild(Header(add.title));
document.body.appendChild(SleepingNoteForm({ onSave }));