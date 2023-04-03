import ChildrenList from '../../components/children/childrenList.js';
import Header from '../../components/header.js';
import dummy_children from './__dummy__children.json' assert { type: "json" };

const iconPath = '../../assets';

document.body.appendChild(Header({ iconPath }));

document.body.appendChild(ChildrenList({ iconPath, children: dummy_children }));