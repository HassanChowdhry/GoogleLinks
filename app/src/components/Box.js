import Form from './Form';
import './Box.css'; 

function Box() {

  return (  
    <div className='box'>

      <h3> GoogleLinks </h3>
      
      <p>Create an excel sheet by entering  a query and the number of  entries you need in the excel sheet </p>

      <Form />

    </div>
  )
};

export default Box;