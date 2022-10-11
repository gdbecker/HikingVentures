import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import Footer from '../components/Footer';

const LoginPage = ({ login, isAuthenticated }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to='/trails' />
  }

  return (
    <div id="login-register-page">
      <h1 className="login-register-header">login</h1>

      <div className="container mt-5">
        <form onSubmit={e => onSubmit(e)}>
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
          <button className="auth-button" type="submit">login</button>
          <p className="form-help">don't have an account? <Link className="form-link" to="/register">register</Link>
          </p>
          <p className="form-help">forgot your password? <Link className="form-link" to="/reset-password">reset password</Link>
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

export default connect(mapStateToProps, { login })(LoginPage);
