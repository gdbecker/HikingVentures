import React from 'react';

function PageBanner({ pageName, img_url }) {

  var divStyle = {
    backgroundImage: 'url(' + img_url + ')'
  }

  return (
    <div className="header-photo-trails" style={divStyle}>
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="header-text-trails">{pageName}</h1>
          </div>
          <div className="col-2">
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageBanner;
