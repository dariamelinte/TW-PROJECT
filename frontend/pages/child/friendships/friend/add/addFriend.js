import Header from '/frontend/components/header.js';
import FriendForm from '/frontend/components/forms/friendForm.js';

import Routes from '/frontend/utils/Routes.js';
import { INITIAL_FRIEND } from '/frontend/utils/initialValues.js';

const { title } = Routes.children.friendships.friend.add;

document.body.appendChild(Header(title));
document.body.appendChild(FriendForm({ friend: INITIAL_FRIEND, add: true }));