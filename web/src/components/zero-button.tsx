import React from 'react';

import './zero-button.scss';

interface IProps {
  title: string;
  onClick: Function;
  color?: string;
  highlight?: string;
  enabled: boolean;
  classExtra?: string;
}

export default ({
  title,
  color,
  highlight,
  onClick,
  enabled,
  classExtra,
}: IProps) => {
  return (
    <button
      className={`zero-button zero-button--${color || `black`} 
			${enabled !== false ? 'zero-button--enabled' : 'zero-button--disabled'} 
      zero-button zero-button--highlight-${highlight || `primary`}
			${classExtra || ''}`}
      onClick={(e) => enabled !== false && onClick(e)}
      disabled={!enabled}
    >
      {/* <div className="zero-button--text"> */}
      {title}
      {/* </div> */}
      <div className="zero-button--underline"></div>
    </button>
  );
};
