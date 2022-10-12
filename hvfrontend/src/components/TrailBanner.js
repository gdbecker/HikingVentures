import React, { useState, useEffect } from 'react';

function TrailBanner(props) {

  var divStyle = {
    backgroundImage: 'url(' + props.img + ')'
  }

  return (
    <div className="header-photo-trails-detail" style={divStyle}>
      <h1 className="header-text-trails-detail">{props.name}</h1>
      <h4 className="h3-text-trails-detail">{props.difficulty} || {props.ave}</h4>
      <h4 className="h3-text-trails-detail">{props.parkName} || {props.parkCity}, {props.parkState}, {props.parkCountry}</h4>
    </div>
  )
}

export default TrailBanner;
