import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import ChildrenList from '../components/children/childrenList.js';
import Routes from '../utils/Routes.js';

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const onClickCard = (id, add) => {
  window.location.href = add ? Routes.addChild.path() : Routes.child.path(id)
}

document.body.appendChild(Header());

if (!childId) {
  document.body.appendChild(await ChildrenList({ onClick: onClickCard }));
} else {
  document.body.appendChild(VerticalList(Object.values(Routes.children)));
}