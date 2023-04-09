import Header from '/frontend/components/header.js';
import Routes from '/frontend/utils/Routes.js';
import AddFriendForm from '/frontend/components/forms/addFriendForm.js';

const { title } = Routes.children.friendships.friend.add;

document.body.appendChild(Header(title));
document.body.appendChild(AddFriendForm());