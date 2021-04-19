import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import Figure from './figure';
import Photo from './photo';
import IconBlock from './icon-block';
import Slideshow from './slideshow';
import ImageBlock from '../image-block';
import YouTube from './youtube';
import CtaBlock from '../cta-block';

import { buildImageObj } from '../../lib/helpers';
import { imageUrlFor } from '../../lib/image-url';

const SplitBlockText = ({ isRight, title, body, mobileOnly, desktopOnly }) => (
  <div
    className={`block-content--figure-text 
    ${isRight ? 'block-content--text--left ' : 'block-content--text--right '}
    ${mobileOnly ? 'block-content--mobile-only ' : ' '}
    ${desktopOnly ? 'block-content--desktop-only ' : ''}
    `}
  >
    <div className="block-content--text--container">
      {title && <h1>{title}</h1>}
      {body && body[0] && (
        <BaseBlockContent blocks={body} serializers={serializers} />
      )}
    </div>
  </div>
);

const serializers = {
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark;
      const href = `/${slug.current}`;
      return <a href={href}>{children}</a>;
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark;
      return blank ? (
        <a href={href} target="_blank" rel="noopener">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      );
    },
  },
  types: {
    block(props) {
      switch (props.node.style) {
        case 'h1':
          return <h1>{props.children}</h1>;

        case 'h2':
          return <h2>{props.children}</h2>;

        case 'h3':
          return <h3>{props.children}</h3>;

        case 'h4':
          return <h4>{props.children}</h4>;

        case 'blockquote':
          return <blockquote>{props.children}</blockquote>;
        default:
          return <p>{props.children}</p>;
      }
    },
    figure(props) {
      return (
        <>
          {props.node.isRight && (
            <SplitBlockText
              body={props.node.body}
              isRight={props.node.isRight}
              title={props.node.title}
              mobileOnly={false}
              desktopOnly={true}
            />
          )}
          <Figure {...props.node} />
          <SplitBlockText
            body={props.node.body}
            isRight={props.node.isRight}
            title={props.node.title}
            mobileOnly={props.node.isRight}
            desktopOnly={false}
          />
        </>
      );
    },
    iconBlock(props) {
      return (
        <>
          {props.node.align === 'right' && (
            <SplitBlockText
              body={props.node.body}
              isRight={props.node.align === 'right'}
              title={props.node.title}
              mobileOnly={false}
              desktopOnly={true}
            />
          )}
          <IconBlock {...props.node} />
          <SplitBlockText
            body={props.node.body}
            isRight={props.node.align === 'right'}
            title={props.node.title}
            mobileOnly={props.node.align === 'right'}
            desktopOnly={false}
          />
        </>
      );
    },
    photo(props) {
      return (
        <>
          {/* {props.node.align === 'right' && (
            <SplitBlockText
              body={props.node.body}
              isRight={props.node.align === 'right'}
              title={props.node.title}
              mobileOnly={false}
              desktopOnly={true}
            />
          )} */}
          {/* <Photo {...props.node} /> */}
          <Photo
            image={props.node.image}
            align={props.node.align}
            title={props.node.title}
            description={props.node.description}
          />
          {/* <SplitBlockText
            body={props.node.body}
            isRight={props.node.align === 'right'}
            title={props.node.title}
            mobileOnly={props.node.align === 'right'}
            desktopOnly={false}
          /> */}
        </>
      );
    },
    imageBlock(props) {
      const image = imageUrlFor(buildImageObj(props.node.image))
        .width(2000)
        .format('pjpg')
        .url();
      return image && <ImageBlock image={image} body={props.node.body} />;
    },
    ctaBlock(props) {
      return (
        <CtaBlock title={props.node.title} url={props.node.url}>
          <BaseBlockContent
            blocks={props.node.body}
            serializers={serializers}
          />
        </CtaBlock>
      );
    },
    slideshow(props) {
      return <Slideshow {...props.node} />;
    },
    youtube: ({ node }) => {
      const { url, body } = node;
      return <YouTube url={url} body={body} />;
    },
  },
};

const BlockContent = ({ blocks }) => {
  return (
    <BaseBlockContent
      className="body-block--div"
      blocks={blocks}
      serializers={serializers}
    />
  );
};

export default BlockContent;
