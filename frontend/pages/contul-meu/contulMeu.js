import contulMeu from "../../components/contulMeu/contulMeu.js";
import Header from '../../components/header.js';

const iconPath = '../../assets';

document.body.appendChild(Header({ iconPath , titlu: 'Contul meu' }));

document.body.appendChild(contulMeu());