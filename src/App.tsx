import { BrowserRouter } from "react-router-dom";
import { Routes } from "./routes";
import { Layout } from "./layout";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  );
}

export default App;
