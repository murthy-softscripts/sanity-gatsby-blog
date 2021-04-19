import React from 'react';
import '../types/types';
import { format, distanceInWords, differenceInDays } from 'date-fns';
import './magazine-info.scss';
import SocialButton from './social-button';
import { formatShare } from '../lib/utils';
import { Authors } from './authors';
import { FacebookShareButton, TwitterShareButton } from 'react-share';
import TwitterIcon from '../assets/svg/twitter.svg';
import FacebookIcon from '../assets/svg/facebook.svg';

interface IProps {
  title: string;
  authors: {
    author: IAuthor;
  }[];
  date: Date;
  social: ISocial;
}

export default ({ title, authors, date, social }) => {
  return (
    <div className="magazine-info--main">
      <div className="magazine-info--divider"></div>
      {
        <div className="magazine-info--author">
          {authors.length > 0 && (
            <>
              {`by `}
              <strong>
                <Authors authors={authors} />
              </strong>
            </>
          )}
        </div>
      }
      <div className="magazine-info--right">
        <div className="magazine-info--social">
          <strong>Share this story</strong>
          <TwitterShareButton
            title={title}
            url={typeof location !== 'undefined' && location.href}
          >
            <img
              src={TwitterIcon}
              alt=""
              className="social-icon magazine-info--socialIcon"
            />
          </TwitterShareButton>
          <FacebookShareButton
            title={title}
            quote={title}
            url={typeof location !== 'undefined' && location.href}
          >
            <img
              src={FacebookIcon}
              alt=""
              className="social-icon magazine-info--socialIcon"
            />
          </FacebookShareButton>
        </div>
      </div>
      <div className="magazine-info--date">
        {format(new Date(date), 'MMMM Do YYYY')}
      </div>
    </div>
  );
};
