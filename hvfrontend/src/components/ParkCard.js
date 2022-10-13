import React from 'react';

function ParkCard({ park }) {

  return (
    <div className="park-card">
      <div className="p-3">
        <img className="park-image" src={`${park?.img_url}`} alt="trail"/>

        <a href={`/parks/${park?.id}`} className="trail-page-link">
          <h4>{park?.name}</h4>
        </a>
        
        <p>{park?.city}, {park.state?.full_name}, {park.state?.country}</p>
      </div>
    </div>
  )
}

export default ParkCard;
