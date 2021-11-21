import { Icon, Text } from '@app/components/atoms';
import React, { FC, memo } from 'react';
import { Container, LeftIcon, InfoContainer, ArrowContainer } from './styles';
import type { SettingButtonProps } from './types';

const SettingButton: FC<SettingButtonProps> = ({
  icon,
  style,
  title,
  info,
  iconColor = '#fff',
  onPress,
  enabled,
}) => {
  return (
    <Container style={style} onPress={onPress} enabled={enabled}>
      {icon && <LeftIcon name={icon} color={iconColor} />}
      <InfoContainer>
        <Text>{title}</Text>
        <ArrowContainer>
          {info && <Text>{info}</Text>}
          <Icon name="chevronRight" color="#fff" />
        </ArrowContainer>
      </InfoContainer>
    </Container>
  );
};

export default memo(SettingButton);
