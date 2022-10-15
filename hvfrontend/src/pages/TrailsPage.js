import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageBanner from '../components/PageBanner';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import Images from '../assets/imgIndex';
import axios from 'axios';

function TrailsPage({ user }) {

  const [trails, setTrails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getData();
    }
  },[user])

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
           let ufArray = response.data
           let newArray = ufArray.filter(u => u.user.id == user?.id)
           setUserFavorites(newArray)
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
      <div id="trails-page">
        <PageBanner
          pageName={'trails'}
          img_url={Images.trail}
        />

        <div className="container px-0">
          <div class="row g-2">

            {trails.map((t, index) => {
              let found = false
              var i;
              for (i = 0; i < userFavorites.length; i++) {
                if (userFavorites[i].trail.id === t.id) {
                  found = true;
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
                }
              }

              if (found === false) {
                return (
                  <div className="col-md-4" key={index}>
                    <TrailCard
                      key={t.id}
                      user={user}
                      trail={t}
                      reviews={reviews}
                      ufID={0}
                      isFavorite={false}
                    />
                  </div>
                )
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

export default connect(mapStateToProps, { })(TrailsPage);
