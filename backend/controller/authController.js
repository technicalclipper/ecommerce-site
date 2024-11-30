import bcrypt from "bcrypt";
import supabase from "../model/userdb.js";
import passport from "passport";

export const signup = async (req, res) => {
    const { fullname, username, password } = req.body;
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
      const result = await supabase
        .from('users')
        .insert({ fullname, username, password: hashedPassword });
      const{data}= await supabase
        .from('users')
        .select()
        .eq('username', username);
      if (result.error) {
        console.error("Error inserting user:", result.error);
        return res.status(500).json({ message: "Error inserting user" });
      }
      const user = data[0]; 
      req.login(user, (err) => {
        if (err) {
          console.error("Login error:", err);
          return res.status(500).json({ message: "Error logging in after registration" });
        }
        console.log("Successfully registered and logged in");
        return res.status(200).json({ message: "User logged in and registered",user:req.user });
      });
    } catch (err) {
      console.error("Error during registration:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error("Authentication error:", err);
      return next(err);
    }
    if (!user) {
      console.log("Authentication failed:", info);
      return res.status(409).json({ message: "User invalid" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error("Login error:", err);
        return next(err);
      }
      console.log("Successfully logged in");
      return res.status(200).json({ message: "User logged in ",user:req.user});
    });
  })(req, res, next);
};

export const logout = (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.status(200).json({status:"logout"});
  });
};

export const checkauth = (req, res) => {
  if (req.isAuthenticated()) {
    console.log("super")
    return res.status(200).json({ authenticated: true, message: "User is authenticated",user:req.user });
  } else {
    console.log("gomma")
    return res.status(401).json({ authenticated: false, message: "User is not authenticated" });
    
  }
};
