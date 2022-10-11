import React, { useState, useEffect } from 'react';

function ParkCard({ park }) {

  const [stateInfo, setStateInfo] = useState([])
  useEffect(() => {
    if (stateInfo.length === 0) {
      let stateID = park.state

      fetch(`http://127.0.0.1:8000/hvapp/states/${stateID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setStateInfo(resp))
      .catch(error => console.log(error))
    }
  })

  return (
    <div className="park-card">
      <div className="p-3">
        <a href="/"><img className="park-image" src={`${park.img_url}`} alt="trail"/></a>
        <h4>{park.name}</h4>
        <p>{park.city}, {stateInfo.full_name}, {stateInfo.country}</p>
      </div>
    </div>
  )
}

export default ParkCard;
