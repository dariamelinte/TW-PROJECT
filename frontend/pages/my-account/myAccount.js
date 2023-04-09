import myAccount from "../../components/myAccount/myAccount.js";
import Header from '../../components/header.js';
const iconPath = '../../assets';

document.body.appendChild(Header({ iconPath , titlu: 'Contul meu' }));


document.body.appendChild(myAccount());