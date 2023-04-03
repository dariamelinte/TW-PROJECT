import ChildCard from "./childCard.js";

export default function ChildrenList({ iconPath, children }) {
  const childrenList = document.createElement('div');
  childrenList.className = "center flex-wrap mx-9 my-6'";

  childrenList.appendChild(ChildCard({ iconPath, add: true }))

  children.forEach(({ name }) => {
    childrenList.appendChild(ChildCard({ iconPath, name }));
  });

  return childrenList;
}