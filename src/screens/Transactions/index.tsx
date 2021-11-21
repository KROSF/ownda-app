import { Icon, SafeSurface, Text } from '@app/components/atoms';
import React from 'react';

const Transactions = () => {
  return (
    <SafeSurface>
      <Text variant="title">Transactions</Text>
      <Icon name="bellFilled" color="#fff" />
      <Icon name="bell" color="#fff" />
      <Icon name="gear" color="#fff" />
      <Icon name="card" color="#fff" />
      <Icon name="cardFilled" color="#fff" />
      <Icon name="chevronRight" color="#fff" />
    </SafeSurface>
  );
};

export default Transactions;
