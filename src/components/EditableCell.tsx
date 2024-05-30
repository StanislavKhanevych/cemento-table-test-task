import { HStack, Input, Button } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const EditableCell = ({ getValue, row, column, table }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const { updateData } = table.options.meta || {};

  const onBlur = () => {
    updateData(row.getParentRow()?.index, column.id, value, row.index);
  };

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <HStack>
      {row.getCanExpand() && column.id === 'firstName' ? (
        <Button
          size="sm"
          bg="transparent"
          onClick={row.getToggleExpandedHandler()}
        >
          {row.getIsExpanded() ? '👇' : '👉'}
        </Button>
      ) : null}{' '}
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        variant="filled"
        size="sm"
        w="85%"
        bg="transparent"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      />
    </HStack>
  );
};
export default EditableCell;
