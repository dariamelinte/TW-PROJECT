import profilePhoto from "./profilePhoto";
import showFamiliesButton from "./showFamiliesButton";

export default function contulMeuSide(){
    const contulMeuSide = document.createElement('div');

    contulMeuSide.className = "center flex-col mx-9 my-6'";

    contulMeuSide.appendChild(profilePhoto());
    contulMeuSide.appendChild(showFamiliesButton());

    return contulMeuSide;
}