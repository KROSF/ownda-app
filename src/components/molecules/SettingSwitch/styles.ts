import styled from 'styled-components/native';
import IconBase from '@app/components/atoms/Icon';

export const Container = styled.View(({ theme }) => ({
  alignItems: 'center',
  flexDirection: 'row',
  paddingVertical: 6,
  paddingHorizontal: theme.spacing.default,
  backgroundColor: theme.colors.canvas.subtle,
  height: 43,
}));

export const LeftIcon = styled(IconBase)(({ theme }) => ({
  marginRight: theme.spacing.medium,
}));

export const InfoContainer = styled.View({
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
});
