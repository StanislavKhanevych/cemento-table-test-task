import React, { useState, useEffect } from 'react';
import { Checkbox, Center } from '@chakra-ui/react';

const CheckboxCell = ({ getValue, row, column, table }) => {
  const { updateData } = table.options.meta || {};
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);

  const onChange = () => {
    const newValue = !value;
    setValue(newValue);
    updateData(row.getParentRow()?.index, column.id, newValue, row.index);
  };

  return (
    <Center w="100%" h="100%">
      <Checkbox isChecked={value} onChange={onChange} />
    </Center>
  );
};

export default CheckboxCell;
