import React from 'react';
import TrailCard from '../components/TrailCard';

function AccountReview(props) {

  return (
    <div className="row">
      <div className="col-md-6">
        <TrailCard
          trailName={props.trailName}
          image={props.image}
          difficulty={props.difficulty}
          aveRanking={props.aveRanking}
          city={props.city}
          state={props.state}
          country={props.country}
        />
      </div>
      <div className="col-md-6 account-review-text">
        <p>{props.reviewText}</p>
      </div>
    </div>
  )
}

export default AccountReview;
