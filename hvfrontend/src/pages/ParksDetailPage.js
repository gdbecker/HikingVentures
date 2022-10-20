import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import ParkBanner from '../components/ParkBanner';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import APIService from '../components/APIService';

function ParksDetailPage({ user }) {

  const {id} = useParams()

  const [park, setPark] = useState([]);
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
    APIService.GetPark(id)
    .then(resp => resp.json())
    .then(resp => {
      setPark(resp)
    })
    .catch(error => console.log(error))

    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    APIService.GetUserFavorites()
    .then(response => response.json())
    .then(response => {
      let ufArray = response
      let newArray = ufArray.filter(u => u.user.id == user?.id)
      setUserFavorites(newArray)
    })
    .catch(error => console.log(error))

    APIService.GetTrails()
    .then(response => response.json())
    .then(response => {
      let rawTrails = response;
      let filteredTrails = rawTrails.filter(t => t.park.id == id);
      setTrails(filteredTrails);
    })
    .catch(error => console.log(error))

    APIService.GetReviews()
    .then(response => response.json())
    .then(response => {
      setReviews(response)
      setIsLoading(false)
    })
    .catch(error => console.log(error))
  }

  if (isLoading === false) {
    return (
      <div id="trails-detail-page">

        <ParkBanner
          park={park}
          user={user}
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

export default connect(mapStateToProps)(ParksDetailPage);
