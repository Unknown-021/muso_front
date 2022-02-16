import config from 'config';
import { newDestructedPromise, noop } from 'helpers/utils';

const { promise, resolve, reject } = newDestructedPromise();

export const paypalReady = promise;

export async function loadScript({ nonce }) {
  if (!window.paypal) {
    const clientId = config.bases?.paypal?.clientId;
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&vault=true&intent=subscription&disable-funding=credit,card`;
    script.onload = resolve;
    script.onerror = reject;
    script.nonce = nonce;
    script.setAttribute("data-csp-nonce", nonce);
    document.body.append(script);
  }

  return promise;
}

export function createButton({ style, userId, createSubscription, onApprove = noop, onError = noop }) {
  return window.paypal.Buttons({
    style: {
      color: 'blue',
      label: 'pay',
      height: 40,
      ...style
    },
    createSubscription: async (data, actions) => {
      const { subscription } = await createSubscription();
      if (subscription.status !== 'APPROVAL_PENDING') {
        throw new Error('You have already subscribed!')
      }
      return subscription.id;
    },
    onApprove: (data) => {
      if (data?.subscriptionID) {
        onApprove(data);
      }
    },
    onError: onError
  });
}
