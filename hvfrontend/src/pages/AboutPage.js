import React, {Fragment} from 'react';
import Footer from '../components/Footer';
import profPic from '../assets/Garrett Becker.jpg'

function AboutPage() {

  return (
    <div id="about-page">
      <div className="container about-container">
        <div className="row">
          <div className="col-md-3">
          </div>
          <div className="col-md-6">
            <div className="about-image-crop">
                <img src={profPic} className="about-image" alt="prof" />
            </div>
            <div className="about-box">
              <h3 className="about-subtitle">Hi I'm Garrett!</h3>
              <p className="about-text">I am an aspiring web developer and I love building and making to care for and make other people's lives better.</p>
              <p className="about-text">This is a personal capstone project I made as a challenge to synthesize a lot from what I've been learning hodgepodge 
              on my own. It was a total blast figuring this out and I'm very happy with the result!</p>
              <p className="about-text">Hiking is one of my favorite things to do and I wanted to try making a hiking trail and park database app where you could search 
              and filter, find your new favorite trail to add to your favorites, and keep a record of the best places you've been. AllTrails is one of my go-to hiking trail 
              databases and provided a source of inspiration for this project.</p>
              <p className="about-text">Front-End: React.js, HTML, CSS, JavaScript</p>
              <p className="about-text">Back-End: Python, Django REST Framework </p>
              <p className="about-text">Authentication: JWT, Djoser, Axios</p>
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

export default AboutPage;