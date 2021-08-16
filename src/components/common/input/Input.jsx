import React, { useState } from 'react';
import Loader from '../loader/Loader';
import './input.css';

const LoaderStyles = {
  top: '50%',
  right: '10px',
  width: '15px',
  height: '15px',
  transform: 'translateY(-50%)'
}

function Input(props) {
  const [focus, setFocus] = useState('');
  const [inputValue, setInputValue] = useState('');

  function getInputValue(e) {
    setInputValue(e.target.value);
  }

  function focusInput(isFocused) {
    !isFocused && inputValue === '' ? setFocus('') : setFocus('focused');
  }

  return(
    <form className={focus}>
      <input type="text" value={inputValue} name={props.name} onFocus={() => focusInput(true)} onBlur={() => focusInput(false)} onChange={e => getInputValue(e)} />
      <div className="placeholder">{props.placeholder}</div>
      {inputValue !== '' && <Loader styles={LoaderStyles} />}
    </form>
  );
}

export default Input;