import express  from 'express';
import cors from 'cors';
import dotenv from 'dotenv';


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
  res.send("Welcome to the start")
});
app.use("/auth", authRoutes);

app.use("/", verifyRoute);
app.use("/task",taskRoutes);



app.listen(port, () => console.log(`server running on port ${port}`))



