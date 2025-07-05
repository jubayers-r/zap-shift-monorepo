import "dotenv/config";
import { MongoClient, ObjectId, ServerApiVersion } from "mongodb";
import express from "express";
import cors from "cors";
import Stripe from "stripe";
const app = express();
const port = process.env.PORT || 3000;
const stripe = new Stripe(process.env.payment_secret);

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.db_user}:${process.env.db_pass}@cluster0.olc9sdn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection

    const parcels = client.db("zapshift").collection("parcels");
    const history = client.db("zapshift").collection("payments");

    app.get("/parcels", async (req, res) => {
      try {
        const userEmail = req.query.email;
        const query = userEmail ? { created_by: userEmail } : {};
        const result = await parcels
          .find(query)
          .sort({ creation_time: -1 })
          .toArray();

        res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching parcels:", error);
        res.status(500).json({ error: "Failed to fetch parcels" });
      }
    });
    // create a new percel
    app.post("/parcels", async (req, res) => {
      const newParcel = req.body;

      try {
        const result = await parcels.insertOne(newParcel);
        res
          .status(201)
          .json({ message: "Parcel saved", id: result.insertedId });
      } catch (error) {
        console.error("Error inserting parcel:", error);
        res.status(500).json({ error: "Failed to save parcel" });
      }
    });

    app.delete("/parcels/:id", async (req, res) => {
      try {
        const id = req.params.id;

        const result = await parcels.deleteOne({ _id: new ObjectId(id) });

        res.send(result);
      } catch (error) {
        console.error("Error deleting parcel:", error);
        res.status(500).json({ error: "Failed to delete parcel." });
      }
    });

    // payment

    app.get("/parcels/:id", async (req, res) => {
      const id = req.params.id;

      try {
        const parcel = await parcels.findOne({ _id: new ObjectId(id) });

        if (!parcel) {
          return res.status(404).json({ message: "Parcel not found" });
        }

        res.json(parcel);
      } catch (err) {
        console.error("Error fetching parcel by ID:", err);
        res.status(500).json({ message: "Internal server error" });
      }
    });

    app.post("/create-payment-intent", async (req, res) => {
      try {
        console.log(req.body);
        const ammountInCents = req.body.ammountInCents;
        const paymentIntent = await stripe.paymentIntents.create({
          amount: ammountInCents, // Amount in cents
          currency: "usd",
          payment_method_types: ["card"],
        });

        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    });

    // payment history
    app.post("/payments", async (req, res) => {
      const {
        userEmail,
        parcelId,
        amount,
        transactionId,
        parcelTitle,
        paymentMethod,
      } = req.body;

      try {
        // 1. Create payment history
        const payment = {
          userEmail,
          parcelId: new ObjectId(parcelId),
          amount,
          transactionId,
          parcelTitle,
          paymentMethod,
          createdAtISO: new Date().toISOString(), // Used for sorting
        };

        await history.insertOne(payment);

        // 2. Update parcel status
        const updateRes = await parcels.updateOne(
          { _id: new ObjectId(parcelId) },
          { $set: { status: "successful" } }
        );

        res.json({
          success: true,
          insertedId: payment._id,
          parcelUpdated: updateRes.modifiedCount > 0,
        });
      } catch (error) {
        console.error("Payment save failed:", error);
        res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
    });

    app.get("/payments", async (req, res) => {
      const email = req.query.email;
      try {
        const query = email ? { userEmail: email } : {};
        const result = await history
          .find(query)
          .sort({ createdAt: -1 })
          .toArray();

        res.send(result);
      } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Failed to fetch payment history" });
      }
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

//
app.listen(port);
