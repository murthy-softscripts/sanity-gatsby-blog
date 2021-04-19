import React, { useState, useEffect } from 'react';
import { StaticQuery, graphql } from 'gatsby';
import EnlistCore from './enlist-core';
import ZeroButton from './zero-button';
import icon from '../assets/svg/WWZ_logos_bug.svg';
import './splash.scss';
import YouTube from './block-content/youtube';

import { ISplashData } from '../types/types';
import BodyBlock from './body-block';

interface IProps {
  splashData: ISplashData;
  onSubmit: Function;
  onClose: Function;
}

export const Splash = ({ onSubmit, onClose, splashData }: IProps) => {
  return (
    <div className="splash--main">
      <div className="splash--logo">
        <img
          src={icon}
          alt={'World War Zero'}
          className={'header--siteIcon'}
          onClick={() => onClose()}
        />
      </div>
      <button id="enter-site" className="splash--enter-button" onClick={() => onClose()}>
        {'ENTER SITE'}
      </button>
      <span className="layout--header--title splash--title">
        {splashData.title}
      </span>
      <div className="splash--material">
        {splashData.enableVideo && (
          <div className="splash--video">
            <YouTube url={splashData.url} body={''} />
          </div>
        )}
        {splashData.enableBody && splashData._rawBody && (
          <div className={`splash--body-text splash--body--quote`}>
            <BodyBlock body={splashData._rawBody} />
          </div>
        )}
      </div>
      <div className={`splash--form`}>
        <BodyBlock body={splashData._rawSnippet} />
        <EnlistCore
          minimal={true}
          onClose={() => onSubmit(false)}
          onSubmit={onSubmit}
        />
      </div>
      <div class="splash--body-text fnote"><div class="splash"><p>Are you registered to vote? If not, visit <a target="_blank" href="https://www.vote411.org/">vote411</a> or <a target="_blank"  href="https://www.rockthevote.org/">Rock the vote.</a></p><BodyBlock body={splashData._rawFootnote} /></div></div>
    </div>
  );
};