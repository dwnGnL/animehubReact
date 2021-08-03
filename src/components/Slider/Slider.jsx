import React, { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import "./slider.css";

function Slider({ allImages }) {
  const delay = useMemo(() => {
    return {
      animationDelay: 700,
      autorotateDelay: 5000
    }
  }, []);

  const slider = useRef();

  // states
  const [sliderHeight, setSliderHeight] = useState(0);
  const [direction, setDirection] = useState("");
  const [images, setImages] = useState([allImages[allImages.length - 1], allImages[0], allImages[1]]);
  const [backgroundPosition, setBackgroundPosition] = useState(0);
  const [backgroundClass, setBackgroundClass] = useState("part_0");
  const [allowSliding, setAllowSliding] = useState(true);

  useEffect(() => setSliderHeight(slider.current.offsetWidth/ 2.4), []);

  const showCurrentSlide = useCallback((choosedDirection) => {
    let currentSlide = allImages.indexOf(images[1]);
    let prevSlide;
    let nextSlide;

    if (choosedDirection === "right-direction") currentSlide >= allImages.length - 1 ? (currentSlide = 0) : (currentSlide += 1);
    if (choosedDirection === "left-direction") currentSlide <= 0 ? (currentSlide = allImages.length - 1) : (currentSlide -= 1);

    currentSlide <= 0 ? (prevSlide = allImages.length - 1) : (prevSlide = currentSlide - 1);
    currentSlide >= allImages.length - 1 ? (nextSlide = 0) : (nextSlide = currentSlide + 1);

    setImages([allImages[prevSlide], allImages[currentSlide], allImages[nextSlide]]);
  }, [allImages, images]);

  const moveBackgroundSlider = useCallback((choosedDirection) => {
    let movingPart = backgroundPosition;
    
    choosedDirection === "right-direction" ? movingPart++ : movingPart--;

    if (movingPart >= 3 || movingPart <= -3) {
      setTimeout(() => {
        movingPart = 0;
        setBackgroundClass(`part_${0}`);
        setBackgroundPosition(0);
      }, delay.animationDelay);
    }

    setBackgroundClass(`part_${movingPart} animated`);
    setBackgroundPosition(movingPart);
  }, [backgroundPosition, delay]);

  const moveSlide = useCallback((direction) => {
    if (!allowSliding) return;
    setAllowSliding(false);

    setDirection(direction);
    moveBackgroundSlider(direction);

    setTimeout(() => {
      setAllowSliding(true);
      showCurrentSlide(direction);
      setDirection("");
    }, delay.animationDelay);
  }, [allowSliding, moveBackgroundSlider, showCurrentSlide, delay]);

  useEffect(() => {
    const interval = setInterval(() => moveSlide("right-direction"), delay.autorotateDelay);
    return () => clearInterval(interval);
  }, [moveSlide, delay]);

  return (
    <div className="slider" ref={slider} style={{height: `${sliderHeight}px`}}>
      <div className="slider__button to-left" style={{fontSize: `${sliderHeight/15}px`}} onClick={() => moveSlide("left-direction")}>
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
        </div>
      <div className="slider__button to-right" style={{fontSize: `${sliderHeight/15}px`}} onClick={() => moveSlide("right-direction")}>
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </div>

      <div className={`slider__background ${direction} ${backgroundClass}`}></div>

      <div className={`slider__container ${direction}`}>
        <div className="slider__item slider__item-0">{images[0]}</div>
        <div className="slider__item slider__item-1">{images[1]}</div>
        <div className="slider__item slider__item-2">{images[2]}</div>
      </div>
    </div>
  );
}

export default Slider;