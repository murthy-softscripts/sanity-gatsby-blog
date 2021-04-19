import React from 'react';
import { graphql } from 'gatsby';
import BlockContent from '../components/block-content';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import PeopleGrid from '../components/people-grid';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { mapEdgesToNodes, filterOutDocsWithoutSlugs } from '../lib/helpers';

import './mission.scss';
import BodyBlock from '../components/body-block';
import DonateSection from '../components/donate-section';

import turtle from '../assets/img/donate-images/turtle.jpg';
import leftArrow from '../assets/svg/right-long-arrow.svg';
import downArrow from '../assets/svg/down-long-arrow.svg';
import FollowUs from '../components/follow-us';

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
  query MissionPageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)mission/" }) {
      id
      title
      _rawBody
    }
    people: allSanityPerson {
      edges {
        node {
          id
          image {
            asset {
              _id
            }
          }
          firstName
          lastName
        }
      }
    }
  }
`;

const MissionPage = (props: IProps) => {
  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;
  const personNodes =
    data &&
    data.people &&
    mapEdgesToNodes(data.people).filter(filterOutDocsWithoutSlugs);

  if (!page) {
    throw new Error(
      'Missing "Mission" page data. Open the studio at http://localhost:3333 and add "Mission" page data and restart the development server.',
    );
  }

  return (
    <Layout>
      <div className="layout--header--title">{page.title}</div>
      <SEO title={page.title} />
      <Container>
        <div className="mission--header">
          <div className="mission--header--left">
            {/* <img
              className="mission--header--arrow--horizontal"
              src={leftArrow}
              alt=""
            />
            <img
              className="mission--header--arrow--vertical"
              src={downArrow}
              alt=""
            /> */}
          </div>
          <iframe
            className="mission--header--video"
            src="https://www.youtube.com/embed/ChVdT0J8MvU"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <BodyBlock body={page._rawBody || []} />
      </Container>
      <DonateSection image={turtle} pageLocation={'mission'} />
    </Layout>
  );
};

export default MissionPage;
