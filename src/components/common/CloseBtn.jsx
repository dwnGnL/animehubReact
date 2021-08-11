import React from 'react';

export default function CloseBtn(props) {
  return (
    <div className="close-btn" onClick={props.closeFn}>
      <svg viewBox="0,0 45,45" style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', padding: '25%'}}>
        <path strokeWidth={props.width} fill="none" stroke={props.color} d="M0 0 L45 45 M0 45 L45 0" />
      </svg>
    </div>
  )
}
