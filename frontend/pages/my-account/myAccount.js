import MyAccount from "../../components/myAccount/myAccount.js";
import Header from '../../components/header.js';
import Routes from "../../utils/Routes.js";

import { getMyProfile } from "../../server/my-profile/getMyProfile.js";

const { result: account } = await getMyProfile();

console.log(account);

document.body.appendChild(Header(Routes.myAccount.title));
document.body.appendChild(MyAccount({ account }));