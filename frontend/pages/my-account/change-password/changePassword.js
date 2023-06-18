import ChangePassword from "/frontend/components/changePassword/changePassword.js";
import Header from '/frontend/components/header.js';
import Routes from "/frontend/utils/Routes.js";

document.body.appendChild(Header(Routes.myAccount.changePassword.title));
document.body.appendChild(ChangePassword());
