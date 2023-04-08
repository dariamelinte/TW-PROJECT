import ChildCard from "./childCard.js";

export default function ChildrenList({ children, iconPath }) {
  const childrenList = document.createElement('div');
  childrenList.className = "center flex-wrap mx-9 my-6'";

  iconPath = iconPath || '../../assets';
  
  childrenList.appendChild(ChildCard({ iconPath, add: true }))

  children.forEach(({ firstName, id }) => {
    childrenList.appendChild(ChildCard({ iconPath, firstName, id }));
  });

  return childrenList;
}