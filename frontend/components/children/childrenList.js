import ChildCard from "./childCard.js";

export default function ChildrenList({ children, onClick }) {
  const childrenList = document.createElement('div');
  childrenList.className = "center flex-wrap mx-9 my-6'";
  
  childrenList.appendChild(ChildCard({ add: true, onClick }))

  children.forEach(({ firstName, id }) => {
    childrenList.appendChild(ChildCard({ firstName, id, onClick }));
  });

  return childrenList;
}