import { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import Nav from "./components/Layout/Nav";
import Box from "./components/Layout/Box";
import ContactForm from "./components/Forms/ContactForm";

//! make contact page
function App() {
  return (
    <Fragment>

      <Route path='/' exact>
        <Redirect to='/home'/>
      </Route>  

      <Route path='/home'>  
        <Nav buttonName='Contact Me' buttonPath='/contact'/>
        <Box/>
      </Route>

      <Route path='/contact'>
        <Nav buttonName='Home' buttonPath='/home'/>
        <ContactForm/>
      </Route>
    </Fragment>
  );
}

export default App;
