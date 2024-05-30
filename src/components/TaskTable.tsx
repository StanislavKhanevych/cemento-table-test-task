import React from 'react';
import { useState, useEffect } from 'react';
import { Box, ButtonGroup, Icon, Text, Button, Flex } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { makeData } from '../mockedData';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import DateCell from './DateCell';
import CheckboxCell from './CheckBoxCell';
import Filters from './Filters';
import SortIcon from '../icons/SortIcon';
import ColumsHandler from './ColumsHandler';

const defaultColumns = [
  {
    accessorKey: 'firstName',
    header: 'First Name',
    size: 255,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFunction: 'includesString',
  },
  {
    accessorKey: 'lastName',
    header: 'Last Name',
    size: 255,
    cell: EditableCell,
    enableColumnFilter: true,
    filterFunction: 'includesString',
  },
  {
    accessorKey: 'due',
    header: 'Date of Birth',
    cell: DateCell,
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
    accessorKey: 'applied',
    header: 'Applied',
    cell: CheckboxCell,
    enableColumnFilter: true,
    filterFunction: 'includesString',
  },
];
const TableTask = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columns] = useState<typeof defaultColumns>(() => [...defaultColumns]);
  const LOCAL_STORAGE_KEY = 'tableData';

  useEffect(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData !== null) {
      try {
        setData(JSON.parse(storedData));
      } catch (error) {
        console.error('Error parsing stored data:', error);
      }
    } else {
      setData(makeData(100));
    }
  }, []);

  useEffect(() => {
    if (data.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
    }
  }, [data]);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    columnResizeMode: 'onChange',
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
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
      <Flex>
        <Filters
          columnFilters={columnFilters}
          setColumnFilters={setColumnFilters}
        />
        <ColumsHandler table={table} />
      </Flex>
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
