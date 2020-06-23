const container = document.querySelector('.root');
const userInfo = container.querySelector('.user-info__data');


//Class for getting information in the form from the server

export default class ProfileInfo {
  constructor(userNameInfo, userJobInfo, userAvatar, api, userId) {
    this.api = api;
    this.userNameInfo = userInfo.querySelector(userNameInfo);
    this.userJobInfo = userInfo.querySelector(userJobInfo);
    this.userAvatar = document.querySelector(userAvatar);
    this.userId = userId;
  }

  info(result) {
    this.userNameInfo.textContent = result.name;
    this.userJobInfo.textContent = result.about;
    this.userAvatar.style.backgroundImage = 'url(' + result.avatar + ')';
    this.userId = result._id;
  }

}