import Header from '/frontend/components/header.js';
import FriendForm from '/frontend/components/forms/friendForm.js';

import { getFriendById, getFriendByIdRSS } from '/frontend/api/friend/getFriendById.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

import RSSButton from '../../../../../components/rssButton.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { title } = Routes.children.friendships.friend.edit;

const friendId = new URLSearchParams(window.location.search).get('friendId');

const friend = await getFriendById(friendId);

document.body.appendChild(RSSButton(() => getFriendByIdRSS(friendId)));
document.body.appendChild(Header(title));
document.body.appendChild(FriendForm({ friend }));