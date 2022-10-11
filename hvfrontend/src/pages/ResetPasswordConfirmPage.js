import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { reset_password_confirm } from '../actions/auth';
import Footer from '../components/Footer';

const ResetPasswordConfirmPage = ({ reset_password_confirm }) => {

  const { uid, token } = useParams();

  const [requestSent, setRequestSent] = useState(false);
  const [formData, setFormData] = useState({
    new_password: '',
    re_new_password: ''
  });

  const { new_password, re_new_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    reset_password_confirm(uid, token, new_password, re_new_password);
    setRequestSent(true);
  };

  if (requestSent) {
    return <Navigate to='/' />
  }

  return (
    <div id="login-register-page">
      <h1 className="login-register-header">confirm new password</h1>

      <div className="container mt-5">
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              className='form-control'
              type='password'
              placeholder='new password'
              name='new_password'
              value={new_password}
              onChange={e => onChange(e)}
              minLength='6'
              required
            />
          </div>
          <div className="form-group">
            <input
              className='form-control'
              type='password'
              placeholder='confirm new password'
              name='re_new_password'
              value={re_new_password}
              onChange={e => onChange(e)}
              minLength='6'
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

export default connect(null, { reset_password_confirm })(ResetPasswordConfirmPage);
