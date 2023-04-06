import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import Routes from '../utils/Routes.js';
import ChildrenList from '../components/children/childrenList.js';

document.body.appendChild(Header({ iconPath: '../assets' }));

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const mock = [
  {
    "id": 1,
    "name": "Eva Maria"
  },
  {
    "id": 2,
    "name": "Marco"
  },
  {
    "id": 3,
    "name": "Felix"
  },
  {
    "id": 4,
    "name": "Lulu"
  },
  {
    "id": 5,
    "name": "Roger"
  }
]

if (childId) {
  document.body.appendChild(ChildrenList(mock));
} else {
  document.body.appendChild(VerticalList(Object.values(Routes.children)));
}