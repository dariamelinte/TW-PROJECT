import Header from '/frontend/components/header.js';
import FeedingNoteForm from '/frontend/components/forms/feedingNoteForm.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_week_feeding from '../__mock__week-feeding.json' assert { type: 'json' };

const { add, path } = Routes.children.feedingCalendar;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const cardId = parseInt(new URLSearchParams(window.location.search).get('cardId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 

let feedingNote = {}
Object.values(mocked_week_feeding).forEach(day => {
  const findResult = day.find(entry => entry.id === cardId);

  if (findResult) {
    feedingNote = findResult;
  }
});

console.log(feedingNote);

document.body.appendChild(Header(add.title));
document.body.appendChild(FeedingNoteForm({ feedingNote, onSave }));