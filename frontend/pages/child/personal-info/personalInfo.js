import Header from '/frontend/components/header.js';
import ChildForm from '/frontend/components/forms/childForm.js';
import Routes from '/frontend/utils/Routes.js';

import { getChildById } from '/frontend/server/getChildById.js';

const childId = new URLSearchParams(window.location.search).get('childId');

const child = await getChildById(childId);

console.log(child);

document.body.appendChild(Header(Routes.children.personalInfo.title));
document.body.appendChild(ChildForm({ child }));