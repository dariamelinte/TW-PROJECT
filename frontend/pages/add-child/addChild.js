import Header from '../../components/header.js';
import AddChildForm from '../../components/forms/addChildForm.js';
import Routes from '../../utils/Routes.js';

document.body.appendChild(Header(Routes.addChild.title, "../../assets"));

document.body.appendChild(AddChildForm());