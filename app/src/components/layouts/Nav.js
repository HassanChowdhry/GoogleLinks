import Button from "../UI/Button";
import "./Nav.css";

function Nav() {
  const onClickHandler = () => {
    window.open("mailto:mohammedchowdhry11@gmail.com");
  };

  return (
    <div className="navbar">
      <h3>GoogleLinks</h3>

      <Button className="button" onClick={onClickHandler}>
        Contact Me
      </Button>
    </div>
  );
}

export default Nav;
