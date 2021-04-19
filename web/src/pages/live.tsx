import React, { useState, useEffect } from 'react';

import '../types/types';

import { graphql } from 'gatsby';
import Container from '../components/container';
import GraphQLErrorList from '../components/graphql-error-list';
import SEO from '../components/seo';
import Layout from '../containers/layout';

import { sortStreams } from '../lib/utils';

import './live.scss';

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
  query PageQuery {
    page: sanityPage(_id: { regex: "/(drafts.|)live/" }) {
      id
      title
      _rawBody
    }
    streams: allSanityStream(sort: { fields: startTime, order: DESC }) {
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
`;

const Page = (props: IProps) => {
  const [activeStreams, setActiveStreams] = useState([]);
  const [archivedStreams, setArchivedStreams] = useState([]);
  const [nextStream, setNextStream] = useState(null);

  const { data, errors } = props;

  if (errors) {
    return (
      <Layout>
        <GraphQLErrorList errors={errors} />
      </Layout>
    );
  }

  const page = data && data.page;
  const streamNodes = data.streams.nodes;

  const toEmbedURL = (url: string) => {
    const reg = /[a-zA-Z0-9-_]+$/g;
    const uid = url.match(reg).pop();
    return `https://www.youtube.com/embed/${uid}`;
  };

  const findActiveStream = (streams) => {
    const { activeStreams, nextStream, archivedStreams } = sortStreams(streams);
    setActiveStreams(activeStreams);
    setArchivedStreams(archivedStreams);
    setNextStream(nextStream);
  };

  if (!page) {
    throw new Error(
      'Missing "" page data. Open the studio at http://localhost:3333 and add "" page data and restart the development server.',
    );
  }

  useEffect(() => {
    findActiveStream(streamNodes);
    setInterval(() => {
      findActiveStream(streamNodes);
    }, 1000);
  }, []);

  return (
    <Layout>
      <SEO title={page.title} />
      <Container>
        <div className="layout--header--title live--site-title">Live</div>
        {(activeStreams.length > 0 && (
          <>
            {activeStreams.map((stream) => (
              <div className="live--video-large" key={stream.id}>
                <div className="live--site-subtitle">{stream.title}</div>
                <div className="live--video-container">
                  <iframe
                    className="live--iframe-youtube"
                    src={toEmbedURL(stream.url)}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            ))}
          </>
        )) ||
          (nextStream && (
            <>
              <div className="live--body">
                Next livestream{' '}
                <span className="live--emphasis">{nextStream.title} </span>
                starts at{' '}
                <span className="live--emphasis">
                  {new Date(parseInt(nextStream.startTime)).toLocaleString()}
                </span>
              </div>
            </>
          )) || (
            <>
              <div className="live--body">
                No livestreams currently scheduled. Check back later.
              </div>
            </>
          )}
        <div className="layout--header--title live--site-subtitle">
          Archived Live Streams
        </div>
        <div className="live--archived-grid">
          {archivedStreams.map((stream) => (
            <div className="live--video-medium" key={stream.id}>
              <div className="live--video-container">
                <iframe
                  className="live--iframe-youtube"
                  src={toEmbedURL(stream.url)}
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="live--site-subtitle">{stream.title}</div>
              <div className="live--site-info">
                streamed on{' '}
                <b>
                  {new Date(parseInt(stream.startTime)).toLocaleDateString()}
                </b>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Layout>
  );
};

export default Page;
