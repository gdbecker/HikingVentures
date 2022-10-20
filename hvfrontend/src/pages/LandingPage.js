import React, {Fragment} from 'react';
import Footer from '../components/Footer';
import { ReactComponent as Logo } from '../assets/logo.svg';

function LandingPage() {

  return (
    <div id="landing-page">
      <div className="container landing-container">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <div className="landing-box">
              <h1><Logo className="landing-logo"/>HikingVentures</h1>
              <h3 className="landing-subtitle">explore your world</h3>
            </div>
          </div>
          <div className="col-md-3">
          </div>
        </div>
      </div>
      <Footer className="footer-landing"/>
    </div>
  )
}

export default LandingPage;
