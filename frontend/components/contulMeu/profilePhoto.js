export default function profilePhoto() {
  const childrenList = document.createElement('div');
  
    profilePhoto.className = 'w-15 h-15 bg-purple-400 p-3 m-6 rounded shadow-small center column';
  
    profilePhoto.innerHTML = `
        <img class="large square mb-3" src="${iconPath}/img/user.png" alt="profile picture" />
      `;
    return profilePhoto;
  }