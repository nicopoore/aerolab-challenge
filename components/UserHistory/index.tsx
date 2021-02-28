import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Stack,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import { HistoryItemRawType, HistoryItemType } from '../../types';
import HistoryItem from './HistoryItem';

const fetcher = async (url: string): Promise<any> =>
  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    cache: 'default',
  }).then(res => res.json());

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UserHistory: React.FC<Props> = props => {
  const [isGrouped, setIsGrouped] = useState(true);

  const { data, error } = useSWR('/api/user/history', fetcher);
  if (error) return <p>Error loading products</p>;
  if (!data) return <p>Loading products...</p>;

  const formatDate = (date: string): string => {
    const newDate = new Date(Date.parse(date));
    return newDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const groupedData = (data: HistoryItemRawType[]): HistoryItemType[] => {
    const result = data.reduce((acc: any, historyItem: any) => {
      const temporaryAcc = acc.filter(
        (item: HistoryItemRawType) =>
          item.productId === historyItem.productId &&
          formatDate(item.createDate) === formatDate(historyItem.createDate)
      );
      temporaryAcc.length > 0 ? (temporaryAcc[0].qty += 1) : acc.push({ ...historyItem, qty: 1 });
      return acc;
    }, []);
    return result;
  };

  const handleClick = (): void => setIsGrouped(() => !isGrouped);

  const history = isGrouped ? groupedData(data) : data;
  const initialRef = React.useRef();

  return (
    <Modal initialFocusRef={initialRef} isOpen={props.isOpen} size="4xl" onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>User history</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Button
            ref={initialRef}
            _hover={{ bgColor: isGrouped ? 'cyan.500' : 'gray.300' }}
            bgColor={isGrouped ? 'cyan.400' : 'gray.200'}
            color={isGrouped ? 'white' : 'gray.500'}
            onClick={handleClick}
          >
            Group items
          </Button>
          <Stack>
            {history.map((historyItem: HistoryItemType, i: number, arr: HistoryItemType[]) => (
              <HistoryItem
                key={historyItem.createDate}
                isLast={arr.length - 1 === i}
                item={historyItem}
              />
            ))}
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default UserHistory;
