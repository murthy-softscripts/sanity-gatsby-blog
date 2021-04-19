import React, { useState, useEffect, useRef } from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import '../types/types';

import './donate-section.scss';
import ZeroButton from './zero-button';
import BlockContent from './block-content';
import LazyLoad from 'react-lazy-load';

interface IProps {
  image: any;
  pageLocation: string;
}

export default ({ image, pageLocation }: IProps) => {
  const [selectedButton, setSelectedButton] = useState(null);
  const buttonOptions = [5, 10, 20, 50, 100, 'Other'];

  return (
    <StaticQuery
      query={graphql`
        query DonateSectionQuery {
          page: sanitySiteSettings {
            id
            title: donationTitle
            _rawBody: _rawDonationBody
          }
        }
      `}
      render={({ page }) => {
        return (
          <div className="donate-section--main">
            <LazyLoad debounce={false} throttle={10}>
              <div className="donate-section--main--inner">
                <div
                  className="donate-section--background-image"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
                <div className="donate-section--medium--background"></div>
                <div className="donate-section--overlay"></div>
                <div className="donate-section--content">
                  <div className="donate-section--title">{page.title}</div>

                  <div className="donate-section--body">
                    <BlockContent blocks={page._rawBody} />
                  </div>
                  <div className="donate-section--dead-space-after-body"></div>

                  <div className="donate-section--dead-space-div"></div>
                  <div className="donate-section--dead-space-left"></div>

                  {buttonOptions.map((opt, i: number) => (
                    <ZeroButton
                      key={i}
                      enabled={true}
                      classExtra={
                        (selectedButton === i
                          ? 'donate-section--button--selected '
                          : '') + 'donate-section--button '
                      }
                      title={
                        ((typeof opt === 'number' && '$') || '') +
                        opt.toString()
                      }
                      color="white"
                      highlight="black"
                      onClick={(e) => {
                        setSelectedButton(i);
                      }}
                    />
                  ))}

                  <div className="donate-section--dead-space-right"></div>
                  <ZeroButton
                    classExtra="donate-section--button--right"
                    title={'DONATE NOW'}
                    id="donate-home"
                    color="accent"
                    highlight="white"
                    enabled={true}
                    onClick={() => {
                      const amount = buttonOptions[selectedButton];
                      const url = `https://act.worldwarzero.com/donate/?sc=${pageLocation}${
                        typeof amount === 'number' ? `&am=${amount}` : ''
                      }`;
                      //@ts-ignore
                      window.location = url;
                    }}
                  />
                </div>
              </div>
            </LazyLoad>
          </div>
        );
      }}
    />
  );
};
