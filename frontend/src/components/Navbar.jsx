import React, { useContext } from "react";
import './Navbar.css';
import { Navbar as BsNavbar, Nav, Container, Image, Button } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onLogin, onRegister, onGotoDashboard }) => {
  const { user, logout } = useContext(AuthContext);
  const nav = useNavigate();

  const handleLogout = () => {
    logout();
    nav("/"); // go home after logout
  };

  return (
    <BsNavbar bg="light" expand="lg" className="shadow-sm custom-navbar" fixed="top">
      <Container>
        <BsNavbar.Brand onClick={() => nav('/')} className="d-flex align-items-center" style={{ cursor: 'pointer' }}>
          <Image src="/railwaylogo.png" alt="Indian Railway" width="40" height="40" className="me-2 logo-img" />
          <span className="brand-text">Indian Railways</span>
        </BsNavbar.Brand>

        <Nav className="ms-auto align-items-center">
          {user ? (
            <>
              <span className="me-3">Hi, {user.name || user.email}</span>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={onGotoDashboard}
              >
                Dashboard
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline-primary"
                className="me-2"
                onClick={onLogin}
              >
                Login
              </Button>
              <Button
                variant="primary"
                onClick={onRegister}
              >
                Register
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;



// import React, { useContext } from "react";
// import './Navbar.css';
// import { Navbar as BsNavbar, Nav, Container, Image, Button } from 'react-bootstrap';
// import { AuthContext } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// const Navbar = ({ onLogin, onRegister, onGotoDashboard }) => {
//   const { user, logout } = useContext(AuthContext);
//   const nav = useNavigate();

//   return (
//     <BsNavbar bg="light" expand="lg" className="shadow-sm custom-navbar" fixed="top">
//       <Container>
//         <BsNavbar.Brand href="/" className="d-flex align-items-center" onClick={() => nav('/')}>
//           <Image src="/railwaylogo.png" alt="Indian Railway" width="40" height="40" className="me-2 logo-img" />
//           <span className="brand-text">Indian Railways</span>
//         </BsNavbar.Brand>

//         <Nav className="ms-auto align-items-center">
//           {user ? (
//             <>
//               <span className="me-3">Hi, {user.name || user.email}</span>
//               <Button variant="outline-secondary" className="me-2" onClick={() => { onGotoDashboard(); }}>Dashboard</Button>
//               <Button variant="danger" onClick={() => { logout(); nav('/'); }}>Logout</Button>
//             </>
//           ) : (
//             <>
//               <Button variant="outline-primary" className="me-2" onClick={onRegister}>Register</Button>
//               <Button variant="primary" onClick={onLogin}>Login</Button>
//             </>
//           )}
//         </Nav>
//       </Container>
//     </BsNavbar>
//   );
// };

// export default Navbar;
