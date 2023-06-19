import Header from '/frontend/components/header.js';
import MultimediaList from '/frontend/components/children/multimediaList.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

document.body.appendChild(Header('Resurse multimedia'));
document.body.appendChild(MultimediaList([
  { id: 1, date: '2020-01-01', description: 'Descriere resursă 1', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 2, date: '2020-01-02', description: 'Descriere resursă 2', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 3, date: '2020-01-03', description: 'Descriere resursă 3', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 4, date: '2020-01-04', description: 'Descriere resursă 4', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 5, date: '2020-01-05', description: 'Descriere resursă 5', image: 'https://www.w3schools.com/w3images/avatar2.png' },
  { id: 6, date: '2020-01-06', description: 'Descriere resursă 6', image: 'https://www.w3schools.com/w3images/avatar2.png' },
]));
