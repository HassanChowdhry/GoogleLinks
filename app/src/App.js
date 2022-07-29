import { Route, Redirect } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Box from "./components/layout/Box";
import ContactForm from "./components/form/ContactForm";

function App() {
  return (
    <>
      <Route path="/" exact>
        <Redirect to="/home" />
      </Route>

      <Route path="/home">
        <Nav buttonName="Contact Me" buttonPath="/contact" />
        <Box />
      </Route>

      <Route path="/contact">
        <Nav buttonName="Home" buttonPath="/home" />
        <ContactForm />
      </Route>
    </>
  );
}

export default App;
