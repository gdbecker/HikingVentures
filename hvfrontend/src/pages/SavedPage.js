import React from 'react';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';

function SavedPage() {

  return (
    <div id="saved-page">
      <div className="header-photo-saved">
        <h1 className="header-text-saved">saved trails</h1>
      </div>

      <div className="container px-0">
        <div class="row g-2">
        <div className="col-lg-3">
          <TrailCard
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
        </div>
        <div className="col-lg-3">
          <TrailCard
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
        </div>
        <div className="col-lg-3">
          <TrailCard
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
        </div>
        <div className="col-lg-3">
          <TrailCard
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
        </div>
        </div>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default SavedPage;
