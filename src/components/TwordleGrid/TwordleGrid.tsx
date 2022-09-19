import React from 'react';
import './TwordleGrid.css';

const TwordleGrid = (props: React.HTMLProps<any>) => {
  return (
    <div className="TwordleGrid">
      {props.children}
    </div>
  )
}

export default TwordleGrid;
