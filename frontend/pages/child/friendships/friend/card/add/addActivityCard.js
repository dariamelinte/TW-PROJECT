import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';

import Routes from '/frontend/utils/Routes.js';

import { INITIAL_ACTIVITY } from '/frontend/utils/initialValues.js';

const { title } = Routes.children.friendships.friend.card.add;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));

document.body.appendChild(Header(title));
document.body.appendChild(ActivityForm({ childId, friendId, activity: INITIAL_ACTIVITY }));