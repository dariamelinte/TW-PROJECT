import myAccountForm from "./myAccountForm.js";
import myAccountSide from "./myAccountSide.js";

export default function myAccount(){
    const myAccount = document.createElement('div');

    myAccount.className = "center flex-wrap mx-9 my-6";

    myAccount.appendChild(myAccountForm());
    myAccount.appendChild(myAccountSide());

    return myAccount;
}