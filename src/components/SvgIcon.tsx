import React from 'react';
export interface SvgProps {
  viewBox?: string;
  color?: string;
  size?: string;
}

const SvgIcon: React.FunctionComponent<SvgProps & React.HTMLAttributes<SVGElement>> = ({
  children,
  viewBox = '0 0 24 24',
  size = '24px',
  ...rest
}) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox={viewBox} {...rest}>
      {children}
    </svg>
  );
};

export default SvgIcon;
