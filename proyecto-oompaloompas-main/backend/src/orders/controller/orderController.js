class OrderController {
    constructor(orderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(req, res) {
        try {
            const { cartItems, shipping_address,user_id,total_amount, card_number } = req.body;
            
            if (!cartItems || !shipping_address) {
                return res.status(400).json({
                    success: false,
                    message: 'Cart items and shipping address are required'
                });
            }

            const validItems = cartItems.filter(item => item !== null);
            if (validItems.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Cart is empty'
                });
            }

            const orderData = {
                userId: user_id,
                totalAmount: total_amount,
                shippingAddress: shipping_address,
                cartItems: cartItems,
                cardNumber: card_number
            };

            const order = await this.orderRepository.createOrder(orderData);

            res.status(201).json({
                success: true,
                message: 'Order created successfully',
                data: order
            });

        } catch (error) {
            console.error('Error in createOrder:', error);
            res.status(500).json({
                success: false,
                message: 'Error creating order',
                error: error.message
            });
        }
    }

    async getUserOrders(req, res) {
        try {
            const user_id = req.params.userId;
            const orders = await this.orderRepository.getOrdersByUserId(user_id);
            
            res.status(200).json({
                success: true,
                data: orders
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching orders',
                error: error.message
            });
        }
    }

    async getOrderById(req, res) {
        try {
            const orderId = req.params.orderId;
            const order = await this.orderRepository.getOrderById(orderId);
            
            if (!order) {
                return res.status(404).json({
                    success: false,
                    message: 'Order not found'
                });
            }
    
            res.status(200).json({
                success: true,
                data: order
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: 'Error fetching order',
                error: error.message
            });
        }
    }
}

module.exports = OrderController;