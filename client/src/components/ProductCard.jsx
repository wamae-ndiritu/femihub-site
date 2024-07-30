import { useGlobalContext } from "../context/GlobalContext";

const ProductCard = ({ id, image, category, name, price, description }) => {
  const { cartItems, addItemToCart } = useGlobalContext();

  const handleAddToCart = () => {
    addItemToCart({ id, name, image, description, price: Number(price) });
    const updatedCartItems = [...cartItems, id];
    localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
  };

  return (
    <div className='bg-white border border-gray-300 rounded-lg shadow-md overflow-hidden transition-transform hover:translate-y-[-5px] flex flex-col h-full p-2'>
      <div className='relative h-48'>
        <img src={image} alt={name} className='w-full h-full object-cover' />
      </div>
      <div className='p-4 flex-grow'>
        <h3 className='text-lg text-gray-600 py-1 mb-2'>{name}</h3>
        <span className='text-sm text-gray-500'>{category}</span>
        <h6 className='text-custom-pink text-md'>Ush {price}</h6>
      </div>
      <button
        onClick={handleAddToCart}
        className='w-full self-center my-2 rounded-md bg-custom-pink text-white py-2 hover:bg-pink-700 transition-colors mt-auto'
      >
        Add to Cart
      </button>
    </div>
  );
};


export default ProductCard;