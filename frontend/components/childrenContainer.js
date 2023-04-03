import ChildrenList from "./childrenList.js";

export function addNewChild() {
  console.log("add new child");
}


export default function ChildrenContainer({ iconPath, children }) {
  const childrenContainer = document.createElement('div');
  childrenContainer.className = 'center flex-wrap mx-9 my-6';

  const childrenList = ChildrenList({ iconPath, children }).innerHTML

  console.log(ChildrenList({ iconPath, children }).innerHTML)

  childrenContainer.innerHTML = `
    <button click="addNewChild()" class="w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small">
      <img class="medium square" src="${iconPath}/img/plus-symbol.png" alt="add child" />
    </button>
    ${childrenList}
  `

  return childrenContainer;
}