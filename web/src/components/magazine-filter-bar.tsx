import React, { useState, useEffect } from 'react';
import { graphql, Link, useStaticQuery } from 'gatsby';
import downArrow from '../assets/svg/down-arrow.svg';
import { mapEdgesToNodes } from '../lib/helpers';

interface IProps {
  selectedCategory: ICategory;
  onCategoryChange: Function;
  isCategoryPage: boolean;
  startCollapsed: boolean;
}

const categoryQuery = graphql`
  {
    categories: allSanityCategory(filter: { featured: { eq: true } }) {
      edges {
        node {
          id
          title
          slug {
            current
          }
        }
      }
    }
  }
`;

export default ({
  selectedCategory,
  onCategoryChange,
  isCategoryPage,
  startCollapsed,
}: IProps) => {
  const data = useStaticQuery<{ categories: ICategory[] }>(categoryQuery);

  const [filterMenuCollapsed, setFilterMenuCollapsed] = useState(
    startCollapsed,
  );
  return (
    <div className="magazine-category--filter-menu">
      <div className="magazine-category--filter-item--title">FILTER:</div>

      <div className="magazine-category--filter-items-group">
        <Link
          to="/magazine/category/all"
          className={`magazine-category--filter-item magazine-category--filter-item-all ${
            filterMenuCollapsed &&
            selectedCategory !== null &&
            'magazine-category--filter-item--hide-mobile'
          }`}
        >
          ALL
        </Link>
        {mapEdgesToNodes(data.categories).map((category: ICategory) => (
          <Link
            to={`/magazine/category/${category.slug?.current}`}
            className={`magazine-category--filter-item ${
              selectedCategory && selectedCategory.id === category.id
                ? `magazine-category--filter-item--selected ${
                    filterMenuCollapsed &&
                    'magazine-category--filter-item--show-mobile'
                  }`
                : filterMenuCollapsed &&
                  'magazine-category--filter-item--hide-mobile'
            }
`}
            key={category.id}
            onClick={() => {
              onCategoryChange(category);
            }}
          >
            {category.title.toUpperCase()}
          </Link>
        ))}
      </div>
      <div
        className={`magazine-category--arrow ${
          filterMenuCollapsed
            ? 'magazine-category--arrow--down'
            : 'magazine-category--arrow--up'
        }`}
        onClick={() => setFilterMenuCollapsed(!filterMenuCollapsed)}
      >
        <img src={downArrow} alt="" />
      </div>
    </div>
  );
};
