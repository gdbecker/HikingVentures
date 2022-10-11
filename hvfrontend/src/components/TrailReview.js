import React, { useState, useEffect } from 'react';

let getRatingStars = (review) => {
  switch(review.rating) {
    case '1':
      return '⭐'
    case '2':
      return '⭐⭐'
    case '3':
      return '⭐⭐⭐'
    case '4':
      return '⭐⭐⭐⭐'
    case '5':
      return '⭐⭐⭐⭐⭐'
  }
}

let getTime = (review) => {
  return new Date(review.date).toLocaleDateString()
}

function TrailReview({ review }) {

  return (
    <div className="row trail-review">
      <div className="col-md-1">
      </div>
      <div className="col-md-3">
        <div className="user-image-crop">
          <img className="user-image-review" src={`${review.user?.img_url}`} alt="user"/>
        </div>
        <p className="trails-content-specs">{review.user?.first_name}</p>
      </div>
      <div className="col-md-8">
        <p className="trails-content-text">
          {getRatingStars(review)}
        </p>
        <p className="trails-content-text">
          {getTime(review)}
        </p>
        <p className="trails-content-text">
          {review?.body}
        </p>
      </div>
    </div>
  )
}

export default TrailReview;
