import React from 'react';
import '../types/types';
import { Link, StaticQuery, graphql } from 'gatsby';

import './follow-us.scss';
import SocialButton from './social-button';

export default () => (
  <StaticQuery
    query={graphql`
      query FollowUsQuery {
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
      }
    `}
    render={(data) => {
      return (
        <div className="follow-us--main">
          <div className="follow-us--header">Follow us on social media</div>
          <div
            className="follow-us--icon-container"
            style={{
              gridTemplateColumns: `repeat(${data.social.nodes.length}, 1fr)`,
            }}
          >
            {data.social.nodes.map(({ name, url, icon }, i: number) => (
              <div key={name} className="follow-us--icon">
                <SocialButton
                  name={name}
                  url={url}
                  key={i}
                  _key={i.toString()}
                  icon={icon}
                  classExtra={''}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }}
  />
);
