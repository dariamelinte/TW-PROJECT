import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import FriendForm from '/frontend/components/forms/friendForm.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };
import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };

const { title } = Routes.children.friendships.friend.add;

const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));

const relationship = mocked_relationships.find(({ childIds }) => childIds.includes(childId) && childIds.includes(friendId)) || {};
const friend = mocked_children.find(({ id }) => id === friendId);

const { howTheyMet, friendshipLevel } = relationship;

document.body.appendChild(Header(title));
document.body.appendChild(FriendForm({ friend, howTheyMet, friendshipLevel }));