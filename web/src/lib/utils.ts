import { useEffect, useRef, useState } from 'react';

export const sortStreams = (streams) => {
  const curTime = new Date();
  const activeStreams = [];
  const archivedStreams = [];
  let nextStream = null;
  streams.map((stream) => {
    const didStart = stream.startTime < curTime.valueOf();
    const didNotEnd = stream.endTime > curTime.valueOf();
    const isEnabled = !stream.disabled;
    if (isEnabled) {
      if (didStart) {
        if (didNotEnd) {
          activeStreams.push(stream);
        } else {
          archivedStreams.push(stream);
        }
      } else {
        nextStream = stream;
      }
    }
  });
  return {
    activeStreams,
    nextStream,
    archivedStreams,
  };
};

// const parseCookie = (str: string) => {
//   return str
//     .split(';')
//     .map((v) => v.split('='))
//     .reduce((acc, v) => {
//       acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
//       return acc;
//     }, {});
// };
// const stringifyCookie = (obj) => {
//   let str = '';
//   Object.keys(obj).map((key) => {
//     str += `${str !== '' && ';'}${key}=${obj[key]}`;
//   });
//   return str;
// };

export const hasUserSignedUp = () => {
  if (typeof localStorage !== 'undefined') {
    return localStorage.getItem('ww0--hasUserSignedUp') === 'true';
  } else {
    return false;
  }
};
export const setUserHasSignedUp = () => {
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('ww0--hasUserSignedUp', 'true');
  }
};

export const useInterval = (callback, delay) => {
  const savedCallback = useRef(null);

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

export const useAnimation = (
  easingName = 'linear',
  duration = 500,
  delay = 0,
) => {
  const elapsed = useAnimationTimer(duration, delay);

  const n = Math.min(1, elapsed / duration);
  return easing[easingName](n);
};

// https://github.com/streamich/ts-easing/blob/master/src/index.ts
const easing = {
  linear: (n) => n,
  outExpo: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -30 * t)), //changed to -30 for extra smoothness
};

export const useAnimationTimer = (duration = 1000, delay = 0) => {
  const [elapsed, setTime] = useState(0);

  useEffect(
    () => {
      let animationFrame, timerStop, start;

      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }

      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }

      function onStart() {
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);

        // Start the loop
        start = Date.now();
        loop();
      }

      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);

      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay], // Only re-run effect if duration or delay changes
  );

  return elapsed;
};

export const formatNumber = (number: number) => {
  return number
    .toFixed(0)
    .toString()
    .split('')
    .reverse()
    .join('')
    .match(/.{1,3}/g)
    .map((x) => x.split('').reverse().join(''))
    .reverse()
    .join(',');
};

export const formatShare = (url: string, content: string, link: string) => {
  return url.replace('[content]', content).replace('[link]', link);
};

export const stringifyUrlVars = (obj: object) => {
  return JSON.stringify(obj)
    .replace(/{/g, '?')
    .replace(/":/g, '=')
    .replace(/}/g, '')
    .replace(/"/g, '')
    .replace(/,/g, '&');
};

export const parseUrlVars = (url: string): object => {
  let vars = {};
  url.replace(
    /[?&]+([^=&]+)=([^&]*)/gi,
    (m: any, key: any, value: any): string => {
      //@ts-ignore
      return (vars[key] = value);
    },
  );
  return vars;
};

export const rangeMap = (
  num: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};
