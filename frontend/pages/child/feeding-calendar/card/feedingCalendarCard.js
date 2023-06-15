import Header from '/frontend/components/header.js';
import FeedingNoteForm from '/frontend/components/forms/feedingNoteForm.js';
import showError from '/frontend/utils/showError.js';

import { getFeedingEventById } from '/frontend/server/feeding/getFeedingEventById.js';
import { editFeedingEvent } from '/frontend/server/feeding/updateFeedingEvent.js';

import Routes from '/frontend/utils/Routes.js';

//import mocked_week_feeding from '../__mock__week-feeding.json' assert { type: 'json' };

const { add, path } = Routes.children.feedingCalendar;

const childId = new URLSearchParams(window.location.search).get('childId');
const id = new URLSearchParams(window.location.search).get('cardId');

const event = await getFeedingEventById(childId, id);

const onSave = async (formData) => {
  // api call
  const feedingInput = Object.fromEntries(formData);

  const data = await editFeedingEvent(childId, id, feedingInput);

  if(!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId, id);
} 

// let feedingNote = {}
// Object.values(mocked_week_feeding).forEach(day => {
//   const findResult = day.find(entry => entry.id === cardId);

//   if (findResult) {
//     feedingNote = findResult;
//   }
// });

// console.log(feedingNote);

document.body.appendChild(Header(add.title));
document.body.appendChild(FeedingNoteForm({childId, feedingNote: event, onSave }));