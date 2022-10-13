import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';
import axios from 'axios';

function ParkBanner({ park }) {

  useEffect(() => {

  },[]);

  var divStyle = {
    backgroundImage: 'url(' + park.img_url + ')'
  }

  return (
    <div className="header-photo-trails-detail" style={divStyle}>
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="header-text-trails-detail">{park.name}</h1>
            <h4 className="h3-text-trails-detail">{park.name} || {park.city}, {park.state.full_name}, {park.state.country}</h4>
          </div>
          <div className="col-2">

          </div>
        </div>
      </div>

    </div>
  )
}

export default ParkBanner;
