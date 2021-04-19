import React from 'react';
import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';
import LazyLoad from 'react-lazy-load';
import BaseBlockContent from '@sanity/block-content-to-react';
import './photo.scss';

interface IProps {
  image: any;
  align: 'center' | 'left' | 'right';
  title: string;
  description: any;
}

function Photo(props: IProps) {
  const imageUrl = imageUrlFor(buildImageObj(props.image)).width(1200).url();
  console.log(props);
  return (
    <>
      <div className={`photo--root photo--${props.align || 'center'}`}>
        {props.image && (
          <LazyLoad debounce={false} throttle={10} offsetTop={-100}>
            <img src={imageUrl} alt={props.title} />
          </LazyLoad>
        )}
        <div className="photo--caption--div">
          <span className={'photo--caption'}>
            {(props.description && (
              <BaseBlockContent blocks={props.description} />
            )) ||
              props.title}
          </span>
        </div>
      </div>
    </>
  );
}

export default Photo;
