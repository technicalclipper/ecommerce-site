import express from "express";
import authRoute from "./routes/authRoute.js"
import productRoute from "./routes/productRoute.js"
import session from "express-session"
import passport from "./utils/passport.js";
import cors from "cors"

const app=express();
app.use(express.json());
app.use(session({ secret: "secret", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(cors({
  origin: "http://localhost:3000",  
  credentials: true,  
}));
app.use("/auth", authRoute);
app.use("/product",productRoute);

app.listen(4000, () => {
    console.log(`Server running on http://localhost:4000`);
  });