import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';
import axios from 'axios';

let averageRating = (reviews) => {
  if (reviews.length === 0) {
    return "no ratings yet!"
  } else {
    let reviewCount = reviews.length
    let reviewSum = reviews.map(r => parseInt(r.rating)).reduce((prev, next) => prev + next);
    return (reviewSum / reviewCount).toFixed(2) + "⭐";
  }
}

function TrailCard({ user, trail, reviews, ufID, isFavorite }) {

  const [ave, setAve] = useState(null);

  useEffect(() => {
    let filteredReviews = reviews.filter(r => r.trail.id == trail?.id);
    setAve(averageRating(filteredReviews));
  },[])

  let addFavoriteClick = async () => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    let userID = user.id
    let trailID = trail.id

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
      await axios.delete(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/${ufID}/delete/`, config);
      window.location.reload(false);
    } catch (err) {
      console.log(err)
    }
  }

  var divStyle = {
    backgroundImage: 'url(' + trail?.img_url + ')'
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
    <div className="trail-card">
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

        <a href={`/trails/${trail?.id}`} className="trail-page-link">
          <h4>{trail?.name}</h4>
        </a>
        <p>{trail.difficulty?.rank} || {ave}</p>
        <p>{trail.park?.city}, {trail.park.state?.full_name}, {trail.park.state?.country}</p>
      </div>
    </div>
  )
}

export default TrailCard;
