export default function ActivityCard({ activity = {}, add, onClick }) {
  const { id, title, date } = activity;

  const activityCard = document.createElement('button');
  activityCard.onclick = () => onClick(id, add);

  activityCard.className = 'w-30 bg-purple-400 p-3 my-2 mx-1 rounded shadow-small center column';

  activityCard.innerHTML = add ? `
    <img class="large square mb-3" src="/frontend/assets/img/plus-symbol.png" alt="add activity" />
  ` : `
    <h1 class="text-purple-900 pb-2">${date}</h1>
    <h1 class="text-purple-900">${title}</h1>
  `;
  
  return activityCard;
}