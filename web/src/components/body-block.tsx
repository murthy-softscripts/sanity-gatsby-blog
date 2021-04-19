import React from 'react';

import './body-block.scss';
import BlockContent from './block-content';

interface IProps {
  body: any;
}

export default ({ body }: IProps) => (
  <div className="body-block">
    <BlockContent blocks={body} />
  </div>
);
