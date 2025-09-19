import React from "react";
import './Footer.css';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTrain } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container-app">
        <div className="footer-grid">

          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <FaTrain size={32} />
              <h4>Indian Railways</h4>
            </div>
            <p>Book trains, check schedules, and travel across India with ease and comfort.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h5>Quick Links</h5>
            <ul>
              <li>Home</li>
              <li>Book Ticket</li>
              <li>Train Schedule</li>
              <li>PNR Status</li>
              <li>Train Running Status</li>
            </ul>
          </div>

          {/* Ticket Services */}
          <div>
            <h5>Ticket Services</h5>
            <ul>
              <li>IRCTC Login</li>
              <li>Cancel Ticket</li>
              <li>Check Refund Status</li>
              <li>Station Enquiry</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h5>Customer Support</h5>
            <p>Email: support@indianrailways.gov.in</p>
            <p>Helpline: 139 (24x7)</p>
            <div className="social-icons">
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
              <FaYoutube />
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          © {new Date().getFullYear()} Indian Railways | All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;


// import React from "react";
// import './Footer.css';

// const Footer = () => {
//   return (
//     <footer className="footer-container">
//       <div className="container-app">
//         <div className="footer-grid">
//           <div>
//             <h5>Indian Railways</h5>
//             <p>Book trains, manage bookings and travel with comfort.</p>
//           </div>
//           <div>
//             <h6>Quick Links</h6>
//             <ul>
//               <li>Home</li><li>Trains</li><li>Bookings</li>
//             </ul>
//           </div>
//           <div>
//             <h6>Contact</h6>
//             <p>support@railway.example</p>
//             <p>1800-XXX-XXXX</p>
//           </div>
//         </div>
//         <div className="text-center small">© {new Date().getFullYear()} Indian Railways — Demo</div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;
