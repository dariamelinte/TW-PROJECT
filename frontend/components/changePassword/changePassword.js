import ChangePasswordForm from "./changePasswordForm.js";

export default function ChangePassword({ account }) {
    const changePassword = document.createElement('div');

    changePassword.className = "center flex-wrap mx-9 my-6";
    changePassword.appendChild(ChangePasswordForm({ account }));

    return changePassword;
}