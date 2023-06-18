import ChangePasswordForm from "./changePasswordForm.js";

export default function ChangePassword() {
    const changePassword = document.createElement('div');

    changePassword.className = "center flex-wrap mx-9 my-6";
    changePassword.appendChild(ChangePasswordForm());

    return changePassword;
}