import React from "react";

function Button(props) {
  let className = ' ';
  if (props.componentClassName) {
    className += props.componentClassName;
  } else {
    className = '';
  };

  return <button className={'button' + className}>{props.title}</button>
}

// header-btn

export default Button;