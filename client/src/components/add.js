export function addTocart(id, name, image, description, price) {
  const cartKey = "cart"; // Key to use for storing cart data in localStorage

  // Try to read the existing cart data from localStorage
  let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
  console.log("Existing cart items:", cartItems);

  // Create a new cart item object
  const newItem = {
    id,
    name,
    image,
    description,
  };

  const existingItem = cartItems.find((item) => item.id === id);
  if (existingItem) {
    return;
  } else {
    cartItems.push(newItem);
  }

  localStorage.setItem(cartKey, JSON.stringify(cartItems));
}
