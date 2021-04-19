import React from 'react';
import { graphql } from 'gatsby';
import SEO from '../components/seo';
import Container from '../components/container';
import Layout from '../containers/layout';
import DonateSection from '../components/donate-section';
import * as polarBear from '../assets/img/donate-images/polarbear.jpg';
import MagazinePostPreviewGrid from '../components/magazine-post-preview-grid';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';
import './404.scss';

export const query = graphql`
  query missingPageQuery {
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
  }
`;

export default ({ data: { posts } }) => {
  const postNodes = posts
    ? mapEdgesToNodes(posts).filter(filterOutDocsWithoutSlugs)
    : [];
  return (
    <Layout>
      <SEO title="404: Not found" />
      <Container>
        <div className="missing-main">
          <h2>Unforunately, that page was not found.</h2>
          <p>While you're here, check out our latest posts:</p>
          {postNodes && (
            <MagazinePostPreviewGrid
              title="Latest magazine posts"
              nodes={postNodes}
              browseMoreHref="/magazine/"
            />
          )}
        </div>

        <DonateSection image={polarBear} pageLocation={'404'} />
      </Container>
    </Layout>
  );
};
