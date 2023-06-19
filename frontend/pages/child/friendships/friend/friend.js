import Header from '/frontend/components/header.js';
import Friendship from '/frontend/components/friendship/friendship.js';

import { getFriendById } from '/frontend/api/friend/getFriendById.js';
import { getFriendInteractions, getFriendInteractionsRSS } from '/frontend/api/friendInteraction/getFriendInteractions.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';
import RSSButton from '../../../../components/rssButton.js';


const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { title } = Routes.children.friendships.friend;

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
const friendId = new URLSearchParams(window.location.search).get('friendId');

const interactions = await getFriendInteractions(childId, friendId);
const friend = await getFriendById(friendId);

document.body.appendChild(RSSButton(() => getFriendInteractionsRSS(childId, friendId)));
document.body.appendChild(Header(title));
document.body.appendChild(Friendship({ interactions, friend }));