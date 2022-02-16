// Specifications for Facebook pixel standard events: https://www.facebook.com/business/help/402791146561655
const DEFAULT_EVENTS = [
  'AddPaymentInfo',
  'AddToCart',
  'AddToWishlist',
  'CompleteRegistration',
  'Contact',
  'CustomizeProduct',
  'Donate',
  'FindLocation',
  'InitiateCheckout',
  'Lead',
  'Purchase',
  'Schedule',
  'Search',
  'StartTrial',
  'SubmitApplication',
  'Subscribe',
  'ViewContent'
];

export function fbq(trackingEvent, options) {
  if ('fbq' in window) {
    const eventType = DEFAULT_EVENTS.includes(trackingEvent)
      ? 'track'
      : 'trackCustom';

    window.fbq.apply(null, [eventType, trackingEvent, options]);
  } else {
    console.log(`[facebook pixel] event: ${trackingEvent}; options: ${JSON.stringify(options)}`);
  }
}
