import config from 'config';
import { newDestructedPromise } from 'helpers/utils';
import { loadStripe } from "@stripe/stripe-js/pure";

const baseStyle = {
  base: {
    fontFamily: 'Inter, sans-serif',
    fontSmoothing: 'antialiased',
    fontStyle: 'normal',
    fontWeight: 400,
    fontSize: '14px',
    color: '#F2F2F2',
  },
  invalid: {
    color: '#FF3B30',
    iconColor: 'transparent',
  }
};
const fonts = [
  {
    cssSrc: 'https://fonts.googleapis.com/css?family=Inter:400&display=swap',
  }
];
const Stripe = {
  instance: null,
  elements: null,
};
const { promise, resolve, reject } = newDestructedPromise();
export const stripeReady = promise;

export async function createInstance() {
  try {
    if (!Stripe.instance) {
      Stripe.instance = await loadStripe(config.bases.stripe.publishableKey);
      Stripe.elements = Stripe.instance.elements({
        fonts,
      });
    }
    resolve(Stripe.instance);
    return Stripe.instance;
  } catch (error) {
    reject(error);
    throw error;
  }
}

export function createElement(elementType, options = {}) {
  if (elementType !== 'paymentRequestButton') {
    options = {
      ...options,
      style: {
        ...baseStyle,
        ...options.style,
      },
      placeholder: options.placeholder || '',
    };
  }
  return Stripe.elements.create(elementType, options);
}

export async function createPaymentMethod(data) {
  const cardNumber = Stripe.elements.getElement('cardNumber');
  const { error, paymentMethod } = await Stripe.instance.createPaymentMethod({
    type: 'card',
    card: cardNumber,
    billing_details: data,
  });
  if (error) {
    throw error;
  }
  return paymentMethod;
}

export async function handleSubscription(subscription) {
  switch(subscription.status) {
    case 'active':
    case 'trialing':
      break;
    case 'incomplete':
      const paymentIntent = await confirmCardPayment(subscription?.latest_invoice?.payment_intent.client_secret);
      break;
    default:
      throw new Error(`Unknown Subscription status: ${subscription.status}`);
  }
}

export async function confirmCardPayment(key) {
  const { error, paymentIntent } = await Stripe.instance.confirmCardPayment(key);
  if (error) {
    throw error;
  }
  return paymentIntent;
}

export async function paymentRequest(options) {
  return Stripe.instance.paymentRequest({
    ...options,
    currency: options.currency.toLowerCase()
  });
}
