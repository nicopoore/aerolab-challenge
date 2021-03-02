import { IconButton, Image, Box, Tooltip } from '@chakra-ui/react';

interface Props {
  firstPage: boolean;
  lastPage: boolean;
  previousPage: () => void;
  nextPage: () => void;
}

const NavButtons: React.FC<Props> = (props): JSX.Element => {
  const buttons = [
    {
      ariaLabel: 'Previous page',
      disabled: props.firstPage,
      iconType: 'left',
      mr: [1, 4],
      onClick: props.previousPage,
    },
    {
      ariaLabel: 'Next page',
      disabled: props.lastPage,
      iconType: 'right',
      mr: null,
      onClick: props.nextPage,
    },
  ];
  return (
    <Box>
      {buttons.map(button => (
        <Tooltip key={button.ariaLabel} label={button.ariaLabel} openDelay={150}>
          <IconButton
            aria-label={button.ariaLabel}
            disabled={button.disabled}
            h="100%"
            icon={<Image src={`/icons/arrow-${button.iconType}.svg`} />}
            mr={button.mr}
            variant="unstyled"
            onClick={button.onClick}
          />
        </Tooltip>
      ))}
    </Box>
  );
};

export default NavButtons;
