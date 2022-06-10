import "./Button.css";

function Button({ onClick, className, children }) {
  return (
    <button onClick={onClick} className={`btn ${className} `}>
      {children}
    </button>
  );
}

export default Button;
