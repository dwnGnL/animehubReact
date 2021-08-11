import React, { useState, useEffect, useRef } from "react";
import Slider from "../components/slider/Slider";
import Header from "../components/header/Header";

function Layout() {
  const wrapper = useRef();
  const [images, setImages] = useState([]);
  const [device, setDevice] = useState('');

  useEffect(() => {
    let wrapperWidth = wrapper.current.offsetWidth;

    if (wrapperWidth <= 850 && wrapperWidth > 500) {
      setDevice('tablet');
    } else if (wrapperWidth <= 500) {
      setDevice('mobile');
    } else {
      setDevice('desktop');
    };
  }, [device]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/1")
      .then((response) => response.json())
      .then((request) => {
        setImages(request.films);
      });
  }, []);

  return (
    <div className="wrapper" ref={wrapper} data-device={device}>
      <Header device={device} />
      {images.length !== 0 ? <Slider allImages={images} /> : null}
    </div>
  );
}

export default Layout;
