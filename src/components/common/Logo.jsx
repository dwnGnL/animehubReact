import React from "react";
import LogoImg from "../../assets/logo.png";

function AnimehubLogo() {
  return <div className="logo" style={{background: `url(${LogoImg}) center no-repeat`, backgroundSize: 'contain'}} />
}

export default AnimehubLogo;