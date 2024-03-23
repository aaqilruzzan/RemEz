import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

const app = express();

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

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

// Routes


// routes
app.use(routes);
// Database connection function
async function connectDatabase() {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  try {
    await mongoose.connect(
      "your_mongodb_connection_string_here",
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
