import './Button.css'; 

function Button(props) {
  return (
    <button onClick={props.onClick} className='btn'>
      {props.children}
    </button>
  )
};

export default Button;