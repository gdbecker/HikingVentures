import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageBanner from '../components/PageBanner';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import Images from '../assets/imgIndex';
import axios from 'axios';

function TrailsPage({ user }) {

  const [trails, setTrails] = useState([]);
  const [filteredTrails, setFilteredTrails] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [parkFilter, setParkFilter] = useState([]);
  const [stateFilter, setStateFilter] = useState([]);
  const [difficultyFilter, setDifficultyFilter] = useState([]);
  const [routeTypeFilter, setRouteTypeFilter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filterForm, setFilterForm] = useState({
    park: 'all',
    state: 'all',
    difficulty: 'all',
    routeType: 'all'
  });

  const onChange = e => {
    setFilterForm({ ...filterForm, [e.target.name]: e.target.value });
    let trailsToFilter = trails

    for (const [key, value] of Object.entries(filterForm)) {
      if (key === 'park') {
        if (key == e.target.name && e.target.value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.park.id == e.target.value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (key == e.target.name && e.target.value == 'all') {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.park.id == value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        }
      }

      if (key === 'state') {
        if (key == e.target.name && e.target.value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.park.state.id == e.target.value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (key == e.target.name && e.target.value == 'all') {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.park.state.id == value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        }
      }

      if (key === 'difficulty') {
        if (key == e.target.name && e.target.value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.difficulty.id == e.target.value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (key == e.target.name && e.target.value == 'all') {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.difficulty.id == value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        }
      }

      if (key === 'routeType') {
        if (key == e.target.name && e.target.value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.routetype.id == e.target.value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (key == e.target.name && e.target.value == 'all') {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else if (value != 'all') {
          let filteredDown = trailsToFilter.filter(t => t.routetype.id == value)
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        } else {
          let filteredDown = trailsToFilter
          setFilteredTrails(filteredDown)
          trailsToFilter = filteredDown
        }
      }
    }
  }

  const { park, state, difficulty, routeType } = filterForm;

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
           setFilteredTrails(response.data)
           const uniqueParks = [...new Map(response.data.map(t => [t.park['id'], t.park])).values()];
           setParkFilter(uniqueParks)
           const uniqueStates = [...new Map(response.data.map(t => [t.park.state['id'], t.park.state])).values()];
           setStateFilter(uniqueStates)
           const uniqueDifficulty = [...new Map(response.data.map(t => [t.difficulty['id'], t.difficulty])).values()];
           setDifficultyFilter(uniqueDifficulty)
           const uniqueRouteTypes = [...new Map(response.data.map(t => [t.routetype['id'], t.routetype])).values()];
           setRouteTypeFilter(uniqueRouteTypes)
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

        <div className="container px-0 filter-form">
          <div className="row g-2">
            <div className="col-md-12">
              <form>
                <div className="row g-2">
                  <div className="col-md-3">
                    <div className="form-group">
                      <select className="form-control" onChange={(e) => onChange(e)} name="park">
                        <option value="all"> -- park -- </option>
                        {parkFilter.map((p, index) => <option key={index} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select className="form-control" onChange={(e) => onChange(e)} name="state">
                        <option value="all"> -- state -- </option>
                        {stateFilter.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select className="form-control" onChange={(e) => onChange(e)} name="difficulty">
                        <option value="all"> -- difficulty -- </option>
                        {difficultyFilter.map((d, index) => <option key={index} value={d.id}>{d.rank}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="col-md-3">
                    <div className="form-group">
                      <select className="form-control" onChange={(e) => onChange(e)} name="routeType">
                        <option value="all"> -- route type -- </option>
                        {routeTypeFilter.map((r, index) => <option key={index} value={r.id}>{r.type}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="container px-0">
          <div class="row g-2">

            {filteredTrails.map((t, index) => {
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
