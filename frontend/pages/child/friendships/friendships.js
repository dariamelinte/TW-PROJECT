import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import ChildrenList from '/frontend/components/children/childrenList.js';

import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };

const { title, friend: friendRoute } = Routes.children.friendships;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const friends = mocked_children.filter(({ id }) => id !== parseInt(childId))

const onClickCard = (id, add) => {
  window.location.href = add ? friendRoute.add.path(childId) : friendRoute.path(childId, id)
}

document.body.appendChild(ChildrenList({ children: friends, onClick: onClickCard }));