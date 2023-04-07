import Routes from '../../utils/Routes.js';

export default function MultimediaList(resources) {
  const list = document.createElement('div');  
  list.className = 'flex row center flex-wrap mt-6';
  const childId = new URLSearchParams(window.location.search).get('childId');

  const addResource = document.createElement('div');
  addResource.className = 'center bg-purple-400 m-3 p-3 h-20 p-3 rounded-xl cursor-pointer';
  addResource.id = 'add-resource';
  addResource.innerHTML = '<div class="w-15 center"><h1 class="text-white text-size-big bold-text">+</h1></div>'
  list.appendChild(addResource);

  list.innerHTML = list.innerHTML + `
    ${resources.map(resource => `
      <div class="h-20 flex column bg-purple-400 m-3 p-3 rounded-xl cursor-pointer" id="resource_id_${resource.id}">
        <img class="img-cover w-15 h-10 mb-3 rounded-xl" src="${resource.image ? resource.image : '../../../assets/profile-picture.jpg'}" />
        <p class="text-white light-bold-texst">${resource.date}</p>
        <p class="text-white">${resource.description}</p>
      </div>
    `).join('')}
  `;

  // Run after the DOM is rendered
  setTimeout(() => {
    document.getElementById('add-resource').onclick = () =>
      window.location.href = Routes.children.multimediaResources.resource.path(childId, 'new');
    resources.forEach(resource => {
      document.getElementById(`resource_id_${resource.id}`).onclick = () => 
        window.location.href = Routes.children.multimediaResources.resource.path(childId, resource.id);
    });
  }, 10);

  return list;
}