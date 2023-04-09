import Header from '/frontend/components/header.js';
import ActivityForm from '/frontend/components/forms/activityForm.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };

const { card, path } = Routes.children.friendships.friend;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));
const cardId = parseInt(new URLSearchParams(window.location.search).get('cardId'));

const relationship = mocked_relationships.find(({ childIds }) => childIds.includes(childId) && childIds.includes(friendId));
const activity = relationship.activities.find(({ id }) => id === cardId);

const onSave = () => {
  // TO DO: api call
  window.location.href = path(childId, friendId);
} 


document.body.appendChild(Header(card.add.title));
document.body.appendChild(ActivityForm({ activity, onSave }));