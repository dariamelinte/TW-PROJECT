import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';
import showError from '/frontend/utils/showError.js';

import cleanInput from '/frontend/utils/cleanInput.js';
import Routes from '/frontend/utils/Routes.js';
import { addFriendInteraction } from '/frontend/server/friendInteraction/addFriendInteraction.js';
import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';

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
document.body.appendChild(ActivityForm({ activity: INITIAL_ACTIVITY, onSave, childId }));