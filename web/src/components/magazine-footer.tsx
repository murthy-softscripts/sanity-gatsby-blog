import React from 'react';
import '../types/types';
import ZeroButton from './zero-button';
import './magazine-footer.scss';
import SocialButton from './social-button';
import { Link, StaticQuery, graphql } from 'gatsby';
import { formatShare } from '../lib/utils';
import { getPrevNextMagazines, getRelatedMagazines } from '../lib/helpers';
import {
  MagazinePostMediumPreview,
  MagazinePostSmallPreview,
} from './magazine-post-preview';

interface IProps {
  post: IMagazinePost;
  social: ISocial;
}

export default ({ post, social }: IProps) => {
  return (
    <StaticQuery
      query={graphql`
        query MagazineFooterQuery {
          prevNext: allSanityPost {
            edges {
              previous {
                slug {
                  current
                }
                id
                publishedAt
              }
              next {
                id
                publishedAt
                slug {
                  current
                }
              }
              node {
                id
                slug {
                  current
                }
                publishedAt
              }
            }
          }
          allPosts: allSanityPost {
            nodes {
              ...PostPreview
            }
          }
        }
      `}
      render={({ prevNext, allPosts }) => {
        const prevNextPosts =
          prevNext && getPrevNextMagazines(post, prevNext.edges);

        const relatedPosts =
          allPosts && getRelatedMagazines(post, allPosts).slice(0, 3);

        return (
          <>
            <div className="magazine-footer--grid">
              <h3 className="magazine-footer--title">Share this story</h3>
              <div
                className="magazine-footer--link-group"
                style={{
                  gridTemplateColumns: `1fr repeat(${social.nodes.length}, 1fr) 1fr `,
                }}
              >
                <div className="magazine-footer--dead-space"></div>
                {social.nodes.map(({ name, shareUrl, icon }, i: number) => {
                  return (
                    <SocialButton
                      name={name}
                      url={formatShare(
                        shareUrl,
                        '',
                        encodeURIComponent(
                          (typeof location !== 'undefined' && location.href) ||
                            '',
                        ),
                      )}
                      _key={i.toString()}
                      key={i.toString()}
                      icon={icon}
                      classExtra={
                        'magazine-info--socialIcon magazine-footer--link'
                      }
                    />
                  );
                })}
              </div>
              <Link
                to={prevNextPosts.previousUrl}
                className="magazine-footer--prevnext"
              >
                <ZeroButton
                  classExtra="magazine-footer--button previous"
                  title="Previous Post"
                  onClick={(e) => {}}
                  enabled={true}
                  color="white"
                  highlight="accent"
                />
              </Link>
              <Link
                to={prevNextPosts.nextUrl}
                className="magazine-footer--prevnext"
              >
                <ZeroButton
                  classExtra="magazine-footer--button next"
                  title="Next Post"
                  onClick={(e) => {}}
                  enabled={true}
                  color="accent"
                  highlight="white"
                />
              </Link>
            </div>
            <div className="magazine-footer--grid wide">
              <div className="magazine-footer--related-articles">
                <div className="magazine-grid--popular-grid--divider"></div>
                <p className="magazine-footer--related-title">
                  related articles
                </p>
                <div className="magazine-footer--article-group magazine-footer--article-group--large">
                  {relatedPosts.map((post) => {
                    return (
                      <MagazinePostMediumPreview
                        {...post}
                        previewType="medium"
                        key={post.id}
                        delay={100}
                      />
                    );
                  })}
                </div>
                <div className="magazine-footer--article-group magazine-footer--article-group--medium">
                  {relatedPosts[0] && (
                    <MagazinePostMediumPreview
                      {...relatedPosts[0]}
                      previewType="medium"
                      key={relatedPosts[0].id}
                      delay={100}
                    />
                  )}
                  {relatedPosts[1] && (
                    <MagazinePostMediumPreview
                      {...relatedPosts[1]}
                      previewType="medium"
                      key={relatedPosts[1].id}
                      delay={100}
                    />
                  )}
                </div>
                <div className="magazine-footer--article-group magazine-footer--article-group--small">
                  {relatedPosts.map((post) => {
                    return (
                      <div className="magazine-footer--article" key={post.id}>
                        <MagazinePostSmallPreview
                          {...post}
                          previewType="small"
                          key={post.id}
                          delay={100}
                        />
                        <div className="magazine-footer-divider magazine-grid--popular-grid--divider"></div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        );
      }}
    />
  );
};
