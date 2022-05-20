import { Fragment } from 'react'
import { Route } from 'react-router-dom'
import Nav from './components/Nav'
import Box from './components/Box';
import ContactForm from './components/ContactForm';


//! make contact page
function App() {
  return (
    <Fragment>

    <Route path='/'>  
      <Nav />

      <Box />
    </Route>

    <Route path='/contact-form'>
      <ContactForm />
    </Route>
    
    </Fragment>
  );
}

export default App;
