export default function VerticalList(items) {
  const childId = new URLSearchParams(window.location.search).get('childId');
  const list = document.createElement('div');

  list.className = 'flex column justify-center align-center mt-9';

  items.forEach(item => {
    const listItem = document.createElement('div');
    listItem.className = 'bg-purple-500 rounded-lg p-3 mt-1 rounded-lg cursor-pointer';
    listItem.onclick = () => window.location.href = item.path(childId);
    listItem.innerHTML = `
      <h2 class="text-white light-bold-text ">${item.title}</h2>
    `;
    list.appendChild(listItem);
  });

  return list;
}
