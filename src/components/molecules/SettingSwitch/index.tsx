import { Text } from '@app/components/atoms';
import React, { FC, memo } from 'react';
import { Switch } from 'react-native';
import { Container, LeftIcon, InfoContainer } from './styles';
import type { SettingSwitchProps } from './types';

const SettingSwitch: FC<SettingSwitchProps> = ({
  icon,
  style,
  title,
  iconColor = '#fff',
  switchStyle,
  ...switchProps
}) => {
  return (
    <Container style={style}>
      {icon && <LeftIcon name={icon} color={iconColor} />}
      <InfoContainer>
        <Text>{title}</Text>
        <Switch style={switchStyle} {...switchProps} />
      </InfoContainer>
    </Container>
  );
};

export default memo(SettingSwitch);
