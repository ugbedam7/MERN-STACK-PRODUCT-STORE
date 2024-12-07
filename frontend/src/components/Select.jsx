'use client';

import { createListCollection } from '@chakra-ui/react';
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText
} from '@/components/ui/select';
import { useColorModeValue } from '@/components/ui/color-mode';

const Select = () => {
  return (
    <SelectRoot collection={frameworks} size="sm" width="220px">
      <SelectTrigger>
        <SelectValueText
          placeholder="Categories"
          fontSize={{ base: '18px', sm: '20px' }}
          fontWeight={'bold'}
          textTransform={'uppercase'}
          textAlign={'center'}
          bgGradient="to-r"
          gradientFrom="cyan.400"
          gradientTo="blue.500"
          bgClip={'text'}
        />
      </SelectTrigger>
      <SelectContent bg={useColorModeValue('gray.100', 'gray.700')}>
        {frameworks.items.map((product) => (
          <SelectItem item={product} key={product.value}>
            {product.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};

const frameworks = createListCollection({
  items: [
    { label: 'Bags', value: 'bags' },
    { label: 'Shoes', value: 'shoes' },
    { label: 'Laptops', value: 'laptops' },
    { label: 'Phones', value: '[hones' }
  ]
});

export default Select;
