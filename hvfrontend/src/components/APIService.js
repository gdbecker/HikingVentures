export default class APIService {
  // Difficulty
  static GetDifficulty() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/difficulties/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  // RouteType
  static GetRouteTypes() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/routetypes/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

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

  // Trail
  static GetTrails() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static GetTrail(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/${id}/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static AddTrail(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static UpdateTrail(id, body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/${id}/update/`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static DeleteTrail(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/trails/${id}/delete/`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    })
  }

  // Image
  static GetImages() {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/images/`, {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
  }

  static AddImage(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/images/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
    })
  }

  static DeleteImage(id) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/images/${id}/delete/`, {
      'method':'DELETE',
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

  static AddReview(body) {
    return fetch(`${process.env.REACT_APP_API_URL}/hvapp/reviews/create/`, {
      'method':'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      },
      body: body
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
}
