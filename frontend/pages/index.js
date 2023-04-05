import Header from '../components/header.js';
import VerticalList from '../components/verticalList.js';
import Routes from '../utils/Routes.js';

document.body.appendChild(Header({ iconPath: '../assets' }));
document.body.appendChild(VerticalList(Object.values(Routes.children)));