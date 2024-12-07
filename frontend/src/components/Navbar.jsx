import { Container, Flex, HStack, IconButton, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ColorModeButton } from '@/components/ui/color-mode';
import { useColorModeValue } from '@/components/ui/color-mode';
import { CiSquarePlus } from 'react-icons/ci';
import { FiShoppingCart } from 'react-icons/fi';
import Select from './Select';

const Navbar = () => {
  return (
    <Container maxW={'1100px'} px={4}>
      <Flex
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
        flexDir={{ base: 'column', sm: 'row' }}>
        <Text
          fontSize={{ base: '18px', sm: '20px' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={'text'}>
          <Link to={'/'}>Product Store 🛒</Link>
        </Text>
        <Select />
        <HStack gap={3} alignItems={'center'}>
          <Link to={'/create'}>
            <IconButton
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('#000', '#fff')}>
              <CiSquarePlus />
            </IconButton>
          </Link>
          <ColorModeButton bg={useColorModeValue('gray.200', 'gray.700')} />
          <Link to={'/cart'}>
            <IconButton
              bg={useColorModeValue('gray.200', 'gray.700')}
              color={useColorModeValue('#000', '#fff')}>
              <FiShoppingCart />
            </IconButton>
          </Link>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
