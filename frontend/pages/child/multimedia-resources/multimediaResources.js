import Header from '../../../components/header.js';
import MultimediaList from '../../../components/children/multimediaList.js';

document.body.appendChild(Header('Resurse multimedia'));
document.body.appendChild(MultimediaList([
  { id: 1, date: '2020-01-01', description: 'Descriere resursă 1', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 2, date: '2020-01-02', description: 'Descriere resursă 2', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 3, date: '2020-01-03', description: 'Descriere resursă 3', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 4, date: '2020-01-04', description: 'Descriere resursă 4', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 5, date: '2020-01-05', description: 'Descriere resursă 5', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 6, date: '2020-01-06', description: 'Descriere resursă 6', image: 'https://www.w3schools.com/w3images/avatar2.png' },
]));
