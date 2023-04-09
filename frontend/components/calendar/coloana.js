import Event from "./event.js";

export default function Coloana({iconPath , day , event , feed}) {
    const coloana = document.createElement('div');
    coloana.className = "center flex-col flex-wrap mx-9 my-6'";
  
    individ.innerHTML = `
      <div class="bg-purple-200">
        <h1 class="text-black">${day}</h1>
      </div>
    `;

    children.forEach(({ id }) => {
      coloana.appendChild(Event({ ora , info , tipSomn }));
    });

    individ.innerHTML = `
      <div class="bg-purple-200">
      <img class="m-3" src="${iconPath}/img/plus-symbol.png" alt="add event" />
      </div>
    `;
  
    return coloana;
  }