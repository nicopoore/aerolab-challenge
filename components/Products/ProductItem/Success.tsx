import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import React from 'react';
import { ProductType } from '../../../utils/types';

interface Props {
  status: string;
  userPoints: number;
  product: ProductType;
  isOpen: boolean;
  onClose: () => void;
}

const Success: React.FC<Props> = (props): JSX.Element => {
  return (
    <Modal isOpen={props.isOpen} size="xl" onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{props.status === 'success' ? 'Success!' : 'Error'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>
            {props.status === 'success'
              ? `You've successfully redeemed ${props.product.name} for ${props.product.cost}`
              : "You don't have enough points to redeem this item"}
            {props.status === 'success' && (
              <Image display="inline-block" src="/icons/coin.svg" w="24px" />
            )}
          </Text>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row" />
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Success;
