import { HStack, NumberInput, NumberInputField, Text } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const ComputedCell = ({ getValue, row, column, table, data }) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue);
  const { updateData } = table.options.meta || {};
  const onBlur = () => {
    updateData(row.getParentRow()?.index, column.id, value, row.index);
  };

  const calculateTotalSum = (data) => {
    let totalVisits = data[column.id] || 0;
    if (data.subRows) {
      for (const item of data.subRows) {
        totalVisits += calculateTotalSum(item);
      }
    }
    return totalVisits;
  };

  const totalSum = calculateTotalSum(row.original);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onChange = (e) => {
    if (e === '' || e === undefined) {
      setValue('');
      return;
    }
    const parsedValue = parseFloat(e);
    if (!isNaN(parsedValue) && parsedValue % 1 === 0) {
      setValue(parsedValue);
    }
  };

  return (
    <HStack w="100%" h="100%">
      <NumberInput
        defaultValue={value}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        variant="filled"
        size="sm"
        w="50%"
        h="100%"
        bg="transparent"
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
        inputMode="numeric"
      >
        <NumberInputField
          bg="transparent"
          inputMode="numeric"
          min={0}
          max={1000}
        />
      </NumberInput>
      {row.getParentRow()?.index === undefined && (
        <Text w="50%">(Total: {totalSum})</Text>
      )}
    </HStack>
  );
};
export default ComputedCell;
