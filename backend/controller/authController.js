import bcrypt from "bcrypt";
import supabase from "../model/userdb.js";

export const signup = async (req, res) => {
  const {fullname, username, password} = req.body;
  try {
    const checkResult = await supabase
    .from('users')
    .select()
    .eq('username', username);
    if (checkResult.data.length > 0) {
      console.log("User already registered");
      return res.status(409).json({ message: "User already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
      "INSERT INTO users (username, password, name, age, phoneno) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [username, hashedPassword, name, age, phone_no]
    );

    const user = result.rows[0];
    req.login(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Error logging in after registration" });
      }
      console.log("Successfully registered and logged in");
      return res.status(200).json({ message: "User logged in" });
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed:", info);
      return res.redirect("/login");
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("Successfully logged in");
      return res.redirect("/home");
    });
  })(req, res, next);
};

export const logoutUser = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.json({status:"logout"});
  });
};


