import styled from 'styled-components/native';
import { variant } from 'styled-system';
import { TextProps } from './types';

const Text = styled.Text<TextProps>(({ theme }) => [
  {
    fontSize: 16,
  },
  variant({
    variants: {
      title: {
        fontSize: 34,
        color: theme.colors.text.emphasis,
        fontWeight: 'bold',
      },
      pageTitle: {
        fontSize: 17,
        color: theme.colors.text.emphasis,
        fontWeight: 'semibold',
      },
      regular: {
        fontSize: 15,
        color: theme.colors.text.emphasis,
      },
    },
  }),
]);

Text.defaultProps = {
  variant: 'regular',
};

export default Text;
