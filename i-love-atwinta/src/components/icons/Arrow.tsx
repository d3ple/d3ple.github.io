import React from 'react';

interface Props {
  direction?: 'left' | 'right',
  color?: string
}

const Arrow: React.FC<Props> = ({
  direction = 'right',
  color = '#CBD5E0'
}) => {
  return direction === 'right' ?
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M0.434988 0.219668C0.738931 -0.0732225 1.23173 -0.0732225 1.53567 0.219668L5.94602 4.46967C6.24997 4.76256 6.24997 5.23744 5.94602 5.53033L1.53567 9.7803C1.23173 10.0732 0.738931 10.0732 0.434988 9.7803C0.131046 9.4874 0.131046 9.0126 0.434988 8.7197L4.29502 5L0.434988 1.28033C0.131046 0.987438 0.131046 0.512558 0.434988 0.219668Z" fill={color} />
    </svg>
    :
    <svg width="7" height="10" viewBox="0 0 7 10" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M6.56324 9.7803C6.2593 10.0732 5.7665 10.0732 5.46255 9.7803L1.05218 5.53033C0.748233 5.23744 0.748233 4.76256 1.05218 4.46967L5.46255 0.219668C5.7665 -0.0732225 6.2593 -0.0732225 6.56324 0.219668C6.86716 0.512558 6.86716 0.987438 6.56324 1.28033L2.7032 5L6.56324 8.7197C6.86716 9.0126 6.86716 9.4874 6.56324 9.7803Z" fill={color} />
    </svg>
};

export default Arrow
