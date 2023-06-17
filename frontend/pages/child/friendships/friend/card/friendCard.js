import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';
import { showError } from '/frontend/utils/showMessages.js';

import { getFriendInteractionById } from '/frontend/server/friendInteraction/getFriendInteractionById.js';
import { editFriendInteraction } from '/frontend/server/friendInteraction/editFriendInteraction.js';

import { getCookie } from '/frontend/utils/cookie.js';
import { COOKIE_NAME } from '/frontend/utils/constants.js';
import { isJwtExpired } from '/frontend/utils/jwt.js';
import Routes from '/frontend/utils/Routes.js';

const jwt = getCookie(COOKIE_NAME);

if (!jwt || isJwtExpired(jwt)) {
  window.location.href = Routes.login.path();
}

const { card, path } = Routes.children.friendships.friend;

const searchParams = new URLSearchParams(window.location.search);

const childId = searchParams.get('childId');
const friendId = searchParams.get('friendId');
const cardId = searchParams.get('cardId');

const interaction = await getFriendInteractionById(cardId);

const onSave = async (formData) => {
  const interactionInput = Object.fromEntries(formData);

  const data = await editFriendInteraction(cardId, interactionInput);

  if (!data.success) {
    showError(data.message);
    return;
  }


  window.location.href = path(childId, friendId);
} 


document.body.appendChild(Header(card.add.title));
document.body.appendChild(ActivityForm({ activity: interaction, onSave, childId }));