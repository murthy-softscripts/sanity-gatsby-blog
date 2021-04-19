import React from 'react';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import LazyLoad from 'react-lazy-load';
import './figure.scss';

function Figure(props) {
  const image = imageUrlFor(buildImageObj(props.image))
    // .width(1200)
    .url();
  return (
    <figure
      className={
        'block-content--root' +
        (props.isRight ? ' block-content--right' : ' block-content--left')
      }
    >
      {image && (
        <LazyLoad debounce={false} throttle={10} offsetTop={-100}>
          <img src={image} alt={props.title} />
        </LazyLoad>
      )}
      <figcaption className={'block-content--caption'}>
        {props.caption}
      </figcaption>
    </figure>
  );
}

export default Figure;
