import React, { useState, useEffect } from 'react';
import ParkCard from '../components/ParkCard';
import Footer from '../components/Footer';

function ParksPage() {

  const [parks, setParks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/hvapp/parks/', {
      'method':'GET',
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(resp => resp.json())
    .then(resp => setParks(resp))
    .catch(error => console.log(error))
  },[])

  return (
    <div id="parks-page">
      <div className="header-photo-parks">
        <h1 className="header-text-parks">parks</h1>
      </div>

      <div className="container px-0">
        <div class="row g-2">

            {parks.map((park, index) => (
              <div className="col-md-6">
                <ParkCard
                  key={index}
                  park={park}
                />
              </div>
            ))}

        </div>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default ParksPage;
