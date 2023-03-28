import React from 'react';
import './Grid.css';

export interface TwordleGridProps extends React.HTMLProps<any> {
 isActive: boolean;
}

const Grid = ({ children }: TwordleGridProps) => {
  return (
    <div className="Grid">
      {children}
    </div>
  )
}

Grid.defaultProps = {
 isActive: true,
}

export default Grid;
