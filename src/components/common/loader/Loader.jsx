import React from "react";
import "./loader.css";

export default function Loader(props) {
  return (
    <div className="loader" style={props.styles}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
