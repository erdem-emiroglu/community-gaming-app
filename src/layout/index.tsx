import { Container, Row } from "react-bootstrap";
import { Header } from "./Header";
import "./styles.scss";

export const Layout: React.FC = ({ children }) => {
  return (
    <Container fluid className="layout-container">
      <Row>
        <Header />
      </Row>
      <Row className="page-wrapper">{children}</Row>
    </Container>
  );
};
