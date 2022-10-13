import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ParkBanner from '../components/ParkBanner';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import axios from 'axios';

function ParksDetailPage({ user }) {

  const {id} = useParams()

  const [park, setPark] = useState([]);
  const [trails, setTrails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    setUserFavorites(userFavorites.filter(u => u.user.id === user?.id));
  },[])

  async function getData() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/parks/${id}/`, config)
       .then(function (response) {
         setPark(response.data)

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

       })
      .catch(function (error) {
         console.log(error);
      });

    } catch (err) {
      console.log(err)
    }

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/trails/`, config)
       .then(function (response) {
         let rawTrails = response.data;
         let filteredTrails = rawTrails.filter(t => t.park.id == id);
         setTrails(filteredTrails);
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


  }

  if (isLoading === false) {
    console.log(userFavorites)
    return (
      <div id="trails-detail-page">

        <ParkBanner
          park={park}
        />

        <div className="container px-0 parks-content">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <p className="parks-content-text">{park?.description}</p>
              <hr/>
            </div>
          </div>
        </div>

        <div className="container px-0">
          <div class="row g-2">
            {trails.map((t, index) => {
              let found = false
              var i;
                for (i = 0; i < userFavorites.length; i++) {
                  if (userFavorites[i].trail.id === t.id) {
                    found = true;
                    return (
                      <div className="col-md-6" key={index}>
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
                  <div className="col-md-6" key={index}>
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

export default connect(mapStateToProps)(ParksDetailPage);
