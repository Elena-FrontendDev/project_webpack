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

  apiAnswer(res) {

    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)

      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      })
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
        headers: {
          authorization: this.token
        }
      })
      .then((res) => this.apiAnswer(res))
  }

  getProfileInfo() {
    return fetch(`${this.url}/users/me`, {
        headers: {
          authorization: this.token
        }
      })

      .then((res) => this.apiAnswer(res))

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

      .then((res) => this.apiAnswer(res))
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

      .then((res) => this.apiAnswer(res))
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

      .then((res) => this.apiAnswer(res))
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

      .then((res) => this.apiAnswer(res))
  }

  deleteCard(cardId) {
    return fetch(`${this.url}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
          authorization: this.token,
          'Content-Type': 'application/json'
        },
      })

      .then((res) => this.apiAnswer(res))
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

      .then((res) => this.apiAnswer(res))
  }

}

export const api = new Api(options);