import profilePhoto from "./profilePhoto.js";
import showFamiliesButton from "./showFamiliesButton.js";

export default function contulMeuSide(){
    const contulMeuSide = document.createElement('div');

    contulMeuSide.className = "flex-col mx-9 my-6'";

    contulMeuSide.appendChild(profilePhoto());
    contulMeuSide.appendChild(showFamiliesButton());

    return contulMeuSide;
}