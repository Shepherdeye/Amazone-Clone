import React, { useEffect } from 'react'
import { Routes, Route } from "react-router-dom";
import Header from './Components/Header';
import Login from './Components/AuthPages/Login/Login';
import { useAuth } from './Components/Context/GlobalState';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Home from './Components/Pages/Home/Home';
import Checkout from './Components/Pages/CheckOut/Checkout';
import Payment from './Components/Pages/Payment/Payment';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Orders from './Components/Pages/Order/Orders';
const App = () => {
  const { dispatch } = useAuth();
  const stripePromise = loadStripe(
    "pk_test_51PzmPHCDeTgLdm4RAXsu9rQjKKQfPyailTseIMlQJ7rDhKuX0fRBrWPgwBY76QQ5EYWsqOzZQRqmdFme9Vonu7ds00lWtXgRu2"
  );
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: "SET_USER",
          user: authUser
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
  }, [])
  return (
    <div>

      <Routes>
        <Route path="/" element={<>
          <Header />
          <Home />
        </>} />

        <Route path="/checkout" element={<>
          <Header />
          <Checkout />
        </>} />
        <Route path="/payment" element={<>
          <Header />
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </>} />
        <Route path="/orders" element={<>
          <Header />
          <Orders />
        </>} />
        <Route path="/login" element={<Login />} />
        <Route path='*' element={<h1>Page not Found </h1>} />
      </Routes>
    </div>
  )
}

export default App
