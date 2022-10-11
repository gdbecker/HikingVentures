import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../components/Footer';

function TrailsDetailPage() {

  const {id} = useParams()

  const [trailInfo, setTrailInfo] = useState([])
  useEffect(() => {
    if (trailInfo.length === 0) {
      let trailID = id

      fetch(`http://127.0.0.1:8000/hvapp/trails/${trailID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setTrailInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [difficultyInfo, setDifficultyInfo] = useState([])
  useEffect(() => {
    if (difficultyInfo.length === 0) {
      let difficultyID = trailInfo.difficulty

      fetch(`http://127.0.0.1:8000/hvapp/difficulties/${difficultyID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setDifficultyInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [routeTypeInfo, setRouteTypeInfo] = useState([])
  useEffect(() => {
    if (routeTypeInfo.length === 0) {
      let routeTypeID = trailInfo.routetype

      fetch(`http://127.0.0.1:8000/hvapp/routetypes/${routeTypeID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setRouteTypeInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [parkInfo, setParkInfo] = useState([])
  useEffect(() => {
    if (parkInfo.length === 0) {
      let parkID = trailInfo.park

      fetch(`http://127.0.0.1:8000/hvapp/parks/${parkID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setParkInfo(resp))
      .catch(error => console.log(error))
    }
  })

  const [stateInfo, setStateInfo] = useState([])
  useEffect(() => {
    if (stateInfo.length === 0) {
      let stateID = parkInfo.state

      fetch(`http://127.0.0.1:8000/hvapp/states/${stateID}/`, {
        'method':'GET',
        headers: {
          'Content-Type':'application/json'
        }
      })
      .then(resp => resp.json())
      .then(resp => setStateInfo(resp))
      .catch(error => console.log(error))
    }
  })

  return (
    <div id="trails-detail-page">
      <div className="header-photo-trails-detail">
        <h1 className="header-text-trails-detail">{trailInfo.name}</h1>
        <h4 className="h3-text-trails-detail">{difficultyInfo.rank} || average rating</h4>
        <h4 className="h3-text-trails-detail">{parkInfo.name} || {parkInfo.city}, {stateInfo.full_name}, {stateInfo.country}</h4>
      </div>

      <div className="container px-0 trails-content">
        <div className="row">
          <div className="col-md-12 mx-auto">
            <p className="trails-content-text">{trailInfo.description}</p>
            <hr/>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4">
                <p className="trails-content-specs">length</p>
                <p className="trails-content-specs">{trailInfo.length}</p>
              </div>
              <div className="col-md-4">
                <p className="trails-content-specs">elevation gain</p>
                <p className="trails-content-specs">{trailInfo.elevation_gain}</p>
              </div>
              <div className="col-md-4">
                <p className="trails-content-specs">route type</p>
                <p className="trails-content-specs">{routeTypeInfo.type}</p>
              </div>
            </div>

            <hr/>

            <div className="row">
              <div className="col-md-12">
                <div className="p-2">
                  <h4 className="trails-content-text">reviews || average rating</h4>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-1">
              </div>
              <div className="col-md-3">
                <div className="user-image-crop">
                  <img className="user-image-review" src={require(`../assets/bg-landing.jpg`)} alt="user"/>
                </div>
                <p className="trails-content-specs">first name</p>
              </div>
              <div className="col-md-8">
                <p className="trails-content-text">
                  ⭐⭐⭐⭐⭐
                </p>
                <p className="trails-content-text">
                  ##/##/####
                </p>
                <p className="trails-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-1">
              </div>
              <div className="col-md-3">
                <div className="user-image-crop">
                  <img className="user-image-review" src={require(`../assets/bg-landing.jpg`)} alt="user"/>
                </div>
                <p className="trails-content-specs">first name</p>
              </div>
              <div className="col-md-8">
                <p className="trails-content-text">
                  ⭐⭐⭐⭐⭐
                </p>
                <p className="trails-content-text">
                  ##/##/####
                </p>
                <p className="trails-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-1">
              </div>
              <div className="col-md-3">
                <div className="user-image-crop">
                  <img className="user-image-review" src={require(`../assets/bg-landing.jpg`)} alt="user"/>
                </div>
                <p className="trails-content-specs">first name</p>
              </div>
              <div className="col-md-8">
                <p className="trails-content-text">
                  ⭐⭐⭐⭐⭐
                </p>
                <p className="trails-content-text">
                  ##/##/####
                </p>
                <p className="trails-content-text">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                  dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
              </div>
            </div>

          </div>
          <div className="col-md-6 mx-auto">
            <img className="map-image" src={`${trailInfo.map_url}`} alt="map"/>

            <hr/>

            <h4 className="trails-content-text">photos</h4>
            <div className="row g-1">
              <div className="col-md-6">
                <div className="p-3">
                  <img className="trail-image" src={require(`../assets/bg-trails.jpg`)} alt="trail"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3">
                  <img className="trail-image" src={require(`../assets/bg-trails.jpg`)} alt="trail"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3">
                  <img className="trail-image" src={require(`../assets/bg-trails.jpg`)} alt="trail"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3">
                  <img className="trail-image" src={require(`../assets/bg-trails.jpg`)} alt="trail"/>
                </div>
              </div>
              <div className="col-md-6">
                <div className="p-3">
                  <img className="trail-image" src={require(`../assets/bg-trails.jpg`)} alt="trail"/>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default TrailsDetailPage;
