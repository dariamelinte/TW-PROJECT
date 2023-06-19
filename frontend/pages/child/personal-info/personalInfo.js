import Header from '/frontend/components/header.js';
import ChildForm from '/frontend/components/forms/childForm.js';

import { getChildById } from '/frontend/api/child/getChildById.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const childId = new URLSearchParams(window.location.search).get('childId');

const child = await getChildById(childId);

document.body.appendChild(Header(Routes.children.personalInfo.title));
document.body.appendChild(ChildForm({ child }));