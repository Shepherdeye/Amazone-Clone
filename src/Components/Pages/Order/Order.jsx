import React from "react";
import moment from "moment";
import CheckoutProduct from "../CheckOut/CheckoutProduct";
import CurrencyFormat from "react-currency-format";

import "./Order.css";

const Order = ({ order }) => {
    return (
        <div className="order " style={{ background: "#e7e7e7", color: "black" }} >
            <h2 style={{ color: "teal" }}>Order</h2>
            {/* <small>{order.id}</small> */}
            <p>{moment.unix(order.data.created).format("MMMM DD YYYY h:mma")}</p>
            <p className="order-id">
            </p>
            {order.data.basket?.map((item) => (
                <CheckoutProduct
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.image}
                    price={item.price}
                    rating={item.rating}
                    hiddenButton
                />
            ))}
            <CurrencyFormat
                renderText={(value) => (
                    <>
                        <h3 className="order-total">Order Total: {value}</h3>
                    </>
                )}
                decimalScale={2}
                value={order.data.amount / 100}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
            />
        </div>

    );
};

export default Order;