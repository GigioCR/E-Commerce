import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from '../Components/ProductDetails';
import { transformProduct } from '../utils/transformProductData';
import { config } from '../config/config';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${config.BACKEND_URL}/products/${id}`);
        if (response.data.success) {
          const transformedProduct = transformProduct(response.data.data);
          transformedProduct.imageUrl = `${config.BACKEND_URL}${transformedProduct.imageUrl}`;
          setProduct(transformedProduct);
        }
      } catch (err) {
        setError('Failed to fetch product');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-[400px]">Loading...</div>;
  }

  if (error || !product) {
    return <div className="flex justify-center items-center min-h-[400px] text-red-500">
      {error || 'Product not found'}
    </div>;
  }

  return (
    <div>
      <div className='mt-10'>
        <ProductDetails product={product} />
      </div>
    </div>
  );
};

export default ProductDetailPage;