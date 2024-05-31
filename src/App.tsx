import { Box, Heading } from '@chakra-ui/react';
import React from 'react';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <Box maxW={1000} mx="unset" px={6} pt={24} fontSize="sm">
      <Heading as="h1" size="2xl" mb={6}>
        Task Table
      </Heading>
      <TaskTable />
    </Box>
  );
}

export default App;
