import MyAccount from "/frontend/components/myAccount/myAccount.js";
import Header from '/frontend/components/header.js';

import { getMyProfile } from "/frontend/server/myProfile/getMyProfile.js";

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { result: account } = await getMyProfile();

document.body.appendChild(Header(Routes.myAccount.title));
document.body.appendChild(MyAccount({ account }));