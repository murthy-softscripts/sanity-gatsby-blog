import React, { useState, useEffect, useRef, Suspense } from 'react';
import '../types/types';

import './carousel.scss';

import logo from '../assets/svg/WWZ_logos_primary.svg';
import leftArrow from '../assets/svg/left-arrow.svg';
import rightArrow from '../assets/svg/right-arrow.svg';
import downArrow from '../assets/svg/down-arrow.svg';
import { imageUrlFor } from '../lib/image-url';
// import { globe } from './globe';
import { globe } from './globe-baked';
import { Globe } from './globe';

interface IProps {
  people: IPerson[];
}

export default ({ people }: IProps) => {
  const delay = 5000;

  const [fadeOutIntro, setfadeOutIntro] = useState(false);
  const [showGlobe, setShowGlobe] = useState(true);

  const [images, setImages] = useState([0, 1, 2]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const [index, setIndex] = useState(2);
  const indexRef = useRef(index);
  indexRef.current = index;

  const [lastIndex, setLastIndex] = useState(-1);
  const lastIndexRef = useRef(lastIndex);
  lastIndexRef.current = index;

  const [lastChange, setLastChange] = useState(new Date().valueOf());
  const lastChangeRef = useRef(lastChange);
  lastChangeRef.current = lastChange;
  let loopTimer = null;

  const nextImage = () => {
    const newIndex = (indexRef.current + 1) % people.length;

    const newImages = imagesRef.current.concat([newIndex]);
    setImages(newImages);

    setLastIndex(indexRef.current);
    setIndex(newIndex);
    setLastChange(new Date().valueOf());
  };
  const previousImage = () => {
    const newIndex =
      indexRef.current > 0 ? indexRef.current - 1 : people.length - 1;

    const newImages = imagesRef.current.concat([newIndex]);
    setImages(newImages);

    setLastIndex(indexRef.current);
    setIndex(newIndex);
    setLastChange(new Date().valueOf());
  };

  const imageLoop = () => {
    loopTimer = setTimeout(() => {
      if (new Date().valueOf() - lastChangeRef.current > delay - 1) {
        nextImage();
      }
      imageLoop();
    }, delay);
  };

  const scrollDown = () => {
    window.scroll(0, window.innerHeight - 100);
  };

  const onGlobeReady = () => {
    setTimeout(() => {
      setfadeOutIntro(true);
      imageLoop();
      setTimeout(() => setShowGlobe(false), 1000);
    }, 4000);
  };

  return (
    <div className="carousel--wrapper">
      <div className="carousel--main">
        <div className="carousel--main--center--crop">
          {images.map(
            (imgIndex, i) =>
              i > images.length - 3 && (
                <img
                  key={i}
                  className={`carousel--main--image carousel--main--image--fade-${
                    i === images.length - 1 ? 'in' : 'out'
                  }`}
                  src={imageUrlFor(people[imgIndex].image.asset.url)
                    .width(600)
                    .height(600)
                    .format('jpg')
                    .url()}
                  alt={`${people[imgIndex].firstName} ${people[imgIndex].lastName}`}
                />
              ),
          )}
        </div>
        <div
          className={`carousel--intro ${
            fadeOutIntro ? 'carousel--intro-fade-out' : ''
          }`}
        >
          <div className="carousel--intro--bg">
            {showGlobe && <Globe onReady={onGlobeReady} />}
            {/* <img src={globe} alt="globe" /> */}
          </div>
        </div>
        <div className="carousel--main--center--crop">
          <div className="carousel--left--overlay"></div>
        </div>
        <div
          className="carousel--left"
          style={{ backgroundImage: `url(${logo})` }}
        >
          <span className="carousel--title">Join us</span>
          <button
            className="carousel--button carousel--button--left"
            style={{ backgroundImage: `url(${leftArrow})` }}
            onClick={previousImage}
            aria-label="Previous Image"
          ></button>
        </div>
        <div className="carousel--right">
          <button
            className="carousel--button carousel--button--right"
            style={{ backgroundImage: `url(${rightArrow})` }}
            onClick={nextImage}
            aria-label="next image"
          ></button>
        </div>
        <button
          className="carousel--button carousel--button--down"
          style={{ backgroundImage: `url(${downArrow})` }}
          onClick={scrollDown}
          aria-label="scroll down"
        ></button>
      </div>
      <div
        className="carousel--logo--mobile"
        style={{ backgroundImage: `url(${logo})` }}
      ></div>
    </div>
  );
};
