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
            {[1000, 5000, 7500].map(number => (
              <Button key={`add-${number}`} onClick={() => handleAdd(number)}>
                <Text>Add {number}</Text>
              </Button>
            ))}
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddPoints;
