import React, { Fragment, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import TrailBanner from '../components/TrailBanner';
import TrailReview from '../components/TrailReview';
import Footer from '../components/Footer';
import axios from 'axios';

let averageRating = (reviews) => {
  if (reviews.length === 0) {
    return "no ratings yet!"
  } else {
    let reviewCount = reviews.length
    let reviewSum = reviews.map(r => parseInt(r.rating)).reduce((prev, next) => prev + next);
    return (reviewSum / reviewCount).toFixed(2) + "⭐";
  }
}

function TrailsDetailPage({ user }) {

  const {id} = useParams()

  const [trail, setTrail] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ave, setAve] = useState(null);
  const [userFavorites, setUserFavorites] = useState([]);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getData();
    }
  },[user])

  async function getData() {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/userfavorites/`, config)
       .then(function (response) {
         let ufArray = response.data
         let newArray = ufArray.filter(u => u.user.id == user?.id)
         console.log(newArray)
         setUserFavorites(newArray)

       })
      .catch(function (error) {
         console.log(error);
      });

    } catch (err) {
      console.log(err)
    }

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/trails/${id}/`, config)
       .then(function (response) {
         setTrail(response.data)

       })
      .catch(function (error) {
         console.log(error);
      });

    } catch (err) {
      console.log(err)
    }

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/reviews/`, config)
       .then(function (response) {
         let reviewArray = response.data
         let newArray = reviewArray.filter(r => r.trail.id == id)
         setReviews(newArray)
         setAve(averageRating(newArray))

       })
      .catch(function (error) {
         console.log(error);
      });

    } catch (err) {
      console.log(err)
    }

    try {
      await axios.get(`${process.env.REACT_APP_API_URL}/hvapp/images/`, config)
       .then(function (response) {
         let imageArray = response.data
         let newArray = imageArray.filter(i => i.trail.id == id)
         setImages(newArray)
         setIsLoading(false)
       })
      .catch(function (error) {
         console.log(error);
      });

    } catch (err) {
      console.log(err)
    }

  }

  const formVisible = () => (
    <Fragment>
      <div className="container mt-5 account-form">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="rating">
              <option value="⬇️ Select rating ⬇️"> -- Select rating -- </option>
              {ratings.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </select>
          </div>
          <div className="form-group">
            <textarea
              className='form-control'
              type='text'
              placeholder='review'
              name='text'
              defaultValue={text}
              onChange={e => onChange(e)}
              required
            >
            </textarea>
          </div>

          <button className="admin-button" type="submit">add review</button>
        </form>
      </div>
    </Fragment>
  );

  const formHidden = () => (
    <Fragment>
      <div className="container mt-5 account-form">
        <button className="admin-button" type="submit" onClick = {() => clickTheButton()}>write review</button>
      </div>
    </Fragment>
  );

  const ratings = [
    { label: '⭐', value: '1' },
    { label: '⭐⭐', value: '2' },
    { label: '⭐⭐⭐', value: '3' },
    { label: '⭐⭐⭐⭐', value: '4' },
    { label: '⭐⭐⭐⭐⭐', value: '5' },
  ];

  const [buttonClicked, setButtonClicked] = useState(false);

  const clickTheButton = () => {
    setButtonClicked(true)
  }

  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    rating: '',
    text: ''
  });

  const { rating, text } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    const currentUser = user.id

    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${localStorage.getItem('access')}`,
        'Accept': 'application/json'
      }
    };

    const body = JSON.stringify({ rating, text, currentUser, id });

    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/hvapp/reviews/create/`, body, config)
      setFormSent(true)
    } catch (err) {
      console.log(err)
    }
  };

  if (formSent) {
    setFormData({
      rating: '',
      text: ''
    });
    window.location.reload(false);
  }

  if (isLoading === false) {
    return (
      <div id="trails-detail-page">

        <TrailBanner
          trail={trail}
          user={user}
          ave={ave}
          userFavorites={userFavorites}
        />

        <div className="container px-0 trails-content">
          <div className="row">
            <div className="col-md-12 mx-auto">
              <p className="trails-content-text">{trail?.description}</p>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="row">
                <div className="col-md-4">
                  <p className="trails-content-specs">length</p>
                  <p className="trails-content-specs">{trail?.length}</p>
                </div>
                <div className="col-md-4">
                  <p className="trails-content-specs">elevation gain</p>
                  <p className="trails-content-specs">{trail?.elevation_gain}</p>
                </div>
                <div className="col-md-4">
                  <p className="trails-content-specs">route type</p>
                  <p className="trails-content-specs">{trail.routetype?.type}</p>
                </div>
              </div>

              <hr/>

              <div className="row">
                <div className="col-md-12">
                  <div className="p-2">
                    <h4 className="trails-content-text">reviews || {ave}</h4>
                  </div>
                </div>
              </div>

              {reviews?.map((review, index) => (
                  <TrailReview
                    key={index}
                    review={review}
                    user={user}
                  />
              ))}

              {buttonClicked ? formVisible() : formHidden()}

            </div>
            <div className="col-md-6 mx-auto">
              <img className="map-image" src={`${trail?.map_url}`} alt="map"/>

              <hr/>

              <h4 className="trails-content-text">photos</h4>
              <div className="row g-1">

                {images?.map((i, index) => (
                  <div className="col-lg-6">
                    <div className="p-3">
                      <img className="trail-detail-image" key={index} src={`${i.img_url}`} alt="trail"/>
                    </div>
                  </div>
                ))}

              </div>
            </div>
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

export default connect(mapStateToProps)(TrailsDetailPage);
