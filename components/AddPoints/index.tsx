import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { mutate } from 'swr';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  points: number;
}

const AddPoints: React.FC<Props> = (props): JSX.Element => {
  const handleAdd = async (amount: number): Promise<void> => {
    await fetch('/api/user/points', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: amount,
      }),
    });
    mutate('/api/user/me', { ...props, points: props.points + amount });
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add points</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>You currently have {props.points} points</Text>
        </ModalBody>
        <ModalFooter>
          <Stack direction="row">
            <Button onClick={() => handleAdd(1000)}>
              <Text>Add 1000</Text>
            </Button>
            <Button onClick={() => handleAdd(5000)}>
              <Text>Add 5000</Text>
            </Button>
            <Button onClick={() => handleAdd(7500)}>
              <Text>Add 7500</Text>
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPoints;
