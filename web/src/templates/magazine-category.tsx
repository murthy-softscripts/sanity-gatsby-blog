import React from 'react';
import { graphql } from 'gatsby';
import { mapEdgesToNodes } from '../lib/helpers';
import GraphQLErrorList from '../components/graphql-error-list';
import MagazineCategory from '../components/magazine-category';
import SEO from '../components/seo';
import Layout from '../containers/layout';

interface IProps {
  errors: Error[];
  data: {
    markdownRemark: any;
    posts: IMagazinePost[];
    category: ICategory;
  };
  pageContext: any;
}

export const query = graphql`
  query MagazineCategoryQuery2($id: String!) {
    posts: allSanityPost(
      filter: { categories: { elemMatch: { id: { eq: $id } } } }
      sort: { fields: [publishedAt], order: DESC }
    ) {
      edges {
        node {
          ...PostPreview
        }
      }
    }
    magazine: sanityMagazine {
      title
    }
  }
`;

const MagazineCategoryPage = (props: IProps) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const postNodes = data && data.posts && mapEdgesToNodes(data.posts);

  return (
    <Layout>
      <SEO title="Magazine" />
      <MagazineCategory title={data.magazine.title} posts={postNodes} />
    </Layout>
  );
};

export default MagazineCategoryPage;
