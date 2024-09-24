const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// App config
const app = express();

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
    const total = req.query.total;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total, // Amount in cents
            currency: "usd",
        });
        res.status(201).send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("Payment creation failed:", error);
        res.status(500).send({ error: "Payment creation failed." });
    }
});

// Listen command
exports.api = functions.https.onRequest(app);
