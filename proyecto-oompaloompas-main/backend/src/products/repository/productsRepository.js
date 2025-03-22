const supabase = require('../../../config/db');

class ProductRepository {
    constructor() {
        this.client = supabase;
        this.tableName = 'Products';
    }

    async getAllProducts() {
        const { data, error } = await this.client
            .from(this.tableName)
            .select('*');
            
        if (error) throw error;
        return data;
    }

    async getProductById(id) {
        const { data, error } = await this.client
            .from(this.tableName)
            .select('*')
            .eq('id', id)
            .single();
            
        if (error) throw error;
        return data;
    }

    async createProduct(product) {
        const { data, error } = await this.client
            .from(this.tableName)
            .insert([{
                ...product,
                on_sale: product.onSale,
                new_product: product.newProduct,
                specifications: JSON.stringify(product.specifications)
            }])
            .select()
            .single();
            
        if (error) throw error;
        return data;
    }

    async searchProducts(query) {
        const { data, error } = await this.client
            .from(this.tableName)
            .select('*')
            .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
            
        if (error) throw error;
        return data;
    }

}

module.exports = ProductRepository;