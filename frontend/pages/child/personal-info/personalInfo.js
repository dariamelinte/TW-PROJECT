import Header from '/frontend/components/header.js';
import ChildForm from '/frontend/components/forms/childForm.js';
import Routes from '/frontend/utils/Routes.js';

import mocked_children from '/frontend/utils/__mock__children.json' assert { type: 'json' };


const childId = new URLSearchParams(window.location.search).get('childId');

const child = mocked_children.find((child) => child.id === parseInt(childId));

document.body.appendChild(Header(Routes.addChild.title));
document.body.appendChild(ChildForm({ child }));