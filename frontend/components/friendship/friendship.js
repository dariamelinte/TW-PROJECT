import ActivityList from "/frontend/components/activity/activityList.js";
import Routes from "/frontend/utils/Routes.js";

import Friend from "./friend.js";

export default function Friendship({ interactions = [], friend = {} }){
    const childId = new URLSearchParams(window.location.search).get('childId');
    const friendId = new URLSearchParams(window.location.search).get('friendId');
    
    const onClickActivity = (id, add) => {
        const { path, add: { path: addPath} } = Routes.children.friendships.friend.card;
        window.location.href = add ? addPath(childId, friendId) : path(childId, friendId, id);
    }

    const friendship = document.createElement('div');

    friendship.className = "items-start flex-wrap my-6 flex justify-around w-full";

    friendship.appendChild(ActivityList({ activities: interactions, onClick: onClickActivity }));
    friendship.appendChild(Friend({ friend }));

    return friendship;
}