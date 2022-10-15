import React from 'react';

function ParkBanner({ park, user }) {

  var divStyle = {
    backgroundImage: 'url(' + park.img_url + ')'
  }

  return (
    <div className="header-photo-trails-detail" style={divStyle}>
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="header-text-trails-detail">{park.name}</h1>
            <h4 className="h3-text-trails-detail">{park.city}, {park.state.full_name}, {park.state.country}</h4>
          </div>
          <div className="col-2">
          </div>
        </div>
        <div class="row g-2">
          <div className="col-10">
          </div>
          <div className="col-2">
            {user?.is_superuser ? (
              <a className="admin-page-link" href={`/admin/park/modify/${park.id}`}>admin: modify park</a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParkBanner;
