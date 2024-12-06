import { create } from 'zustand';

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (product) => {
    if (!product.name.trim()) {
      return { success: false, message: 'Name is required' };
    }

    if (!product.price || isNaN(Number(product.price))) {
      return {
        success: false,
        message: 'Price is required and must be a valid number'
      };
    }

    if (!product.image.trim()) {
      return { success: false, message: 'Image URL is required' };
    }

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(product)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return {
        success: true,
        message: data.message
      };
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error.message}`
      };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch('/api/products');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message);
      }

      set({ products: data.data });
    } catch (error) {
      return {
        success: false,
        message: `Error: ${error.message}`
      };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'DELETE'
      });

      const data = await res.json();
      if (!data.success) return { success: false, message: data.message };

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid)
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedProduct)
      });

      const data = await res.json();
      console.log(data);
      if (!data.success) return { success: false, message: data.message };

      // Updates the UI after component mounts.
      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        )
      }));

      return { success: true, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
}));
