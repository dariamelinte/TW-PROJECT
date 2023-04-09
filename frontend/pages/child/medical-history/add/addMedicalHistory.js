import Header from '/frontend/components/header.js';
import MedicalEntryForm from '/frontend/components/forms/medicalEntryForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_MEDICAL_ENTRY } from '/frontend/utils/initialValues.js';

const { add, path } = Routes.children.medicalHistory;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId);
} 


document.body.appendChild(Header(add.title));
document.body.appendChild(MedicalEntryForm({ medicalEntry: INITIAL_MEDICAL_ENTRY, onSave }));