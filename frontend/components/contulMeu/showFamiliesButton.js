export default function showFamiliesButton() {
    const showFamiliesButton = document.createElement('button');
    childCard.onclick = () => {
      if (add) {
        console.log("add new child");
        return;
      }
  
      console.log("view child");
    };
  
    showFamiliesButton.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column';
  
    showFamiliesButton.innerHTML = `
      <img class="large square mb-3" src="${iconPath}/img/user.png" alt="view families" />
      <h1 class="text-purple-900">Vizualizeaza familiile tale</h1>
      `;
    
    return showFamiliesButton;
  }