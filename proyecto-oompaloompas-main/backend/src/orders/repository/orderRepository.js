const supabase = require('../../../config/db');
require('dotenv').config();

class OrderRepository {
    constructor() {
        this.client = supabase;
        this.tableName = 'Orders';
    }

    async createOrder(orderData) {
        try {
            const { data: order, error: orderError } = await this.client
                .from(this.tableName)
                .insert([{
                    user_id: orderData.userId,
                    total_amount: orderData.totalAmount,
                    shipping_address: orderData.shippingAddress,
                    status: 'Shipping',
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                    card_number: orderData.cardNumber,
                }])
                .select()
                .single();
    
            if (orderError) {
                console.error('Error creating order:', orderError);
                throw orderError;
            }
    
            const orderProducts = orderData.cartItems.map(item => ({
                order_id: order.order_id,  
                product_id: parseInt(item.id),
                quantity: parseInt(item.quantity)
            }));

            for (const item of orderProducts) {
                const { data: product, error: productError } = await this.client
                    .from('Products')
                    .select('stock')
                    .eq('id', item.product_id)
                    .single();

            if (productError) {
                console.error('Error fetching product:', productError);
                throw productError;
            }

            const newStock = product.stock - item.quantity;

                const { error: updateError } = await this.client
                    .from('Products')
                    .update({ stock: newStock })
                    .eq('id', item.product_id);

                if (updateError) {
                    console.error('Error updating product stock:', updateError);
                    throw updateError;
                }
            }
    
            const { error: orderProductsError } = await this.client
                .from('Orders_Products') 
                .insert(orderProducts);
    
            if (orderProductsError) {
                console.error('Error creating order products:', orderProductsError);
                
                const { error: deleteError } = await this.client
                    .from(this.tableName)
                    .delete()
                    .eq('order_id', order.order_id);
                    
                if (deleteError) {
                    console.error('Error cleaning up order:', deleteError);
                }
                throw orderProductsError;
            }
    
            return { 
                success: true,
                order: order,
            };
    
        } catch (error) {
            console.error('Detailed error in createOrder:', error);
            throw error;
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const { data: orders, error } = await this.client
                .from(this.tableName)
                .select(`
                    order_id,
                    total_amount,
                    status,
                    shipping_address,
                    created_at,
                    Orders_Products (
                        product_id,
                        quantity
                    )
                `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });
    
            if (error) throw error;
            return orders;
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    }

    async getOrderById(orderId) {
        try {
            const { data, error } = await this.client
                .from(this.tableName)
                .select(`
                    *,
                    Orders_Products (
                        quantity,
                        Products (
                            title,
                            price
                        )
                    )
                `)
                .eq('order_id', orderId)
                .single();
    
            if (error) throw error;
    
            const transformedData = {
                id: data.order_id,
                date: new Date(data.created_at).toLocaleDateString(),
                status: data.status,
                items: data.Orders_Products.map(op => ({
                    name: op.Products.title,
                    quantity: op.quantity,
                    price: op.Products.price
                })),
                shippingAddress: data.shipping_address,
                paymentMethod: 'Credit Card', 
                subtotal: data.total_amount - 20, 
                shipping: 20.00,
                total: data.total_amount,
                card_number: data.card_number
            };
    
            return transformedData;
        } catch (error) {
            console.error('Error fetching order:', error);
            throw error;
        }
    }

}

module.exports = OrderRepository;