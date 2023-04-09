import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import ChildrenList from '/frontend/components/children/childrenList.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };
import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };

const { title, friend: friendRoute } = Routes.children.friendships;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

const relationships = mocked_relationships.filter(({ childIds }) => childIds.includes(childId));

const friendIds = relationships.map(({ childIds }) => {
  const [firstId, secondId] = childIds;
  if (firstId === childId) {
    return secondId;
  }

  return firstId;
});

const friends = mocked_children.filter(({ id }) => friendIds.includes(id));

const onClickCard = (id, add) => {
  window.location.href = add ? friendRoute.add.path(childId) : friendRoute.path(childId, id)
}

document.body.appendChild(ChildrenList({ children: friends, onClick: onClickCard }));