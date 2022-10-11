import React from 'react';
import AccountHistory from '../components/AccountHistory';
import Footer from '../components/Footer';

function AccountHistoryPage() {

  return (
    <div id="account-page">
        <h1 className="account-header">history</h1>

        <div className="container px-0">
          <AccountHistory
            date="##/##/####"
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
          <AccountHistory
            date="##/##/####"
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
          <AccountHistory
            date="##/##/####"
            trailName="Trail Name"
            image="bg-landing.jpg"
            difficulty="difficulty ranking"
            aveRanking="average rating"
            city="city"
            state="state"
            country="country"
          />
        </div>
      <Footer className="footer"/>
    </div>
  )
}

export default AccountHistoryPage;
