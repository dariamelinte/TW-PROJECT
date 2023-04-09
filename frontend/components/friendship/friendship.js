import ActivityList from "/frontend/components/activity/activityList.js";
import Routes from "/frontend/utils/Routes.js";

import Friend from "./friend.js";

export default function Friendship({ relationship = {}, friend = {} }){
    const { activities, howTheyMet, friendshipLevel } = relationship;

    const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));
    const friendId = parseInt(new URLSearchParams(window.location.search).get('friendId'));
    
    const onClickActivity = (id, add) => {
        const { path, add: { path: addPath} } = Routes.children.friendships.friend.card;
        window.location.href = add ? addPath(childId, friendId) : path(childId, friendId, id);
    }

    const friendship = document.createElement('div');

    friendship.className = "center flex-wrap my-6";

    friendship.appendChild(ActivityList({ activities, onClick: onClickActivity }));
    friendship.appendChild(Friend({ friend, howTheyMet, friendshipLevel }));

    return friendship;
}