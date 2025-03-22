const visaBins = ['400943', '401630', '401631', '401632'];
const masterCardBins = ['510714', '510209', '513695', '514006'];
const americanExpressBins = ['377713', '377712', '377711'];

class PaymentController {
    async checkCardInfo(req, res) {
        try {
            const currentDate = new Date();

            const { cardNumber, date, cvc, bank} = req.body;

            
            if (!this.validBin(cardNumber, bank)) {
                console.log("bin no está en las listas")
                return res.status(400).json({
                    success: false,
                    message: 'Invalid bin'
                });
            }

            if (this.cardExpired(date, currentDate)) {
                console.log("Tarjeta expirada")
                return res.status(400).json({
                    success: false,
                    message: 'Card expired'
                });
            }

            if (bank == 'americanExpress' && cvc.length < 4 || bank != 'americanExpress' && cvc.length > 3) {
                console.log("cvc erróneo")
                return res.status(400).json({
                    success: false,
                    message: 'Invalid credentials'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Payment completed',
            });

        } catch (error) {
            console.error('Error in checkCardInfo:', error);
            res.status(500).json({
                success: false,
                message: 'Error validating card',
                error: error.message
            });
        }
    }

    cardExpired(cardDate, currentDate) {
        
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear() % 100;

        const cardYear = cardDate.slice(0,2)
        const cardMonth = cardDate.slice(3,5)
        if (cardYear - currentYear < 0 || (cardYear - currentYear == 0 && (cardMonth - 1 ) - currentMonth < 1)) {
            return true;
        }
        return false
    }

    validBin(cardNumber, bank) {
        const bin = cardNumber.slice(0, 6);
        console.log("el bin de la tarjeta es: " + bin);
        if (bank == 'visa') {
            if (visaBins.includes(bin)) {
                return true;
            }
        } else if (bank == 'masterCard') {
            if (masterCardBins.includes(bin)) {
                return true;
            } 
        } else {
            if (americanExpressBins.includes(bin)) {
                return true;
            }
        }
        return false;
    }
}

module.exports = PaymentController;