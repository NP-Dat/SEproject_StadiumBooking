const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

class PaymentService {
  static async createPaymentIntent(amount, currency = 'usd') {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency,
      });
      
      return paymentIntent;
    } catch (error) {
      throw new Error('Failed to create payment intent');
    }
  }

  static async confirmPayment(paymentIntentId) {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      return paymentIntent.status === 'succeeded';
    } catch (error) {
      throw new Error('Failed to confirm payment');
    }
  }

  static async refundPayment(paymentIntentId) {
    try {
      const refund = await stripe.refunds.create({
        payment_intent: paymentIntentId,
      });
      return refund;
    } catch (error) {
      throw new Error('Failed to process refund');
    }
  }
}

module.exports = PaymentService;