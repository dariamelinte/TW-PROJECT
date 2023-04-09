import profilePhoto from "./profilePhoto.js";
import showFamiliesButton from "./showFamiliesButton.js";

export default function myAccountSide(){
    const myAccountSide = document.createElement('div');

    myAccountSide.className = "mx-9 my-6'";

    myAccountSide.appendChild(profilePhoto());
    myAccountSide.appendChild(showFamiliesButton());

    return myAccountSide;
}