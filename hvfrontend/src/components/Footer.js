import React from 'react';
import { ReactComponent as EmailIcon } from '../assets/envelope.svg';
import { ReactComponent as FacebookIcon } from '../assets/facebook.svg';
import { ReactComponent as InstagramIcon } from '../assets/instagram.svg';
import { ReactComponent as TikTokIcon } from '../assets/tiktok.svg';

function Footer(props) {

  return (
    <div className="footer-wrapper">
      <footer className={props.className}>
        <p>&copy; 2022 Garrett Becker</p>
        <p>
          <a href="/"><EmailIcon className="social-icon email-icon"/></a>
          <a href="https://facebook.com"><FacebookIcon className="social-icon facebook-icon"/></a>
          <a href="https://instagram.com"><InstagramIcon className="social-icon instagram-icon"/></a>
          <a href="https://tiktok.com"><TikTokIcon className="social-icon tiktok-icon"/></a>
        </p>
      </footer>
    </div>

  )
}

export default Footer;
