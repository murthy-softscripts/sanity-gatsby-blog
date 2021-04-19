import React from 'react';
import getYouTubeId from 'get-youtube-id';
import YouTubeEmbed from 'react-youtube';
import './youtube.scss';
import BaseBlockContent from '@sanity/block-content-to-react';

function YouTube({ url, body }) {
  const id = getYouTubeId(url);

  return (
    <div>
      <div className="youtube-container">
        <YouTubeEmbed videoId={id} />
      </div>
      <div className="block-content--figure-text">
        <BaseBlockContent blocks={body} />
      </div>
    </div>
  );
}

export default YouTube;
