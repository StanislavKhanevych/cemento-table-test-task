import React from 'react';
import { useState } from 'react';
import { Box, ButtonGroup, Icon, Text, Button } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DATA from '../mockedData';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import DateCell from './DateCell';
import Filters from './Filters';
import SortIcon from '../icons/SortIcon';

const columns = [
  {
    accessorKey: 'task',
    header: 'Task',
    size: 255,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFunction: 'includesString',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: StatusCell,
    enableColumnFilter: true,
    enableSorting: false,
    filterFn: (row, columnId, filterStatuses) => {
      if (!filterStatuses.length) return true;
      const status = row.getValue(columnId);
      return filterStatuses.includes(status?.id);
    },
  },
  {
    accessorKey: 'due',
    header: 'Due',
    cell: DateCell,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    size: 255,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFunction: 'includesString',
  },
];
const TableTask = () => {
  const [data, setData] = useState(DATA);
  const [columnFilters, setColumnFilters] = useState([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prevData) =>
          prevData.map((row, i) =>
            i === rowIndex ? { ...row, [columnId]: value } : row
          )
        ),
    },
  });

  return (
    <Box>
      <Filters
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
      />
      <Box className="table" width={table.getTotalSize()}>
        {table?.getHeaderGroups().map((headerGroup) => (
          <Box className="tr" key={headerGroup.id}>
            {headerGroup?.headers?.map((header) => (
              <Box className="th" key={header.id} width={header.getSize()}>
                {header.column.columnDef.header}
                {header.column.getCanSort() && (
                  <Icon
                    as={SortIcon}
                    mx={3}
                    fontSize={14}
                    onClick={header.column.getToggleSortingHandler()}
                  />
                )}
                {
                  {
                    asc: '🔼',
                    desc: '🔽',
                  }[header.column.getIsSorted() || '']
                }
                <Box
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                  key={header.id}
                  className={`resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`}
                />
              </Box>
            ))}
          </Box>
        ))}
        {table.getRowModel().rows.map((row) => (
          <Box key={row.id} className="tr">
            {row.getVisibleCells().map((cell) => (
              <Box key={cell.id} className="td" width={cell.column.getSize()}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Text my={2}>
        Page {table.getState().pagination.pageIndex + 1} of{' '}
        {table.getPageCount()}
      </Text>
      <ButtonGroup size="sm" isAttached variant="outline" my={1}>
        <Button
          onClick={() => table.previousPage()}
          isDisabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </Button>
        <Button
          onClick={() => table.nextPage()}
          isDisabled={!table.getCanNextPage()}
        >
          {'>'}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default TableTask;
