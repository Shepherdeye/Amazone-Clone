import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { React, useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/GlobalState";
import CheckoutProduct from "../CheckOut/CheckoutProduct";
import axios from "./axioss"; // Ensure axios is correctly configured in this file
import "./Payment.css";
import { getBasketTotal } from "../../Context/ReducerApp";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../firebase"

const Payment = () => {
    const { basket, user, dispatch } = useAuth();
    const [clientSecret, setClientSecret] = useState();
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    // Fetch client secret from backend
    useEffect(() => {
        const getClientSecret = async () => {
            try {
                const response = await axios({
                    method: "post",
                    url: `/payments/create?total=${getBasketTotal(basket) * 100}`, // Ensure backend URL is correct
                });
                setClientSecret(response.data.clientSecret);
            } catch (error) {
                console.error("Error fetching client secret:", error.message || error);
                setError("Failed to initiate payment. Please try again.");
            }
        };
        getClientSecret();
    }, [basket]);

    // Handle payment form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setProcessing(true);

        try {
            const payload = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });
            const paymentIntent = payload.paymentIntent;
            console.log('>>>>>>>>>>>', paymentIntent)
            const ref = doc(db, "users", user?.uid, "orders", paymentIntent.id);
            setDoc(ref, {
                basket: basket,
                amount: paymentIntent.amount,
                created: paymentIntent.created,
            });
            setSucceeded(true);
            setError(null);
            setProcessing(false);
            dispatch({
                type: "EMPTY_BASKET",
            });
            navigate("/orders", { replace: true });

        } catch (error) {
            console.error("Payment error:", error.message || error);
            setError("Payment failed. Please try again.");
            setProcessing(false);
        }
    };

    // Handle form changes (e.g., enabling/disabling submit button)
    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : "");
    };

    return (
        <div className="payment">
            <div className="payment-container">
                <h1>
                    Checkout (<Link to="/checkout">{basket.length} items</Link>)
                </h1>

                {/* Delivery Address */}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Delivery Address</h3>
                    </div>
                    <div className="payment-address">
                        <p>{user?.email}</p>
                        <p>Alexandria, Egypt</p>
                    </div>
                </div>

                {/* Review Items */}
                <div className="payment-section">
                    <div className="payment-title">
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className="payment-items">
                        {basket.map((item, index) => (
                            <CheckoutProduct
                                key={item.id || index}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>

                {/* Payment Method */}
                <div className="payment-section">
                    <h3>Payment Method</h3>
                    <div className="payment-details">
                        <form onSubmit={handleSubmit}>
                            <CardElement onChange={handleChange} />
                            <div className="payment-priceContainer">
                                <CurrencyFormat
                                    renderText={(value) => <h3>Order Total: {value}</h3>}
                                    decimalScale={2}
                                    value={getBasketTotal(basket)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                />
                                <button
                                    type="submit"
                                    disabled={processing || disabled || succeeded}
                                >
                                    <span>{processing ? <p>Processing</p> : "Buy Now"}</span>
                                </button>
                            </div>
                            {error && <div>{error}</div>}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
