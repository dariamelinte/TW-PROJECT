import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';
import { showError } from '/frontend/utils/showMessages.js';

import { getSleepingEventById } from '/frontend/api/sleeping/getSleepingEventById.js';
import { editSleepingEvent } from '/frontend/api/sleeping/updateSleepingEvent.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { add, path } = Routes.children.sleepingCalendar;

const childId = new URLSearchParams(window.location.search).get('childId');
const id = new URLSearchParams(window.location.search).get('cardId');

const event = await getSleepingEventById(id);

const onSave = async (formData) => {
  // api call
  const sleepingInput = Object.fromEntries(formData);
  const data = await editSleepingEvent(id, sleepingInput);

  if(!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId, id);
} 

document.body.appendChild(Header(add.title));
document.body.appendChild(SleepingNoteForm({ childId, sleepingNote: event, onSave }));