const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const cors = require('cors');
const cookieSession = require('cookie-session');
const passport = require('passport');
const paypal = require('@paypal/checkout-server-sdk');
require('dotenv').config();
const crypto = require('crypto');


const DBHOST = process.env.DBHOST;
const DBUSER = process.env.DBUSER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

// PayPal environment configuration
let environment = new paypal.core.SandboxEnvironment('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET');
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
app.use(session({
    secret: 'your_session_secret', // Replace with your session secret
    resave: false,
    saveUninitialized: false
}));

app.use(
	cors({
		origin: "*",
		methods: "GET,POST,PUT,DELETE",
		credentials: true,
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

passport.use(
	new GoogleStrategy(
		{
			clientID: '1060070019340-c9ere6l2i897e7ejv17crhg0cd9pnf04.apps.googleusercontent.com', // Replace with your Google Client ID
			clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET', // Replace with your Google Client Secret
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
const db = mysql.createPool({
    host: DBHOST,
    user: DBUSER,
    password: PASSWORD,
    database: DATABASE,
    port: 3306,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
  });

// db.connect((err) => {
//   if (err) {
//     console.log("Error connecting to MySQL: " + err);
//     throw err;
//   }
//   console.log("MySQL connected...");

// });

app.get('/home', (req, res) => {
    res.send('Hello World!');
  });

// Google Authentication Routes
app.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile', 'email']
    })
);

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        // Successful authentication
        res.json('User authenticated');
    }
);

// Authentication endpoints
app.post('/register', async (req, res) => {
    const { name, email, phone_number, password } = req.body;

    try {
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO users (name, email, phone_number, password) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, phone_number, hashedPassword], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error hashing password' });
    }
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });
        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });
        const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token ,  user: { id: user.id, email: user.email, name: user.name} });
    });
});

app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const query = 'SELECT * FROM users WHERE email = ?';
      db.query(query, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(400).json({ error: 'User not found' });
  
        const user = results[0];
  
        const resetToken = crypto.randomBytes(20).toString('hex');
  
        const updateQuery = 'UPDATE users SET reset_token = ? WHERE id = ?';
        db.query(updateQuery, [resetToken, user.id], (err) => {
          if (err) return res.status(500).json({ error: err.message });
  
          console.log('Password reset token generated:', resetToken); 
          res.status(200).json({ message: 'Password reset email sent', token: resetToken }); 
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Error processing forgot password request' });
    }
  });

  app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;
   

    if (!token || !newPassword) {
        return res.status(400).json({ error: 'Token and new password are required' });
    }

    try {
        const query = 'SELECT * FROM users WHERE reset_Token = ?';
        const [results] = await db.promise().query(query, [token]);

        if (results.length === 0) {
            return res.status(400).json({ error: 'Invalid token' });
        }

        const user = results[0];

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updateQuery = 'UPDATE users SET password = ?, reset_Token = NULL WHERE id = ?';
        await db.promise().query(updateQuery, [hashedPassword, user.id]);

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        res.status(500).json({ error: 'Error resetting password: ' + error.message });
    }
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
app.post('/doctors', (req, res) => {
    const { name, specialty, email, phone_number } = req.body;
    const query = 'INSERT INTO doctors (name, specialty, email, phone_number) VALUES (?, ?, ?, ?)';
    db.query(query, [name, specialty, email, phone_number], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Doctor registered successfully' });
    });
});

app.get('/doctors', (req, res) => {
    const query = 'SELECT * FROM doctors';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const { name, specialty, email, phone_number } = req.body;
    const query = 'UPDATE doctors SET name = ?, specialty = ?, email = ?, phone_number = ? WHERE id = ?';
    db.query(query, [name, specialty, email, phone_number, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Doctor updated successfully' });
    });
});

app.delete('/doctors/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM doctors WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Doctor deleted successfully' });
    });
});

// Community forum endpoints
app.get('/forum_posts', (req, res) => {
    const query = 'SELECT * FROM forum_posts';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/forum_posts', (req, res) => {
    const { user_id, title, content } = req.body;
    const query = 'INSERT INTO forum_posts (user_id, title, content) VALUES (?, ?, ?)';
    db.query(query, [user_id, title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Post created successfully' });
    });
});

// Articles endpoints (CRUD)
app.post('/articles', (req, res) => {
    const { title, content, author_id } = req.body;
    const query = 'INSERT INTO articles (title, content, author_id) VALUES (?, ?, ?)';
    db.query(query, [title, content, author_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Article created successfully' });
    });
});

app.get('/articles', (req, res) => {
    const query = 'SELECT * FROM articles';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/articles/:id', (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const query = 'UPDATE articles SET title = ?, content = ? WHERE id = ?';
    db.query(query, [title, content, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Article updated successfully' });
    });
});

app.delete('/articles/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM articles WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Article deleted successfully' });
    });
});

// Products endpoints (CRUD)
app.get('/new-products', (req, res) => {
    // const { name, price, description } = req.body;
    const query = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 20;';
    db.query(query, (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'best selling products', products: result });
    });
});

// Products endpoints (CRUD)
app.post('/products', (req, res) => {
    const { name, price, description } = req.body;
    const query = 'INSERT INTO products (name, price, description) VALUES (?, ?, ?)';
    db.query(query, [name, price, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Product created successfully' });
    });
});

app.get("/products", (req, res) => {
  const { search, category } = req.query;

  let query = "SELECT * FROM `products` WHERE `created_at` <> '2024-08-14 11:34:21'";
  let queryParams = [];

  if (search || category) {
    query += " WHERE";
  }

  if (search) {
    query += " name LIKE ?";
    queryParams.push(`%${search}%`);
  }

  if (search && category) {
    query += " AND";
  }

  if (category) {
    query += " category_id = ?";
    queryParams.push(category);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM products WHERE id = ?";
  db.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0)
      return res.status(404).json({ message: "Product not found" });
    res.json(result[0]);
  });
});

app.put('/products/:id', (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;
    const query = 'UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?';
    db.query(query, [name, price, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product updated successfully' });
    });
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM products WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Product deleted successfully' });
    });
});

// Subscriptions endpoints (CRUD)
app.post('/subscriptions', (req, res) => {
    const { user_id, product_id, start_date, end_date } = req.body;
    const query = 'INSERT INTO subscriptions (user_id, product_id, start_date, end_date) VALUES (?, ?, ?, ?)';
    db.query(query, [user_id, product_id, start_date, end_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Subscription created successfully' });
    });
});

app.get('/subscriptions', (req, res) => {
    const query = 'SELECT * FROM subscriptions';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.put('/subscriptions/:id', (req, res) => {
    const { id } = req.params;
    const { start_date, end_date } = req.body;
    const query = 'UPDATE subscriptions SET start_date = ?, end_date = ? WHERE id = ?';
    db.query(query, [start_date, end_date, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subscription updated successfully' });
    });
});

app.delete('/subscriptions/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM subscriptions WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Subscription deleted successfully' });
    });
});

// Experiences sharing endpoints
app.post('/experiences', (req, res) => {
    const { user_id, title, content } = req.body;
    const query = 'INSERT INTO experiences (user_id, title, content) VALUES (?, ?, ?)';
    db.query(query, [user_id, title, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Experience shared successfully' });
    });
});

app.get('/experiences', (req, res) => {
    const query = 'SELECT * FROM experiences';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Period tracking endpoints
app.post('/periods', (req, res) => {
    const { user_id, start_date, end_date } = req.body;
    const query = 'INSERT INTO periods (user_id, start_date, end_date) VALUES (?, ?, ?)';
    db.query(query, [user_id, start_date, end_date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Period tracked successfully' });
    });
});

app.get('/periods', (req, res) => {
    const query = 'SELECT * FROM periods';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Payments endpoints
app.post('/payments', (req, res) => {
    const { user_id, amount, date } = req.body;
    const query = 'INSERT INTO payments (user_id, amount, date) VALUES (?, ?, ?)';
    db.query(query, [user_id, amount, date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Payment processed successfully' });
    });
});

app.get('/payments', (req, res) => {
    const query = 'SELECT * FROM payments';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Logout endpoint
app.post('/logout', (req, res) => {
    req.logout();
    res.json({ message: 'Logged out successfully' });
});

// Chats endpoints
app.get('/chats', (req, res) => {
    const query = 'SELECT * FROM chats';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/chats', (req, res) => {
    const { user_id, message, date } = req.body;
    const query = 'INSERT INTO chats (user_id, message, date) VALUES (?, ?, ?)';
    db.query(query, [user_id, message, date], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Message sent successfully' });
    });
});

// Recommendations endpoints
app.get('/recommendations', (req, res) => {
    const query = 'SELECT * FROM recommendations';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.post('/recommendations', (req, res) => {
    const { user_id, content } = req.body;
    const query = 'INSERT INTO recommendations (user_id, content) VALUES (?, ?)';
    db.query(query, [user_id, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Recommendation added successfully' });
    });
});

app.post('/pay-with-paypal', async (req, res) => {
    const { amount, currency } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: currency,
                value: amount
            }
        }]
    });

    try {
        const order = await client.execute(request);
        res.status(201).json(order.result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/capture-order', async (req, res) => {
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
app.get('/v1/payments/payment', async (req, res) => {
    try {
        const request = new paypal.payments.PaymentsGetRequest();
        const response = await client.execute(request);

        // Process the payment data to include linked products from your database
        const payments = response.result.payments;
        const paymentDetails = await Promise.all(payments.map(async payment => {
            const query = 'SELECT * FROM products WHERE payment_id = ?';
            return new Promise((resolve, reject) => {
                db.query(query, [payment.id], (err, results) => {
                    if (err) reject(err);
                    resolve({ ...payment, products: results });
                });
            });
        }));

        res.json(paymentDetails);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Orders endpoints (CRUD)
// app.post('/orders', (req, res, next) => {
//     const { user_id, product_id, amount, date } = req.body;
//     const query = 'INSERT INTO orders (user_id, product_id, amount, date) VALUES (?, ?, ?, ?)';
//     db.query(query, [user_id, product_id, amount, date], (err, result) => {
//         if (err) return next(err);
//         res.status(201).json({ message: 'Order created successfully' });
//     });
// });

app.post('/orders', (req, res, next) => {
    const { user_id, products } = req.body;
  
    // Validate products
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: 'Products must not be empty' });
    }
  
    const totalAmount =  products.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
  
    db.beginTransaction((err) => {
      if (err) return next(err);
  
      const queryOrder = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
      db.query(queryOrder, [user_id, totalAmount], (err, result) => {
        if (err) {
          return db.rollback(() => next(err));
        }
  
        const orderId = result.insertId;
        const queryOrderItems = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
        const orderItems = products.map(product => [orderId, product.id, product.qty, product.price]);
  
        db.query(queryOrderItems, [orderItems], (err, result) => {
          if (err) {
            return db.rollback(() => next(err));
          }
  
          db.commit((err) => {
            if (err) {
              return db.rollback(() => next(err));
            }
            res.status(201).json({ message: 'Order created successfully', orderId });
          });
        });
      });
    });
  });
  
  

app.get('/orders', (req, res, next) => {
    const query = 'SELECT * FROM orders';
    db.query(query, (err, results) => {
        if (err) return next(err);
        res.json(results);
    });
});

app.get('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const query = 'SELECT * FROM orders WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return next(err);
        res.json(result);
    });
});

app.put('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const { user_id, product_id, amount, date } = req.body;
    const query = 'UPDATE orders SET user_id = ?, product_id = ?, amount = ?, date = ? WHERE id = ?';
    db.query(query, [user_id, product_id, amount, date, id], (err, result) => {
        if (err) return next(err);
        res.json({ message: 'Order updated successfully' });
    });
});

app.delete('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const query = 'DELETE FROM orders WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return next(err);
        res.json({ message: 'Order deleted successfully' });
    });
});

app.post('/appointments', (req, res) => {
    const { user_id, username, appointment_reason } = req.body;

    const query = 'INSERT INTO appointments (user_id, username, appointment_reason) VALUES (?, ?, ?)';
    db.query(query, [user_id, username, appointment_reason], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Appointment created successfully' });
    });
});

app.get('/appointments', (req, res) => {
    const query = 'SELECT * FROM appointments';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM appointments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.put('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const { user_id, username, appointment_reason } = req.body;
    const query = 'UPDATE appointments SET user_id = ?, username = ?, appointment_reason = ? WHERE id = ?';
    db.query(query, [user_id, username, appointment_reason, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment updated successfully' });
    });
});

app.delete('/appointments/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM appointments WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Appointment deleted successfully' });
    });
});

// CRUD operations for categories
app.post('/categories', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO categories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Category created successfully' });
    });
});

app.get('/categories', (req, res) => {
    const query = 'SELECT * FROM categories';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/categories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM categories WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.put('/categories/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE categories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category updated successfully' });
    });
});

app.delete('/categories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM categories WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category deleted successfully' });
    });
});

// Endpoint to get products grouped by category
app.get('/products-by-category', (req, res) => {
    const query = `
        SELECT c.name as category_name, p.id as product_id, p.name as product_name, p.description, p.price, p.image 
        FROM products p 
        JOIN categories c ON p.category_id = c.id
        ORDER BY c.name, p.name
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// CRUD operations for Mcategories
app.post('/Mcategories', (req, res) => {
    const { name, description } = req.body;
    const query = 'INSERT INTO Mcategories (name, description) VALUES (?, ?)';
    db.query(query, [name, description], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Category created successfully' });
    });
});

app.get('/Mcategories', (req, res) => {
    const query = 'SELECT * FROM Mcategories';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

app.get('/Mcategories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM Mcategories WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(result);
    });
});

app.put('/Mcategories/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const query = 'UPDATE Mcategories SET name = ?, description = ? WHERE id = ?';
    db.query(query, [name, description, id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category updated successfully' });
    });
});

app.delete('/Mcategories/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Mcategories WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Category deleted successfully' });
    });
});

// Endpoint to get products grouped by category
app.get('/products-by-Mcategories', (req, res) => {
    const query = `
        SELECT c.name as category_name, p.id as product_id, p.name as product_name, p.description, p.price, p.image 
        FROM products p 
        JOIN categories c ON p.category_id = c.id
        ORDER BY c.name, p.name
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// Get latest products
app.get('/shop/latest', (req, res) => {
    const query = 'SELECT * FROM products ORDER BY created_at DESC LIMIT 10';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get favorite products
// app.get('/favorites', (req, res) => {
//     const { userId } = req.query;
//     const query = 'SELECT p.* FROM favorites f JOIN products p ON f.product_id = p.id WHERE f.user_id = ?';
//     db.query(query, [userId], (err, results) => {
//         if (err) return res.status(500).json({ error: err.message });
//         res.json(results);
//     });
// });

app.post('/favorites', (req, res) => {
    const { user_id, product_id } = req.body;
    const query = "INSERT INTO favorites (user_id, product_id) VALUES (?, ?)";

    db.query(query, [user_id, product_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Favorite saved successfully' });
    });
});

app.delete('/favorites', (req, res) => {
    const { user_id, product_id } = req.body;
    const query = "DELETE FROM favorites WHERE user_id = ? AND product_id = ?";

    db.query(query, [user_id, product_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Favorite deleted successfully' });
    });
})

// Get favorite products
app.get('/favorites', (req, res) => {
    const { user_id } = req.query;

    const query = 'SELECT * FROM favorites WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// Book a consultation
app.post('/consultation', (req, res) => {
    const { username, userId, reason } = req.body;
    const query = 'INSERT INTO consultations (username, user_id, reason) VALUES (?, ?, ?)';
    db.query(query, [username, userId, reason], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Consultation booked successfully' });
    });
});

// Get products by various filters
app.get('/shop', (req, res) => {
    const { size, fabric, pack, style, minPrice, maxPrice } = req.query;
    let query = 'SELECT * FROM products WHERE 1=1';
    let params = [];

    if (size) {
        query += ' AND size = ?';
        params.push(size);
    }
    if (fabric) {
        query += ' AND fabric = ?';
        params.push(fabric);
    }
    if (pack) {
        query += ' AND pack = ?';
        params.push(pack);
    }
    if (style) {
        query += ' AND style = ?';
        params.push(style);
    }
    if (minPrice) {
        query += ' AND price >= ?';
        params.push(minPrice);
    }
    if (maxPrice) {
        query += ' AND price <= ?';
        params.push(maxPrice);
    }

    db.query(query, params, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Get products by category
app.get('/shop/category/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const query = 'SELECT * FROM products WHERE category_id = ?';
    db.query(query, [categoryId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});


// Create or update a rating
// Create or update a rating
app.post('/ratings', (req, res) => {
    const { product_id, user_id, rating } = req.body;

    // Check if a rating already exists for this user and product
    const checkQuery = 'SELECT * FROM ratings WHERE product_id = ? AND user_id = ?';
    db.query(checkQuery, [product_id, user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });

        if (results.length > 0) {
            // Update existing rating
            const updateQuery = 'UPDATE ratings SET rating = ? WHERE product_id = ? AND user_id = ?';
            db.query(updateQuery, [rating, product_id, user_id], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ message: 'Rating updated successfully' });
            });
        } else {
            // Create new rating
            const insertQuery = 'INSERT INTO ratings (product_id, user_id, rating) VALUES (?, ?, ?)';
            db.query(insertQuery, [product_id, user_id, rating], (err, result) => {
                if (err) return res.status(500).json({ error: err.message });
                res.status(201).json({ message: 'Rating added successfully' });
            });
        }
    });
});

// Get all ratings for a specific product
app.get('/ratings', (req, res) => {
    const { product_id } = req.query;
    const query = 'SELECT * FROM ratings WHERE product_id = ?';
    db.query(query, [product_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Delete all ratings by a specific user
app.delete('/ratings', (req, res) => {
    const { user_id } = req.query;
    const query = 'DELETE FROM ratings WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'No ratings found for this user' });
        res.json({ message: 'Ratings deleted successfully' });
    });
});

// Delete a rating by user_id and product_id
app.delete('/ratings', (req, res) => {
    const { user_id, product_id } = req.query;
    const query = 'DELETE FROM ratings WHERE user_id = ? AND product_id = ?';
    db.query(query, [user_id, product_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'No rating found for this user and product' });
        res.json({ message: 'Rating deleted successfully' });
    });
});



// Create or update settings for a user
app.post('/settings', (req, res) => {
    const {
        user_id,
        period_reminders,
        fertility_reminders,
        ovulation_reminders,
        remind_medicine,
        track_contraception,
        reminder,
        click_method,
        selected_method,
        meditation_reminder,
        daily_logging_reminders,
        tracking_reminder,
        is_secret,
        pin,
        use_bio,
        show_pin_page,
        intercourse_log,
        ovulation_fertility_info,
        pill_tracking,
        backup_data
    } = req.body;

    const query = `
        INSERT INTO settings (
            user_id, period_reminders, fertility_reminders, ovulation_reminders, remind_medicine, 
            track_contraception, reminder, click_method, selected_method, meditation_reminder, 
            daily_logging_reminders, tracking_reminder, is_secret, pin, use_bio, show_pin_page, 
            intercourse_log, ovulation_fertility_info, pill_tracking, backup_data
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            period_reminders = VALUES(period_reminders),
            fertility_reminders = VALUES(fertility_reminders),
            ovulation_reminders = VALUES(ovulation_reminders),
            remind_medicine = VALUES(remind_medicine),
            track_contraception = VALUES(track_contraception),
            reminder = VALUES(reminder),
            click_method = VALUES(click_method),
            selected_method = VALUES(selected_method),
            meditation_reminder = VALUES(meditation_reminder),
            daily_logging_reminders = VALUES(daily_logging_reminders),
            tracking_reminder = VALUES(tracking_reminder),
            is_secret = VALUES(is_secret),
            pin = VALUES(pin),
            use_bio = VALUES(use_bio),
            show_pin_page = VALUES(show_pin_page),
            intercourse_log = VALUES(intercourse_log),
            ovulation_fertility_info = VALUES(ovulation_fertility_info),
            pill_tracking = VALUES(pill_tracking),
            backup_data = VALUES(backup_data)
    `;

    db.query(query, [
        user_id, period_reminders, fertility_reminders, ovulation_reminders, remind_medicine, 
        track_contraception, reminder, click_method, selected_method, meditation_reminder, 
        daily_logging_reminders, tracking_reminder, is_secret, pin, use_bio, show_pin_page, 
        intercourse_log, ovulation_fertility_info, pill_tracking, backup_data
    ], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Settings saved successfully' });
    });
});

app.get('/settings', (req, res) => {
    const { user_id } = req.body;
    const query = 'SELECT * FROM settings WHERE user_id = ?';
    db.query(query, [user_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ error: 'Settings not found' });
        res.json(results[0]);
    });
});

// Delete settings by user ID
app.delete('/settings', (req, res) => {
    const { user_id } = req.body;
    const query = 'DELETE FROM settings WHERE user_id = ?';
    db.query(query, [user_id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Settings not found' });
        res.json({ message: 'Settings deleted successfully' });
    });
});

// Create a new reply
app.post('/replies', (req, res) => {
    const { post_id, user_id, content } = req.body;
    const query = 'INSERT INTO replies (post_id, user_id, content) VALUES (?, ?, ?)';
    db.query(query, [post_id, user_id, content], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Reply created successfully', replyId: result.insertId });
    });
});

// Get all replies for a specific post
app.get('/replies', (req, res) => {
    // const { post_id } = req.body;
    const { post_id } = req.query;
    const query = 'SELECT * FROM replies WHERE post_id = ?';
    db.query(query, [post_id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});

// Delete a reply by its ID
app.delete('/replies', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM replies WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        if (result.affectedRows === 0) return res.status(404).json({ error: 'Reply not found' });
        res.json({ message: 'Reply deleted successfully' });
    });
});

app.get('/list_users', (req, res) => {
    const email = req.query.email;
    let query
    if (email) {
        query = `SELECT id, name FROM users WHERE email = ?`;
        db.query(query, [email], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    } else {
        query = 'SELECT id, name FROM users';
        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(results);
        });
    }
});

app.get('/mobile/', (req, res) => {
    const query = 'SELECT * FROM mob_products'
    db.query(query, (err, results) => {
        if (err){
            return res.status(500).json({error: err.message});
        }
        res.json(results)
    })
    
})

app.get('/mobile/:cat', (req, res) =>{
    const { cat } = req.params;
    const query = 'SELECT * FROM `mob_products` WHERE `category_id` = ?';

    db.query(query, [cat], (err, results) =>{
        if (err) {
            return res.status(200).json({error: err.message});
    }else{
        res.status(200).json(results)
    }
})
})

// Reminder endpoints (to be added later)

const PORT = 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
