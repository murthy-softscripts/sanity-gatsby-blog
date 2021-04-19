import React, { useState, useEffect, useRef } from 'react';
import Image from 'gatsby-image';
import '../types/types';
import { useVirtual } from 'react-virtual';

import leftArrow from '../assets/svg/left-arrow.svg';
import rightArrow from '../assets/svg/right-arrow.svg';

import './people-grid.scss';

function ProfileCard(thisPerson: IPerson) {
  const fullName =
    (thisPerson.firstName || '') + ' ' + (thisPerson.lastName || '');

  return (
    <div className="people-grid--thumb">
      <div className="people-grid--thumb--overlay">
        <div className="people-grid--thumb--headline">
          <div className="people-grid--thumb--headline--name">{fullName}</div>
          <div className="people-grid--thumb--headline--title">
            {thisPerson.title || '...'}
          </div>
        </div>
      </div>
      {thisPerson.image && thisPerson.image.asset && (
        <Image
          fixed={thisPerson.image.asset.localImage.childImageSharp.fixed}
          alt={fullName}
        />
      )}
    </div>
  );
}

function PeopleGrid({
  items,
  scrollIncrement = 400,
  width = 179,
  desktopIncrement = 18,
  tabletIncrement = 6,
}) {
  const [isPhotoView, setIsPhotoView] = useState(1);
  const isPhotoViewRef = useRef(isPhotoView);
  isPhotoViewRef.current = isPhotoView;

  const [focusItem, setFocusItem] = useState(0);
  const focusItemRef = useRef(focusItem);
  focusItemRef.current = focusItem;

  const [focusItemDesktop, setFocusItemDesktop] = useState(0);
  const focusItemDesktopRef = useRef(focusItemDesktop);
  focusItemDesktopRef.current = focusItemDesktop;

  const [gridListPageIndex, setGridListPageIndex] = useState(0);

  const [isAutoScroll, setIsAutoScroll] = useState(false);
  const isAutoScrollRef = useRef(isAutoScroll);
  isAutoScrollRef.current = isAutoScroll;

  const [scrollRight, setScrollRight] = useState(0);
  const scrollRightRef = useRef(scrollRight);
  scrollRightRef.current = scrollRight;

  const [buttonHover, setButtonHover] = useState(false);
  const buttonHoverRef = useRef(buttonHover);
  buttonHoverRef.current = buttonHover;

  const [images, setImages] = useState([0, 0, 0]);
  const imagesRef = useRef(images);
  imagesRef.current = images;

  const containerRef = useRef(null);
  const mobileContainerRef = useRef(null);
  const gridRef = useRef(null);

  const [overscan, setOverscan] = useState(10);

  // const overscan = 2;
  const moveGrid = (val: number, mode: string, isAuto: boolean) => {
    const element = gridRef.current;
    if (element && window) {
      const max = width * (items.length / 2) * overscan;
      const min = 0;
      const curX = element.getBoundingClientRect().x;
      let newVal = 0;

      if (isAutoScroll && isAuto !== true) {
        setIsAutoScroll(false);
        if (mode === 'add') {
          newVal = Math.abs(curX) + val;
        } else if (mode === 'subtract') {
          // newVal = Math.abs(1000) - val;
          newVal = Math.abs(element.getBoundingClientRect().x) - val;
        }
      } else {
        if (mode === 'add') {
          newVal = scrollRight + val;
        } else if (mode === 'subtract') {
          newVal = scrollRight - val;
        } else if (mode === 'set') {
          newVal = val;
        }
      }
      let newScrollRight = Math.max(min, Math.min(max, newVal));
      if (newScrollRight === scrollRight && newScrollRight > 0) {
        newScrollRight = newScrollRight - 1;
      }
      setScrollRight(newScrollRight);
    }
  };

  const moveBack = (override: boolean, count = 1) => {
    if (isPhotoViewRef.current) {
      moveGrid(scrollIncrement, 'subtract', false);
    } else {
      const newFocusItem =
        focusItemDesktopRef.current - desktopIncrement > -1
          ? focusItemDesktopRef.current - desktopIncrement * count
          : items.length - 1;
      setFocusItemDesktop(newFocusItem);
      if (!isPhotoView) {
        setGridListPageIndex(gridListPageIndex - count);
      }
      if (override !== true && isAutoScrollRef.current) {
        setIsAutoScroll(false);
      }
    }
  };
  const moveForward = (override: boolean, count = 1) => {
    setOverscan(overscan + 3);
    if (isPhotoViewRef.current) {
      moveGrid(scrollIncrement, 'add', false);
    } else {
      const newFocusItem =
        focusItemDesktopRef.current + desktopIncrement < items.length - 1
          ? focusItemDesktopRef.current + desktopIncrement * count
          : 0;
      setFocusItemDesktop(newFocusItem);
      if (!isPhotoView) {
        setGridListPageIndex(gridListPageIndex + count);
      }
      if (override !== true && isAutoScrollRef.current) {
        setIsAutoScroll(false);
      }
    }
  };

  const mobileMoveBack = (override: boolean) => {
    const increment = isPhotoViewRef.current ? 1 : tabletIncrement;
    const newFocusItem =
      focusItemRef.current - increment > -1
        ? focusItemRef.current - increment
        : items.length - 1;
    setFocusItem(newFocusItem);
    setImages(imagesRef.current.concat([newFocusItem]));
    if (override !== true && isAutoScrollRef.current) {
      setIsAutoScroll(false);
    }
  };
  const mobileMoveForward = (override?: boolean) => {
    const increment = isPhotoViewRef.current ? 1 : tabletIncrement;
    const newFocusItem =
      focusItemRef.current + increment < items.length - 1
        ? focusItemRef.current + increment
        : 0;
    setFocusItem(newFocusItem);
    setImages(imagesRef.current.concat([newFocusItem]));
    if (override !== true && isAutoScrollRef.current) {
      setIsAutoScroll(false);
    }
  };

  const autoScroll = () => {
    setIsAutoScroll(true);
    if (buttonHoverRef.current !== true) {
      moveGrid(8000, 'set', true);
      setTimeout(() => {
        if (isAutoScrollRef.current) {
          setOverscan(50);
        }
      }, 2000);
    }
  };

  const mobileAutoScroll = () => {
    isPhotoViewRef.current ? mobileMoveForward(true) : mobileMoveForward(false);
    if (isAutoScrollRef.current && isPhotoViewRef.current) {
      setTimeout(mobileAutoScroll, 2500);
    }
  };

  const parentRef = React.useRef();

  const rowVirtualizer = useVirtual({
    size: 2,
    parentRef,
    estimateSize: React.useCallback(() => 250, []),
    overscan: 0,
  });

  const columnVirtualizer = useVirtual({
    horizontal: true,
    size: 10000,
    parentRef,
    estimateSize: React.useCallback(() => width, []),
    overscan: overscan,
  });

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= -rect.height &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight + rect.height ||
          document.documentElement.clientHeight + rect.height) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function isInAutoScrollArea() {
    const gridInView = isInViewport(containerRef.current);
    const mobileGridInView = isInViewport(mobileContainerRef.current);

    if (gridInView && mobileGridInView && isPhotoViewRef.current) {
      autoScroll();
    } else {
      if (isAutoScrollRef.current) {
        moveGrid(0, 'add', false);
        setIsAutoScroll(false);
      }
    }
  }

  const GRID_COUNT = 18;

  const getGridListPages = () => {
    let pages = items.length / GRID_COUNT;
    if (pages % 1 !== 0) {
      pages = Math.floor(pages) + 1;
    }

    return pages;
  };

  const MOBILE_GRID_COUNT = 6;

  const mobileGetGridListPages = () => {
    let pages = items.length / MOBILE_GRID_COUNT;
    if (pages % 1 !== 0) {
      pages = Math.floor(pages) + 1;
    }

    return pages;
  };

  useEffect(() => {
    if (containerRef && mobileContainerRef) {
      window.addEventListener('scroll', isInAutoScrollArea, {
        passive: true,
      });

      if (isAutoScrollRef.current) setTimeout(mobileAutoScroll, 2500);

      return () => {
        window.removeEventListener('scroll', isInAutoScrollArea);
      };
    }
  }, [isAutoScroll]);

  return (
    <div className="people-grid--root" id="peopleGrid">
      <div className="people-grid--main">
        <div className="people-grid--container" ref={containerRef}>
          <div
            className="people-grid--main--photo"
            style={{ display: isPhotoView ? 'block' : 'none' }}
          >
            <>
              <div
                ref={parentRef}
                className="people-grid--grid"
                style={{
                  height: `100%`,
                  width: `100%`,
                  overflow: 'auto',
                }}
              >
                <div
                  ref={gridRef}
                  style={{
                    height: `${rowVirtualizer.totalSize}px`,
                    width: `${columnVirtualizer.totalSize}px`,
                    position: 'relative',
                    transform: `translateX(-${scrollRight}px)`,
                    transition: isAutoScroll
                      ? '300s transform linear'
                      : '0.78s transform ease',
                  }}
                >
                  {rowVirtualizer.virtualItems.map((virtualRow) => (
                    <React.Fragment key={virtualRow.index}>
                      {columnVirtualizer.virtualItems.map((virtualColumn) => {
                        const index =
                          virtualColumn.index * 2 + virtualRow.index;
                        const modIndex = index % items.length;

                        return (
                          <div
                            key={virtualColumn.index}
                            className={
                              virtualColumn.index % 2
                                ? virtualRow.index % 2 === 0
                                  ? 'ListItemOdd'
                                  : 'ListItemEven'
                                : virtualRow.index % 2
                                ? 'ListItemOdd'
                                : 'ListItemEven'
                            }
                            style={{
                              position: 'absolute',
                              top: 0,
                              left: 0,
                              width: `${virtualColumn.size}px`,
                              height: `${virtualRow.size}px`,
                              transform: `translateX(${virtualColumn.start}px) translateY(${virtualRow.start}px)`,
                            }}
                          >
                            <ProfileCard
                              key={items[modIndex].id}
                              {...items[modIndex]}
                            />
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
            <button
              className="people-grid--button people-grid--button--left"
              style={{
                backgroundImage: `url(${leftArrow})`,
                display: `${
                  !isPhotoView && gridListPageIndex === 0 ? 'none' : ''
                }`,
              }}
              onMouseOver={() => setButtonHover(true)}
              onMouseOut={() => setButtonHover(false)}
              onClick={() => moveBack(false)}
              aria-label="image grid scroll back"
            ></button>
            <button
              className="people-grid--button people-grid--button--right"
              style={{
                backgroundImage: `url(${rightArrow})`,
                display: `${
                  !isPhotoView && gridListPageIndex === getGridListPages() - 1
                    ? 'none'
                    : ''
                }`,
              }}
              onMouseOver={() => setButtonHover(true)}
              onMouseOut={() => setButtonHover(false)}
              onClick={() => moveForward(false)}
              aria-label="image grid scroll forwards"
            ></button>
          </div>
          <div
            className="people-grid--main--list"
            style={{ display: !isPhotoView ? 'grid' : 'none' }}
          >
            {items
              .slice(focusItemDesktop, focusItemDesktop + desktopIncrement)
              .map((item: IPerson) => {
                return (
                  <div className="people-grid--main--list-item" key={item.id}>
                    <div className="people-grid--main--headline">
                      {(item.firstName || '') + ' ' + (item.lastName || '')}
                    </div>
                    <div className="people-grid--main--title">
                      {item.title || '...'}
                    </div>
                  </div>
                );
              })}
            <button
              className="people-grid--button people-grid--button--left"
              style={{
                backgroundImage: `url(${leftArrow})`,
                display: `${
                  !isPhotoView && gridListPageIndex === 0 ? 'none' : ''
                }`,
              }}
              onMouseOver={() => setButtonHover(true)}
              onMouseOut={() => setButtonHover(false)}
              onClick={() => moveBack(false)}
              aria-label="image grid scroll back"
            ></button>
            <button
              className="people-grid--button people-grid--button--right"
              style={{
                backgroundImage: `url(${rightArrow})`,
                display: `${
                  !isPhotoView && gridListPageIndex === getGridListPages() - 1
                    ? 'none'
                    : ''
                }`,
              }}
              onMouseOver={() => setButtonHover(true)}
              onMouseOut={() => setButtonHover(false)}
              onClick={() => moveForward(false)}
              aria-label="image grid scroll forwards"
            ></button>
            {!isPhotoView && (
              <div className="people-grid--main--list-index">
                {[...Array(getGridListPages())].map((e, i) => (
                  <div
                    key={i}
                    className={`index-page index-page-${i} ${
                      focusItemDesktop / GRID_COUNT === i ? 'active' : ''
                    }`}
                    onClick={() => {
                      if (i < gridListPageIndex) {
                        moveBack(false, gridListPageIndex - i);
                      } else if (i > gridListPageIndex) {
                        moveForward(false, i - gridListPageIndex);
                      }
                    }}
                  ></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="people-grid--mobile" ref={mobileContainerRef}>
        <button
          className="people-grid--button people-grid--button--mobile-left"
          style={{
            backgroundImage: `url(${leftArrow})`,
            visibility: `${!isPhotoView && focusItem === 0 ? 'hidden' : ''}`,
          }}
          onClick={() => mobileMoveBack(false)}
          aria-label="image grid scroll back"
        ></button>
        <div className="empty-div"></div>
        <div className="people-grid--mobile--item">
          <div
            className="people-grid--mobile--list-view"
            style={{ display: !isPhotoView ? 'block' : 'none' }}
          >
            {items
              .slice(focusItem, focusItem + tabletIncrement)
              .map((item: IPerson, i: number) => (
                <div className="people-grid--mobile--list-item" key={i}>
                  <div className="people-grid--mobile--headline">
                    {(item.firstName || '') + ' ' + (item.lastName || '')}
                  </div>
                  <div className="people-grid--mobile--title">
                    {item.title || '...'}
                  </div>
                </div>
              ))}
          </div>
          <div
            className="people-grid--mobile--image-view"
            style={{ display: isPhotoView ? 'block' : 'none' }}
          >
            <div className="people-grid--mobile--image">
              {images.map(
                (image, i: number) =>
                  i > images.length - 3 && (
                    <img
                      key={i}
                      className={`people-grid--mobile--image--img people-grid--mobile--image--fade-${
                        i === images.length - 1 ? 'in' : ''
                      }`}
                      src={
                        items[image].image.asset.localImage.childImageSharp
                          .fixed.src
                      }
                      alt=""
                    />
                  ),
              )}
            </div>
            <div className="people-grid--mobile--headline">
              {(items[images[images.length - 1]].firstName || '') +
                ' ' +
                (items[images[images.length - 1]].lastName || '')}
            </div>
            <div className="people-grid--mobile--title">
              {items[images[images.length - 1]].title || '...'}
            </div>
          </div>
        </div>
        <div className="empty-div"></div>
        <button
          className="people-grid--button people-grid--button--mobile-right"
          style={{
            backgroundImage: `url(${rightArrow})`,
            visibility: `${
              !isPhotoView && focusItem + MOBILE_GRID_COUNT > items.length
                ? 'hidden'
                : ''
            }`,
          }}
          onClick={() => mobileMoveForward(false)}
          aria-label="image grid scroll forwards"
        ></button>
      </div>
      <div className="people-grid--view">
        <div className="people-grid--buffer"></div>
        <button
          onClick={() => setIsPhotoView(1)}
          className={`people-grid--view-button ${
            isPhotoView ? 'people-grid--view-button--toggled' : ''
          }`}
          aria-label="Switch to Image View view"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect x="1" y="1.2168" width="14" height="14" strokeWidth="2" />
          </svg>
          <span>Image View</span>
        </button>
        <button
          onClick={() => setIsPhotoView(0)}
          className={`people-grid--view-button ${
            !isPhotoView ? 'people-grid--view-button--toggled' : ''
          }`}
          aria-label="Switch to List View view"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="15"
            viewBox="0 0 16 15"
          >
            <line y1="1" x2="16" y2="1" strokeWidth="2" />
            <line y1="7.5" x2="16" y2="7.5" strokeWidth="2" />
            <line y1="14" x2="16" y2="14" strokeWidth="2" />
          </svg>
          <span>List View</span>
        </button>
        <div className="people-grid--buffer"></div>
      </div>
    </div>
  );
}

export default PeopleGrid;
