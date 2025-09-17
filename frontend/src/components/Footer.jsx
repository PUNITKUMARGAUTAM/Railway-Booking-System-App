import React from "react";
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container-app">
        <div className="footer-grid">
          <div>
            <h5>Indian Railways</h5>
            <p>Book trains, manage bookings and travel with comfort.</p>
          </div>
          <div>
            <h6>Quick Links</h6>
            <ul>
              <li>Home</li><li>Trains</li><li>Bookings</li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <p>support@railway.example</p>
            <p>1800-XXX-XXXX</p>
          </div>
        </div>
        <div className="text-center small">© {new Date().getFullYear()} Indian Railways — Demo</div>
      </div>
    </footer>
  );
};

export default Footer;
