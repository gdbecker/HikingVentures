import React, { Fragment, useState, useEffect } from 'react';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { ReactComponent as Logo } from '../assets/logo.svg';
import { connect } from 'react-redux';
import { logout } from '../actions/auth';

function Navigation({ logout, isAuthenticated, user }, props) {

  const guestLinks = () => (
    <Fragment>
      <li className="nav-item">
        <a className="nav-link" href="/about">about</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/login">login</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/register">register</a>
      </li>
    </Fragment>
  );

  const authAdminLinks = () => (
    <Fragment>
      <li>
        <Nav class="nav-item">
          <NavDropdown
            id="nav-dropdown"
            title="admin"
            menuVariant=""
          >
            <NavDropdown.Item href="/admin/trail">add trail</NavDropdown.Item>
            <NavDropdown.Item href="/admin/trail/modify/:id">modify trail</NavDropdown.Item>
            <NavDropdown.Item href="/admin/park">add park</NavDropdown.Item>
            <NavDropdown.Item href="/admin/park/modify/:id">modify park</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </li>
    </Fragment>
  );

  const authLinks = () => (
    <Fragment>
      <li className="nav-item-other">
        <p className="nav-link-other">hello, {user?.first_name}!</p>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/trails">trails</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href="/parks">parks</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" href='/saved/'>saved</a>
      </li>

      {user?.is_superuser ? authAdminLinks() : null}

      <li>
        <Nav class="nav-item">
          <NavDropdown
            id="nav-dropdown"
            title="account"
            menuVariant=""
          >
            <NavDropdown.Item href='/account/details/'>details</NavDropdown.Item>
            <NavDropdown.Item href='/account/reviews/'>reviews</NavDropdown.Item>
            <NavDropdown.Item href='/account/history/'>history</NavDropdown.Item>
            <NavDropdown.Item href="/" onClick={logout}>logout</NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </li>
    </Fragment>
  );

  return (
    <div id="navigation">
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/"><h4><Logo className="nav-logo"/>HikingVentures</h4></a>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbar"
            aria-controls="navbar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbar">
            <ul className="navbar-nav ms-auto">
              {isAuthenticated ? authLinks() : guestLinks()}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user
});

export default connect(mapStateToProps, {logout})(Navigation);
