const mysql = require("mysql2");

// Create a connection to the database
const db = mysql.createConnection({
  host: "45.56.98.224",
  user: "femihub_femihub",
  database: "femihub_femihub_db",
  password: "FemihubIODEV123",
  port: 3306,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    throw err;
  }
  console.log("Connected to the database");
});

// Fetch data from the API
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    // Process the response to extract the desired fields
    const products = json.map((product) => ({
      name: product.title,
      price: product.price,
      description: product.description,
      imageUrl: product.image,
    }));

    // Insert each product into the database
    const insertProduct = (product) => {
      const query = `
                INSERT INTO products (name, description, price, image)
                VALUES (?, ?, ?, ?)
            `;
      db.query(
        query,
        [product.name, product.description, product.price, product.imageUrl],
        (err, results) => {
          if (err) {
            console.error("Error inserting product:", err);
            return;
          }
          console.log("Product inserted with ID:", results.insertId);
        }
      );
    };

    products.forEach(insertProduct);
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  })
  .finally(() => {
    // Close the database connection
    db.end((err) => {
      if (err) {
        console.error("Error closing the database connection:", err);
        return;
      }
      console.log("Database connection closed");
    });
  });
