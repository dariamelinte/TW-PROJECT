import ActivityList from "/frontend/components/activity/activityList.js";

export default function Friendship({ relationship, friend }){
    const friendship = document.createElement('div');

    friendship.className = "center flex-wrap my-6";

    friendship.appendChild(ActivityList({ activities: relationship.activities }));
    // friendship.appendChild(FriendSide());

    return friendship;
}