import { loadStripe } from '@stripe/stripe-js';

// const stripePromise = null;

const getStripe = () => {
  const stripePromise = loadStripe(`${process.env.STRIPE_PUBLIC_KEY}`);

  return stripePromise;
};

export default getStripe;
