import MyAccountForm from "./myAccountForm.js";
import MyAccountSide from "./myAccountSide.js";

export default function MyAccount({ account }) {
    const myAccount = document.createElement('div');

    myAccount.className = "center flex-wrap mx-9 my-6";

    myAccount.appendChild(MyAccountForm({ account }));
    myAccount.appendChild(MyAccountSide());

    return myAccount;
}