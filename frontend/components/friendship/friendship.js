import ActivityList from "/frontend/components/activity/activityList.js";
import Routes from "/frontend/utils/Routes.js";

import Friend from "./friend.js";

export default function Friendship({ relationship = {}, friend = {} }){
    console.log(friend);
    const { activities } = relationship;

    const childId = new URLSearchParams(window.location.search).get('childId');
    const friendId = new URLSearchParams(window.location.search).get('friendId');
    
    const onClickActivity = (id, add) => {
        const { path, add: { path: addPath} } = Routes.children.friendships.friend.card;
        window.location.href = add ? addPath(childId, friendId) : path(childId, friendId, id);
    }

    const friendship = document.createElement('div');

    friendship.className = "center flex-wrap my-6";

    friendship.appendChild(ActivityList({ activities, onClick: onClickActivity }));
    friendship.appendChild(Friend({ friend }));

    return friendship;
}