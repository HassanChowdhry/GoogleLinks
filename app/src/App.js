import { Route } from "react-router-dom";
import Nav from "./components/layout/Nav";
import Box from "./components/layout/Box";
import ContactForm from "./components/forms/ContactForm";

//! make contact page
function App() {
  return (
    <>
      {/* <Route path='/'>   */}
        <Nav/>
        <Box/>
      {/* </Route> */}

      {/* <Route path='/contact-form'>
        <ContactForm />
      </Route> */}
    </>
  );
}

export default App;
