import contulMeuForm from "./contulMeuForm.js";
import contulMeuSide from "./contulMeuSide.js";

export default function contulMeu(){
    const contulMeu = document.createElement('div');

    contulMeu.className = "center flex-wrap mx-9 my-6";

    contulMeu.appendChild(contulMeuForm());
    contulMeu.appendChild(contulMeuSide());

    return contulMeu;
}