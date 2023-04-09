import Header from '/frontend/components/header.js';
import ChildForm from '/frontend/components/forms/childForm.js';
import Routes from '/frontend/utils/Routes.js';
import { INITIAL_CHILD } from '/frontend/utils/initialValues.js';

document.body.appendChild(Header(Routes.addChild.title));

document.body.appendChild(ChildForm({ child: INITIAL_CHILD, add: true }));