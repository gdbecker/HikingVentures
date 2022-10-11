import React, { useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';

function TrailCard({ trail }) {

  return (
    <div className="trail-card">
      <div className="p-3">
        <a href={`/trails/${trail?.id}`}><img className="trail-image" src={`${trail?.img_url}`} alt="trail"/></a>
        <h4>{trail?.name}</h4>
        <p>{trail.difficulty?.rank} || average ranking</p>
        <p>{trail.park?.city}, {trail.park.state?.full_name}, {trail.park.state?.country}</p>
      </div>
    </div>
  )
}

export default TrailCard;
