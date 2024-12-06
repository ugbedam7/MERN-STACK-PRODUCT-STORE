import { Box, Container, Flex, Heading, Input, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useColorModeValue } from '@/components/ui/color-mode';
import { useProductStore } from '../store/product';
import { v4 as uuidv4 } from 'uuid';

const CreateProduct = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    productId: uuidv4(),
    name: '',
    price: '',
    image: ''
  });

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    setIsLoading(true);
    try {
      const { success, message } = await createProduct(product);

      console.log('Success: ', success);
      console.log('Message: ', message);
      if (success) {
        setProduct({
          productId: uuidv4(),
          name: '',
          price: '',
          image: ''
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW={'container.sm'}>
      <VStack gap={6}>
        <Heading as={'h1'} size={'3xl'} textAlign={'center'} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={'40%'}
          bg={useColorModeValue('#fff', 'gray.600')}
          p={6}
          rounded={'lg'}
          shadow={'md'}>
          <VStack spacing={4}>
            <Input
              mb={3}
              placeholder="Product name"
              name="name"
              type="text"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
            />
            <Input
              mb={3}
              placeholder="Product price"
              name="price"
              type="number"
              value={product.price}
              onChange={(e) =>
                setProduct({ ...product, price: parseFloat(e.target.value) })
              }
            />
            <Input
              mb={5}
              placeholder="Image URL"
              name="image"
              value={product.image}
              onChange={(e) =>
                setProduct({ ...product, image: e.target.value })
              }
            />
            <Button
              bg="cyan.400"
              onClick={handleAddProduct}
              fontSize={'17px'}
              w={'full'}
              isDisabled={isLoading}>
              {isLoading ? (
                <Flex justifyContent={'center'}>
                  <img
                    src="/spinner.gif"
                    alt="spinner"
                    height={25}
                    width={25}
                  />
                </Flex>
              ) : (
                'Add Product'
              )}
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreateProduct;
