import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink} from "react-router-dom";
import * as Navigate from '../../constants/routes';
import { FaHome } from "react-icons/fa";
import swiftTransportLogo from "../../images/swift-transport-logo.png";
import "./Navbar.scss"
function BasicExample() {
  return (
    <>
      <Navbar bg="" expand="lg" className="navbar--Header">
        <Container className="py-1">
            <NavLink className="nav-link" to={Navigate.HOME}>
              <img
                src={swiftTransportLogo}
                width="110"
                height="80"
                className="d-inline-block align-top me-5"
                alt="React Bootstrap logo"
              />
            </NavLink>
        </Container>
      </Navbar>

      <Navbar bg="light" expand="lg" className="navbar">
        <Container>
          <span className="navbar-brand">
            <NavLink className="nav-link" to={Navigate.HOME}>
              <FaHome className="me-5" color="black" size={20} />
            </NavLink>
          </span>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink className="nav-link me-2" to={Navigate.USER_MANAGEMENT}>
                User Management
              </NavLink>
              <NavLink className="nav-link" to={Navigate.MANUAL_RUNSHEET}>
                Manual Runsheet
              </NavLink>
              <NavLink className="nav-link" to={Navigate.ADMIN}>
                Admin
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default BasicExample;
