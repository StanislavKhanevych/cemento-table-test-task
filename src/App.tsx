import { Box, Heading, Text } from '@chakra-ui/react';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <Box maxW={1000} mx="auto" px={6} pt={24} fontSize="sm">
      <Heading as="h1" size="2xl" mb={6}>
        Task Table
      </Heading>
      <TaskTable />
    </Box>
  );
}

export default App;
