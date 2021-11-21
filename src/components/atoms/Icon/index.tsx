import React, { FC } from 'react';
import Svg from 'react-native-svg';
import { IconProps } from './types';
import { icons } from './icons';

const Icon: FC<IconProps> = ({
  name,
  style,
  size,
  viewBox,
  color,
  fill = color,
  fillRule,
  stroke = color,
  strokeWidth,
}) => {
  const icon = icons[name];

  return (
    <Svg
      height={size}
      width={size}
      viewBox={icon?.viewBox ?? viewBox}
      style={style}
    >
      {React.cloneElement(icon.svg, {
        fill: icon?.fill ?? fill,
        fillRule,
        stroke: icon?.stroke ?? stroke,
        strokeWidth,
      })}
    </Svg>
  );
};

Icon.defaultProps = {
  size: 24,
  viewBox: '0 0 24 24',
  color: '#000',
  fillRule: 'evenodd',
};

export default Icon;
