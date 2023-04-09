import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };

const { title } = Routes.children.friendships.friend.card.add;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));
const cardId = parseInt(new URLSearchParams(window.location.search).get('cardId'));

const relationship = mocked_relationships.find(({ childIds }) => childIds.includes(childId) && childIds.includes(friendId));
console.log(relationship);
const activity = relationship.activities.find(({ id }) => id === cardId);

document.body.appendChild(Header(title));
document.body.appendChild(ActivityForm({ childId, friendId, activity }));