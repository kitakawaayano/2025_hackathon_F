import React from 'react';

const Link = (props) => {
  return (
    <a href={props.to}>{props.text}</a>
  );
};

export default Link;
