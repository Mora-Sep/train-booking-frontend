import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

<script src="https://js.stripe.com/terminal/v1/"></script>;

const stripePromise = loadStripe(
  "pk_test_51Q3h2fGgM5IeGXpnCy4JDcSIl2Bsx5KvF80XipMjKXJ3Sg6cRgvfBZQFlVV0iPQDx9X46RpRLIADSk3cMAdp1I5G008R6cV6Pb"
);

function Payment() {
  const baseURL = process.env.REACT_APP_BACKEND_API_URL;

  const handleClick = async () => {
    const response = await axios.get(`${baseURL}/booking/get-checkout-session`);

    // Redirect to Stripe Checkout
    const stripe = await stripePromise;
    const { error } = await stripe.redirectToCheckout({
      sessionId: response.data.session.id,
    });

    if (error) {
      console.error("Stripe Checkout error: ", error);
    }
  };

  return (
    <Elements stripe={stripePromise}>
      <button onClick={handleClick}>Checkout</button>
    </Elements>
  );
}

export default Payment;
