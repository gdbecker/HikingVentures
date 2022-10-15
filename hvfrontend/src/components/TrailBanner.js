import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';
import axios from 'axios';

function TrailBanner({ trail, user, ave, userFavorites }) {

  const [isFavorite, setIsFavorite] = useState(false);
  const [ufID, setufID] = useState('');

  useEffect(() => {
    console.log(userFavorites)
    if (userFavorites.length > 0) {
      let filteredFavorites = userFavorites.filter(u => u.trail.id === trail.id)
      if (filteredFavorites.length > 0) {
        setIsFavorite(true)
        setufID(userFavorites[0].id)
      }
    }
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
    backgroundImage: 'url(' + trail.img_url + ')'
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
    <div className="header-photo-trails-detail" style={divStyle}>
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-11">
            <h1 className="header-text-trails-detail">{trail.name}</h1>
            <h4 className="h3-text-trails-detail">{trail.difficulty.rank} || {ave}</h4>
            <h4 className="h3-text-trails-detail">{trail.park.name} || {trail.park.city}, {trail.park.state.full_name}, {trail.park.state.country}</h4>
          </div>
          <div className="col-1">
            {isFavorite ? showFavorite() : showAddFavorite()}
          </div>
        </div>

        <div class="row g-2">
          <div className="col-10">
          </div>
          <div className="col-2">
            <a className="admin-page-link" href={`/admin/trail/modify/${trail.id}`}>admin: modify trail</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrailBanner;
