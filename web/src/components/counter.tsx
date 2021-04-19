import React, { useState, useEffect, useRef } from 'react';
import { useAnimation, useInterval, formatNumber } from '../lib/utils';
import '../types/types';

import './counter.scss';

interface IProps {
  count: number;
  animationDuration?: number;
  incrementDelay?: number;
  incrementChance?: number;
  maxIncrementAmount?: number;
}

export default ({
  count,
  animationDuration = 15_000,
  maxIncrementAmount = 500,
  incrementDelay = 500,
  incrementChance = 0.6,
}: IProps) => {
  const ease = useAnimation('outExpo', animationDuration, 0);
  const [incrementAmount, setIncrementAmount] = useState(0);

  useInterval(() => {
    if (incrementAmount >= maxIncrementAmount) return;
    if (Math.random() > incrementChance)
      setIncrementAmount(incrementAmount + 1);
  }, incrementDelay);

  const amount = ease * count + incrementAmount;

  return (
    <div className="counter--container">
      <div className="counter--number">{formatNumber(amount)}</div>
      <div className="counter--title">Enlistees</div>
    </div>
  );
};
