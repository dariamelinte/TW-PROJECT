import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';
import showError from '/frontend/utils/showError.js';

import { getFriendInteractionById } from '/frontend/server/friendInteraction/getFriendInteractionById.js';
import { editFriendInteraction } from '/frontend/server/friendInteraction/editFriendInteraction.js';

import Routes from '/frontend/utils/Routes.js';

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