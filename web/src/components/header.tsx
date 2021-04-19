import { Link, StaticQuery } from 'gatsby';
import React, { useState, useEffect, useRef } from 'react';
import '../types/types';
import { cn } from '../lib/helpers';
// import icon from '../assets/img/WWZ_logo_circle-white.png';
import icon from '../assets/svg/WWZ_logos_bug.svg';
import hamburger from '../assets/svg/hamburger-menu.svg';
import EnlistPopup from './enlist-popup';
import EnlistCore from './enlist-core';
import { Splash } from './splash';

import { sortStreams, hasUserSignedUp, setUserHasSignedUp } from '../lib/utils';

import LiveIcon from './live-icon';

import SocialButton from './social-button';

import './header.scss';

import { graphql } from 'gatsby';

interface IProps {
  social: any[];
  streams: any[];
}

const Header = (props: IProps) => {
  const page = typeof window !== 'undefined' ? window.location.pathname : '';
  const { onHideNav, onShowNav, showNav, siteTitle, data } = props;
  const userHasNotSignedUp = !hasUserSignedUp();

  const [enlistDidOpen, setEnlistDidOpen] = useState(false);
  const enlistDidOpenRef = useRef(enlistDidOpen);
  enlistDidOpenRef.current = enlistDidOpen;

  const [showEnlist, setShowEnlist] = useState(false);
  const showEnlistRef = useRef(showEnlist);
  showEnlistRef.current = showEnlist;

  const [showSplash, setShowSplash] = useState(false);
  const showSplashRef = useRef(showSplash);
  showSplashRef.current = showSplash;

  const [splashInit, setSplashInit] = useState(false);
  const splashInitRef = useRef(splashInit);
  splashInitRef.current = splashInit;

  const [activeStreams, setActiveStreams] = useState([]);

  const [enlistInit, setEnlistInit] = useState(false);
  const enlistInitRef = useRef(enlistInit);
  enlistInitRef.current = enlistInit;

  const [highlightEnlist, setHighlightEnlist] = useState(false);

  const isLive = (streams: IStream[]) => {
    const { activeStreams, nextStream, archivedStreams } = sortStreams(streams);
    setActiveStreams(activeStreams);
  };

  useEffect(() => {
    isLive(props.streams);
    // check if video is live
    setInterval(() => {
      isLive(props.streams);
    }, 1000);


    setTimeout(() => {
      if (userHasNotSignedUp && !enlistDidOpenRef.current) {
        // setSplashInit(true);
        // setShowSplash(true);
        // setTimeout(() => {
        //   setSplashInit(false);
        // }, 2);
          setEnlistDidOpen(true);
          setShowEnlist(true);
          setHighlightEnlist(true);
          setTimeout(() => {
            setHighlightEnlist(false);
          }, 1000);
        // setTimeout(() => {
        //   setEnlistInit(false);
        // }, 2000);
      } else {
      }
    }, 3000);
  }, []);
  return (
    <div className={'header--root'}>
      <div className={'header--wrapper'}>
        <Link to="/" aria-label="Home">
          <img src={icon} alt={siteTitle} className={'header--siteIcon'} />
        </Link>
        <Link
          className={`header--page-button header--live-button header--live-button--sm`}
          to="/live/"
          aria-label="Live"
        >
          {(activeStreams.length > 0 && <LiveIcon on={true} />) || 'LIVE'}
        </Link>
        <button
          className={'header--toggleNavButton'}
          onClick={showNav ? onHideNav : onShowNav}
          aria-label="menu"
        >
          <img src={hamburger} alt="menu" />
        </button>

        <nav className={cn('header--nav', showNav && 'header--showNav')}>
          <ul>
            <li>
              <Link
                className="header--page-button header--live-button header--live-button--lg"
                to="/live/"
                aria-label="Live"
              >
                {(activeStreams.length > 0 && <LiveIcon on={true} />) || 'LIVE'}
              </Link>
            </li>
            <li>
              <a
                className="header--page-button"
                // to="/"
                onClick={() => {
                  setEnlistDidOpen(true);
                  setShowEnlist(true);
                  setHighlightEnlist(true);
                  setTimeout(() => {
                    setHighlightEnlist(false);
                  }, 1000);
                }}
              >
                ENLIST
              </a>
            </li>
            <li>
              <Link
                className={`header--page-button ${
                  page === '/mission/' && 'header--page-button--active'
                }`}
                to="/mission/"
              >
                MISSION
              </Link>
            </li>
            <li>
              <Link
                className={`header--page-button ${
                  page === '/magazine/' && 'header--page-button--active'
                }`}
                to="/magazine/"
              >
                MAGAZINE
              </Link>
            </li>
            <li>
              <a 
                id="donate"
                className="header--page-button header--donate-button"
                href="https://act.worldwarzero.com/donate/?sc=web.nav"
              >
                DONATE
              </a>
            </li>
            <li className="header--social-icons">
              {props.social.map(({ name, url, icon }, i: number) => (
                <SocialButton
                  name={name}
                  url={url}
                  key={i}
                  _key={i.toString()}
                  icon={icon}
                  classExtra={'header--socialIcon'}
                />
              ))}
            </li>
          </ul>
        </nav>
      </div>
      {/* {showSplash && (
        <Splash
          onClose={() => setShowSplash(false)}
          onSubmit={setUserHasSignedUp}
        />
      )} */}

      {showEnlist && (
        <div className="enlist-popup--container">
          <EnlistCore
            minimal={false}
            onClose={() => setShowEnlist(false)}
            onSubmit={setUserHasSignedUp}
            classExtra={`${enlistInit && 'enlist-popup--main--init'} ${
              highlightEnlist && 'enlist-popup--main--bounce'
            }`}
          />
        </div>
      )}
    </div>
  );
};

export default Header;
