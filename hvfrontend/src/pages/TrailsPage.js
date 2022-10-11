import React, { useState, useEffect } from 'react';
import TrailCard from '../components/TrailCard';
import Footer from '../components/Footer';
import axios from 'axios';

function TrailsPage() {

  const [trails, setTrails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
  },[])

  async function getData() {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/trails/`, config)
         .then(function (response) {
           setTrails(response.data)
           setIsLoading(false)
         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }
    }
  }

  if (isLoading === false) {
    return (
      <div id="trails-page">
        <div className="header-photo-trails">
          <h1 className="header-text-trails">trails</h1>
        </div>

        <div className="container px-0">
          <div class="row g-2">

            {trails.map((trail) => (
              <div className="col-md-6">
                <TrailCard
                  key={trail.id}
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
}

export default TrailsPage;
