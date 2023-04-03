import ChildCard from "./childCard.js";

export default function ChildrenList({ iconPath, children }) {
  const childrenList = document.createElement('div');

  children.forEach(({ name }) => {
    childrenList.appendChild(ChildCard({ iconPath, name }));
  });

  return childrenList;
}