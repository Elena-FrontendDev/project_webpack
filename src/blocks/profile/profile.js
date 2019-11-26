const container = document.querySelector('.root');
const userInfo = container.querySelector('.user-info__data');


//Class for getting information in the form from the server

export default class ProfileInfo {
  constructor(userNameInfo, userJobInfo, userAvatar, api) {
    this.api = api;
    this.userNameInfo = userInfo.querySelector(userNameInfo);
    this.userJobInfo = userInfo.querySelector(userJobInfo);
    this.userAvatar = document.querySelector(userAvatar);
    this.info();
  }

  info() {
    this.api.getProfileInfo()
    .then((data)      => {
      this.userNameInfo.textContent = data.name;
      this.userJobInfo.textContent = data.about;
      this.userAvatar.style.backgroundImage = 'url('+data.avatar+')';
    });
  } 
  } 