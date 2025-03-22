export const transformProduct = (product) => {
    return {
      id: product.id,
      imageUrl: product.image_url,
      title: product.title,
      price: product.price,
      type: product.type,
      onSale: product.on_sale,
      newProduct: product.new_product,
      description: product.description,
      specifications: typeof product.specifications === 'string' 
        ? JSON.parse(product.specifications) 
        : product.specifications,
      stock: product.stock
    };
};