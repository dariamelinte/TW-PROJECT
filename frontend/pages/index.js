import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import Routes from '../utils/Routes.js';
import ChildrenList from '../components/children/childrenList.js';

import mocked_children from './__mock__children.json' assert { type: 'json' };

const iconPath = "../assets/";

document.body.appendChild(Header(null, iconPath));

// if the childId param is present, then the user is on a child page
console.log(window.location.search);
const childId = new URLSearchParams(window.location.search).get('childId');

if (!childId) {
  document.body.appendChild(ChildrenList({ children: mocked_children, iconPath}));
} else {
  document.body.appendChild(VerticalList(Object.values(Routes.children)));
}