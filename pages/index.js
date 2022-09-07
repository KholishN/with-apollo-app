import App from "../components/App";
import Header from "../components/Header";
import Login from "../components/Login";
import { initializeApollo, addApolloState } from "../lib/apolloClient";

const IndexPage = () => (
  <>
    <Login />
  </>
);

export default IndexPage;
