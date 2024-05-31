import React from 'react';
import { useState, useEffect } from 'react';
import { Box, ButtonGroup, Icon, Text, Button, Flex } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { makeData, defaultColumns } from '../mockedData';
import EditableCell from './EditableCell';
import StatusCell from './StatusCell';
import DateCell from './DateCell';
import CheckboxCell from './CheckBoxCell';
import ComputedCell from './ComputedCell';
import Filters from './Filters';
import SortIcon from '../icons/SortIcon';
import ColumsHandler from './ColumsHandler';

const cellMap = {
  string: EditableCell,
  boolean: CheckboxCell,
  date: DateCell,
  array: StatusCell,
  number: ComputedCell,
};

const formattedColumns = defaultColumns
  .sort((a, b) => a.ordinalNo - b.ordinalNo)
  .map((column) => {
    return {
      accessorKey: column.id,
      header: column.title,
      size: column?.width || 150,
      cell: cellMap[column.type],
      enableColumnFilter: column.type !== 'boolean',
      filterFn:
        column.type !== 'array'
          ? 'includesString'
          : (row, columnId, filterStatuses) => {
              if (!filterStatuses.length) return true;
              const status = row.getValue(columnId);
              return filterStatuses.includes(status?.id);
            },
    };
  });

const TableTask = () => {
  const [data, setData] = useState([]);
  const [columnFilters, setColumnFilters] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});
  const [columns] = useState<typeof formattedColumns>(() => [
    ...formattedColumns,
  ]);
  const [expanded, setExpanded] = useState({});
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
      setData(makeData(2000, 3));
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
      expanded,
      columnFilters,
      columnVisibility,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row) => row?.subRows,
    getExpandedRowModel: getExpandedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    autoResetPageIndex: false,
    columnResizeMode: 'onChange',
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    meta: {
      updateData: (parentRowIndex, columnId, value, rowIndex) =>
        setData((prevData) =>
          prevData.map((row, i) => {
            if (parentRowIndex === undefined) {
              return i === rowIndex ? { ...row, [columnId]: value } : row;
            } else {
              return i === parentRowIndex
                ? {
                    ...row,
                    subRows: row.subRows.map((subRow, j) =>
                      j === rowIndex ? { ...subRow, [columnId]: value } : subRow
                    ),
                  }
                : row;
            }
          })
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
