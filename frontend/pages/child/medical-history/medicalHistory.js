import Header from '../../../components/header.js';
import MedicalHistoryList from '../../../components/children/medicalHistoryList.js';

document.body.appendChild(Header('Istoric medical'));
document.body.appendChild(MedicalHistoryList([
  { id: 1, title: 'Istoric medical 1', date: '01.01.2021', severity: 'low' },
  { id: 2, title: 'Istoric medical 2', date: '02.02.2021', severity: 'medium' },
  { id: 3, title: 'Istoric medical 3', date: '03.03.2021', severity: 'high' },
  { id: 4, title: 'Istoric medical 4', date: '04.04.2021', severity: 'low' },
  { id: 5, title: 'Istoric medical 5', date: '05.05.2021', severity: 'medium' },
  { id: 6, title: 'Istoric medical 6', date: '06.06.2021', severity: 'high' },
]));