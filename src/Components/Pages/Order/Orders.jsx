import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../Context/GlobalState"
import { db } from "../../../firebase";
import "./Orders.css";
import Order from "./Order";
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const { user } = useAuth();
    useEffect(() => {
        if (user) {
            const collRef = collection(db, "users", user?.uid, "orders");
            const orderedRef = query(collRef, orderBy("created", "desc"));
            onSnapshot(orderedRef, (querySnapshot) => {
                setOrders(
                    querySnapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    }))
                );
            });
            console.log("this is the orders", orders);

        } else {
            setOrders([]);
        }
    }, [user]);
    return (
        <div className="orders">
            <h1>Your Orders</h1>
            <div className="orders-order">
                {orders?.map((order) => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    );
};

export default Orders;