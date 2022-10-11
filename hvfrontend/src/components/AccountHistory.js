import React from 'react';
import TrailCard from '../components/TrailCard';

function AccountHistory(props) {

  return (
    <div className="row g-2">
      <div className="col-md-3 account-history-text">
        <h3>{props.date}</h3>
      </div>
      <div className="col-md-3">
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
      <div className="col-md-3">
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
      <div className="col-md-3">
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
      <div className="col-md-3">
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

    </div>
  )
}

export default AccountHistory;
