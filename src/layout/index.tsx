import { NomineeContext } from "context/nominee";
import { NomineeModel } from "models/Nominee";
import { useMemo, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { Header } from "./Header";
import "./styles.scss";

export const Layout: React.FC = ({ children }) => {
  const [nominees, setNominees] = useState<NomineeModel[]>([]);
  const nomineeContextManager = useMemo(
    () => ({ nominees, setNominees }),
    [nominees, setNominees]
  );
  
  return (
    <Container fluid className="layout-container">
      <Row>
        <Header />
      </Row>
      <NomineeContext.Provider value={nomineeContextManager}>
        <Row className="page-wrapper">{children}</Row>
      </NomineeContext.Provider>
    </Container>
  );
};
