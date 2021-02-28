import { Stack, Image, Text, Divider } from '@chakra-ui/react';
import React from 'react';
import { formatDate, formatNumbers } from '../../utils/functions';
import { HistoryItemType } from '../../utils/types';

interface Props {
  item: HistoryItemType;
  isLast?: boolean;
}

const HistoryItem: React.FC<Props> = (props): JSX.Element => (
  <>
    <Stack alignItems="center" direction="row" justify="space-between" py={5}>
      <Stack direction="row" minWidth={80}>
        <Image fallbackSrc={props.item.img.url} mr={4} src={props.item.img.hdUrl} width={24} />
        <Stack justify="center">
          <Text color="gray.400" fontSize="sm">
            {props.item.category}
          </Text>
          <Text fontSize="lg">{props.item.name}</Text>
        </Stack>
      </Stack>
      <Stack justify="center">
        <Text color="gray.400" fontSize="sm">
          {formatDate(props.item.createDate)}
        </Text>
        <Text>Quantity: {props.item.qty ? formatNumbers(props.item.qty) : '1'}</Text>
      </Stack>
      <Stack alignItems="flex-end" minWidth={40}>
        <Stack direction="row">
          <Text color={`${props.item.qty && 'gray.400'}`} fontSize={props.item.qty && 'sm'}>
            Item price: {formatNumbers(props.item.cost)}
          </Text>
          <Image fallbackSrc="/icons/coin.svg" src="/icons/coin.svg" width="25px" />
        </Stack>
        {props.item.qty && (
          <Stack direction="row">
            <Text>Total price: {formatNumbers(props.item.cost * props.item.qty)}</Text>
            <Image fallbackSrc="/icons/coin.svg" src="/icons/coin.svg" width="25px" />
          </Stack>
        )}
      </Stack>
    </Stack>
    {!props.isLast && <Divider />}
  </>
);

export default HistoryItem;
