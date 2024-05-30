import React from 'react';
import { Box, HStack, Checkbox } from '@chakra-ui/react';

const ColumsHandler = ({ table }) => {
  return (
    <Box mx={5} my={5}>
      <div className="px-1 border-b red">
        <Box>
          <Checkbox
            isChecked={table.getIsAllColumnsVisible()}
            onChange={table.getToggleAllColumnsVisibilityHandler()}
          />{' '}
          Toggle All
        </Box>
      </div>
      {table.getAllLeafColumns().map((column) => {
        return (
          <HStack key={column.id} className="px-1">
            <Box>
              <Checkbox
                isChecked={column.getIsVisible()}
                onChange={column.getToggleVisibilityHandler()}
              />{' '}
              {column.columnDef.header}
            </Box>
          </HStack>
        );
      })}
    </Box>
  );
};

export default ColumsHandler;
