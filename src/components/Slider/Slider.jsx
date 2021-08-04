import React, { useEffect, useState, useCallback, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import "./slider.css";

const delay = {
  animationDelay: 700,
  autorotateDelay: 5000
};

function Slider({ allImages }) {
  const slider = useRef();
  const [sliderHeight, setSliderHeight] = useState(0);
  const [direction, setDirection] = useState('');
  const [images, setImages] = useState([allImages[allImages.length - 1], allImages[0], allImages[1]]);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState('');
  const [allowSliding, setAllowSliding] = useState(true);
  const [sliderClass, setSliderClass] = useState('');
  const [moveSize, setMoveSize] = useState(0);
  const [transformBackground, setTransformBackground] = useState(0);
  const [currentBgPosition, setCurrentBgPosition] = useState(0);
  const [coordinates, setCoordinat] = useState({
    start: 0,
    end: 0
  });


  useEffect(() => {setSliderHeight(slider.current.offsetWidth/ 2.4)}, []);

  const showCurrentSlide = useCallback((choosedDirection) => {
    let currentSlide = allImages.indexOf(images[1]);
    let prevSlide, nextSlide;

    if (choosedDirection === "right-direction") currentSlide >= allImages.length - 1 ? (currentSlide = 0) : (currentSlide += 1);
    if (choosedDirection === "left-direction") currentSlide <= 0 ? (currentSlide = allImages.length - 1) : (currentSlide -= 1);

    currentSlide <= 0 ? (prevSlide = allImages.length - 1) : (prevSlide = currentSlide - 1);
    currentSlide >= allImages.length - 1 ? (nextSlide = 0) : (nextSlide = currentSlide + 1);

    setImages([allImages[prevSlide], allImages[currentSlide], allImages[nextSlide]]);
  }, [allImages, images]);


  const moveBackgroundSlider = useCallback((choosedDirection) => {
    const width = slider.current.offsetWidth;
    let movingPart = backgroundPosition;
    
    choosedDirection === "right-direction" ? movingPart++ : movingPart--;

    if (movingPart >= 3 || movingPart <= -3) {
      setTimeout(() => {
        movingPart = 0;
        setBackgroundPosition(0);
        setTransformBackground(0)
      }, delay.animationDelay);
    }

    setBackgroundClass('animated');
    setBackgroundPosition(movingPart);
    setTransformBackground(((width / 100) * (11.1 * movingPart)) * -3);
    setTimeout(() => setBackgroundClass(''), delay.animationDelay);
  }, [backgroundPosition]);


  const moveSlide = useCallback((direction, obligatoryAllow = false) => {
    if (!allowSliding && !obligatoryAllow) return;
    setAllowSliding(false);

    setDirection(direction);
    moveBackgroundSlider(direction);

    setTimeout(() => {
      setAllowSliding(true);
      showCurrentSlide(direction);
      setDirection("");
    }, delay.animationDelay);
  }, [allowSliding, moveBackgroundSlider, showCurrentSlide]);


  function touchSliding(e) {
    let newCoordinates = e.changedTouches[0].clientX;
    
    if (e.type === 'touchstart') {
      setAllowSliding(false);
      setCoordinat({ start: newCoordinates, end: coordinates.end });
    };

    if (e.type === 'touchmove') {
      setCoordinat({
        start: coordinates.start,
        end: newCoordinates
      });

      if (coordinates.end === 0) return;
      setMoveSize(coordinates.end - coordinates.start);
      setTransformBackground(((coordinates.end - coordinates.start) / 3) + currentBgPosition);
    }

    if (e.type === 'touchend') {
      setAllowSliding(true);
      if (moveSize <= -slider.current.offsetWidth / 4) moveSlide("right-direction", true);
      if (moveSize >= slider.current.offsetWidth / 4) moveSlide("left-direction", true);
      
      if (moveSize >= -slider.current.offsetWidth / 4 && moveSize <= slider.current.offsetWidth / 4) {
        setTransformBackground(currentBgPosition);
        setSliderClass('sliding');
        setTimeout(() => setSliderClass(''), 200);
      }

      setCoordinat({ start: 0, end: 0 });
      setMoveSize(0);
    }
  }

  useEffect(() => {
    const interval = setInterval(() => moveSlide("right-direction"), delay.autorotateDelay);
    return () => clearInterval(interval);
  }, [moveSlide]);

  useEffect(() => setCurrentBgPosition(transformBackground), [moveSlide]);


  return (
    <div className={`slider ${sliderClass}`} ref={slider} style={{height: `${sliderHeight}px`}}>
      <div className="slider__button to-left" style={{fontSize: `${sliderHeight/15}px`}} onClick={() => moveSlide("left-direction")}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </div>
      <div className="slider__button to-right" style={{fontSize: `${sliderHeight/15}px`}} onClick={() => moveSlide("right-direction")}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </div>

      <div className={`slider__background ${direction} ${backgroundClass}`} style={{transform: `translateX(${transformBackground}px)`}}></div>

      <div className={`slider__container ${direction}`} onTouchStart={touchSliding} onTouchMove={touchSliding} onTouchEnd={touchSliding} style={{transform: `translateX(${moveSize}px)`}}>
        <div className="slider__item slider__item-0">{images[0]}</div>
        <div className="slider__item slider__item-1">{images[1]}</div>
        <div className="slider__item slider__item-2">{images[2]}</div>
      </div>
    </div>
  );
}

export default Slider;