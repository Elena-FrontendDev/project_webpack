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
    // this.info(userId);
  }

  // info() {
  //   this.api.getProfileInfo()
  //     .then((data) => {
  //       this.userNameInfo.textContent = data.name;
  //       this.userJobInfo.textContent = data.about;
  //       this.userAvatar.style.backgroundImage = 'url(' + data.avatar + ')';
  //       this.userId = data._id;
  //       console.log(this.userId);
  //       return this.userId;
  //     });
  //     console.log(this.userId);
  // }
  info(result) {
    this.userNameInfo.textContent = result.name;
    this.userJobInfo.textContent = result.about;
    this.userAvatar.style.backgroundImage = 'url(' + result.avatar + ')';
    this.userId = result._id;
  }

}