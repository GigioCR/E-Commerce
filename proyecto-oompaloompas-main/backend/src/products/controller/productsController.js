class ProductController {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }

    async getAllProducts(req, res) {
        try {
            const products = await this.productRepository.getAllProducts();
            res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching products',
                error: error.message
            });
        }
    }

    async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await this.productRepository.getProductById(id);
            
            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: 'Product not found'
                });
            }

            res.status(200).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching product',
                error: error.message
            });
        }
    }

    async createProduct(req, res) {
        try {
            const product = await this.productRepository.createProduct(req.body);
            res.status(201).json({
                success: true,
                data: product
            });
        } catch (error) {
            res.status(400).json({
                success: false,
                message: 'Error creating product',
                error: error.message
            });
        }
    }

    async searchProducts(req, res) {
        try {
            const { query } = req.query;
            const products = await this.productRepository.searchProducts(query);
            res.status(200).json({
                success: true,
                data: products
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error searching products',
                error: error.message
            });
        }
    }
}

module.exports = ProductController;