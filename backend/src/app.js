import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import quizRoutes from "./routes/quizRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://rem-ez.vercel.app",
      "https://rem-ez-git-sdgp-20-achievements-ui-f-quills-projects-120d5fc2.vercel.app",
      "https://rem-ez-git-sdgp-22-notes-and-re-9e0baf-quills-projects-120d5fc2.vercel.app",
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
app.use(routes);

app.use("/quiz", quizRoutes);
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

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("Server is running on port 8000");
});

export default app;
