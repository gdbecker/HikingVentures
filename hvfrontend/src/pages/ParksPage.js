import React, { useState, useEffect } from 'react';
import PageBanner from '../components/PageBanner';
import ParkCard from '../components/ParkCard';
import Footer from '../components/Footer';
import Images from '../assets/imgIndex';
import axios from 'axios';

function ParksPage() {

  const [parks, setParks] = useState([]);
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
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/parks/`, config)
         .then(function (response) {
           setParks(response.data)
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
      <div id="parks-page">
        <PageBanner
          pageName={'parks'}
          img_url={Images.park}
        />

        <div className="container px-0">
          <div class="row g-2">

              {parks.map((park) => (
                <div className="col-md-6">
                  <ParkCard
                    key={park}
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
}

export default ParksPage;
