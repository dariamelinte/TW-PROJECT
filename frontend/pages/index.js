import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import ChildrenList from '../components/children/childrenList.js';
import RSSButton from '../components/rssButton.js';

import { getFamilyChildren, getFamilyChildrenRSS } from "../api/child/getFamilyChildren.js";

import { getCookie } from '../utils/cookie.js';
import { COOKIE_NAME } from '../utils/constants.js';
import { isJwtExpired, parseJwt } from '../utils/jwt.js';
import Routes from '../utils/Routes.js';
import { getChildById, getChildByIdRSS } from '../api/child/getChildById.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');

const onClickCard = (id, add) => {
  window.location.href = add ? Routes.addChild.path() : Routes.child.path(id)
}

const children = await getFamilyChildren();

document.body.appendChild(Header());

if (!childId) {
  document.body.appendChild(ChildrenList({ children, onClick: onClickCard }));
  document.body.appendChild(RSSButton(getFamilyChildrenRSS));
} else {
  document.body.appendChild(VerticalList(Object.values(Routes.children)));
}