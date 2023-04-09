import Header from '/frontend/components/header.js';
import Friendship from '/frontend/components/friendship/friendship.js';

import Routes from '/frontend/utils/Routes.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };
import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };

const { title } = Routes.children.friendships;

// if the childId param is present, then the user is on a child page
const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));

const relationship = mocked_relationships.find(({ childIds }) => childIds.includes(childId) && childIds.includes(friendId));
const friend = mocked_children.find(({ id }) => id === friendId);


document.body.appendChild(Header(title));
document.body.appendChild(Friendship({ relationship, friend }));