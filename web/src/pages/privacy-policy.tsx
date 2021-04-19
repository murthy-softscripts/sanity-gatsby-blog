import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../components/block-content';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import './privacy-policy.scss';

interface IProps {
  errors: Error[];
  data: {
    page: {
      title: string;
      _rawBody: string;
    };
    people: {};
  };
}

export const query = graphql`
  query PrivacyPolicyPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)privacyPolicy/" }) {
      id
      title
      _rawBody
    }
  }
`;

const ActNowPage = (props) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <h1 className="layout--site-title">{page.title}</h1>
        <div className="privacy-policy--root">
          <BlockContent blocks={page._rawBody || []} />
        </div>
      </Container>
    </Layout>
  );
};

export default ActNowPage;
