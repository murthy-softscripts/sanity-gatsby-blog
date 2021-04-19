import React from 'react';
import '../types/types';
import './social-button.scss';

interface IProps {
  name: string;
  url: string;
  icon: any;
  classExtra: string;
}

export default ({ name, url, icon, classExtra }: IProps) => {
  return (
    <a href={url} target="_blank" rel="noreferrer">
      {/* <img src={icon.asset.localImage.childImageSharp.fixed.src} alt={name} className={'socialIcon'} /> */}
      <img
        src={icon.asset.url}
        alt={name}
        className={`social-icon ${classExtra}`}
      />
    </a>
  );
};
