import React from 'react';
import './Input.css'; 

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
        <label className='label' htmlFor={props.input.id}> {props.label} </label>
        <input className='input' ref={ref} {...props.input} />
    </div>
  )
});

export default Input;