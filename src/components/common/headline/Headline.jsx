import React from 'react';
import './headline.css';

export default function Headline(props) {
  return (
    <h1 className="headline">{props.title}</h1>
  );
}