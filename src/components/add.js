export function addTocart(id, name, image, description, price) {
    const cartKey = 'cart'; // Key to use for storing cart data in localStorage
  
    // Try to read the existing cart data from localStorage
    let cartItems = JSON.parse(localStorage.getItem(cartKey)) || [];
    console.log('Existing cart items:', cartItems);
  
    // Create a new cart item object
    const newItem = {
      id,
      name,
      image,
      description
    };
  
    // Check if the item already exists in the cart
    const existingItem = cartItems.find(item => item.id === id);
    if (existingItem) {
      // If item exists, you can handle it here, e.g., update quantity, etc.
      console.log('Item already in cart:', existingItem);
    } else {
      // Add the new item to the cart
      cartItems.push(newItem);
    }
  
    // Save the updated cart data to localStorage
    localStorage.setItem(cartKey, JSON.stringify(cartItems));
  }
  