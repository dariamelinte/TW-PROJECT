import Header from '/frontend/components/header.js';
import MedicalEntryForm from '/frontend/components/forms/medicalEntryForm.js';

import { getMedicalEventById } from '/frontend/server/medicalEvent/getMedicalEventById.js';
import { editMedicalEvent } from '/frontend/server/medicalEvent/editMedicalEvent.js';

import Routes from '/frontend/utils/Routes.js';
import { showError } from '/frontend/utils/showMessages.js';

const { card, path } = Routes.children.medicalHistory;

const params = new URLSearchParams(window.location.search);
const cardId = params.get('cardId');
const childId = params.get('childId');

const { result: medicalEntry } = await getMedicalEventById(cardId);

const onSave = async (formData) => {
  const interactionInput = Object.fromEntries(formData);
  const data = await editMedicalEvent(cardId, interactionInput);

  if (!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId);
} 


document.body.appendChild(Header(card.title));
document.body.appendChild(MedicalEntryForm({ medicalEntry, onSave }));