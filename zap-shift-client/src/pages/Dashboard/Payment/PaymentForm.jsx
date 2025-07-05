import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import toast from "react-hot-toast";

const PaymentForm = () => {
    const navigate = useNavigate();
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  //tanstack goes
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcelInfo = [] } = useQuery({
    queryKey: ["parcel", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return "Loading...";
  }

  console.log(parcelInfo);

  // stripe things

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (!card) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      setError(null);
      console.log(paymentMethod);

      // create payment instance
      const ammountInCents = parcelInfo.cost * 100;

      const res = await axiosSecure.post("/create-payment-intent", {
        ammountInCents,
        id,
      });

      const clientSecret = res.data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: user.displayName,
            email: user.email,
          },
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");


            const res = await axiosSecure.post("/payments", {
              userEmail: user.email,
              parcelId: parcelInfo._id,
              amount: parcelInfo.cost,
              transactionId: paymentMethod.id, // This is Stripe's ID
              parcelTitle: parcelInfo.title,
              paymentMethod: paymentMethod.card.brand,
            });

            if (res.data.success) {
              toast.success("Payment recorded & parcel marked successful!");
              navigate("/dashboard/myParcels"); // Or any redirect you want
            } else {
              toast.error("Payment saved but status update failed.");
            }

        }
      }
    }
  };

  return (
    <div className="w-full ">
      <form
        onSubmit={handleOnSubmit}
        className="max-w-md mx-auto p-6 bg-white dark:bg-neutral rounded-xl shadow-lg space-y-6 transition duration-300"
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Pay for Parcel
        </h2>

        <div className="space-y-2">
          <label
            htmlFor="card-element"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Card Details
          </label>
          <div className="p-4 border rounded-md bg-gray-50 dark:bg-gray-800 focus-within:ring-2 focus-within:ring-indigo-500 transition">
            <CardElement
              id="card-element"
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#32325d",
                    "::placeholder": {
                      color: "#a0aec0",
                    },
                  },
                  invalid: {
                    color: "#e53e3e",
                  },
                },
              }}
            />
          </div>
        </div>

        <button
          className={`w-full btn btn-primary ${
            !stripe ? "opacity-50 cursor-not-allowed" : ""
          }`}
          type="submit"
          disabled={!stripe}
        >
          Pay ৳{parcelInfo.cost}
        </button>

        {error && (
          <p className="text-sm text-center text-red-600 bg-red-100 rounded-md p-2">
            ❌ {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default PaymentForm;
