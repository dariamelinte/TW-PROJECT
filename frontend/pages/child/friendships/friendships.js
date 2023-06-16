import Header from '/frontend/components/header.js';
import ChildrenList from '/frontend/components/children/childrenList.js';
import Routes from '/frontend/utils/Routes.js';

import { getFriend } from '/frontend/server/friend/getFriends.js';


const { title, friend: friendRoute } = Routes.children.friendships;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const friends = await getFriend(childId);

const onClickCard = (id, add) => {
  window.location.href = add ? friendRoute.add.path(childId) : friendRoute.path(childId, id)
}

document.body.appendChild(ChildrenList({ children: friends, onClick: onClickCard }));