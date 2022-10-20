import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PageBanner from '../components/PageBanner';
import Images from '../assets/imgIndex';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import APIService from '../components/APIService';

function SavedPage({ user }) {

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
      APIService.GetTrails()
      .then(response => response.json())
      .then(response => {
        setTrails(response)
        setFilteredTrails(response)
        const uniqueParks = [...new Map(response.map(t => [t.park['id'], t.park])).values()];
        setParkFilter(uniqueParks)
        const uniqueStates = [...new Map(response.map(t => [t.park.state['id'], t.park.state])).values()];
        setStateFilter(uniqueStates)
        const uniqueDifficulty = [...new Map(response.map(t => [t.difficulty['id'], t.difficulty])).values()];
        setDifficultyFilter(uniqueDifficulty)
        const uniqueRouteTypes = [...new Map(response.map(t => [t.routetype['id'], t.routetype])).values()];
        setRouteTypeFilter(uniqueRouteTypes)
      })
      .catch(error => console.log(error))

      APIService.GetReviews()
      .then(response => response.json())
      .then(response => {
        setReviews(response)
        setIsLoading(false)
      })
      .catch(error => console.log(error))

      APIService.GetUserFavorites()
      .then(response => response.json())
      .then(response => {
        let ufArray = response
        let newArray = ufArray.filter(u => u.user.id == user?.id)
        setUserFavorites(newArray)
        setIsLoading(false)
      })
      .catch(error => console.log(error))
    }
  }

  if (isLoading === false) {
    return (
      <div id="saved-page">
        <PageBanner
          pageName={'saved trails'}
          img_url={Images.saved}
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
