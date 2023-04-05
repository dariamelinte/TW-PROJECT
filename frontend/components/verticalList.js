export default function VerticalList(items) {
  const childId = new URLSearchParams(window.location.search).get('childId');
  const list = document.createElement('div');

  list.className = 'flex column justify-center align-center mt-9 w-20';

  items.forEach(item => {
    const listItem = document.createElement('div');
    listItem.className = 'w-full center bg-purple-500 rounded-lg p-3 mt-2 rounded-lg cursor-pointer';
    listItem.onclick = () => window.location.href = item.path(childId);
    listItem.innerHTML = `
      <h2 class="text-purple-900 bold-text ">${item.title}</h2>
    `;
    list.appendChild(listItem);
  });

  return list;
}
