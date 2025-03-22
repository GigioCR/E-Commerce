import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import { transformProduct } from '../utils/transformProductData';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { config } from '../config/config';

const api = axios.create({
  baseURL: config.BACKEND_URL
});

const ProductGrid = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    types: [],
    onSale: false,
    newProduct: false
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      if (response.data.success) {
        const transformedProducts = response.data.data.map(product => {
          const transformed = transformProduct(product);
          transformed.imageUrl = `${config.BACKEND_URL}${transformed.imageUrl}`;
          return transformed;
        });
        setProducts(transformedProducts);
      }
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const productTypes = useMemo(() => {
    return Array.from(new Set(products.map(product => product.type)));
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const typeMatch = activeFilters.types.length === 0 || activeFilters.types.includes(product.type);
      const saleMatch = !activeFilters.onSale || product.onSale;
      const newMatch = !activeFilters.newProduct || product.newProduct;
      return typeMatch && saleMatch && newMatch;
    });
  }, [products, activeFilters]);

  const handleTypeFilterChange = (type) => {
    setActiveFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }));
  };

  const handleCheckboxFilterChange = (filterName) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterName]: !prev[filterName]
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      types: [],
      onSale: false,
      newProduct: false
    });
  };

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-[400px] text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto p-4">
      <div className="md:hidden mb-4">
        <button 
          onClick={toggleFilter}
          className="w-full py-2 px-4 bg-gray-100 text-left flex justify-between items-center"
        >
          <span className="font-bold">Filters</span>
          {isFilterOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className={`w-full md:w-64 md:mr-8 ${isFilterOpen ? 'block' : 'hidden md:block'}`}>
          <div className='flex flex-row items-center mb-4'>
            <h2 className="text-xl font-bold">Filter</h2>
            <button 
              onClick={clearFilters}
              className="text-gray-600 ml-6 text-sm hover:text-[#79d3da] transition-colors"
            >
              Clear Filter
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Product Type</h3>
              {productTypes.map(type => (
                <label key={type} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={activeFilters.types.includes(type)}
                    onChange={() => handleTypeFilterChange(type)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>

            <div>
              <h3 className="font-semibold mb-2">Special Offers</h3>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.onSale}
                  onChange={() => handleCheckboxFilterChange('onSale')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>On Sale</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={activeFilters.newProduct}
                  onChange={() => handleCheckboxFilterChange('newProduct')}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span>New Products</span>
              </label>
            </div>
          </div>
        </div>

        <div className="flex-1 mt-4 md:mt-0">
          <div className="grid grid-cols-1 content-center sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {filteredProducts.map((product) => (
              <ProductCard
              key={product.id}
              {...product}
            />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;