import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password } from '../actions/auth';
import Footer from '../components/Footer';

const ResetPasswordPage = ({ reset_password }) => {

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    email: ''
  });

  const { email } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    reset_password(email);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to='/' />
  }

  return (
    <div id="login-register-page">
      <h1 className="login-register-header">request password reset</h1>

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
          <button className="auth-button" type="submit">reset password</button>
        </form>
      </div>

      <Footer className="footer"/>
    </div>
  )
}

export default connect(null, { reset_password })(ResetPasswordPage);
