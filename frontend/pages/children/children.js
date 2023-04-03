import ChildrenContainer from '../../components/childrenContainer.js';
import Header from '../../components/header.js';
import dummy_children from './__dummy__children.json' assert { type: "json" };

const iconPath = '../../assets';

document.body.appendChild(Header({ iconPath }));

document.body.appendChild(ChildrenContainer({ iconPath, children: dummy_children }));