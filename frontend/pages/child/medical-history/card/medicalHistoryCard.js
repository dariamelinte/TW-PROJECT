import Header from '/frontend/components/header.js';
import MedicalEntryForm from '/frontend/components/forms/medicalEntryForm.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_medical_history from '/frontend/utils/__mock__medical-history.json' assert { type: 'json' };

const { card, path } = Routes.children.medicalHistory;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const cardId = parseInt(new URLSearchParams(window.location.search).get('cardId'));

const medicalEntry = mocked_medical_history.find((medical_entry) => (
  medical_entry.childId === childId && medical_entry.id === cardId
));

console.log(medicalEntry);

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 


document.body.appendChild(Header(card.title));
document.body.appendChild(MedicalEntryForm({ medicalEntry, onSave }));