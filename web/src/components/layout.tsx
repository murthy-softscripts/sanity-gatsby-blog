import React from 'react';
import Header from './header';

import logo from '../assets/svg/WWZ_logos_primary.svg';
import { Link, StaticQuery, graphql } from 'gatsby';
import FollowUs from './follow-us';

interface IProps {
  location: Location;
  title: string;
  children?: any;
  companyInfo: string;
  onHideNav: boolean;
  onShowNav: boolean;
  showNav: boolean;
  siteTitle: string;
}

const Layout = ({
  children,
  companyInfo,
  onHideNav,
  onShowNav,
  showNav,
  siteTitle,
}: IProps) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        social: allSanitySocial(filter: { enabled: { eq: true } }) {
          nodes {
            name
            enabled
            url
            icon {
              asset {
                url
                localImage {
                  url
                }
              }
            }
          }
        }
        streams: allSanityStream(sort: { fields: startTime }) {
          nodes {
            id
            url
            startTime(formatString: "x")
            endTime(formatString: "x")
            title
            disabled
          }
        }
      }
    `}
    render={(data) => {
      return (
        <>
          <Header
            social={data.social.nodes}
            streams={data.streams.nodes}
            siteTitle={siteTitle}
            onHideNav={onHideNav}
            onShowNav={onShowNav}
            showNav={showNav}
          />
          <div className={'layout--content'}>{children}</div>
          <footer className={'layout--footer'}>
            <div className={'layout--footer-wrapper'}>
              {/* <div className={'layout--company-address'}>
          {companyInfo && (
            <div>
              {companyInfo.name}
              <br />
              {companyInfo.address1}
              <br />
              {companyInfo.address2 && (
                <span>
                  {companyInfo.address2}
                  <br />
                </span>
              )}
              {companyInfo.zipCode} {companyInfo.city}
              {companyInfo.country && <span>, {companyInfo.country}</span>}
            </div>
          )}
        </div> */}
              <FollowUs />
              <div className={'layout--site-info'}>
                <p>
                  For media inquiries, please email{' '}
                  <a href="mailto:press@worldwarzero.com" rel="noreferrer">
                    press@worldwarzero.com
                  </a>
                </p>
                <span className="layout--legal-a">
                  {'A partner with the '}
                  <a
                    href="https://www.americansecurityproject.org/"
                    rel="noreferrer"
                  >
                    American Security Project
                  </a>
                </span>
                <span className="layout--legal-div-1">{' | '}</span>
                <span className="layout--legal-b">
                  <Link to="/privacy-policy">Privacy Policy</Link>
                </span>
                <span className="layout--legal-div-2">{' | '}</span>
                <span className="layout--legal-c">
                  © {new Date().getFullYear()} World War Zero
                </span>
                <br></br>
              </div>
              <div className={'layout--footer--logo'}>
                <img src={logo} alt="World War Zero" />
              </div>
            </div>
          </footer>
        </>
      );
    }}
  />
);

export default Layout;
