import React, { useEffect } from "react";
import starIcon from "../../../images/icons/star.png";
import "./Product.css";
import { useAuth } from "../../Context/GlobalState";
import { type } from "@testing-library/user-event/dist/type";

const Product = ({ title, price, image, rating, id }) => {
    const { dispatch, basket } = useAuth();
    useEffect(() => {


    }, [basket])
    const addToBasket = () => {
        dispatch({
            type: "ADD_TO_BASKET",
            item: {
                id: id,
                title: title,
                image: image,
                price: price,
                rating: rating

            }
        })

    };
    return (
        <div className="product">
            <div className="product-info">
                <p>{title}</p>
                <div className="product-rating">
                    {Array(rating)
                        .fill()
                        .map((_, i) => (
                            <p key={i}>
                                <img src={starIcon} />
                            </p>
                        ))}
                </div>
                <p className="product-price">
                    <small>$</small>
                    <strong>{price}</strong>
                </p>
            </div>

            <img src={image} alt="product-img" />
            <button onClick={addToBasket}>Add to Basket</button>
        </div>
    );
};

export default Product;