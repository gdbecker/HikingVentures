import React from 'react';

function ParkCard({ park }) {

  return (
    <div className="park-card">
      <div className="p-3">
        <a href="/"><img className="park-image" src={`${park?.img_url}`} alt="trail"/></a>
        <h4>{park?.name}</h4>
        <p>{park?.city}, {park.state?.full_name}, {park.state?.country}</p>
      </div>
    </div>
  )
}

export default ParkCard;
