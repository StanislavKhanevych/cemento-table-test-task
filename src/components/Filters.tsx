import {
  Box,
  HStack,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import React from 'react';
import SearchIcon from '../icons/SearchIcon';
import FilterPopover from './FilterPopover';

const Filters = ({ columnFilters, setColumnFilters }) => {
  const taskName = columnFilters.find((f) => f.id === 'task')?.value || '';
  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );
  return (
    <HStack mb={6} spacing={3}>
      <InputGroup size="sm" maxW="12rem">
        <InputLeftElement pointerEvents="none">
          <Icon as={SearchIcon} />
        </InputLeftElement>
        <Input
          value={taskName}
          placeholder="Search"
          type="text"
          variant="filled"
          borderRadius={5}
          onChange={(e) => onFilterChange('task', e.target.value)}
        />
      </InputGroup>
      <FilterPopover
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
    </HStack>
  );
};

export default Filters;
