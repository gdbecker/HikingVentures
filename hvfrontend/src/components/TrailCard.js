import React, { useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';

let averageRating = (reviews) => {
  let reviewCount = reviews.length
  let reviewSum = reviews.map(r => parseInt(r.rating)).reduce((prev, next) => prev + next);
  return reviewSum / reviewCount;
}

function TrailCard({ trail, reviews }) {

  const [trailReviews, setTrailReviews] = useState([]);
  const [ave, setAve] = useState(null);

  useEffect(() => {
    reviews.filter(r => r.trail === trail?.id)
    setAve(averageRating(reviews))
  },[])

  return (
    <div className="trail-card">
      <div className="p-3">
        <a href={`/trails/${trail?.id}`}><img className="trail-image" src={`${trail?.img_url}`} alt="trail"/></a>
        <h4>{trail?.name}</h4>
        <p>{trail.difficulty?.rank} || {ave}⭐</p>
        <p>{trail.park?.city}, {trail.park.state?.full_name}, {trail.park.state?.country}</p>
      </div>
    </div>
  )
}

export default TrailCard;
