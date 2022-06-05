import "./Form.css";

function Form({ children, onSubmit }) {
  return (
    <form className="form" onSubmit={onSubmit}>
      {children}
    </form>
  );
}

export default Form;
