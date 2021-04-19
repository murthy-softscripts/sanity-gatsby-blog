import { format } from 'date-fns';
import { imageUrlFor } from './image-url';
import { getFile } from '@sanity/asset-utils';
import sanityConfig from '../../../studio/sanity.json';

export function cn(...args) {
  return args.filter(Boolean).join(' ');
}

export function mapEdgesToNodes(data) {
  if (!data.edges) return [];
  return data.edges.map((edge) => edge.node);
}

export function filterOutDocsWithoutSlugs({ slug }) {
  return (slug || {}).current;
}

export function getMagazineUrl(publishedAt, slug) {
  return `/magazine/${format(publishedAt, 'YYYY/MM')}/${slug.current || slug}/`;
}

export function getRelatedMagazines(currentPost, allPosts) {
  const currentCategoryId = currentPost.categories[0]?._id;

  if (!currentCategoryId) {
    console.warn(`Missing category id for post ${currentPost}`);
    return [];
  }

  const selectRandomPosts = (amount) => {
    const RANDOM_INDEX = Math.floor(Math.random() * allPosts.length);

    return allPosts.nodes
      .filter((post) => post.id !== currentPost.id)
      .slice(RANDOM_INDEX, amount);
  };

  const filterRelatedCategories = () => {
    return allPosts.nodes.filter((relatedPost) => {
      if (
        relatedPost.categories.length > 0 &&
        relatedPost.id !== currentPost.id
      ) {
        return relatedPost.categories[0]._id === currentCategoryId;
      }
      return '';
    });
  };

  if (!currentCategoryId) {
    return selectRandomPosts(3);
  }

  if (currentCategoryId) {
    const filtered = filterRelatedCategories();

    switch (filtered.length) {
      case 0:
        return filtered.concat(selectRandomPosts(3));
      case 1:
        return filtered.concat(selectRandomPosts(2));
      case 2:
        return filtered.concat(selectRandomPosts(1));
      default:
        return filtered;
    }
  }
}

export function getPrevNextMagazines(currentPost, prevNextEdges) {
  const prevNext = prevNextEdges
    .filter((post) => post.node.id === currentPost.id)
    .map((post) => {
      if (post.next === null) {
        const firstPost = prevNextEdges[Object.keys(prevNextEdges)[0]];
        post.next = firstPost.node;
      }
      if (post.previous === null) {
        const lastPost = prevNextEdges[Object.keys(prevNextEdges).length - 1];
        post.previous = lastPost.node;
      }
      return post;
    })[0];

  const previousUrl =
    prevNext.previous &&
    getMagazineUrl(
      prevNext.previous.publishedAt,
      prevNext.previous.slug.current,
    );
  const nextUrl =
    prevNext.next &&
    getMagazineUrl(prevNext.next.publishedAt, prevNext.next.slug.current);

  return { previousUrl, nextUrl };
}

export function buildImageObj(source) {
  if (!source) return;
  if (!source.asset) {
    console.log('missing photo asset for ', source);
    return;
  }
  const imageObj = {
    asset: { _ref: source.asset._ref || source.asset._id },
  };

  if (source.crop) imageObj.crop = source.crop;
  if (source.hotspot) imageObj.hotspot = source.hotspot;

  return imageObj;
}

export function getImageUrlForAsset(image, width = 600, ratio = 9 / 16) {
  return imageUrlFor(buildImageObj(image))
    .width(width)
    .height(Math.floor(ratio * width))
    .format('pjpg')
    .url();
}

export function getFileUrl(file) {
  return getFile(file, sanityConfig.api).asset.url;
}
