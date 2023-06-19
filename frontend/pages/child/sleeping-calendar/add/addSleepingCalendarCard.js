import Header from '/frontend/components/header.js';
import SleepingNoteForm from '/frontend/components/forms/sleepingNoteForm.js';

import { INITIAL_SLEEPING_NOTE } from '/frontend/utils/initialValues.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { title } = Routes.children.sleepingCalendar.add;

document.body.appendChild(Header(title));
document.body.appendChild(SleepingNoteForm({ sleepingNote: INITIAL_SLEEPING_NOTE, add: true }));