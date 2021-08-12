import React, { useEffect, useState } from 'react';
import Slider from '../components/slider/Slider';

function Main() {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetch("https://swapi.dev/api/people/1")
      .then((response) => response.json())
      .then((request) => {
        setSliderImages(request.films);
      });
  }, []);

  return (
    <>
      {sliderImages.length !== 0 ? <Slider allImages={sliderImages} /> : null}
    </>
  );
}

export default Main;