import React from 'react';
import ZeroButton from './zero-button';
import './cta-block.scss';

interface IProps {
  title: string;
  url: string;
  children: any;
}

export default ({ children, title, url }: IProps) => {
  return (
    <div className="cta-block--main">
      {children}
      {title && url && (
        <a href={url}>
          <ZeroButton
            title={title.toUpperCase()}
            color="accent"
            highlight="white"
            onClick={() => alert}
            enabled={true}
            classExtra="zero-button--wide"
          />
        </a>
      )}
    </div>
  );
};
