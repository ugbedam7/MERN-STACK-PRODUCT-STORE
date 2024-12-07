import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  VStack
} from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { Button } from '@/components/ui/button';
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { useColorModeValue } from '@/components/ui/color-mode';
import { FaRegEdit } from 'react-icons/fa';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { FaCartPlus } from 'react-icons/fa';
import { useProductStore } from '../store/product';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const [isLoading, setIsLoading] = useState(false);
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.700');
  const { deleteProduct, updateProduct } = useProductStore();
  const [open, setOpen] = useState(false);

  const handleDeleteProduct = async (pid) => {
    setIsLoading(true);
    try {
      const { success, message } = await deleteProduct(pid);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateProduct = async (e, pid, updatedProduct) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { success, message } = await updateProduct(pid, updatedProduct);
      setOpen(false);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {};
  return (
    <Box
      shadow={'lg'}
      rounded={'lg'}
      overflow={'hidden'}
      transition={'all 0.3s'}
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
      bg={bg}>
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={'full'}
        objectFit={'cover'}
      />
      <Box p={4}>
        <Heading as={'h3'} size={'md'} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={'bold'} fontSize={'lg'} color={textColor} mb={2}>
          ${product.price}
        </Text>
        <Flex justifyContent={'space-between'}>
          <HStack>
            {/*Modal for Product Update*/}
            <DialogRoot
              lazyMount
              open={open}
              onOpenChange={(e) => setOpen(e.open)}>
              <DialogTrigger asChild>
                <IconButton bgColor={'blue.400'}>
                  <FaRegEdit />
                </IconButton>
              </DialogTrigger>
              <DialogContent
                as="form"
                onSubmit={(e) =>
                  handleUpdateProduct(e, product._id, updatedProduct)
                }
                bg={useColorModeValue('#fff', 'gray.600')}>
                <DialogHeader>
                  <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody pb="4">
                  <VStack gap={6}>
                    <Box w={'full'}>
                      <VStack>
                        <Input
                          mb={3}
                          placeholder="Product name"
                          name="name"
                          type="text"
                          value={updatedProduct.name}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              name: e.target.value
                            })
                          }
                        />
                        <Input
                          mb={3}
                          placeholder="Product price"
                          name="price"
                          type="number"
                          value={updatedProduct.price}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              price: parseFloat(e.target.value)
                            })
                          }
                        />
                        <Input
                          mb={5}
                          placeholder="Image URL"
                          name="image"
                          value={updatedProduct.image}
                          onChange={(e) =>
                            setUpdatedProduct({
                              ...updatedProduct,
                              image: e.target.value
                            })
                          }
                        />
                      </VStack>
                    </Box>
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button
                    bg="cyan.400"
                    type="submit"
                    fontSize={'17px'}
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
                      'Update'
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </DialogRoot>

            <IconButton
              bgColor={'red.400'}
              onClick={() => handleDeleteProduct(product._id)}>
              <RiDeleteBin5Fill />
            </IconButton>
          </HStack>
          <IconButton onClick={handleAddToCart}>
            <FaCartPlus />
          </IconButton>
        </Flex>
      </Box>
    </Box>
  );
};

export default ProductCard;
