import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageBanner from '../components/PageBanner';
import Images from '../assets/imgIndex';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import axios from 'axios';

function SavedPage({ user }) {

  const [trails, setTrails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    setUserFavorites(userFavorites.filter(u => u.user.id === user?.id));
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
           setIsLoading(false)
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

  if (isLoading === false) {
    return (
      <div id="saved-page">
        <PageBanner
          pageName={'saved trails'}
          img_url={Images.saved}
        />

        <div className="container px-0">
          <div class="row g-2">

          {trails.map((t, index) => {
            let found = false
            var i;
              for (i = 0; i < userFavorites.length; i++) {
                if (userFavorites[i].trail.id === t.id) {
                  return (
                    <div className="col-md-4" key={index}>
                      <TrailCard
                        key={t.id}
                        user={user}
                        trail={t}
                        reviews={reviews}
                        ufID={userFavorites[i].id}
                        isFavorite={true}
                      />
                    </div>
                  )
                  found = true;
                }
              }
          })}

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

export default connect(mapStateToProps)(SavedPage);
