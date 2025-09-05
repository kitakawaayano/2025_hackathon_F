import React from 'react';
import './SideMenu/SideMenu.css';

const Link = (props) => {
  return (
    <a href={props.to}>{props.text}</a>
  );
};

export default Link;
