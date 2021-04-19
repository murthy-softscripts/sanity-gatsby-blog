import { Link, useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import {
  MagazinePostLargePreview,
  MagazinePostMediumPreview,
} from './magazine-post-preview';

import './magazine-post-preview-grid.scss';
import ZeroButton from './zero-button';

interface IProps {
  nodes: IMagazinePost[];
  browseMoreHref: string;
  largeOrientation?: string;
}

function MagazinePostPreviewGrid(props: IProps) {
  const data = useStaticQuery(graphql`
    query MagazinePostPreviewGrid {
      magazine: sanityMagazine {
        title
      }
    }
  `);

  let chosenFeatured = false;
  let nodes = [];
  // set most recent featured post as large, the rest fall in chronological order
  props.nodes.map((node) => {
    if (node.featured && chosenFeatured === false) {
      chosenFeatured = true;
      nodes.unshift(node);
    } else {
      nodes.push(node);
    }
  });
  return (
    <div className={`magazine-post-preview-grid--root`}>
      <Link
        to={'/magazine'}
        className="magazine-post-preview-grid--section-header"
      >
        Magazine: {data.magazine.title}
      </Link>
      <div className="magazine-post-preview-grid--grid">
        {nodes &&
          nodes.map((node, i: number) => {
            if (i === 0) {
              return (
                <MagazinePostLargePreview
                  {...node}
                  orientation={
                    props.largeOrientation ? props.largeOrientation : 'left'
                  }
                  key={i}
                  delay={i * 100}
                />
              );
            } else {
              return (
                <MagazinePostMediumPreview
                  {...node}
                  key={i}
                  delay={i * 100}
                  className="index-page-mobile-hide"
                />
              );
            }
          })}
      </div>
      {props.browseMoreHref && (
        <div className="magazine-post-preview-grid--browseMoreNav">
          <Link to={props.browseMoreHref}>
            <ZeroButton
              title="READ THE MAGAZINE"
              color="accent"
              enabled={true}
              highlight="white"
              onClick={(e) => {}}
              classExtra="zero-button--standard"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

MagazinePostPreviewGrid.defaultProps = {
  title: '',
  nodes: [],
  browseMoreHref: '',
};

export default MagazinePostPreviewGrid;
