import { Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CreateProduct from './pages/CreateProduct';

function App() {
  return (
    <Box bg={{ base: 'gray.100', _dark: '#1A202C' }} minH={'100vh'}>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateProduct />} />
      </Routes>
    </Box>
  );
}

export default App;
