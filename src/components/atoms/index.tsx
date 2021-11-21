import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export { default as Text } from './Text';
export { default as Icon } from './Icon';

export const Surface = styled.View({ flex: 1 });

export const SafeSurface = styled(SafeAreaView)({
  flex: 1,
  marginHorizontal: 16,
});

SafeSurface.defaultProps = {
  edges: ['top', 'bottom'],
  mode: 'padding',
};
