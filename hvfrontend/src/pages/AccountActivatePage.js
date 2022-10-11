import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { verify } from '../actions/auth';
import Footer from '../components/Footer';

const AccountActivatePage = ({ verify }) => {
  const { uid, token } = useParams();

  const [verified, setVerified] = useState(false);

  const verify_account = e => {
    e.preventDefault();

    verify(uid, token);
    setVerified(true);
  };

  if (verified) {
    return <Navigate to='/' />
  }

  return (
    <div id="login-register-page">
      <h1 className="login-register-header">account activation</h1>

      <a href="/register" onClick={verify_account}><button className="auth-button">verify</button></a>
      <Footer className="footer"/>
    </div>
  )
}

export default connect(null, { verify })(AccountActivatePage);
