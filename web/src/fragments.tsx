import { graphql } from 'gatsby';

export const PostPreviewFragment = graphql`
  fragment PostPreview on SanityPost {
    id
    publishedAt
    featured
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
    _rawExcerpt
    _rawBody
    slug {
      current
    }
    authors {
      _key
      author {
        name
      }
      roles
    }
  }
`;
