export default function showFamiliesButton() {
    const showFamiliesButton = document.createElement('button');
    showFamiliesButton.onclick = () => {
      if (add) {
        console.log("add new child");
        return;
      }
  
      console.log("view child");
    };
  
    showFamiliesButton.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded center column';
  
    showFamiliesButton.innerHTML = `
      <img class="w-10 mb-3" src="/frontend/assets/img/family-logo.png" alt="families" />
      <p class="text-purple-900">Vizualizeaza familiile tale</p>
      `;
    
    return showFamiliesButton;
  }