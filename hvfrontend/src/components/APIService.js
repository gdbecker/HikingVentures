export default class APIService {
  // State
  static GetStates() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/states/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  // Park
  static GetParks() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static GetPark(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/${id}/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static AddPark(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static UpdatePark(id, body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/${id}/update/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static DeletePark(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/parks/${id}/delete/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    })
  }

  // Review
  static GetReviews() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/reviews/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  // UserFavorite
  static GetUserFavorites() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static AddUserFavorite(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static DeleteUserFavorite(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/${id}/delete/`, {
      'method':'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    })
  }

  // History
  static GetHistory() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/history/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static AddHistory(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/history/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static UpdateArticle(id, body) {
    return fetch(`http://127.0.0.1:5000/update/${id}/`, {
      'method':'PUT',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
  }

  static InsertArticle(body) {
    return fetch(`http://127.0.0.1:5000/add`, {
      'method':'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(resp => resp.json())
  }

  static DeleteArticle(id) {
    return fetch(`http://127.0.0.1:5000/delete/${id}/`, {
      'method':'DELETE',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }
}
