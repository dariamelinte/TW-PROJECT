import MyAccountForm from "./myAccountForm.js";

export default function MyAccount({ account }) {
    const myAccount = document.createElement('div');

    myAccount.className = "center flex-col flex-wrap mx-9 my-6";

    myAccount.appendChild(MyAccountForm({ account }));

    return myAccount;
}