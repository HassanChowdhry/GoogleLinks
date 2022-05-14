import './Nav.css'; 

function Nav() {

  const onClickHandler = () => {console.log('clicked')};

  return (
    <div className='navbar'>
      
      <h3> GoogleLinks </h3>

      <button onClick={onClickHandler}> Contact Me </button>
      
    </div>
  )
};

export default Nav;