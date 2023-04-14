import React from 'react';
import { ReactComponent as EmailIcon } from '../assets/envelope.svg';
import { ReactComponent as LinkedInIcon } from '../assets/linkedin.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

function Footer(props) {

  return (
    <div className="footer-wrapper">
      <footer className={props.className}>
        <p>&copy; 2022-2023 Garrett Becker</p>
        <p>
          <a href="mailto:garrettdbecker@gmail.com"><EmailIcon className="social-icon email-icon"/></a>
          <a href="https://www.linkedin.com/in/garrett-becker-923b4a106/"><LinkedInIcon className="social-icon linkedin-icon"/></a>
          <a href="https://github.com/gdbecker"><GithubIcon className="social-icon github-icon"/></a>
        </p>
      </footer>
    </div>

  )
}

export default Footer;
