import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import APIService from '../components/APIService';
import AccountReview from '../components/AccountReview';
import Footer from '../components/Footer';

function AccountReviewsPage({ user }) {

  const [reviews, setReviews] = useState([]);
  const [userFavorites, setUserFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getData();
    }
  },[user])

  async function getData() {
    if (localStorage.getItem('access')) {
      APIService.GetReviews()
      .then(response => response.json())
      .then(response => {
        let reviewArray = response
        let newArray = reviewArray.filter(r => r.user.id === user?.id)
        setReviews(newArray)
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
              <h1 className="account-header">your reviews</h1>
            </div>
            <div className="col-2">
            </div>
          </div>
        </div>

        <div className="container px-0">
          <div className="row g-2">
            {reviews.map((r, index) => {
                return (
                  <div className="col-md-6">
                    <AccountReview
                      user={user}
                      review={r}
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

export default connect(mapStateToProps)(AccountReviewsPage);
