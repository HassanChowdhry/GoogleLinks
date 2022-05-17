import Button from './UI/Button';
import './Nav.css'; 

function Nav() {

  const onClickHandler = () => {console.log('clicked nav')};

  return (
    <div className='navbar'>
      
      <h3> GoogleLinks </h3>

      <Button onClick={onClickHandler}> Contact Me </Button>
      
    </div>
  )
};

export default Nav;