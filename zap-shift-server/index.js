import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

//
app.listen(port);
