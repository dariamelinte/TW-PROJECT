import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';

import Routes from '/frontend/utils/Routes.js';

import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';

const { card, path } = Routes.children.friendships.friend;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId, friendId);
} 

document.body.appendChild(Header(card.add.title));
document.body.appendChild(ActivityForm({ activity: INITIAL_ACTIVITY, onSave }));