import MyAccount from "/frontend/components/myAccount/myAccount.js";
import Header from '/frontend/components/header.js';
import Routes from "/frontend/utils/Routes.js";

import { getMyProfile } from "/frontend/server/my-profile/getMyProfile.js";

const { result: account } = await getMyProfile();

document.body.appendChild(Header(Routes.myAccount.title));
document.body.appendChild(MyAccount({ account }));