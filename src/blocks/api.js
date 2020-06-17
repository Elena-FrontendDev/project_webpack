const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk/cohort4' : 'https://praktikum.tk/cohort4';
const options = {
  baseUrl: serverUrl,
  token: '34297802-4775-4606-acce-9817fbd4faf0'
};


class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.token = options.token;
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
        headers: {
          authorization: this.token
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка номер1: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка в катч: ${err}`);
      })
  }

  getProfileInfo() {
    return fetch(`${this.url}/users/me`, {
        headers: {
          authorization: this.token
        }
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  sendEditProfileInfo(nameValue, aboutValue) {

    return fetch(`${this.url}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: nameValue,
          about: aboutValue
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  saveNewCard(titleValue, linkValue) {
    return fetch(`${this.url}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: titleValue,
          link: linkValue
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  setLike(cardId) {
    return fetch(`${this.url}/cards/like/${cardId}`, {
        method: 'PUT',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  deleteLike(cardId) {
    return fetch(`${this.url}/cards/like/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({

        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        // body: JSON.stringify({
        //   name: titleValue,
        //   link: linkValue
        // })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  editAvatar(avatarUrl) {

    return fetch(`${this.url}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          avatar: avatarUrl
        })
      })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

}

export const api = new Api(options);