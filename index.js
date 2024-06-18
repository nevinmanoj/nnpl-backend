import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from "mongoose";

import poRoutes from "./src/routes/po.js";
import verifyRoute from "./src/routes/verify.js"

const app = express();
const port = 3000;
app.use(cors());
app.use(express.json());

dotenv.config();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
app.get('/welcome', (req, res) => {
  res.send("Welcome to the nnpl")
});

// app.use("/", verifyRoute);
app.use("/po",poRoutes);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(port, () => console.log(`server running on port ${port}`))
  )
  .catch((err) => console.log(err.message));



