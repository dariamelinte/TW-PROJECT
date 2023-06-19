import Header from '/frontend/components/header.js';
import ChildForm from '/frontend/components/forms/childForm.js';

import { INITIAL_CHILD } from '/frontend/utils/initialValues.js';
import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

document.body.appendChild(Header(Routes.addChild.title));

document.body.appendChild(ChildForm({ child: INITIAL_CHILD, add: true }));