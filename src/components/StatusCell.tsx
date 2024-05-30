import { Menu, MenuButton, MenuList, MenuItem, Box } from '@chakra-ui/react';
import { STATUSES } from '../mockedData';

export const StatusColorIcon = ({ color, ...props }) => (
  <Box w="12px" h="12px" bg={color} borderRadius="3" {...props} />
);

const StatusCell = ({ getValue, row, column, table }) => {
  const { name, color } = getValue() || {};
  const { updateData } = table.options.meta || {};
  console.log('getValue, row, column, table', getValue, row, column, table);
  return (
    <Menu
      bg={'gray.900'}
      isLazy
      offset={[0, 0]}
      flip={false}
      autoSelect={false}
    >
      <MenuButton
        h="100%"
        w="100%"
        textAlign="left"
        p={1.5}
        bg={color || 'transparent'}
        color={'gray.900'}
      >
        {name || 'Select status'}
      </MenuButton>
      <MenuList bg={'gray.900'}>
        <MenuItem
          bg={'gray.900'}
          onClick={() => updateData(row.index, column.id, null)}
        >
          <StatusColorIcon color={'red.400'} mr="5px" />
          None
        </MenuItem>
        {STATUSES.map((status) => {
          return (
            <MenuItem
              bg={'gray.900'}
              key={status.id}
              onClick={() => {
                updateData(row.index, column.id, status);
              }}
            >
              <StatusColorIcon color={status.color} mr="5px" />
              {status.name}
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
};

export default StatusCell;
