import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import FriendForm from '/frontend/components/forms/friendForm.js';

import { getFriendById } from '/frontend/server/friend/getFriendById.js';

const { title } = Routes.children.friendships.friend.edit;

const friendId = new URLSearchParams(window.location.search).get('friendId');

const friend = await getFriendById(friendId);

document.body.appendChild(Header(title));
document.body.appendChild(FriendForm({ friend }));