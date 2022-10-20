import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import APIService from '../components/APIService';
import AccountHistory from '../components/AccountHistory';
import Footer from '../components/Footer';

function AccountHistoryPage({ user }) {

  const [history, setHistory] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getData();
    }
  },[user])

  async function getData() {
    if (localStorage.getItem('access')) {
      APIService.GetHistory()
      .then(response => response.json())
      .then(response => {
        let historyArray = response
        let newArray = historyArray.filter(h => h.user.id === user?.id)
        setHistory(newArray)
      })
      .catch(error => console.log(error))

      APIService.GetUserFavorites()
      .then(response => response.json())
      .then(response => {
        let ufArray = response
        let newArray = ufArray.filter(u => u.user.id == user?.id)
        setUserFavorites(newArray)
        setIsLoading(false);
      })
      .catch(error => console.log(error))
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
          <div className="row">
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
