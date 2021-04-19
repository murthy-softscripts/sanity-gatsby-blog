import React, { useState, useEffect } from 'react';
import { validateEmail, validateZip } from '../lib/validators';
import { trackCustomEvent } from 'gatsby-plugin-google-analytics';

import closeButton from '../assets/svg/close.svg';

import Helmet from 'react-helmet';

import './enlist-popup.scss';

interface IProps {
  onClose: Function;
  onSubmit: Function;
  classExtra?: string;
}

export default ({ onClose, onSubmit, classExtra }: IProps) => {
  const [isValid, setIsValid] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const closeSignUpBar = () => {
    // setIsHidden(true);
    onClose();
  };
  const signUp = () => {
    trackCustomEvent({
      category: 'Enlist Submit Button',
      action: 'Click',
      label: 'Enlist',
      value: 1,
    });

    onSubmit();
    setIsSubmitting(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  // Bind to EveryAction event for client's form
  //@ts-ignore
  window.nvtag_callbacks = window.nvtag_callbacks || {};
  //@ts-ignore
  window.nvtag_callbacks.onSubmit = window.nvtag_callbacks.onSubmit || [];
  //@ts-ignore
  window.nvtag_callbacks.onSubmit.push(signUp);
  //@ts-ignore
  window.nvtag_callbacks.alterFill = window.nvtag_callbacks.alterFill || [];
  //@ts-ignore
  window.nvtag_callbacks.alterFill.push((e) => {
    // console.log(e);
    e.fill_dict.updateMyProfile = 'false';
    e.fill_dict.YesSignMeUpForUpdatesForBinder = 'false';
  });
  //@ts-ignore
  window.nvtag_callbacks.alterPost = window.nvtag_callbacks.alterPost || [];
  //@ts-ignore
  window.nvtag_callbacks.alterPost.push((e) => {
    // console.log('post', e);
    // window.post = e;
    // console.log(JSON.stringify(e));
    // console.log('remove fast action');
    e.form_definition.form_elements = e.form_definition.form_elements.filter(
      (item) => item.name !== 'FastAction',
    );
    return e;
  });

  useEffect(() => {
    return () => {
      // Cleanup NVtag for next initialization

      // @ts-ignore
      delete window.nvtag;
      // @ts-ignore
      delete window.nvtag_callbacks;
      // @ts-ignore
      delete window.nvtag_plugins;
    };
  }, []);

  return (
    <>
      <Helmet>
        <link
          rel="preload"
          href="https://d3rse9xjbp8270.cloudfront.net/at.js"
          as="script"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="https://d3rse9xjbp8270.cloudfront.net/at.min.css"
          as="style"
        />
        <script
          type="text/javascript"
          src="https://d3rse9xjbp8270.cloudfront.net/at.js"
          crossOrigin="anonymous"
        ></script>
      </Helmet>

      <div className="enlist-popup--container">
        <div
          className={`enlist-popup--main ${classExtra} ${
            isSubmitting && 'enlist-popup--main--bounce-outs'
          }`}
          style={{ display: isHidden ? 'none' : '' }}
        >
          <div className="enlist-popup--inner">
            {isSubmitting && (
              <div className="enlist-popup--success-overlay">
                <div className="enlist-popup--success-overlay--text">
                  Thank You!
                </div>
              </div>
            )}

          <div class="ngp-form"
          data-form-url="https://secure.everyaction.com/v1/Forms/zSXYWI4VHkimJVxdRJJtCw2"
          data-fastaction-endpoint="https://fastaction.ngpvan.com"
          data-inline-errors="true"
          data-fastaction-nologin="true"
          data-databag-endpoint="https://profile.ngpvan.com"
          data-databag="everybody"
           data-mobile-autofocus="false">
          </div>
            <div
              className="enlist-popup--close-button"
              style={{ backgroundImage: `url(${closeButton})` }}
              onClick={closeSignUpBar}
            >
              {' '}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
