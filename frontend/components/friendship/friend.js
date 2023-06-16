import Routes from '/frontend/utils/Routes.js';
import { getAge } from '/frontend/utils/getAge.js';
import { friendshipTypes } from '/frontend/utils/selectsOptions.js';

export default function Friend({ friend = {}, className }) {
  const {
    id,
    childId,
    firstName,
    lastName,
    dateOfBirth,
    howTheyMet,
    parentName,
    parentContact,
    relationship
  } = friend;

  const friendCard = document.createElement('button');
  friendCard.onclick = () => {
    window.location.href = Routes.children.friendships.friend.edit.path(childId, id);
  };

  friendCard.className = `bg-purple-400 p-3 my-2 mx-1 rounded shadow-small center column ${className}`;

  friendCard.innerHTML = `
    <img class="xl square mb-2" src="/frontend/assets/img/children.png" alt="child" />
    <h1 class="text-purple-900">${firstName} ${lastName}</h1>

    <div class="bg-purple-700 p-2 mt-1 rounded shadow-small center column">
      <p class="text-purple-200 pb-1">Varsta: ${getAge(dateOfBirth)}</p>
      <div class="pb-1">
        <p class="text-purple-200">Nume parinte:<p/>
        <p class="text-purple-200">${parentName}</p>
      </div>
      <div class="pb-1">
        <p class="text-purple-200">Contact parinte:<p/>
        <p class="text-purple-200">${parentContact}</p>
      </div>
      <div class="pb-1">
        <p class="text-purple-200">Cum se cunosc:<p/>
        <p class="text-purple-200">${howTheyMet}</p>
      </div>
      <div>
        <p class="text-purple-200">Nivel prietenie:<p/>
        <p class="text-purple-200">${friendshipTypes[relationship]}</p>
      </div>
    </div>
  `;

  return friendCard;
}
