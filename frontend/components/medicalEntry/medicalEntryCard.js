import { severityTypes} from '/frontend/utils/selectsOptions.js';

export default function MedicalEntryCard({ medicalEntry = {}, add, onClick }) {
  const { id, title, date, severity } = medicalEntry;

  const medicalEntryCard = document.createElement('button');
  medicalEntryCard.onclick = () => onClick(id, add);

  medicalEntryCard.className = 'w-30 bg-purple-400 p-3 my-2 mx-1 rounded shadow-small center column';

  medicalEntryCard.innerHTML = add ? `
    <img class="large square mb-3" src="/frontend/assets/img/plus-symbol.png" alt="add medical entry" />
    <h2 class="text-purple-900 pb-2">Adauga activitate</h2>
  ` : `
    <h2 class="text-purple-900 pb-2">${date}</h2>
    <h2 class="text-purple-900">${title}</h2>
    <h2 class="text-purple-900">Severitate: ${severityTypes[severity]}</h2>
  `;
  
  return medicalEntryCard;
}