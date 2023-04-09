import Routes from '/frontend/utils/Routes.js';
import { getAge } from '/frontend/utils/getAge.js';
import { friendshipTypes } from '/frontend/utils/selectsOptions.js';

export default function Friend({ friend = {}, howTheyMet, friendshipLevel }) {
  const { id, firstName, lastName, dateOfBirth, mother, father } = friend;

  const childId = parseInt(new URLSearchParams(window.location.search).get('childId'));

  const friendCard = document.createElement('button');
  friendCard.onclick = () => {
    window.location.href = Routes.children.friendships.friend.edit.path(childId, id);
  };

  friendCard.className = 'bg-purple-400 p-3 my-2 mx-1 rounded shadow-small center column';

  friendCard.innerHTML = `
    <img class="xl square mb-2" src="/frontend/assets/img/children.png" alt="child" />
    <h1 class="text-purple-900">${firstName} ${lastName}</h1>

    <div class="bg-purple-700 p-2 mt-1 rounded shadow-small center column">
      <p class="text-purple-200 pb-1">Varsta: ${getAge(dateOfBirth)}</p>
      <p class="text-purple-200 pb-1">Mama: ${mother}</p>
      <p class="text-purple-200 pb-1">Tata: ${father}</p>
      <p class="text-purple-200 pb-1">Cum se cunosc: ${howTheyMet}</p>
      <div>
        <p class="text-purple-200">Nivel prietenie: <p/>
        <p class="text-purple-200">${friendshipTypes[friendshipLevel]}</p>
      </div>
    </div>
  `;
  
  return friendCard;
}