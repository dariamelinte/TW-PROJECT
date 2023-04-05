export default function profilePhoto() {
  const profilePhoto = document.createElement('div');
  
    profilePhoto.className = 'w-15 h-15 bg-purple-400 p-3 m-6 pb-20 rounded center column';
  
    profilePhoto.innerHTML = `
        <img class="xl square rounded" src="../../assets/img/profile-picture.jpg" alt="profile picture" />
      `;
    return profilePhoto;
  }