import { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(({ input, className }, ref) => {
  return (
    <div>
      <label className="label" htmlFor={input.id}>
        {input.label}
      </label>
      <input className={`input ${className}`} ref={ref} {...input} />
    </div>
  );
});

export default Input;
