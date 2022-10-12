import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import axios from 'axios';

function TrailsPage({ user }) {

  const [trails, setTrails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [notUserFavorites, setNotUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    setUserFavorites(userFavorites.filter(u => u.user.id === user?.id));
    setNotUserFavorites(notUserFavorites.filter(u => u.user.id === user?.id));
  },[])

  async function getData() {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/trails/`, config)
         .then(function (response) {
           setTrails(response.data)

         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/reviews/`, config)
         .then(function (response) {
           setReviews(response.data)

         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/`, config)
         .then(function (response) {
           setUserFavorites(response.data)
           setNotUserFavorites(response.data)
           setIsLoading(false)
           console.log(response.data)
         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
  }

  if (isLoading === false) {
    return (
      <div id="trails-page">
        <div className="header-photo-trails">
          <h1 className="header-text-trails">trails</h1>
        </div>

        <div className="container px-0">
        <div class="row g-2">

          {trails.map((t, index) => (
            <div className="col-md-6">
              {userFavorites.filter(u => u.trail.id === t?.id).map((u, index) => (
                <TrailCard
                  key={t.id}
                  user={user}
                  trail={t}
                  reviews={reviews}
                  ufID={u.id}
                  isFavorite={true}
                />
              ))}
            </div>

            <div className="col-md-6">
              <TrailCard
                key={t.id}
                user={user}
                trail={t}
                reviews={reviews}
                ufID={0}
                isFavorite={false}
              />
            </div>
            ))}
          </div>
        </div>

        <Footer className="footer"/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(TrailsPage);
