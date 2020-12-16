import React, { useEffect, useState } from 'react';
import './Slider.css'


function Slider() {
  const delay = 700;
  const [direction, setDirection] = useState('');
  const [images, setImages] = useState(['', '', '']);
  const [sliderImages, setSliderImages] = useState([]);
  const [sliderBackgroundPart, setSliderBackgroundPart] = useState(0);
  const [sliderBackgroundClass, setSliderBackgroundClass] = useState('part_0');
  const [changeDirection, setChangeDirection] = useState(true);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/1')
      .then(response => response.json())
      .then(request => {
        setSliderImages(request.films)
        setImages([request.films[request.films.length - 1], request.films[0], request.films[1]])
      });
  }, [])


  function toLeftSlide() {
    if (!changeDirection) return;
    setChangeDirection(false);

    setDirection('left-direction');
    moveBackgroundSlider('left');

    setTimeout(() => {
      setChangeDirection(true)
      getCurrentSlide('left');
      setDirection('');
    }, delay);
  }

  function toRightSlide() {
    if (!changeDirection) return;
    setChangeDirection(false);

    setDirection('right-direction');
    moveBackgroundSlider('right');

    setTimeout(() => {
      setChangeDirection(true)
      getCurrentSlide('right');
      setDirection('');
    }, delay);
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

  function moveBackgroundSlider(choosedDirection) {
    let movingPart = sliderBackgroundPart;

    if (choosedDirection === 'right') {
      movingPart++;

      if (movingPart >= 3) {
        setTimeout(() => {
          movingPart = 0
          setSliderBackgroundClass(`part_${0}`)
          setSliderBackgroundPart(0)
        }, delay);
      }
    }

    if (choosedDirection === 'left') {
      movingPart--;

      if (movingPart <= -3) {
        setTimeout(() => {
          movingPart = 0
          setSliderBackgroundClass(`part_${0}`)
          setSliderBackgroundPart(0)
        }, delay);
      }
    }

    setSliderBackgroundClass(`part_${movingPart} animated`)
    setSliderBackgroundPart(movingPart)
  }
  

  return (
    <div className="slider">
      <div className="slider__button to-left" onClick={toLeftSlide}>left</div>
      <div className="slider__button to-right" onClick={toRightSlide}>right</div>

      <div className={`slider__background ${direction} ${sliderBackgroundClass}`}></div>

      <div className={`slider__container ${direction}`}>
        <div className="slider__item slider__item-0">{images[0]}</div>
        <div className="slider__item slider__item-1">{images[1]}</div>
        <div className="slider__item slider__item-2">{images[2]}</div>
      </div>
    </div>
  )
}

export default Slider;