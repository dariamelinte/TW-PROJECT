import Header from '/frontend/components/header.js';
import FriendForm from '/frontend/components/forms/friendForm.js';

import { INITIAL_FRIEND } from '/frontend/utils/initialValues.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { title } = Routes.children.friendships.friend.add;

document.body.appendChild(Header(title));
document.body.appendChild(FriendForm({ friend: INITIAL_FRIEND, add: true }));