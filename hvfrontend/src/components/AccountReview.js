import React, { Fragment, useState, useEffect } from 'react';
import TrailCard from '../components/TrailCard';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';
import axios from 'axios';

function AccountReview({ user, review, userFavorites }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [ufID, setufID] = useState(0);

  useEffect(() => {
    console.log(review)
    userFavorites.forEach(function (u, index) {
      if (u.trail.id === review.trail.id) {
        setIsFavorite(true)
        setufID(u.id)
      }
    });
  },[]);

  let addFavoriteClick = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    let userID = user.id
    let trailID = review.trail.id

    const body = JSON.stringify({ userID, trailID });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/create/`, body, config);
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }
  }

  let removeFavoriteClick = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/delete/${ufID}/`, config);
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }
  }

  var divStyle = {
    backgroundImage: 'url(' + review.trail?.img_url + ')'
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
    <div className="row">
      <div className="col-md-6 trail-card">
        <div className="p-3">
          <div className="trail-image" style={divStyle}>
            <div className="row">
              <div className="col-10">
              </div>
              <div className="col-2">
                {isFavorite ? showFavorite() : showAddFavorite()}
              </div>
            </div>
          </div>

          <a href={`/trails/${review.trail?.id}`} className="trail-page-link">
            <h4>{review.trail?.name}</h4>
          </a>
        </div>
      </div>
      <div className="col-md-6 account-review-text">
        <p>{review.body}</p>
      </div>
    </div>
  )
}

export default AccountReview;
