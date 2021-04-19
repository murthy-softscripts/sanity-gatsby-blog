import React from 'react';
import { buildImageObj, getFileUrl } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import LazyLoad from 'react-lazy-load';
import './figure.scss';

interface IProps {
  image: any;
  align: 'center' | 'left' | 'right';
  title: string;
  caption: string;
}

function IconBlock(props: IProps) {
  const imageAnimated =
    props.imageAnimated?.asset && getFileUrl(props.imageAnimated?.asset);
  const image = imageUrlFor(buildImageObj(props.image))
    // .width(1200)
    .url();
  return (
    <figure
      className={
        'block-content--root' +
        (props.align === 'right'
          ? ' block-content--right'
          : ' block-content--left')
      }
    >
      {image && (
        <LazyLoad debounce={false} throttle={10} offsetTop={-100}>
          <>
            {imageAnimated && <img src={imageAnimated} alt={props.title} />}
            {image && !imageAnimated && <img src={image} alt={props.title} />}
          </>
        </LazyLoad>
      )}
      <figcaption className={'block-content--caption'}>
        {props.caption}
      </figcaption>
    </figure>
  );
}

export default IconBlock;
