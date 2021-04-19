import React, { useState } from 'react';
import { mapEdgesToNodes } from '../lib/helpers';
import Container from './container';
import GraphQLErrorList from './graphql-error-list';
import Layout from '../containers/layout';

import './magazine-category.scss';
import { MagazinePostMediumPreview } from './magazine-post-preview';

import MagazineFilterBar from './magazine-filter-bar';

const MagazineCategory = ({ title, posts }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <Container>
      <div className="layout--header--title">{title}</div>

      <div className="magazine-category--grid">
        <div className="magazine-grid--filter-bar-container">
          <MagazineFilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={(category) => {
              setSelectedCategory(category);
            }}
            isCategoryPage={true}
            startCollapsed={true}
          />
        </div>
      </div>
      <div className="magazine-category--grid magazine-category--grid-post-previews">
        {posts &&
          posts.length > 0 &&
          posts.map(
            (node) =>
              (selectedCategory === null ||
                node.categories.find(
                  (cat) => cat.title === selectedCategory.title,
                )) && (
                <MagazinePostMediumPreview
                  {...node}
                  key={node.id}
                  delay={100}
                />
              ),
          )}
      </div>
    </Container>
  );
};

export default MagazineCategory;
