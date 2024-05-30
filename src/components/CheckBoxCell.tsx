import React, { useState, useEffect } from 'react';
import { Checkbox, Center } from '@chakra-ui/react';

const CheckboxCell = ({ getValue, row, column, table }) => {
  const { updateData } = table.options.meta || {};
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    updateData(row.index, column.id, value);
  }, [value]);

  return (
    <Center w="100%" h="100%">
      <Checkbox isChecked={value} onChange={() => setValue(!value)} />
    </Center>
  );
};

export default CheckboxCell;
