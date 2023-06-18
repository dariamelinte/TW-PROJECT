import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';
import showError from '/frontend/utils/showError.js';

import { getSleepingEventById } from '/frontend/server/sleeping/getSleepingEventById.js';
import { editSleepingEvent } from '/frontend/server/sleeping/updateSleepingEvent.js';

import Routes from '/frontend/utils/Routes.js';

// import mocked_week_sleep from '../__mock__week-sleep.json' assert { type: 'json' };

const { add, path } = Routes.children.sleepingCalendar;

const childId = new URLSearchParams(window.location.search).get('childId');
const id = new URLSearchParams(window.location.search).get('cardId');

const event = await getSleepingEventById(id);

const onSave = async (formData) => {
  // api call
  const sleepingInput = Object.fromEntries(formData);
  // console.log(sleepingInput);
  const data = await editSleepingEvent(id, sleepingInput);

  if(!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId, id);
} 

document.body.appendChild(Header(add.title));
document.body.appendChild(SleepingNoteForm({ childId, sleepingNote: event, onSave }));