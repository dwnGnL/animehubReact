import React, { useEffect, useState } from 'react';
import './Slider.css'


function Slider() {
  const [direction, setDirection] = useState('');
  const [images, setImages] = useState(['', '', '']);
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/1')
      .then(response => response.json())
      .then(request => {
        setSliderImages(request.films)
        setImages([request.films[request.films.length - 1], request.films[0], request.films[1]])
      });
  }, [])


  let letChangeDirection = true;

  function toLeftSlide() {
    if (!letChangeDirection) return;
    letChangeDirection = false;

    setDirection('left-direction');

    setTimeout(() => {
      letChangeDirection = true;
      getCurrentSlide('left');
      setDirection('');
    }, 700);
  }

  function toRightSlide() {
    if (!letChangeDirection) return;
    letChangeDirection = false;

    setDirection('right-direction');

    setTimeout(() => {
      letChangeDirection = true;
      getCurrentSlide('right');
      setDirection('');
    }, 700);
  }


  function getCurrentSlide(choosedDirection) {
    let currentSlide = sliderImages.indexOf(images[1]);
    let prevSlide;
    let nextSlide;

    if (choosedDirection === 'right') currentSlide >= sliderImages.length - 1 ? currentSlide = 0 : currentSlide += 1;
    if (choosedDirection === 'left') currentSlide <= 0 ? currentSlide = sliderImages.length - 1 : currentSlide -= 1;
    
    currentSlide <= 0 ? prevSlide = sliderImages.length - 1 : prevSlide = currentSlide - 1;
    currentSlide >= sliderImages.length - 1 ? nextSlide = 0 : nextSlide = currentSlide + 1;

    setImages([sliderImages[prevSlide], sliderImages[currentSlide], sliderImages[nextSlide]]);
  }

  return (
    <div className="slider">
      <div className="slider__button to-left" onClick={toLeftSlide}>left</div>
      <div className="slider__button to-right" onClick={toRightSlide}>right</div>

      <div className={`slider__container ${direction}`}>
        <div className="slider__item slider__item-0">{images[0]}</div>
        <div className="slider__item slider__item-1">{images[1]}</div>
        <div className="slider__item slider__item-2">{images[2]}</div>
      </div>
    </div>
  )
}

export default Slider;