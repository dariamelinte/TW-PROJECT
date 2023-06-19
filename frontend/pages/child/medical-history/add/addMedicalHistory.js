import Header from '/frontend/components/header.js';
import MedicalEntryForm from '/frontend/components/forms/medicalEntryForm.js';

import { INITIAL_MEDICAL_ENTRY } from '/frontend/utils/initialValues.js';
import { showError } from '/frontend/utils/showMessages.js';

import { addMedicalEvent } from '/frontend/api/medicalEvent/addMedicalEvent.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { add, path } = Routes.children.medicalHistory;

const childId = new URLSearchParams(window.location.search).get('childId');

const onSave = async (formData) => {
  const interactionInput = Object.fromEntries(formData);
  interactionInput.childId = childId;

  const data = await addMedicalEvent(interactionInput);

  if (!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId);
} 


document.body.appendChild(Header(add.title));
document.body.appendChild(MedicalEntryForm({ medicalEntry: INITIAL_MEDICAL_ENTRY, onSave }));