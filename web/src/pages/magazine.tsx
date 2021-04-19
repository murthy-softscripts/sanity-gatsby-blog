import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import MagazineGrid from '../components/magazine-grid';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';

import './magazine.scss';
import * as badge from '../assets/img/badge.png';

interface IProps {
  errors: Error[];
  data: {
    magazine: {
      title: string;
      bannerPost?: {
        id: string;
      };
    };
    markdownRemark: any;
    nonFeaturedPosts: IMagazinePost[];
    featuredPosts: IMagazinePost[];
    popularPosts: IMagazinePost[];
    site: {
      siteMetadata: {
        title: string;
      };
    };
  };
  pageContext: any;
}

export const query = graphql`
  query MagazinePageQuery {
    magazine: sanityMagazine {
      title
      bannerPost {
        id
      }
    }
    popularPosts: allSanityPost(
      limit: 3
      sort: { fields: [publishedAt], order: DESC }
      filter: { popular: { eq: true } }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    nonFeaturedPosts: allSanityPost(
      sort: { fields: [publishedAt], order: DESC }
      filter: { featured: { eq: false } }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    featuredPosts: allSanityPost(
      limit: 12
      sort: { fields: [publishedAt], order: DESC }
      filter: { featured: { eq: true } }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
  }
`;

const MagazinePage = (props: IProps) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const featuredNodes =
    data && data.featuredPosts && mapEdgesToNodes(data.featuredPosts);
  const secondaryNodes =
    data && data.nonFeaturedPosts && mapEdgesToNodes(data.nonFeaturedPosts);
  const popularNodes =
    data && data.popularPosts && mapEdgesToNodes(data.popularPosts);
  const bannerPostId = data.magazine.bannerPost?.id;

  let filteredFeaturedNodes = featuredNodes;
  let filteredSecondaryNodes = secondaryNodes;
  let bannerNode = [];
  if (bannerPostId) {
    bannerNode = [...featuredNodes, ...secondaryNodes].filter(
      ({ id }) => id == bannerPostId,
    );

    filteredFeaturedNodes = featuredNodes.filter(
      ({ id }) => !bannerPostId.includes(id),
    );

    filteredSecondaryNodes = filteredSecondaryNodes.filter(
      ({ id }) => !bannerPostId.includes(id),
    );
  }

  // filteredFeaturedNodes = [
  //   ...filteredFeaturedNodes,
  //   ...filteredFeaturedNodes,
  //   ...filteredFeaturedNodes,
  // ];

  // filteredSecondaryNodes = [
  //   ...filteredSecondaryNodes,
  //   ...filteredSecondaryNodes,
  //   ...filteredSecondaryNodes,
  //   ...filteredSecondaryNodes,
  //   ...filteredSecondaryNodes,
  // ];

  // filteredFeaturedNodes = filteredFeaturedNodes.map((t, i) => {
  //   return {
  //     ...t,
  //     title: `${i} ${t.title}`,
  //   };
  // });
  // filteredSecondaryNodes = filteredSecondaryNodes.map((t, i) => {
  //   return {
  //     ...t,
  //     title: `${i} ${t.title}`,
  //   };
  // });

  return (
    <Layout>
      <SEO title="Magazine" />
      <Container>
        <div className="layout--header--title">{data.magazine.title}</div>
        <MagazineGrid
          bannerNodes={bannerNode}
          featuredNodes={filteredFeaturedNodes}
          nonFeaturedNodes={filteredSecondaryNodes}
          popularNodes={popularNodes}
          featuredPageSize={3} // change back to 2 once there's more posts to match design
        />
      </Container>
    </Layout>
  );
};

export default MagazinePage;
