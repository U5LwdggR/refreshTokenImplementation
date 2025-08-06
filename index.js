require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
//const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan"); // Import morgan

const app = express();
app.use(express.json());
//app.use(cookieParser());
app.use(cors()); // autorise toutes les origines pour toutes les routes

// Configuration du CORS
const corsOptions = {
  origin: "http://localhost:3000", // votre frontend React
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // si vous utilisez les cookies ou l'authentification avec credentials
  optionsSuccessStatus: 200, // certains clients aiment un code 200 plutôt que 204 sur OPTIONS
};

// Activer les logs HTTP avec morgan
app.use(morgan("dev"));

const userCredentials = {
  username: "admin",
  password: "admin123",
  email: "admin@gmail.com",
};

// Route de login
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (
    username === userCredentials.username &&
    password === userCredentials.password
  ) {
    const accessToken = jwt.sign(
      { username: userCredentials.username, email: userCredentials.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: userCredentials.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "2m" }
    );

    // Envoyer refresh token en cookie httpOnly
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 24 * 60 * 60 * 1000,
    });
    return res.json({
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  }
  res.status(401).json({ message: "Invalid credentials" });
});

// Route pour rafraîchir l'access token
app.post("/refresh", (req, res) => {
  const authHeader = req.headers.authorization;
  console.log("refresh", authHeader);

  if (!authHeader) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  // Extraction du token depuis "Bearer <token>" si besoin
  const refreshToken = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const NewAccessToken = jwt.sign(
      { username: userCredentials.username, email: userCredentials.email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );
    res.json({ NewAccessToken });
  });
});

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
