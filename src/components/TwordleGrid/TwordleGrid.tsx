import React from 'react';
import './TwordleGrid.css';

export interface TwordleGridProps extends React.HTMLProps<any> {
 isActive: boolean;
}

const TwordleGrid = ({ children }: TwordleGridProps) => {
  return (
    <div className="TwordleGrid">
      {children}
    </div>
  )
}

TwordleGrid.defaultProps = {
 isActive: true,
}

export default TwordleGrid;
