import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createOrder, getProduct } from "../lib/apiCalls";
import { useGlobalContext } from "../context/GlobalContext";

const ProductViewPage = () => {
  const {addItemToCart, user} = useGlobalContext();  
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product details based on productId
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);
        setProduct(product);
      } catch (error) {
        console.log(error)
        toast.error("Failed to load product details");
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addItemToCart(product)
    toast.success("Product added to cart");
  };

  const handleBuyNow = async () => {
    setLoading(true);
    try {
      if (!user) {
        alert("Please log in to proceed with checkout.");
        setLoading(false);
        return;
      }
      await createOrder(user?.user?.id, [{...product, qty: quantity}]);
      toast.success("Your order has been created successfully");
      setTimeout(() => {
        navigate('/')
      }, 5000);
    } catch (error) {
      const message = error?.response
        ? error?.response?.data?.error
        : error?.message;
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='px-2 md:px-[100px] my-6 flex flex-col md:flex-row'>
      <div className='w-full md:w-1/2 p-4'>
        <img src={product.image} alt={product.name} className='w-[400px] h-auto object-contain' />
      </div>
      <div className='product-info w-full md:w-1/2 p-4'>
        <h2 className='text-2xl font-bold mb-2'>{product.name}</h2>
        <div
          className='text-gray-700 mb-4'
          dangerouslySetInnerHTML={{ __html: product.description }}
        ></div>
        <div className='w-full flex justify-between items-center'>
          <p className='text-xl text-gray-600 mb-4'>Price: </p>
          <h6 className='my-auto text-custom-pink'>Ush {product.price}</h6>
        </div>

        <div className='w-full mb-4'>
          <label htmlFor='quantity' className='block mb-1'>
            Select Quantity
          </label>
          <select
            id='quantity'
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className='w-full border border-gray-300 rounded-md p-2 focus:outline-custom-pink'
          >
            {[...Array(10).keys()].map((num) => (
              <option key={num + 1} value={num + 1}>
                {num + 1}
              </option>
            ))}
          </select>
        </div>

        <div className='w-full flex justify-between space-x-4'>
          <button
            onClick={handleBuyNow}
            className='w-1/2 bg-custom-pink text-white px-4 py-2 rounded-md hover:bg-pink-700'
            disabled={loading}
          >
           { loading ? "Creating Order..." : "Buy Now"}
          </button>
          <button
            onClick={handleAddToCart}
            className='w-1/2 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductViewPage;
