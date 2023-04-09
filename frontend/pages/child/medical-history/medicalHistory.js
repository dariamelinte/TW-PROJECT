import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import MedicalEntryList from '/frontend/components/medicalEntry/medicalEntryList.js';

import mocked_medical_history from '/frontend/utils/__mock__medical-history.json' assert { type: 'json' };

const { title, add: { path: addPath}, card: { path: cardPath } } = Routes.children.medicalHistory;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

const medicalEntries = mocked_medical_history.filter((medical_entry) => medical_entry.childId === childId);

const onClickCard = (id, add) => {
  window.location.href = add ? addPath(childId) : cardPath(childId, id);
}

document.body.appendChild(MedicalEntryList({ medicalEntries, onClick: onClickCard }));