import React, { Fragment, useState, useEffect } from 'react';
import { ReactComponent as AddFavorite } from '../assets/add_favorite.svg';
import { ReactComponent as Favorite } from '../assets/favorite.svg';
import axios from 'axios';

let averageRating = (reviews) => {
  let reviewCount = reviews.length
  let reviewSum = reviews.map(r => parseInt(r.rating)).reduce((prev, next) => prev + next);
  return reviewSum / reviewCount;
}

function TrailCard({ user, trail, reviews }) {

  const [trailReviews, setTrailReviews] = useState([]);
  const [ave, setAve] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    reviews.filter(r => r.trail === trail?.id)
    setAve(averageRating(reviews))
    getData();
  },[])

  async function getData() {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `JWT ${localStorage.getItem('access')}`,
          'Accept': 'application/json'
        }
      };

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/`, config)
         .then(function (response) {
           setUserFavorites(response.data)
           setIsLoading(false)
         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
  }

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
      await axios.post(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/create/`, body, config)

    } catch (err) {
      console.log(err)
    }
  }

  let removeFavoriteClick = async (ufID) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/delete/${ufID}`, config)

    } catch (err) {
      console.log(err)
    }
  }

  var divStyle = {
    backgroundImage: 'url(' + trail?.img_url + ')'
  }

  const showAddFavorite = () => (
    <Fragment>
      <button onClick={addFavoriteClick} className="trail-button">
        <AddFavorite className="add-favorite-button"/>
      </button>
    </Fragment>
  );

  const showFavorite = () => (
    <Fragment>
      <button onClick={removeFavoriteClick} className="trail-button">
        <Favorite className="favorite-button"/>
      </button>
    </Fragment>
  );

  // {userFavorites.map((u) => {
  //   u.trail.id == trail.id ? (showFavorite()) : (showAddFavorite())}
  // )}

  if (isLoading === false) {
    return (
      <div className="trail-card">
        <div className="p-3">
          <div className="trail-image" style={divStyle}>
            <div className="row">
              <div className="col-lg-10">
              </div>
              <div className="col-lg-2">

              </div>
            </div>
          </div>

          <a href={`/trails/${trail?.id}`} className="trail-page-link">
            <h4>{trail?.name}</h4>
          </a>
          <p>{trail.difficulty?.rank} || {ave}⭐</p>
          <p>{trail.park?.city}, {trail.park.state?.full_name}, {trail.park.state?.country}</p>
        </div>
      </div>
    )
  }
}

export default TrailCard;
