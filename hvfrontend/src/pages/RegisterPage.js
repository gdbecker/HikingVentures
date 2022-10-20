import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { register } from '../actions/auth';
import Footer from '../components/Footer';
import APIService from '../components/APIService';

const RegisterPage = ({ register, isAuthenticated }) => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    city: '',
    email: '',
    state: '',
    img_url:'',
    password: '',
    re_password: ''
  });

  const { first_name, last_name, city, email, state, img_url, password, re_password } = formData;

  let [stateList, setStateList] = useState([]);

  useEffect(() => {
    APIService.GetStates()
    .then(resp => resp.json())
    .then(resp => setStateList(resp))
    .catch(error => console.log(error))
  },[])

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password === re_password) {
      register(first_name, last_name, city, email, state, img_url, password, re_password);
      setAccountCreated(true);
    }

  };

  if (isAuthenticated) {
    return <Navigate to='/' />
  }

  if (accountCreated) {
    return <Navigate to='/login' />
  }

  return (
    <div id="login-register-page">
      <h1 className="login-register-header">register</h1>

      <div className="container mt-5">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="first name"
              name="first_name"
              value={first_name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="last name"
              name="last_name"
              value={last_name}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="city"
              name="city"
              value={city}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="email"
              placeholder="email"
              name="email"
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <select className="form-control" onChange={e => onChange(e)} name="state">
              <option value="⬇️ Choose a state ⬇️"> -- Choose a state -- </option>
              {stateList.map((s, index) => <option key={index} value={s.id}>{s.full_name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="image url"
              name="img_url"
              value={img_url}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='password'
              placeholder='password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='password'
              placeholder='confirm password'
              name='re_password'
              value={re_password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <button className="auth-button" type="submit">register</button>
          <p className="form-help">already have an account? <Link className="form-link" to="/login">login</Link>
          </p>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { register })(RegisterPage);
