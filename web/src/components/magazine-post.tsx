import { format, distanceInWords, differenceInDays } from 'date-fns';
import React from 'react';
import '../types/types';
import { buildImageObj } from '../lib/helpers';
import { imageUrlFor } from '../lib/image-url';
import BlockContent from './block-content';
import Container from './container';
import MagazineInfo from './magazine-info';
import MagazineFooter from './magazine-footer';
import { Disqus, CommentCount } from 'gatsby-plugin-disqus';

import './magazine-post.scss';
import { Link } from 'gatsby';

interface IProps {
  post: IMagazinePost;
  social: ISocial;
}

const MagazinePostAboutAuthors = ({ authors }) => {
  // const multiple = authors.length > 1;

  const authorsWithBios = authors.filter(({ author }) => !!author._rawBio);
  if (authorsWithBios.length < 1) return null;

  return (
    <div className="magazine-post--author-content">
      {authors && authors.length > 0 && (
        <>
          {/* <h3>About the {multiple ? 'Authors' : 'Author'}</h3> */}
          {authorsWithBios.map(({ author }) => {
            return (
              <>
                <h4 className="magazine-post--author-title">
                  About {author.name}
                </h4>
                <BlockContent blocks={author._rawBio} />
              </>
            );
          })}
        </>
      )}
    </div>
  );
};

const MagazinePost = ({ post, prevNext, social }) => {
  let disqusConfig = null;
  if (typeof location !== 'undefined') {
    disqusConfig = {
      url: typeof location !== 'undefined' && location.href,
      identifier: post.id,
      title: post.title,
    };
  }

  // const category = post.categories.length > 0 && post.categories[0];
  const mainImage = imageUrlFor(buildImageObj(post.mainImage))
    .width(1200)
    .height(Math.floor((9 / 16) * 1200))
    .fit('crop')
    .format('pjpg')
    .url();

  return (
    <article className="magazine-post--root">
      <div className="magazine-post--category--container">
        {post.categories.map((category) => (
          <Link
            className="magazine-post--category"
            to={`/magazine/category/${category.slug?.current}`}
          >
            {category.title.toUpperCase()}
          </Link>
        ))}
      </div>

      {/* {category && (
        <Link
          className="magazine-post--category"
          to={`/magazine/category/${category.slug?.current}`}
        >
          {category.title.toUpperCase()}
        </Link>
      )} */}
      <h2 className="magazine-post--title">{post.title}</h2>
      {mainImage && (
        <div className="magazine-post--main-image">
          <img src={mainImage} alt={post.mainImage.alt} />
        </div>
      )}
      <aside className="magazine-post--metaContent">
        {post.publishedAt && (
          <MagazineInfo
            title={post.title}
            authors={post.authors}
            date={post.publishedAt}
            social={social}
          />
        )}
      </aside>
      <Container>
        <div className="magazine-post--grid">
          <div className="magazine-post--main-content">
            {post._rawBody && <BlockContent blocks={post._rawBody} />}
          </div>
          <MagazinePostAboutAuthors authors={post.authors} />
        </div>
      </Container>

      <MagazineFooter post={post} social={social} />
      {disqusConfig && (
        <div className="magazine-post--disqus-container">
          <CommentCount config={disqusConfig} placeholder={'...'} />
          <Disqus config={disqusConfig} />
        </div>
      )}
    </article>
  );
};

export default MagazinePost;
