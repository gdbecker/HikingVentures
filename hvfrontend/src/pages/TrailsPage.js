import React, { useState, useEffect } from 'react';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';

function TrailsPage() {

  const [trails, setTrails] = useState([]);
  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/trails/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setTrails(resp))
    .catch(error => console.log(error))
  },[])

  return (
    <div id="trails-page">
      <div className="header-photo-trails">
        <h1 className="header-text-trails">trails</h1>
      </div>

      <div className="container px-0">
        <div class="row g-2">

          {trails.map((trail, index) => (
            <div className="col-md-6">
              <TrailCard
                key={index}
                trail={trail}
              />
            </div>
          ))}

        </div>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default TrailsPage;
