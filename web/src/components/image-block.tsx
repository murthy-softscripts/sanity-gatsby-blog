import React, { useState, useEffect, useRef } from 'react';

import './image-block.scss';
import BlockText from './block-text';
import LazyLoad from 'react-lazy-load';
import { rangeMap } from '../lib/utils';
interface IProps {
  image: string;
  body: any;
  color?: string;
}

export default ({ image, color, body }: IProps) => {
  const [origin, setOrigin] = useState(0);
  const [outView, setOutView] = useState(0);
  const [scroll, setScroll] = useState(1);
  const blockRef = useRef(null);
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', () => {
      calcBounds();
    });
    window.addEventListener('scroll', () => {
      calcBounds();
      if (origin !== 0) {
        setScroll(window.scrollY);
      }
    });
  }
  const calcBounds = () => {
    if (
      blockRef &&
      blockRef.current &&
      blockRef.current.getBoundingClientRect()
    ) {
      let bodyRect = document.body.getBoundingClientRect(),
        elemRect = blockRef.current.getBoundingClientRect(),
        offset = elemRect.top - bodyRect.top,
        inView = offset - window.innerHeight,
        outView = inView + elemRect.height + window.innerHeight;
      setOrigin(inView);
      setOutView(outView);
    }
  };
  useEffect(() => {
    calcBounds();
  }, []);
  return (
    <div
      ref={blockRef}
      className={
        'image-block--main ' +
        ((color === 'accent' && 'image-block--accent') ||
          (color === 'secondary' && 'image-block--secondary') ||
          'image-block--black')
      }
    >
      <LazyLoad
        debounce={false}
        throttle={0}
        onContentVisible={() => {
          calcBounds();
        }}
      >
        <>
          <div
            className="image-block--bg"
            style={{
              backgroundImage: `url(${image})`,
              top: `-${Math.round(
                Math.min(
                  Math.max(rangeMap(scroll, origin, outView, 0, 100), 0),
                  100,
                ),
              )}%`,
            }}
          ></div>
          <div
            className="image-block--bg-mobile"
            style={{
              backgroundImage: `url(${image})`,
            }}
          ></div>
        </>
      </LazyLoad>
      <LazyLoad debounce={false} throttle={100} offsetTop={-100}>
        <div className="image-block--grid">
          <div className="image-block--grid--item--center">
            <BlockText blocks={body} maxLength={10000} readMoreButton={false} />
          </div>
        </div>
      </LazyLoad>
    </div>
  );
};
