import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import { connect } from 'react-redux';
import { checkAuthenticated, load_user } from '../actions/auth';

const Layout = (props) => {

  useEffect(() => {
    props.checkAuthenticated();
    props.load_user();
  });

  return (
    <div>
      <Navigation />
      {props.children}
    </div>
  );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);
