import React from 'react';
import './Footer.css';
import { FaInstagram, FaYoutube, FaTwitter, FaTiktok } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="reaction-footer">
      <div className="footer-content">
        <div className="footer-socials">
          <a href="https://www.instagram.com/reactiondrink" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href="https://www.tiktok.com/@reactionenergy" target="_blank" rel="noopener noreferrer">
            <FaTiktok />
          </a>
        </div>
        <p className="footer-text">© {new Date().getFullYear()} Reaction Energy</p>
      </div>
    </footer>
  );
}
