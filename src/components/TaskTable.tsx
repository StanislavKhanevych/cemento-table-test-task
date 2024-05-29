import { useState } from 'react';
import { Box, Table } from '@chakra-ui/react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import DATA from '../mockedData';

const columns = [
  {
    accessorKey: 'task',
    header: 'Task',
    Cell: (props) => <p>{props.getValue()}</p>,
  },
  {
    accessorKey: 'status',
    header: 'Status',
    Cell: (props) => <p>{props.getValue()?.name}</p>,
  },
  {
    accessorKey: 'due',
    header: 'Due',
    Cell: (props) => <p>{props.getValue()?.toLocaleTimeString()}</p>,
  },
  {
    accessorKey: 'notes',
    header: 'Notes',
    Cell: ({ value }) => <p>{value}</p>,
  },
];
const TableTask = () => {
  const [data, setData] = useState(DATA);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Box>
      <Box className="table" width={table.getTotalSize()}>
        {table?.getHeaderGroups().map((headerGroup) => (
          <Box key={headerGroup.id} className="tr">
            {headerGroup?.headers?.map((header) => (
              <Box key={header.id} className="th" width={header.getSize()}>
                {header.column.columnDef.header}
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
    </Box>
  );
};

export default TableTask;
