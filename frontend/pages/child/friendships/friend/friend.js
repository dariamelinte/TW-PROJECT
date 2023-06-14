import Header from '/frontend/components/header.js';
import Friendship from '/frontend/components/friendship/friendship.js';

import { getFriendById } from '/frontend/server/friend/getFriendById.js';
import Routes from '/frontend/utils/Routes.js';

import mocked_relationships from '/frontend/utils/__mock__relationships.json' assert { type: 'json' };

const { title } = Routes.children.friendships.friend;

// if the childId param is present, then the user is on a child page
const childId = new URLSearchParams(window.location.search).get('childId');
const friendId = new URLSearchParams(window.location.search).get('friendId');

const relationship = mocked_relationships.find(({ childIds }) => childIds.includes(1) && childIds.includes(2));


const friend = await getFriendById(friendId);


document.body.appendChild(Header(title));
document.body.appendChild(Friendship({ relationship, friend }));