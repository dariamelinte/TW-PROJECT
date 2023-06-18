import Header from '/frontend/components/header.js';
import MedicalEntryForm from '/frontend/components/forms/medicalEntryForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_MEDICAL_ENTRY } from '/frontend/utils/initialValues.js';
import { showError } from '/frontend/utils/showMessages.js';

import { addMedicalEvent } from '/frontend/server/medicalEvent/addMedicalEvent.js';

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