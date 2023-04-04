export default function showFamiliesButton() {
    const showFamiliesButton = document.createElement('button');
    showFamiliesButton.onclick = () => {
      if (add) {
        console.log("add new child");
        return;
      }
  
      console.log("view child");
    };
  
    showFamiliesButton.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column';
  
    showFamiliesButton.innerHTML = `
      <img class="medium square mb-3" src="../assets/img/user.png" alt="families" />
      <p class="text-purple-900">Vizualizeaza familiile tale</p>
      `;
    
    return showFamiliesButton;
  }