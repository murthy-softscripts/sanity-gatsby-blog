import React, { useState } from 'react';
import { Link } from 'gatsby';
import {
  MagazinePostBannerPreview,
  MagazinePostLargePreview,
  MagazinePostMediumPreview,
  MagazinePostSmallPreview,
} from './magazine-post-preview';

import './magazine-grid.scss';
import ZeroButton from './zero-button';

import MagazineFilterBar from './magazine-filter-bar';

function MagazinePostPreviewTopGrid({ nonFeaturedNodes, popularNodes }) {
  return (
    <>
      {nonFeaturedNodes && nonFeaturedNodes.length > 0 && (
        <MagazinePostMediumPreview {...nonFeaturedNodes[0]} delay={100} />
      )}
      {nonFeaturedNodes && nonFeaturedNodes.length > 1 && (
        <MagazinePostMediumPreview {...nonFeaturedNodes[1]} delay={300} />
      )}
      {popularNodes && popularNodes.length > 0 && (
        <div className="magazine-grid--popular-grid">
          <div className="magazine-grid--popular-grid--header" key={0}>
            POPULAR
          </div>
          {popularNodes &&
            popularNodes.length > 0 &&
            popularNodes.map((node, i: number) => (
              <React.Fragment key={i}>
                <MagazinePostSmallPreview {...node} key={node.id} />{' '}
                {i !== popularNodes.length - 1 && (
                  <div
                    className="magazine-grid--popular-grid--divider"
                    key={`${node.id}_div`}
                  ></div>
                )}
              </React.Fragment>
            ))}
        </div>
      )}
    </>
  );
}

function MagazinePostPreviewRepeatingGrid({
  featuredNodes,
  nonFeaturedNodes,
  featuredPageSize = 2,
  nonFeaturedPageSize = 3,
}) {
  return (
    <>
      {[...Array(featuredPageSize)].map((_, i) => {
        const orientation = i % 2;
        const node = featuredNodes[i];
        if (!node) return null;
        return (
          <MagazinePostLargePreview
            key={i}
            {...node}
            orientation={orientation == 1 ? 'right' : 'left'}
            className="magazine-page"
          />
        );
      })}
      {[...Array(nonFeaturedPageSize)].map((_, i, array) => {
        const node = nonFeaturedNodes[i];
        if (!node) return null;
        const isFirst = i == 0 && 'first';
        const isLast = i == array.length - 1 && 'last';
        return (
          <MagazinePostMediumPreview
            key={i}
            {...node}
            delay={100 * i}
            className={[isFirst, isLast].filter((v) => !!v).join(' ')}
          />
        );
      })}
    </>
  );
}

function MagazinePostPreviewGrid({
  bannerNodes,
  featuredNodes,
  nonFeaturedNodes,
  popularNodes,
  featuredPageSize = 2,
  nonFeaturedPageSize = 3,
}) {
  const [page, setPage] = useState(1);

  let bannerPostPreview = null;
  if (bannerNodes && bannerNodes.length > 0) {
    bannerPostPreview = <MagazinePostBannerPreview {...bannerNodes[0]} />;
  } else if (featuredNodes && featuredNodes.length > 0)
    bannerPostPreview = <MagazinePostBannerPreview {...featuredNodes[0]} />;

  const nextPage = page + 1;

  const hasMoreFeatured = featuredNodes.length > page * featuredPageSize;
  const hasMoreNonFeatured =
    nonFeaturedNodes.length - 2 > page * nonFeaturedPageSize;
  const hasMore = hasMoreFeatured || hasMoreNonFeatured;

  // set most recent featured post as large, the rest fall in chronological order
  return (
    <div className="magazine-grid--root">
      <div className="magazine--grid--grid">
        {bannerPostPreview}
        <div className="magazine-grid--filter-bar-container">
          {/* Banner */}
          <MagazineFilterBar
            selectedCategory={null}
            onCategoryChange={(category) => {
              // setSelectedCategory(category);
            }}
            isCategoryPage={false}
            startCollapsed={true}
          />
        </div>
        {/* Core */}
        <MagazinePostPreviewTopGrid
          popularNodes={popularNodes}
          nonFeaturedNodes={nonFeaturedNodes}
        />
        {[...Array(page)].map((_, i) => {
          return (
            <MagazinePostPreviewRepeatingGrid
              key={i}
              featuredNodes={featuredNodes.slice(i * featuredPageSize)}
              nonFeaturedNodes={nonFeaturedNodes.slice(
                2 + i * nonFeaturedPageSize,
              )}
              featuredPageSize={featuredPageSize}
              nonFeaturedPageSize={nonFeaturedPageSize}
            />
          );
        })}
      </div>
      <div className="magazine--grid--grid">
        {hasMore && (
          <ZeroButton
            title="VIEW MORE"
            classExtra={`zero-button--standard magazine-grid--view-more-button`}
            enabled={true}
            color="accent"
            highlight="white"
            onClick={() => {
              setPage(page + 1);
            }}
          />
        )}
      </div>
    </div>
  );
}

MagazinePostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default MagazinePostPreviewGrid;
