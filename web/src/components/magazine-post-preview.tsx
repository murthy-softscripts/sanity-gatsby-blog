import '../types/types';
import BaseBlockContent from '@sanity/block-content-to-react';
import { Link } from 'gatsby';
import React from 'react';
import { getImageUrlForAsset, getMagazineUrl } from '../lib/helpers';
import LazyLoad from 'react-lazy-load';

import './magazine-post-preview.scss';
import { Authors } from './authors';

interface IProps extends IMagazinePost {
  previewType: 'small' | 'medium' | 'large' | 'banner';
  orientation?: 'left' | 'right';
  delay: number;
}

const serializers = {
  types: {
    block(props: IProps) {
      switch (props.node.style) {
        default:
          return (
            <p>
              {props.children.map((s, i, array) => {
                if (i == array.length - 1) {
                  return s.replace(/\.?\W*$/, '...');
                } else {
                  return s;
                }
              })}
            </p>
          );
      }
    },
  },
};

const MagazinePostPreviewAuthors = ({ authors }) => {
  return (
    <div className="magazine-post-preview--author">
      {authors?.length > 0 && (
        <>
          {`by `}
          <strong>
            <Authors authors={authors} />
          </strong>
        </>
      )}
    </div>
  );
};

const MagazinePostReadMore = ({ url }) => {
  return (
    <Link className="magazine-post-preview--link link-passthrough" to={url}>
      Read More
    </Link>
  );
};

export function MagazinePostBannerPreview(props) {
  let url = getMagazineUrl(props.publishedAt, props.slug.current);
  let imageUrl = getImageUrlForAsset(props.mainImage, 1000);

  return (
    <div className={`magazine-post-preview banner`}>
      <Link
        to={url}
        className={`magazine-post-preview--banner--bg link-passthrough ${props.className}`}
        style={{
          backgroundImage: `url(${imageUrl})`,
        }}
      ></Link>

      <Link
        className={'magazine-post-preview--category link-passthrough'}
        to={url}
      >
        FEATURED
      </Link>

      <Link
        className={'magazine-post-preview--title link-passthrough'}
        to={url}
      >
        {props.title}
      </Link>

      <MagazinePostPreviewAuthors authors={props.authors} />

      <MagazinePostReadMore url={url} />
    </div>
  );
}

export function MagazinePostLargePreview(props) {
  let url = getMagazineUrl(props.publishedAt, props.slug.current);
  let imageUrl = getImageUrlForAsset(props.mainImage, 800);
  const excerpt = props._rawExcerpt || props._rawBody;

  return (
    <div
      className={`magazine-post-preview large ${props.className} ${
        props.orientation == 'right' ? '' : 'reversed'
      }`}
    >
      <Link
        className={`magazine-post-preview--leadMediaThumb link-passthrough ${props.className}`}
        to={url}
      >
        {imageUrl && (
          <LazyLoad debounce={false} throttle={props.delay} offsetTop={10}>
            <img src={imageUrl} alt={props.mainImage.alt || props.title} />
          </LazyLoad>
        )}
      </Link>

      <Link
        to={url}
        className="magazine-post-preview--text-group link-passthrough"
      >
        <div
          className={'magazine-post-preview magazine-post-preview--category'}
        >
          {props.categories.map((category) => (
            <Link
              className="link-passthrough"
              key={category._id}
              to={`magazine/category/${category.slug?.current}`}
            >
              {props.categories.length > 0 && category.title.toUpperCase()}
            </Link>
          ))}
        </div>
        <span className={'magazine-post-preview--title'}>{props.title}</span>

        <MagazinePostPreviewAuthors authors={props.authors} />

        <span className={'magazine-post-preview--excerpt'}>
          <BaseBlockContent blocks={excerpt || []} serializers={serializers} />
          <MagazinePostReadMore url={url} />
        </span>
      </Link>
    </div>
  );
}

export function MagazinePostMediumPreview(props) {
  let url = getMagazineUrl(props.publishedAt, props.slug.current);
  let imageUrl = getImageUrlForAsset(props.mainImage, 500);

  return (
    <div
      key={props.id}
      className={`magazine-post-preview medium ${props.className}`}
    >
      <Link
        className={'magazine-post-preview--leadMediaThumb link-passthrough'}
        to={url}
      >
        {imageUrl && (
          <LazyLoad debounce={false} throttle={props.delay} offsetTop={10}>
            <img src={imageUrl} alt={props.mainImage.alt || props.title} />
          </LazyLoad>
        )}
      </Link>

      <div className={'magazine-post-preview--category'}>
        {props.categories.map((category) => (
          <Link
            className="link-passthrough"
            key={category._id}
            to={`magazine/category/${category.slug?.current}`}
          >
            {props.categories.length > 0 && category.title.toUpperCase()}
          </Link>
        ))}
      </div>
      <Link
        className={'magazine-post-preview--title link-passthrough'}
        to={url}
      >
        {props.title}
      </Link>

      <MagazinePostPreviewAuthors authors={props.authors} />
    </div>
  );
}

export function MagazinePostSmallPreview(props) {
  let url = getMagazineUrl(props.publishedAt, props.slug.current);

  return (
    <div className={`magazine-post-preview small ${props.className}`}>
      <Link
        className={'magazine-post-preview--title link-passthrough'}
        to={url}
      >
        {props.title}
      </Link>

      <MagazinePostPreviewAuthors authors={props.authors} />
    </div>
  );
}
