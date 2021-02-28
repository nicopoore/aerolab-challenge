import { Stack, Image, Text, Divider } from '@chakra-ui/react';
import React from 'react';
import { HistoryItemType } from '../../types';

interface Props {
  item: HistoryItemType;
  isLast?: boolean;
}

const HistoryItem: React.FC<Props> = (props): JSX.Element => {
  const { qty } = props.item;
  const formatDate = (date: string): string => {
    const newDate = new Date(Date.parse(date));
    return newDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };
  const formatNumbers = (value: number): string => value.toLocaleString('en-US');
  return (
    <>
      <Stack alignItems="center" direction="row" justify="space-between" py={3}>
        <Stack direction="row" minWidth={80}>
          <Image mr={4} src={props.item.img.url} width={24} />
          <Stack justify="center">
            <Text color="gray.400" fontSize="sm">
              {props.item.category}
            </Text>
            <Text fontSize="lg">{props.item.name}</Text>
          </Stack>
        </Stack>
        <Stack justify="center">
          <Text color={qty && 'gray.400'} fontSize={qty && 'sm'}>
            {formatDate(props.item.createDate)}
          </Text>
          {qty && <Text>Quantity: {formatNumbers(qty)}</Text>}
        </Stack>
        <Stack alignItems="flex-end" minWidth={40}>
          <Stack direction="row">
            <Text color={`${qty && 'gray.400'}`} fontSize={qty && 'sm'}>
              Item price: {formatNumbers(props.item.cost)}
            </Text>
            <Image src="/icons/coin.svg" width="25px" />
          </Stack>
          {qty && (
            <Stack direction="row">
              <Text>Total price: {formatNumbers(props.item.cost * qty)}</Text>
              <Image src="/icons/coin.svg" width="25px" />
            </Stack>
          )}
        </Stack>
      </Stack>
      {!props.isLast && <Divider />}
    </>
  );
};

export default HistoryItem;
