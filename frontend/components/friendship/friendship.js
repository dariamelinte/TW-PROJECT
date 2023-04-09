import ActivityList from "/frontend/components/activity/activityList.js";

import Friend from "./friend.js";

export default function Friendship({ relationship, friend }){
    const { activities, howTheyMet, friendshipLevel } = relationship;

    const friendship = document.createElement('div');

    friendship.className = "center flex-wrap my-6";

    friendship.appendChild(ActivityList({ activities }));
    friendship.appendChild(Friend({ friend, howTheyMet, friendshipLevel }));

    return friendship;
}