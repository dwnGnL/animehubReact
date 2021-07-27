import React, { useEffect, useState } from 'react';
import './slider.css'


function Slider({ allImages }) {
  const delay = 700;
  const autorotateDelay = 5000;
  const [direction, setDirection] = useState('');
  const [images, setImages] = useState([allImages[allImages.length - 1], allImages[0], allImages[1]]);
  const [sliderBackgroundPart, setSliderBackgroundPart] = useState(0);
  const [sliderBackgroundClass, setSliderBackgroundClass] = useState('part_0');
  const [changeDirection, setChangeDirection] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => moveSlide('right-direction'), autorotateDelay);
    return () => clearInterval(interval)
  }, [moveSlide])


  function moveSlide(direction) {
    if (!changeDirection) return;
    setChangeDirection(false);

    setDirection(direction);
    moveBackgroundSlider(direction);

    setTimeout(() => {
      setChangeDirection(true)
      showCurrentSlide(direction);
      setDirection('');
    }, delay);
  }

  function showCurrentSlide(choosedDirection) {
    let currentSlide = allImages.indexOf(images[1]);
    let prevSlide;
    let nextSlide;

    if (choosedDirection === 'right-direction') currentSlide >= allImages.length - 1 ? currentSlide = 0 : currentSlide += 1;
    if (choosedDirection === 'left-direction') currentSlide <= 0 ? currentSlide = allImages.length - 1 : currentSlide -= 1;

    currentSlide <= 0 ? prevSlide = allImages.length - 1 : prevSlide = currentSlide - 1;
    currentSlide >= allImages.length - 1 ? nextSlide = 0 : nextSlide = currentSlide + 1;

    setImages([allImages[prevSlide], allImages[currentSlide], allImages[nextSlide]]);
  }

  function moveBackgroundSlider(choosedDirection) {
    let movingPart = sliderBackgroundPart;

    if (choosedDirection === 'right-direction') {
      movingPart++;

      if (movingPart >= 3) {
        setTimeout(() => {
          movingPart = 0
          setSliderBackgroundClass(`part_${0}`)
          setSliderBackgroundPart(0)
        }, delay);
      }
    }

    if (choosedDirection === 'left-direction') {
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
      <div className="slider__button to-left" onClick={() => moveSlide('left-direction')}>left</div>
      <div className="slider__button to-right" onClick={() => moveSlide('right-direction')}>right</div>

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