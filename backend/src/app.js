import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import routes from "./routes/user.js";
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');


const app = express();

// middleware
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://rem-ez.vercel.app",
    ];
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // Origin is allowed
    } else {
      callback(new Error("Not allowed by CORS")); // Origin is not allowed
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.options("*", cors());

app.use(express.json());

// routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);
app.use(routes);
app.use('/api/user', userRouts);
// Database connection function
async function connectDatabase() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(
      "mongodb+srv://REMEZ:REMEZ@cluster01.qrulfpd.mongodb.net/?retryWrites=true&w=majority",
      connectionParams
    );
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
}

// Connect to database
connectDatabase();

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
