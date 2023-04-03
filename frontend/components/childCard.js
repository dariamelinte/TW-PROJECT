export default function ChildCard({ iconPath, name }) {
  const childCard = document.createElement('div');
  childCard.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column flex-wrap';

  childCard.innerHTML = `
    <div class="w-10 h-10" >
      <img src="${iconPath}/img/children.png" alt="logo" />
    </div>

    ${name ? `<h1 class="">${name}</h1>` : null}
  `;
  
  return childCard;
}