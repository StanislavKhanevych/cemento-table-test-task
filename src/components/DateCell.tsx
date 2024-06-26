import { forwardRef } from 'react';
import { Box, Center, Icon } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarIcon from '../icons/CalendarIcon';
import React from 'react';

const DateCustomInput = forwardRef(({ value, onClick, clearDate }, ref) => (
  <Center ref={ref} onClick={onClick} cursor="pointer">
    {value ? (
      <>
        {value}
        <Box
          pos="absolute"
          right={3}
          fontSize="md"
          color="red.300"
          onClick={(e) => {
            e.stopPropagation();
            clearDate();
          }}
        >
          &times;
        </Box>
      </>
    ) : (
      <Icon as={CalendarIcon} fontSize="xl" />
    )}
  </Center>
));

const DateCell = ({ getValue, row, column, table }) => {
  const date = getValue();
  const { updateData } = table.options.meta;
  return (
    <DatePicker
      wrapperClassName="date-wrapper"
      dateFormat="MMM d"
      selected={date}
      onChange={(date) =>
        updateData(row.getParentRow()?.index, column.id, date, row.index)
      }
      customInput={
        <DateCustomInput
          clearDate={() =>
            updateData(row.getParentRow()?.index, column.id, null, row.index)
          }
        />
      }
    />
  );
};
export default DateCell;
