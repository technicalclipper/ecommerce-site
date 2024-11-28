import express from "express";
import authRoute from "./routes/authRoute.js"
import session from "express-session"
import passport from "./utils/passport.js";

const app=express();
app.use(express.json());

app.use("/auth", authRoute);

app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`);
  });