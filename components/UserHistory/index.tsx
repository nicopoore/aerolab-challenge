import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Button,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useSWR from 'swr';
import { fetcher, formatDate } from '../../utils/functions';
import { HistoryItemRawType, HistoryItemType } from '../../utils/types';
import HistoryItem from './HistoryItem';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const UserHistory: React.FC<Props> = props => {
  const [isGrouped, setIsGrouped] = useState(true);
  const [itemLimit, setItemLimit] = useState(10);
  const initialRef = React.useRef();

  const { data, error } = useSWR('/api/user/history', fetcher);
  if (error) return <p>Error loading products</p>;
  if (!data) return <p>Loading products...</p>;

  const groupData = (data: HistoryItemRawType[]): HistoryItemType[] => {
    return data.reduce((acc: any, historyItem: any) => {
      const temporaryAcc = acc.filter(
        (item: HistoryItemRawType) =>
          item.productId === historyItem.productId &&
          formatDate(item.createDate) === formatDate(historyItem.createDate)
      );
      temporaryAcc.length > 0 ? (temporaryAcc[0].qty += 1) : acc.push({ ...historyItem, qty: 1 });
      return acc;
    }, []);
  };

  const handleGroupSwitch = (): void => {
    setIsGrouped(() => !isGrouped);
    setItemLimit(() => 10);
  };

  const onClose = (): void => {
    props.onClose();
    setItemLimit(() => 10);
  };

  const handleLoadMore = (): void => setItemLimit(() => itemLimit + 10);

  const history = isGrouped ? groupData(data) : data;

  return (
    <Modal initialFocusRef={initialRef} isOpen={props.isOpen} size="4xl" onClose={onClose}>
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
            onClick={handleGroupSwitch}
          >
            {isGrouped ? 'Ungroup items' : 'Group items'}
          </Button>
          <Stack mt={3}>
            {history
              .sort((a: HistoryItemType, b: HistoryItemType) =>
                a.createDate > b.createDate ? -1 : 1
              )
              .slice(0, itemLimit)
              .map((historyItem: HistoryItemType, i: number, arr: HistoryItemType[]) => (
                <HistoryItem
                  key={historyItem.createDate}
                  isLast={arr.length - 1 === i}
                  item={historyItem}
                />
              ))}
          </Stack>
        </ModalBody>
        {itemLimit < history.length && (
          <ModalFooter>
            <Button onClick={handleLoadMore}>Load more</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  );
};

export default UserHistory;
