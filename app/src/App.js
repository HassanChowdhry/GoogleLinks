import { Fragment } from "react";
import { Route } from "react-router-dom";
import Nav from "./components/Layout/Nav";
import Box from "./components/Layout/Box";
import ContactForm from "./components/Forms/ContactForm";

//! make contact page
function App() {
  return (
    <Fragment>
      {/* <Route path='/'>   */}
        <Nav />
        <Box />
      {/* </Route> */}

      {/* <Route path='/contact-form'>
        <ContactForm />
      </Route> */}
    </Fragment>
  );
}

export default App;
