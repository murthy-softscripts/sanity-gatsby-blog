import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { StaticQuery, graphql } from 'gatsby';
import favicon from '../assets/img/ww0-favicon.png';

const detailsQuery = graphql`
  query SEOQuery {
    site: sanitySiteSettings(_id: { regex: "/(drafts.|)siteSettings/" }) {
      title
      description
      keywords
      metaImage {
        asset {
          url
        }
      }
    }
  }
`;
interface Props {
  description?: string;
  lang?: string;
  meta?: [];
  title: string;
  keywords: string[];
  image?: any;
  url?: string;
}

function SEO({
  description,
  lang,
  meta,
  keywords = [],
  title,
  image,
  url,
}: Props) {
  return (
    <StaticQuery
      query={detailsQuery}
      render={(data) => {
        if (!data.site) {
          return;
        }
        const metaDescription = description || data.site.description;
        const metaImage = data.site.metaImage;
        const metaImageUrl =
          image || (metaImage.asset && metaImage.asset.url) || '';
        const metaUrl = url || '';

        return (
          //@ts-ignore
          <Helmet
            htmlAttributes={{
              lang,
            }}
            title={title}
            titleTemplate={
              title === data.site.title ? '%s' : `%s | ${data.site.title}`
            }
            meta={[
              {
                name: 'description',
                content: metaDescription,
              },
              {
                property: 'og:title',
                content: title,
              },
              {
                property: 'og:description',
                content: metaDescription,
              },
              {
                property: 'og:type',
                content: 'website',
              },
              {
                property: 'og:image',
                content: metaImageUrl,
              },
              {
                property: 'og:url',
                content: metaUrl,
              },
              {
                name: 'twitter:card',
                content: 'summary',
              },
              {
                name: 'twitter:title',
                content: title,
              },
              {
                name: 'twitter:image',
                content: metaImageUrl,
              },
              {
                name: 'twitter:description',
                content: metaDescription,
              },
              {
                name: 'google-site-verification',
                content: 'g-ho8fHTIeAfK-eQVDh_KdUBSUCDlabFIXQHTwAjE6o',
              },
            ]
              .concat(
                keywords && keywords.length > 0
                  ? {
                      name: 'keywords',
                      content: keywords.join(', '),
                    }
                  : [],
              )
              .concat(meta)}
          >
            <link rel="icon" href={favicon} />
          </Helmet>
        );
      }}
    />
  );
}

SEO.defaultProps = {
  lang: 'en',
  meta: [],
  keywords: [],
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.array,
  keywords: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string.isRequired,
};

export default SEO;
