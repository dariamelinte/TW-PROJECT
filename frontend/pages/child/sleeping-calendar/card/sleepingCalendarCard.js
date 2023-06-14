import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_week_sleep from '../__mock__week-sleep.json' assert { type: 'json' };

const { add, path } = Routes.children.sleepingCalendar;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const cardId = parseInt(new URLSearchParams(window.location.search).get('cardId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 

let sleepingNote = {}
Object.values(mocked_week_sleep).forEach(day => {
  const findResult = day.find(entry => entry.id === cardId);

  if (findResult) {
    sleepingNote = findResult;
  }
});

console.log(sleepingNote);

document.body.appendChild(Header(add.title));
document.body.appendChild(SleepingNoteForm({ sleepingNote, onSave }));