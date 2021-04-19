import React from 'react';

export const Author = ({ name }) => <span>{name}</span>;

export const Authors = ({ authors }) => {
  if (authors.length == 1) {
    return <Author name={authors[0].author.name} />;
  } else if (authors.length == 2) {
    return (
      <>
        <Author name={authors[0].author.name} />
        <span> and </span>
        <Author name={authors[1].author.name} />
      </>
    );
  } else {
    return (
      <>
        {authors.map(({ author }, i) => (
          <React.Fragment key={i}>
            <Author name={author.name} />
            {i < authors.length - 1 && <span>, </span>}
          </React.Fragment>
        ))}
      </>
    );
  }
};
