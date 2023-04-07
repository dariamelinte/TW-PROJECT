import Routes from '../../utils/Routes.js';

export default function MedicalHistoryList(medicalHistory) {
  const list = document.createElement('div');
  const childId = new URLSearchParams(window.location.search).get('childId');
  list.className = 'flex column center mt-6 w-1_2';

  const addMedicalHistory = document.createElement('div');
  addMedicalHistory.className = 'center bg-purple-400 m-3 w-full rounded-xl cursor-pointer h-7';
  addMedicalHistory.id = 'add-medical-history';
  addMedicalHistory.innerHTML = '<div class="center"><h1 class="text-white text-size-big bold-text">+</h1></div>'
  list.appendChild(addMedicalHistory);

  list.innerHTML = list.innerHTML + `
    ${medicalHistory.map(medicalHistory => `
      <div class="flex row center w-full justify-between
        bg-purple-400 m-2 rounded-xl cursor-pointer px-6" 
        id="medical-history_id_${medicalHistory.id}"
      >
        <div class="py-6 justify-between h-10 column cursor-pointer">
          <h3 class="text-white">${medicalHistory.date}</h2>
          <h2 class="text-white bold-text">${medicalHistory.title}</h2>
        </div>
        <div class="center pr-6">
          <h2 class="text-white bold-text">Severity: ${medicalHistory.severity}</h2>
        </div>
      </div>
    `).join('')}
  `;

  // Run after the DOM is rendered
  setTimeout(() => {
    document.getElementById('add-medical-history').onclick = () =>
      window.location.href = Routes.children.medicalHistory.card.path(childId, 'new');
    medicalHistory.forEach(medicalHistory => {
      document.getElementById(`medical-history_id_${medicalHistory.id}`).onclick = () => 
        window.location.href = Routes.children.medicalHistory.card.path(childId, medicalHistory.id);
    });
  }, 10);

  return list;
}