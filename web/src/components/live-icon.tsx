import React from 'react';
import './live-icon.scss';
interface IProps {
  on: boolean;
}
export default ({ on }) => {
  return (
    <svg
      className={`live-button--icon ${(on && 'live-button--icon--on') || ''}`}
      width="59"
      height="24"
      viewBox={`0 0 59 24`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="live-text"
        d="M14.9863 16H21.2822V14.4824H16.6748V6.05371H14.9863V16ZM23.0732 16H24.7686V6.05371H23.0732V16ZM33.5596 6.05371L30.9277 13.5732H30.9004L28.2891 6.05371H26.4639L30.1758 16H31.6729L35.3779 6.05371H33.5596ZM36.9434 16H43.4922V14.4824H38.6318V11.8301H42.3232V10.3125H38.6318V7.57129H43.1982V6.05371H36.9434V16Z"
        fill={(on && '#D3F32C') || '#FFFFFF'}
      />
      <path
        className="live-text-underline"
        d="M 15 19.7 27.6 19.7 43.5 19.7 "
        stroke="#D3F32C"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {on && (
        <>
          <path
            className="live-inner-left-ring"
            d="M11 5C8.63505 6.12346 7 8.53397 7 11.3264C7 14.1188 8.63505 16.5293 11 17.6527"
            stroke="#D3F32C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="live-inner-right-ring"
            d="M48 17.6494C50.3649 16.5259 52 14.1154 52 11.323C52 8.53065 50.3649 6.12014 48 4.99668"
            stroke="#D3F32C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="live-outer-left-ring"
            d="M52 21C55.5474 19.3129 58 15.6932 58 11.5C58 7.3068 55.5474 3.68705 52 2"
            stroke="#D3F32C"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            className="live-outer-right-ring"
            d="M7 2C3.45258 3.68705 1 7.30679 1 11.5C1 15.6932 3.45258 19.3129 7 21"
            stroke="#D3F32C"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </>
      )}
    </svg>
  );
};
