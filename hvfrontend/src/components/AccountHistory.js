import React, { Fragment, useState, useEffect } from 'react';
import APIService from './APIService';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';

let getTime = (history) => {
  return new Date(history.date).toLocaleDateString('en-US', {timeZone: 'UTC'})
}

function AccountHistory({ user, history, userFavorites }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [ufID, setufID] = useState(0);

  useEffect(() => {
    userFavorites.forEach(function (u, index) {
      if (u.trail.id === history.trail.id) {
        setIsFavorite(true)
        setufID(u.id)
      }
    });
  },[]);

  let addFavoriteClick = async () => {
    let userID = user.id
    let trailID = history.trail.id
    const body = JSON.stringify({ userID, trailID });

    APIService.AddUserFavorite(body)
    .then(() => {
      window.location.reload(false);
    })
    .catch(error => console.log(error))
  }

  let removeFavoriteClick = async () => {
    APIService.DeleteUserFavorite(ufID)
    .then(() => {
      window.location.reload(false);
    })
    .catch(error => console.log(error))
  }

  var divStyle = {
    backgroundImage: 'url(' + history.trail?.img_url + ')'
  }

  const showAddFavorite = () => (
    <Fragment>
      <button onClick={addFavoriteClick} className="trail-button" title="save trail">
        <AddFavorite className="add-favorite-button"/>
      </button>
    </Fragment>
  );

  const showFavorite = () => (
    <Fragment>
      <button onClick={removeFavoriteClick} className="trail-button" title="remove trail">
        <h1><Favorite className="favorite-button"/></h1>
      </button>
    </Fragment>
  );

  return (
    <div className="row g-2">
      <div className="col-md-3 account-history-text">
        <h3>{getTime(history)}</h3>
      </div>
      <div className="col-lg-9 trail-card">
        <div className="p-3">
          <div className="trail-image" style={divStyle}>
            <div className="container px-0">
              <div className="p-3">
                <div className="row g-2">
                  <div className="col-10">
                  </div>
                  <div className="col-2">
                    {isFavorite ? showFavorite() : showAddFavorite()}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href={`/trails/${history.trail?.id}`} className="trail-page-link">
            <h4>{history.trail?.name}</h4>
          </a>
          <p>{history.trail.park?.name}</p>
        </div>
      </div>
    </div>
  )
}

export default AccountHistory;
