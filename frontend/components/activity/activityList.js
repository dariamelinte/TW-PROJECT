import ActivityCard from "./activityCard.js";

export default function ActivityList({ activities, onClick }) {
  const activityList = document.createElement('div');
  activityList.className = "center flex-wrap";
  
  activityList.appendChild(ActivityCard({ add: true, onClick }))

  activities.forEach((activity) => {
    activityList.appendChild(ActivityCard({ activity, onClick }));
  });

  return activityList;
}