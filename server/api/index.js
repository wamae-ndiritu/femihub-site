const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const session = require("express-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const cookieSession = require("cookie-session");
const passport = require("passport");
const paypal = require("@paypal/checkout-server-sdk");
const dotenv = require("dotenv");
require("dotenv").config();

const DBHOST = process.env.DBHOST;
const DBUSER = process.env.DBUSER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

// PayPal environment configuration
let environment = new paypal.core.SandboxEnvironment(
  "YOUR_CLIENT_ID",
  "YOUR_CLIENT_SECRET"
);
let client = new paypal.core.PayPalHttpClient(environment);

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["user"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(express.json());
app.use(
  session({
    secret: "your_session_secret", // Replace with your session secret
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    // Replace with your frontend URL
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "1060070019340-c9ere6l2i897e7ejv17crhg0cd9pnf04.apps.googleusercontent.com", // Replace with your Google Client ID
      clientSecret: "YOUR_GOOGLE_CLIENT_SECRET", // Replace with your Google Client Secret
      callbackURL: "/auth/google/callback",
      scope: ["profile", "email"],
    },
    function (accessToken, refreshToken, profile, callback) {
      callback(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// MySQL connection
const db = mysql.createConnection({
  host: DBHOST,
  user: DBUSER,
  password: PASSWORD,
  database: DATABASE,
  port: 3306,
});

db.connect((err) => {
  if (err) {
    console.log("Error connecting to MySQL: " + err);
    throw err;
  }
  console.log("MySQL connected...");
});

// Google Authentication Routes
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication
    res.json("User authenticated");
  }
);

// Authentication endpoints
app.post("/register", async (req, res) => {
  console.log("Register endpoint hit");
  const { name, email, phone_number, password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ error: "Password is required" });
    }
    const userExistsQuery = "SELECT * FROM users WHERE email = ?";
    db.query(userExistsQuery, [email], (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: err.message });
      }

      if (result.length > 0) {
        return res.status(400).json({ error: "Email already exists" });
      }
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      "INSERT INTO users (name, email, phone_number, password) VALUES (?, ?, ?, ?)";
    db.query(
      query,
      [name, email, phone_number, hashedPassword],
      (err, result) => {
        if (err) {
          console.log(err);
          res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: "User registered successfully" });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error hashing password" });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0)
      return res.status(400).json({ error: "User not found" });
    const user = results[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });
    const token = jwt.sign({ id: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  });
});

// Apple Authentication Configuration
// const AppleAuth = require('apple-auth');
// const appleAuth = new AppleAuth({
//     client_id: 'YOUR_APPLE_CLIENT_ID', // Replace with your Apple Client ID
//     team_id: 'YOUR_TEAM_ID', // Replace with your Apple Team ID
//     key_id: 'YOUR_KEY_ID', // Replace with your Apple Key ID
//     private_key: `-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----`
// }, 'YOUR_APPLE_CLIENT_SECRET', 'https://appleid.apple.com/auth/token');

// Apple authentication route
// app.post('/auth/apple', async (req, res) => {
//     const { code, id_token } = req.body;
//
//     try {
//         const response = await appleAuth.getAccessToken(code);
//         const appleUser = await appleAuth.verifyIdToken(id_token);
//
//         const { sub: appleUserId, email } = appleUser;
//
//         const user = await findOrCreateUser({ appleUserId, email });
//
//         const token = jwt.sign({ id: appleUserId }, 'your_jwt_secret', { expiresIn: '1h' });
//
//         res.json({ token, user: { appleUserId, email } });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Doctor registration (CRUD)
app.post("/doctors", (req, res) => {
  console.log("Endpoint hit");
  const { name, specialty, email, phone_number } = req.body;
  const query =
    "INSERT INTO doctors (name, specialty, email, phone_number) VALUES (?, ?, ?, ?)";
  db.query(query, [name, specialty, email, phone_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Doctor registered successfully" });
  });
});

app.get("/doctors", (req, res) => {
  const query = "SELECT * FROM doctors";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put("/doctors/:id", (req, res) => {
  const { id } = req.params;
  const { name, specialty, email, phone_number } = req.body;
  const query =
    "UPDATE doctors SET name = ?, specialty = ?, email = ?, phone_number = ? WHERE id = ?";
  db.query(query, [name, specialty, email, phone_number, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Doctor updated successfully" });
  });
});

app.delete("/doctors/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM doctors WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Doctor deleted successfully" });
  });
});

// Community forum endpoints
app.get("/forum_posts", (req, res) => {
  const query = "SELECT * FROM forum_posts";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/forum_posts", (req, res) => {
  const { user_id, title, content } = req.body;
  const query =
    "INSERT INTO forum_posts (user_id, title, content) VALUES (?, ?, ?)";
  db.query(query, [user_id, title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Post created successfully" });
  });
});

// Articles endpoints (CRUD)
app.post("/articles", (req, res) => {
  const { title, content, author_id } = req.body;
  const query =
    "INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)";
  db.query(query, [title, content, author_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Article created successfully" });
  });
});

app.get("/articles", (req, res) => {
  const query = "SELECT * FROM articles";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put("/articles/:id", (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const query = "UPDATE articles SET title = ?, content = ? WHERE id = ?";
  db.query(query, [title, content, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Article updated successfully" });
  });
});

app.delete("/articles/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM articles WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Article deleted successfully" });
  });
});

// Products endpoints (CRUD)
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  const query =
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";
  db.query(query, [name, price, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Product created successfully" });
  });
});

app.get("/products", (req, res) => {
  const query = "SELECT * FROM products";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const query =
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?";
  db.query(query, [name, price, description, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product updated successfully" });
  });
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM products WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Product deleted successfully" });
  });
});

// Subscriptions endpoints (CRUD)
app.post("/subscriptions", (req, res) => {
  const { user_id, product_id, start_date, end_date } = req.body;
  const query =
    "INSERT INTO subscriptions (user_id, product_id, start_date, end_date) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [user_id, product_id, start_date, end_date],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Subscription created successfully" });
    }
  );
});

app.get("/subscriptions", (req, res) => {
  const query = "SELECT * FROM subscriptions";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.put("/subscriptions/:id", (req, res) => {
  const { id } = req.params;
  const { start_date, end_date } = req.body;
  const query =
    "UPDATE subscriptions SET start_date = ?, end_date = ? WHERE id = ?";
  db.query(query, [start_date, end_date, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Subscription updated successfully" });
  });
});

app.delete("/subscriptions/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM subscriptions WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Subscription deleted successfully" });
  });
});

// Experiences sharing endpoints
app.post("/experiences", (req, res) => {
  const { user_id, title, content } = req.body;
  const query =
    "INSERT INTO experiences (user_id, title, content) VALUES (?, ?, ?)";
  db.query(query, [user_id, title, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Experience shared successfully" });
  });
});

app.get("/experiences", (req, res) => {
  const query = "SELECT * FROM experiences";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Period tracking endpoints
app.post("/periods", (req, res) => {
  const { user_id, start_date, end_date } = req.body;
  const query =
    "INSERT INTO periods (user_id, start_date, end_date) VALUES (?, ?, ?)";
  db.query(query, [user_id, start_date, end_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Period tracked successfully" });
  });
});

app.get("/periods", (req, res) => {
  const query = "SELECT * FROM periods";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Payments endpoints
app.post("/payments", (req, res) => {
  const { user_id, amount, date } = req.body;
  const query = "INSERT INTO payments (user_id, amount, date) VALUES (?, ?, ?)";
  db.query(query, [user_id, amount, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Payment processed successfully" });
  });
});

app.get("/payments", (req, res) => {
  const query = "SELECT * FROM payments";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Logout endpoint
app.post("/logout", (req, res) => {
  req.logout();
  res.json({ message: "Logged out successfully" });
});

// Chats endpoints
app.get("/chats", (req, res) => {
  const query = "SELECT * FROM chats";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/chats", (req, res) => {
  const { user_id, message, date } = req.body;
  const query = "INSERT INTO chats (user_id, message, date) VALUES (?, ?, ?)";
  db.query(query, [user_id, message, date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Message sent successfully" });
  });
});

// Recommendations endpoints
app.get("/recommendations", (req, res) => {
  const query = "SELECT * FROM recommendations";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.post("/recommendations", (req, res) => {
  const { user_id, content } = req.body;
  const query = "INSERT INTO recommendations (user_id, content) VALUES (?, ?)";
  db.query(query, [user_id, content], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "Recommendation added successfully" });
  });
});

app.post("/pay-with-paypal", async (req, res) => {
  const { amount, currency } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: currency,
          value: amount,
        },
      },
    ],
  });

  try {
    const order = await client.execute(request);
    res.status(201).json(order.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/capture-order", async (req, res) => {
  const { orderID } = req.body;

  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await client.execute(request);
    res.status(201).json(capture.result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint to list payments and their linked products
app.get("/v1/payments/payment", async (req, res) => {
  try {
    const request = new paypal.payments.PaymentsGetRequest();
    const response = await client.execute(request);

    // Process the payment data to include linked products from your database
    const payments = response.result.payments;
    const paymentDetails = await Promise.all(
      payments.map(async (payment) => {
        const query = "SELECT * FROM products WHERE payment_id = ?";
        return new Promise((resolve, reject) => {
          db.query(query, [payment.id], (err, results) => {
            if (err) reject(err);
            resolve({ ...payment, products: results });
          });
        });
      })
    );

    res.json(paymentDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Reminder endpoints (to be added later)

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
