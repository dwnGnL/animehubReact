import React, { useEffect, useState, useCallback, useRef } from 'react';
import { SLiderArrow } from '../common/Icons';
import Loader from '../common/loader/Loader';
import './Slider.css';

const delay = {
  animationDelay: 700,
  autorotateDelay: 5000,
};

const LoaderStyles = {
  top: '50%',
  left: '50%',
  width: '50px',
  height: '50px',
  transform: 'translate(-50%, -50%)'
}


function Slider() {
  const [sliderImages, setSliderImages] = useState([]);

  useEffect(() => {
    fetch('https://swapi.dev/api/people/1')
      .then((response) => response.json())
      .then((request) => {
        setSliderImages(request.films);
      });
  }, []);

  return (
    <div className="slider_wrapper">
      {sliderImages.length !== 0 ? <SliderInner allImages={sliderImages} /> : <Loader styles={LoaderStyles} />}
    </div>
  );
}

function SliderInner({ allImages }) {
  // common
  const slider = useRef();
  const [direction, setDirection] = useState('');
  const imagesRef = useRef([allImages[allImages.length - 1], allImages[0], allImages[1]]);
  const isAllowSlidingRef = useRef(true);
  const slContainer = useRef();
  const movementSizeOnSwipeRef = useRef(0);
  const timer = useRef();

  // bg
  const background = useRef();
  const bgClassRef = useRef('');
  const bgPositionPart = useRef('bg_part-0');
  const backgroundTransform = useRef(0);
  const backgroundMovementPartRef = useRef(0);
  
  // mobile only
  const [sliderClass, setSliderClass] = useState('');
  const coordinatesRef = useRef({ start: 0, end: 0 })

  const showCurrentSlide = useCallback((chosenDirection) => {
    let currentSlide = allImages.indexOf(imagesRef.current[1]);
    let prevSlide, nextSlide;

    if (chosenDirection === 'right-direction') currentSlide >= allImages.length - 1 ? currentSlide = 0 : currentSlide += 1;
    if (chosenDirection === 'left-direction') currentSlide <= 0 ? currentSlide = allImages.length - 1 : currentSlide -= 1;

    currentSlide <= 0 ? prevSlide = allImages.length - 1 : prevSlide = currentSlide - 1;
    currentSlide >= allImages.length - 1 ? nextSlide = 0 : nextSlide = currentSlide + 1;

    imagesRef.current = [allImages[prevSlide], allImages[currentSlide], allImages[nextSlide]];
  }, [allImages]);

  const moveBackgroundSlider = useCallback((chosenDirection) => {
    if (chosenDirection === 'right-direction') backgroundMovementPartRef.current++;
    if (chosenDirection === 'left-direction') backgroundMovementPartRef.current--;

    if (backgroundMovementPartRef.current >= 3 || backgroundMovementPartRef.current <= -3) {
      setTimeout(() => {
        bgClassRef.current = 'disabledAnim';
        backgroundMovementPartRef.current = 0;
        bgPositionPart.current = `bg_part-${0}`;
      }, delay.animationDelay);
    }
    
    bgPositionPart.current = `bg_part-${backgroundMovementPartRef.current}`;
    bgClassRef.current = '';
  }, []);

  const moveSlide = useCallback((direction, obligatoryAllow = false) => {
    if (!isAllowSlidingRef.current && !obligatoryAllow) return;
    clearTimeout(timer.current);

    isAllowSlidingRef.current = false;
    
    moveBackgroundSlider(direction);
    setDirection(direction);

    setTimeout(() => {
      showCurrentSlide(direction);
      setDirection('');
      isAllowSlidingRef.current = true;
      timer.current = setTimeout(() => moveSlide('right-direction'), delay.autorotateDelay);
    }, delay.animationDelay);
  }, [moveBackgroundSlider, showCurrentSlide]);


  const touchSliding = useCallback((e) => {
    let newCoordinates = e.changedTouches[0].clientX;
    
    if (e.type === 'touchstart') {
      isAllowSlidingRef.current = false;
      coordinatesRef.current.start = newCoordinates;
    };

    if (e.type === 'touchmove') {
      coordinatesRef.current.end = newCoordinates;
      
      if (coordinatesRef.current.end === 0) return;

      movementSizeOnSwipeRef.current = coordinatesRef.current.end - coordinatesRef.current.start;
      backgroundTransform.current = ((coordinatesRef.current.end - coordinatesRef.current.start) / 3);
      background.current.style.transform = `translateX(calc(${-backgroundMovementPartRef.current * 11.1}% + ${backgroundTransform.current}px))`;
      slContainer.current.style.transform = `translateX(${movementSizeOnSwipeRef.current}px)`;

      setSliderClass('sliding');
    }

    if (e.type === 'touchend') {
      isAllowSlidingRef.current = true;
      if (movementSizeOnSwipeRef.current <= -slider.current.offsetWidth / 4) moveSlide('right-direction', true);
      if (movementSizeOnSwipeRef.current >= slider.current.offsetWidth / 4) moveSlide('left-direction', true);
      
      coordinatesRef.current.start = 0;
      coordinatesRef.current.end = 0;
      
      setSliderClass('');
      movementSizeOnSwipeRef.current = 0;
      slContainer.current.style.transform = `translateX(0)`;
    }
  }, [moveSlide]);

  useEffect(() => {
    timer.current = setTimeout(() => moveSlide('right-direction'), delay.autorotateDelay);
  }, [moveSlide]);


  return (
    <div className={`slider ${sliderClass}`} ref={slider}>
      <div className="slider__button to-left" onClick={() => moveSlide('left-direction')}>
        <SLiderArrow />
      </div>
      <div className="slider__button to-right" onClick={() => moveSlide('right-direction')}>
        <SLiderArrow />
      </div>

      <div ref={background} className={`slider__background ${direction} ${bgClassRef.current} ${bgPositionPart.current}`}></div>

      <div ref={slContainer} className={`slider__container ${direction}`} onTouchStart={touchSliding} onTouchMove={touchSliding} onTouchEnd={touchSliding}>
        <div className="slider__item slider__item-0">{imagesRef.current[0]}</div>
        <div className="slider__item slider__item-1">{imagesRef.current[1]}</div>
        <div className="slider__item slider__item-2">{imagesRef.current[2]}</div>
      </div>
    </div>
  );
}

export default Slider;