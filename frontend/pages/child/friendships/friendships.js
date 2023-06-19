import Header from '/frontend/components/header.js';
import ChildrenList from '/frontend/components/children/childrenList.js';

import { getFriend } from '/frontend/api/friend/getFriends.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}


const { title, friend: friendRoute } = Routes.children.friendships;

document.body.appendChild(Header(title));

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const friends = await getFriend(childId);

const onClickCard = (id, add) => {
  window.location.href = add ? friendRoute.add.path(childId) : friendRoute.path(childId, id)
}

document.body.appendChild(ChildrenList({ children: friends, onClick: onClickCard }));