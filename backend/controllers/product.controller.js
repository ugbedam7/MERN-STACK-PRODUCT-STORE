import Product from '../models/product.model.js';

// Get products controller
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: `Error fetching products` });
    }

    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Internal server error: ${error.message}`
    });
  }
};

// @Create product controller
export const createProduct = async (req, res) => {
  const { productId, name, price, image } = req.body;

  if (!name || !price || !image) {
    return res
      .status(400)
      .json({ succes: false, message: 'Please provide all fields' });
  }

  try {
    const existingProduct = await Product.findOne({ productId });
    if (existingProduct)
      return res
        .status(400)
        .json({ success: false, message: 'Product already exist' });

    const productObj = {
      productId,
      name,
      price,
      image
    };

    const newProduct = new Product(productObj);
    const product = await newProduct.save();

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error(`Error creating product: ${error.essage}`);
    res
      .status(500)
      .json({ succes: false, message: `Server error: ${error.message}` });
  }
};

// Update product controller
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, data, {
      new: true
    });
    res.status(200).json({
      success: true,
      message: 'Product updated',
      data: updatedProduct
    });
  } catch (err) {
    console.log(`Error updating product: ${err.message}`);
    res.status(500).json(`Server error: ${err.message}`);
  }
};

// Delete product controller
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res
      .status(404)
      .json({ success: false, message: 'Product not found' });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Product deleted' });
  } catch (error) {
    console.log(`Error deleting product: ${error.message}`);
    res
      .status(500)
      .json({ succes: false, message: `Server error: ${error.message}` });
  }
};
