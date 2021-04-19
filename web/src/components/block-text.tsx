import BaseBlockContent from '@sanity/block-content-to-react';
import React from 'react';
import { Link } from 'gatsby';

interface IProps {
  maxLength: number;
  readMoreButton: boolean;
  readMoreLink: string;
  children: any;
  node: any;
}

const serializersReadMore = {
  types: {
    block(props: IProps) {
      switch (props.node.style) {
        default:
          return (
            <p>
              {props.children}
              {'... '}
              <span className="magazine-post-preview--read-more">
                Read More
              </span>
            </p>
          );
      }
    },
  },
};
const serializers = {
  types: {
    block(props: IProps) {
      switch (props.node.style) {
        default:
          return <p>{props.children}</p>;
      }
    },
  },
};

const BlockText = ({ blocks, readMoreButton, maxLength }) => (
  <BaseBlockContent
    blocks={blocks}
    serializers={readMoreButton ? serializersReadMore : serializers}
  />
);

export default BlockText;
