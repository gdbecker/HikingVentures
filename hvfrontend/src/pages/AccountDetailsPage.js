import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { update_user } from '../actions/auth';
import APIService from '../components/APIService';
import Footer from '../components/Footer';

function AccountDetailsPage({ update_user, user }) {

  const [changesSent, setChangesSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    city: '',
    state: '',
    img_url:''
  });

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const { email, first_name, last_name, city, state, img_url } = formData;

  let [stateList, setStateList] = useState([]);

  useEffect(() => {
    APIService.GetStates()
    .then(resp => resp.json())
    .then(resp => setStateList(resp))
    .catch(error => console.log(error))
  },[])

  useEffect(() => {
    if (user && formData.email === '') {
      setFormData({
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        city: user.city,
        state: user.state,
        img_url: user.img_url
      })
    }
  }, [user, formData])

  const onSubmit = e => {
    update_user(first_name, last_name, city, state, img_url);
    setChangesSent(true);
  };

  if (changesSent) {
    window.location.reload(true);
  }

  return (
    <div id="account-page">
      <div className="container px-0">
        <div class="row g-2">
          <div className="col-10">
            <h1 className="account-header">account details</h1>
          </div>
          <div className="col-2">
          </div>
        </div>
      </div>

      <div className="container mt-5 account-form">
        <div className="row">
          <div className="col-md-3">
          <div className="account-image-crop">
            <img className="account-image" src={`${formData.img_url}`} alt="user"/>
          </div>
          </div>
          <div className="col-md-9">
            <form onSubmit={e => onSubmit(e)}>
              <div className="form-group">
                <input
                  className='form-control'
                  type='email'
                  placeholder='email'
                  name='email'
                  value={formData.email}
                  required
                  readOnly
                />
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='first name'
                  name='first_name'
                  value={formData.first_name}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='last name'
                  name='last_name'
                  defaultValue={formData.last_name}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='city'
                  name='city'
                  value={formData.city}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <div className="form-group">
                <select className="form-control" onChange={e => onChange(e)} name="state" value={formData.state}>
                  <option value="⬇️ Choose a state ⬇️"> -- Choose a state -- </option>
                  {stateList.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <input
                  className='form-control'
                  type='text'
                  placeholder='image url'
                  name='img_url'
                  value={formData.img_url}
                  onChange={e => onChange(e)}
                  required
                />
              </div>
              <button className="account-button" type="submit">save</button>
              <p className="account-form-help">need to reset your password? <Link className="account-form-link" to="/reset-password">reset password</Link>
              </p>
            </form>
          </div>
        </div>

      </div>

      <Footer className="footer"/>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps, { update_user })(AccountDetailsPage);
