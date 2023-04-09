export default function Event({ ora , info , tipSomn }) {
    const event = document.createElement('button');
    event.className = 'flex w-full justify-between rounded items-center bg-yellow-200 pl-6 pr-6 pt-2 pb-2 shadow-small';
  
    event.onclick = () => {    
        console.log("view information");
      };

    event.innerHTML = `
      <div>
        <p class="text-purple-700">${ora}</p>
        <p class="text-purple-700">${info}</p>
        ${tipSomn ? `<p class="text-purple-700">${tipSomn}</p>` : ''}
      </div>
    `;
    
    return event;
  }