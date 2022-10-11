import React from 'react';
import AccountReview from '../components/AccountReview';
import Footer from '../components/Footer';

function AccountReviewsPage() {

  return (
    <div id="account-page">
        <h1 className="account-header">your reviews</h1>

        <div className="container px-0">
          <div className="row g-2">
            <div className="col-md-6">
              <AccountReview
                trailName="Trail Name"
                image="bg-landing.jpg"
                difficulty="difficulty ranking"
                aveRanking="average rating"
                city="city"
                state="state"
                country="country"
                reviewText="Some review text Some review text Some review text Some review text Some review text Some review text"
              />
            </div>
            <div className="col-md-6">
              <AccountReview
                trailName="Trail Name"
                image="bg-landing.jpg"
                difficulty="difficulty ranking"
                aveRanking="average rating"
                city="city"
                state="state"
                country="country"
                reviewText="Some review text"
              />
            </div>

          </div>
        </div>

      <Footer className="footer"/>
    </div>
  )
}

export default AccountReviewsPage;
