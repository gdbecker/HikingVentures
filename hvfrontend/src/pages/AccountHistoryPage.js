import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import AccountHistory from '../components/AccountHistory';
import Footer from '../components/Footer';

function AccountHistoryPage({ user }) {

  const [history, setHistory] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getData();
    setHistory(history.filter(h => h.user.id === user?.id));
    setUserFavorites(userFavorites.filter(u => u.user.id === user?.id));
  },[])

  async function getData() {
    if (localStorage.getItem('access')) {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/history/`, config)
         .then(function (response) {
           setHistory(response.data);

         })
        .catch(function (error) {
           console.log(error);
        });

      } catch (err) {
        console.log(err)
      }

      try {
        await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/`, config)
         .then(function (response) {
           setUserFavorites(response.data)
           setIsLoading(false);
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
      <div id="account-page">
        <div className="container px-0">
          <div class="row g-2">
            <div className="col-10">
              <h1 className="account-header">history</h1>
            </div>
            <div className="col-2">
            </div>
          </div>
        </div>

        <div className="container px-0">
          {history.map((h, index) => {
              return (
                <div className="col-md-6">
                  <AccountHistory
                    user={user}
                    history={h}
                    userFavorites={userFavorites}
                  />
                </div>
              )
          })}

        </div>
        <Footer className="footer"/>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AccountHistoryPage);
