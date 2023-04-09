import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import Routes from '../utils/Routes.js';
import ChildrenList from '../components/children/childrenList.js';

import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };

document.body.appendChild(Header());

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const onClickCard = (id, add) => {
  window.location.href = add ? Routes.addChild.path() : Routes.child.path(id)
}

if (!childId) {
  document.body.appendChild(ChildrenList({ children: mocked_children, onClick: onClickCard }));
} else {
  document.body.appendChild(VerticalList(Object.values(Routes.children)));
}