import React, { useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';

function TrailCard({ trail }) {

  const [difficultyInfo, setDifficultyInfo] = useState([])
  useEffect(() => {
    if (difficultyInfo.length === 0) {
      let difficultyID = trail.difficulty

      fetch(`http://127.0.0.1:8000/hvapp/difficulties/${difficultyID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setDifficultyInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [parkInfo, setParkInfo] = useState([])
  useEffect(() => {
    if (parkInfo.length === 0) {
      let parkID = trail.park

      fetch(`http://127.0.0.1:8000/hvapp/parks/${parkID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setParkInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [stateInfo, setStateInfo] = useState([])
  useEffect(() => {
    if (stateInfo.length === 0) {
      let stateID = parkInfo.state

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
    <div className="trail-card">
      <div className="p-3">
        <a href={`/trails/${trail.id}`}><img className="trail-image" src={`${trail.img_url}`} alt="trail"/></a>
        <h4>{trail.name}</h4>
        <p>{difficultyInfo.rank} || average ranking</p>
        <p>{parkInfo.city}, {stateInfo.full_name}, {stateInfo.country}</p>
      </div>
    </div>
  )
}

export default TrailCard;
