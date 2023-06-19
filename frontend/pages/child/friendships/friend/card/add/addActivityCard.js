import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';
import { addFriendInteraction } from '/frontend/api/friendInteraction/addFriendInteraction.js';
import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import { showError } from '/frontend/utils/showMessages.js';
import cleanInput from '/frontend/utils/cleanInput.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { card, path } = Routes.children.friendships.friend;

const childId = new URLSearchParams(window.location.search).get('childId');
const friendId = new URLSearchParams(window.location.search).get('friendId');

const onSave = async (formData) => {
  const interactionInput = cleanInput(Object.fromEntries(formData));
  interactionInput.friendId = friendId;

  const data = await addFriendInteraction(interactionInput);

  if (!data.success) {
    showError(data.message);
    return;
  }

  window.location.href = path(childId, friendId);
} 

document.body.appendChild(Header(card.add.title));
document.body.appendChild(ActivityForm({ activity: INITIAL_ACTIVITY, onSave, childId, add: true }));