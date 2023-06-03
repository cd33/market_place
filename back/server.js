require("dotenv").config();

const PORT = 4000;
const DATABASE = "marketplace";
const DOMAIN = process.env.MY_DOMAIN;

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const routes = express.Router();
app.use("/api", routes);

// body-parser
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());

// cors
routes.use(cors());
// routes.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:4000");
// });

// mongoDB client
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// ROUTES
routes.get("/", (req, res) => {
  res.send("Hello World");
});

// connect to server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// connect to DB
async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    await client.connect();
    console.log("Successfully connected to database");

    const products = client.db(DATABASE).collection("products");
    const users = client.db(DATABASE).collection("users");
    const orders = client.db(DATABASE).collection("orders");

    // GET
    routes.get("/products", (req, res) => {
      products
        .find()
        .toArray()
        .then((error, result) => {
          if (error) {
            return res.send(error);
          }
          res.status(200).send({ result });
        })
        .catch((e) => res.send(e));
    });

    routes.get("/user", (req, res) => {
      users
        .findOne(req.body)
        .then((error, result) => {
          if (error) {
            return res.send(error);
          }
          res.status(200).send(result.data);
        })
        .catch((e) => res.send(e));
    });

    // POST
    routes.post("/products/add", (req, res) => {
      products
        .insertOne(req.body)
        .then(() => res.status(200).send("Successfully inserted new product"))
        .catch((e) => res.send(e));
    });

    routes.post("/users/add", (req, res) => {
      users
        .insertOne(req.body)
        .then(() => res.status(200).send("Successfully inserted new user"))
        .catch((e) => res.send(e));
    });

    routes.post("/orders/add", (req, res) => {
      orders
        .insertOne(req.body)
        .then(() => res.status(200).send("Successfully inserted new order"))
        .catch((e) => res.send(e));
    });
  } catch (error) {
    console.log("error :>> ", error);
  }
}
run().catch(console.dir);

// STRIPE
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

routes.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      // line_items: [
      //   {
      //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
      //     price: req.body.priceId, // "price_1NEujyG7Qspn7h6Sf5E47M5b",
      //     quantity: 1,
      //   },
      // ],
      line_items: req.body,
      mode: "payment",
      success_url: `${DOMAIN}/success`,
      cancel_url: `${DOMAIN}/cancel`,
      // success_url: `${DOMAIN}?success=true`,
      // cancel_url: `${DOMAIN}?canceled=true`,
    });
    // res.redirect(303, session.url);
    res.json({ url: session.url });
  } catch (error) {
    return res.status(500).send(`Stripe: Failed to process payment ${error}`);
  }
});
