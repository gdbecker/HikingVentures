import React from 'react';
import { ReactComponent as EmailIcon } from '../assets/envelope.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/instagram.svg';
import { ReactComponent as TikTokIcon } from '../assets/tiktok.svg';
import { ReactComponent as GithubIcon } from '../assets/github.svg';

function Footer(props) {

  return (
    <div className="footer-wrapper">
      <footer className={props.className}>
        <p>&copy; 2022-2023 Garrett Becker</p>
        <p>
          <a href="/"><EmailIcon className="social-icon email-icon"/></a>
          <a href="https://facebook.com"><FacebookIcon className="social-icon facebook-icon"/></a>
          <a href="https://instagram.com"><InstagramIcon className="social-icon instagram-icon"/></a>
          <a href="https://github.com/gdbecker"><GithubIcon className="social-icon github-icon"/></a>
        </p>
      </footer>
    </div>

  )
}

export default Footer;
