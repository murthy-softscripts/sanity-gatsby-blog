import React, { useState, useRef, useEffect } from 'react';
import '../types/types';

import { graphql } from 'gatsby';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import MagazinePostPreviewGrid from '../components/magazine-post-preview-grid';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import Carousel from '../components/carousel';
import Counter from '../components/counter';
import FollowUs from '../components/follow-us';
import LazyLoad from 'react-lazy-load';

import { sortStreams, hasUserSignedUp, setUserHasSignedUp } from '../lib/utils';
import { Splash } from '../components/splash';

//@ts-ignore
import * as polarBear from '../assets/img/donate-images/polarbear.jpg';
import PeopleGrid from '../components/people-grid';

import './index.scss';
import DonateSection from '../components/donate-section';
import BodyBlock from '../components/body-block';
interface IProps {
  errors: Error[];
  data: {
    allMarkdownRemark: any;
    site: ISite;
    posts: {
      nodes: IMagazinePost[];
    };
    // projects:{},
    people: {
      nodes: IPerson[];
    };
    splashData: ISplashData;
  };
}

export const query = graphql`
  query IndexPageQuery {
    home: sanityPage(_id: { regex: "/(drafts.|)home/" }) {
      id
      _rawBody
    }
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      enlisteeCount
    }
    posts: allSanityPost(
      limit: 4
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    featuredPeople: allSanityPerson(filter: { featured: { eq: true } }) {
      nodes {
        id
        firstName
        lastName
        featured
        gallery
        image {
          asset {
            # localImage {
            #   relativePath
            #   childImageSharp {
            #     fixed(
            #       grayscale: true
            #       cropFocus: CENTER
            #       width: 600
            #       height: 600
            #       toFormat: JPG # jpegQuality: 10
            #     ) {
            #       src
            #     }
            #   }
            # }
            url
          }
          crop {
            top
            right
            left
            bottom
          }
          hotspot {
            y
            x
            width
            height
          }
        }
      }
    }
    siteSettings: sanitySiteSettings {
      people: peopleGallery {
        id
        firstName
        lastName
        title
        featured
        gallery
        image {
          asset {
            localImage {
              relativePath
              childImageSharp {
                fixed(grayscale: true, width: 200, toFormat: JPG, quality: 80) {
                  src
                  srcSet
                  base64
                  srcWebp
                  width
                  height
                  aspectRatio
                }
              }
            }
          }
        }
      }
    }
    splashData: sanitySplash {
      id
      enabled
      enableVideo
      title
      url
      _rawBody
      enableBody
      _rawSnippet
    }
  }
`;

const IndexPage = (props: IProps) => {
  const { data, errors } = props;

  const userHasNotSignedUp = !hasUserSignedUp();

  const [showSplash, setShowSplash] = useState(null);
  useEffect(() => {
    try {
      if (data.splashData.enabled === false) {
        setShowSplash(false);
      } else if (userHasNotSignedUp) {
        setShowSplash(true);
      } else {
        setShowSplash(false);
      }
    } catch (e) {
      setShowSplash(false);
    }
  }, []);

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const site = data.site;
  const home = data.home;
  const postNodes = data.posts
    ? mapEdgesToNodes(data.posts).filter(filterOutDocsWithoutSlugs)
    : [];
  const featuredPeopleNodes = data.featuredPeople.nodes.sort(
    () => Math.random() - 0.5,
  );

  const galleryPeopleNodes = data.siteSettings.people;
  // shuffle is throwing off gatsby names and images, disabling for now
  //   .sort(
  //   () => Math.random() - 0.5,
  // );
  if (!site) {
    throw new Error(
      'Missing "Site settings". Open the studio at http://localhost:3333 and add some content to "Site settings" and restart the development server.',
    );
  }

  return (
    <>
      {showSplash === false && (
        <Layout>
          <SEO
            title={site.title}
            description={site.description}
            keywords={site.keywords}
          />
          <>
            <Carousel people={featuredPeopleNodes} />
            <BodyBlock body={home._rawBody} />
            <Counter count={site.enlisteeCount} />
            {galleryPeopleNodes && galleryPeopleNodes.length > 0 && (
              <PeopleGrid items={galleryPeopleNodes} title="People" />
            )}
            <Container>
              {postNodes && (
                <MagazinePostPreviewGrid
                  title="Latest magazine posts"
                  nodes={postNodes}
                  largeOrientation="right"
                  browseMoreHref="/magazine/"
                />
              )}
            </Container>
            <DonateSection image={polarBear} pageLocation={'home'} />
          </>
        </Layout>
      )}
      {showSplash && (
        <Splash
          splashData={data.splashData}
          onClose={() => setShowSplash(false)}
          onSubmit={() => {
            setUserHasSignedUp();
            setTimeout(() => {
              // workaround since external form causes scroll down on submit
              window.scrollTo(0, 0);
              setShowSplash(false);
            }, 2000);
          }}
        />
      )}
      {showSplash === null && <div className="blank--overlay"></div>}
    </>
  );
};

export default IndexPage;
