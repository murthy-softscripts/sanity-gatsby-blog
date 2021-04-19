import React from 'react';
import { graphql } from 'gatsby';
import MagazinePost from '../components/magazine-post';
import SEO from '../components/seo';
import Layout from '../containers/layout';
import { buildImageObj, getMagazineUrl } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';

export const query = graphql`
  query MagazinePostTemplateQuery($id: String!) {
    post: sanityPost(id: { eq: $id }) {
      id
      publishedAt
      categories {
        _id
        title
        slug {
          current
        }
      }
      mainImage {
        crop {
          _key
          _type
          top
          bottom
          left
          right
        }
        hotspot {
          _key
          _type
          x
          y
          height
          width
        }
        asset {
          _id
        }
        alt
      }
      title
      slug {
        current
      }
      _rawBody
      authors {
        _key
        author {
          image {
            crop {
              _key
              _type
              top
              bottom
              left
              right
            }
            hotspot {
              _key
              _type
              x
              y
              height
              width
            }
            asset {
              _id
            }
          }
          name
          _rawBio
        }
        roles
      }
    }
    social: allSanitySocial(
      filter: { enabled: { eq: true }, shareable: { eq: true } }
    ) {
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
        shareUrl
      }
    }
  }
`;
interface IProps {
  errors: Error[];
  data: {
    post: IMagazinePost;
    social: ISocial;
  };
}

const MagazinePostTemplate = (props: IProps) => {
  const { data, errors } = props;
  const post = data && data.post;
  const social = data && data.social;

  const magazineUrl = getMagazineUrl(post.publishedAt, post.slug.current);

  const mainImage = imageUrlFor(buildImageObj(post.mainImage))
    .width(1200)
    .height(Math.floor((9 / 16) * 1200))
    .fit('crop')
    .format('pjpg')
    .url();

  let description = post._rawBody[0].children[0].text;
  if (description.length > 10) {
    description = description.substring(0, 150) + '...';
  } else {
    description += '...';
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        description={description}
        image={mainImage}
        url={magazineUrl}
      />
      {post && <MagazinePost post={post} social={social} />}
    </Layout>
  );
};

export default MagazinePostTemplate;
