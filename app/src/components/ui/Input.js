import React from 'react';
import './Input.css'; 

const Input = React.forwardRef(({ label, input }, ref) => {
  return (
    <div>
        <label className='label' htmlFor={input.id}> {label} </label>
        <input className='input' ref={ref} {...input} />
    </div>
  )
});

export default Input;