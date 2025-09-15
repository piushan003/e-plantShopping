import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../redux/CartSlice'; // ✅ Make sure this path is correct
import './ProductList.css';
import CartItem from './CartItem';

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items); // For cart icon count
  const [showCart, setShowCart] = useState(false);
  const [showPlants, setShowPlants] = useState(false);
  const [addedToCart, setAddedToCart] = useState({});

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowPlants(true);
    setShowCart(false);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleAddToCart = (plant) => {
    dispatch(addItem({ ...plant, quantity: 1 })); // ✅ Add quantity on first add
    setAddedToCart(prev => ({ ...prev, [plant.name]: true }));
  };

  const calculateTotalQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const plantsArray = [
    {
      category: "Air Purifying Plants",
      plants: [
        {
          name: "Snake Plant",
          description: "Produces oxygen at night, improving air quality.",
          cost: "$15",
          image: "https://cdn.shopify.com/s/files/1/0150/6262/products/4_823baa27-b671-42a1-b640-d66dc45fc2b6_480x480.jpg"
        },
        {
          name: "Spider Plant",
          description: "Filters formaldehyde and xylene from the air.",
          cost: "$12",
          image: "https://cdn11.bigcommerce.com/s-pkla4xn3/images/stencil/1280x1280/products/29609/278818/Spider-Plant-2__35590.1634853331.jpg"
        },
        {
          name: "Peace Lily",
          description: "Removes mold spores and purifies the air.",
          cost: "$18",
          image: "https://www.gardeningknowhow.com/wp-content/uploads/2022/04/peace-lily.jpg"
        }
      ]
    }
    // Add more categories if needed
  ];

  const styleObj = {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '20px',
  };

  const styleObjUl = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '1100px',
  };

  const styleA = {
    color: 'white',
    fontSize: '30px',
    textDecoration: 'none',
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={styleObj}>
        <div className="tag">
          <div className="luxury">
            <img
              src="https://cdn.pixabay.com/photo/2020/08/05/13/12/eco-5465432_1280.png"
              alt=""
            />
            <a href="/" onClick={handleHomeClick}>
              <div>
                <h3 style={{ color: 'white' }}>Paradise Nursery</h3>
                <i style={{ color: 'white' }}>Where Green Meets Serenity</i>
              </div>
            </a>
          </div>
        </div>
        <div style={styleObjUl}>
          <div><a href="#" onClick={handlePlantsClick} style={styleA}>Plants</a></div>
          <div>
            <a href="#" onClick={handleCartClick} style={styleA}>
              <h1 className="cart">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" height="68" width="68">
                  <rect width="156" height="156" fill="none"></rect>
                  <circle cx="80" cy="216" r="12"></circle>
                  <circle cx="184" cy="216" r="12"></circle>
                  <path
                    d="M42.3,72H221.7l-26.4,92.4A15.9,15.9,0,0,1,179.9,176H84.1a15.9,15.9,0,0,1-15.4-11.6L32.5,37.8A8,8,0,0,0,24.8,32H8"
                    fill="none"
                    stroke="#faf9f9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  />
                </svg>
                <span style={{ fontSize: '18px', marginLeft: '5px' }}>
                  ({calculateTotalQuantity()})
                </span>
              </h1>
            </a>
          </div>
        </div>
      </div>

      {/* Main content */}
      {!showCart ? (
        <div className="product-grid">
          {plantsArray.map((category, index) => (
            <div key={index}>
              <h2>{category.category}</h2>
              <div className="product-category-grid">
                {category.plants.map((plant, i) => (
                  <div className="product-card" key={i}>
                    <img src={plant.image} alt={plant.name} className="product-image" />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>Cost:</strong> {plant.cost}</p>
                    <button
                      onClick={() => handleAddToCart(plant)}
                      disabled={addedToCart[plant.name]}
                      className="add-to-cart-btn"
                    >
                      {addedToCart[plant.name] ? "Added" : "Add to Cart"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={handleContinueShopping} />
      )}
    </div>
  );
}

export default ProductList;
