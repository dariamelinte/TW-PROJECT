import ChangePassword from "/frontend/components/changePassword/changePassword.js";
import Header from '/frontend/components/header.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

document.body.appendChild(Header(Routes.myAccount.changePassword.title));
document.body.appendChild(ChangePassword());
