import { Navbar } from "react-bootstrap";
import { ReactComponent as Logo } from "assets/images/header-logo.svg";
import "./styles.scss";

export const Header: React.FC = () => {
  return (
    <Navbar sticky="top" bg="dark" className="navbar-container">
      <Logo className="logo" />
    </Navbar>
  );
};
