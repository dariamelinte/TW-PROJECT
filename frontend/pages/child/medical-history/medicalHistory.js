import Header from '/frontend/components/header.js';
import MedicalEntryList from '/frontend/components/medicalEntry/medicalEntryList.js';

import { getMedicalEvents } from '/frontend/server/medicalEvent/getMedicalEvents.js'

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const {
  title,
  add: { path: addPath },
  card: { path: cardPath }
} = Routes.children.medicalHistory;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const medicalEntries = await getMedicalEvents(childId);

const onClickCard = (id, add) => {
  window.location.href = add ? addPath(childId) : cardPath(childId, id);
};

document.body.appendChild(MedicalEntryList({ medicalEntries, onClick: onClickCard }));
